
const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Task = require("./models/Task");
const User = require("./models/User");

const authMiddleware = require("./middleware/authMiddleware");
const validationMiddleware = require("./middleware/validationMiddleware");
const cache = require("./cache");

// Practical 10: Event-driven architecture
const taskEvents = require("./events");
require("./listeners");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Health endpoint for Practical 12 CI testing
app.get("/health", (req, res) => {
    res.status(200).json({ status: "ok" });
});

// Register a user
app.post("/register", async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                error: "Name, email and password are required"
            });
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(409).json({
                error: "Email already registered"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });

        res.status(201).json({
            message: "User registered successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });
    } catch (error) {
        next(error);
    }
});

// Log in a user
app.post("/login", async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                error: "Email and password are required"
            });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({
                error: "Invalid email or password"
            });
        }

        const passwordMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!passwordMatch) {
            return res.status(401).json({
                error: "Invalid email or password"
            });
        }

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        res.status(200).json({
            message: "Login successful",
            token
        });
    } catch (error) {
        next(error);
    }
});

// Get the logged-in user's profile
app.get("/me", authMiddleware, async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id)
            .select("-password");

        if (!user) {
            return res.status(404).json({
                error: "User not found"
            });
        }

        res.status(200).json({ user });
    } catch (error) {
        next(error);
    }
});

// Get all tasks with caching
app.get("/tasks", authMiddleware, async (req, res, next) => {
    try {
        const cacheKey = `all_tasks_${req.user.id}`;
        const cachedTasks = cache.get(cacheKey);

        if (cachedTasks) {
            console.log("[Cache] HIT:", cacheKey);

            return res.status(200).json({
                message: "Tasks retrieved successfully",
                tasks: cachedTasks
            });
        }

        console.log("[Cache] MISS:", cacheKey);

        const tasks = await Task.find({
            user: req.user.id
        });

        cache.set(cacheKey, tasks);

        res.status(200).json({
            message: "Tasks retrieved successfully",
            tasks
        });
    } catch (error) {
        next(error);
    }
});

// Create a task
app.post(
    "/tasks",
    authMiddleware,
    validationMiddleware,
    async (req, res, next) => {
        try {
            const task = await Task.create({
                ...req.body,
                user: req.user.id
            });

            // Practical 9: invalidate cached task list
            cache.del(`all_tasks_${req.user.id}`);

            console.log(
                "[API] Response sent at:",
                new Date().toISOString()
            );

            // Send response before notification
            res.status(201).json({
                message: "Task created successfully",
                task
            });

            // Practical 10: asynchronous notification
            taskEvents.emit("task-created", task);
        } catch (error) {
            next(error);
        }
    }
);

// Get one task
app.get("/tasks/:id", authMiddleware, async (req, res, next) => {
    try {
        const task = await Task.findOne({
            _id: req.params.id,
            user: req.user.id
        });

        if (!task) {
            return res.status(404).json({
                error: "Task not found"
            });
        }

        res.status(200).json({
            message: "Task retrieved successfully",
            task
        });
    } catch (error) {
        next(error);
    }
});

// Update a task
app.put(
    "/tasks/:id",
    authMiddleware,
    validationMiddleware,
    async (req, res, next) => {
        try {
            const updatedTask = await Task.findOneAndUpdate(
                {
                    _id: req.params.id,
                    user: req.user.id
                },
                { $set: req.body },
                { new: true, runValidators: true }
            );

            if (!updatedTask) {
                return res.status(404).json({
                    error: "Task not found"
                });
            }

            // Practical 9: invalidate cached data
            cache.del(`all_tasks_${req.user.id}`);

            res.status(200).json({
                message: "Task updated successfully",
                task: updatedTask
            });
        } catch (error) {
            next(error);
        }
    }
);

// Delete a task
app.delete(
    "/tasks/:id",
    authMiddleware,
    async (req, res, next) => {
        try {
            const deletedTask = await Task.findOneAndDelete({
                _id: req.params.id,
                user: req.user.id
            });

            if (!deletedTask) {
                return res.status(404).json({
                    error: "Task not found"
                });
            }

            // Practical 9: invalidate cached data
            cache.del(`all_tasks_${req.user.id}`);

            // Send response before notification
            res.status(200).json({
                message: "Task deleted successfully",
                task: deletedTask
            });

            // Practical 10: deletion notification
            taskEvents.emit("task-deleted", deletedTask);
        } catch (error) {
            next(error);
        }
    }
);

// Handle unknown routes
app.use((req, res) => {
    res.status(404).json({
        error: "Route not found"
    });
});

// Global error handler
app.use((error, req, res, next) => {
    console.error("[Server Error]", error.message);

    if (res.headersSent) {
        return next(error);
    }

    if (error.name === "ValidationError") {
        return res.status(400).json({
            error: error.message
        });
    }

    if (error.name === "CastError") {
        return res.status(400).json({
            error: "Invalid ID format"
        });
    }

    if (error.code === 11000) {
        return res.status(409).json({
            error: "Duplicate value already exists"
        });
    }

    res.status(500).json({
        error: "Internal server error"
    });
});

module.exports = app;
