const BASE_URL = "http://localhost:5000";


// =====================================================
// REGISTER USER
// =====================================================

export const registerUser = async (email, password) => {

    const response = await fetch(`${BASE_URL}/register`, {
        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            email,
            password
        })
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.error || "Registration failed"
        );
    }

    return data;
};


// =====================================================
// LOGIN USER
// =====================================================

export const loginUser = async (email, password) => {

    const response = await fetch(`${BASE_URL}/login`, {
        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            email,
            password
        })
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.error || "Login failed"
        );
    }

    return data;
};


// =====================================================
// GET ALL TASKS
// =====================================================

export const getTasks = async () => {

    const token = localStorage.getItem("token");

    const response = await fetch(
        `${BASE_URL}/tasks`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    const data = await response.json();

    if (response.status === 401) {

        localStorage.removeItem("token");

        window.location.href = "/login";

        return;
    }

    if (!response.ok) {
        throw new Error(
            data.error || "Failed to fetch tasks"
        );
    }

    return data;
};


// =====================================================
// CREATE TASK
// =====================================================

export const createTask = async (task) => {

    const token = localStorage.getItem("token");

    const response = await fetch(
        `${BASE_URL}/tasks`,
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },

            body: JSON.stringify(task)
        }
    );

    const data = await response.json();

    if (response.status === 401) {

        localStorage.removeItem("token");

        window.location.href = "/login";

        return;
    }

    if (!response.ok) {
        throw new Error(
            data.error || "Failed to create task"
        );
    }

    return data;
};


// =====================================================
// UPDATE TASK
// =====================================================

export const updateTask = async (id, task) => {

    const token = localStorage.getItem("token");

    const response = await fetch(
        `${BASE_URL}/tasks/${id}`,
        {
            method: "PUT",

            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },

            body: JSON.stringify(task)
        }
    );

    const data = await response.json();

    if (response.status === 401) {

        localStorage.removeItem("token");

        window.location.href = "/login";

        return;
    }

    if (!response.ok) {
        throw new Error(
            data.error || "Failed to update task"
        );
    }

    return data;
};


// =====================================================
// DELETE TASK
// =====================================================

export const deleteTask = async (id) => {

    const token = localStorage.getItem("token");

    const response = await fetch(
        `${BASE_URL}/tasks/${id}`,
        {
            method: "DELETE",

            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    const data = await response.json();

    if (response.status === 401) {

        localStorage.removeItem("token");

        window.location.href = "/login";

        return;
    }

    if (!response.ok) {
        throw new Error(
            data.error || "Failed to delete task"
        );
    }

    return data;
};

// =====================================================
// GET CURRENT USER
// =====================================================

export const getCurrentUser = async () => {

    const token = localStorage.getItem("token");

    const response = await fetch(
        `${BASE_URL}/me`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    const data = await response.json();

    if (response.status === 401) {

        localStorage.removeItem("token");

        window.location.href = "/login";

        return;
    }

    if (!response.ok) {
        throw new Error(
            data.error || "Failed to get current user"
        );
    }

    return data;
};