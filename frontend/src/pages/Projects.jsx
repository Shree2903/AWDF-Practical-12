import { useEffect, useState } from "react";

import Spinner from "../components/Spinner";
import ErrorMessage from "../components/ErrorMessage";

import {
    getTasks,
    createTask,
    updateTask,
    deleteTask
} from "../api";


function Projects() {

    const [tasks, setTasks] = useState([]);

    const [loading, setLoading] = useState(false);
const [actionLoading, setActionLoading] = useState(false);

    const [error, setError] = useState("");

    const [title, setTitle] = useState("");

    const [description, setDescription] = useState("");

    const [editingId, setEditingId] = useState(null);


    // GET TASKS

    const loadTasks = async () => {

        try {

            setLoading(true);

            setError("");

            const data = await getTasks();

            setTasks(data.tasks);

        } catch (err) {

            setError(err.message);

        } finally {

            setLoading(false);

        }

    };


    // LOAD TASKS WHEN PAGE OPENS

    useEffect(() => {

        loadTasks();

    }, []);


    // CREATE OR UPDATE TASK

    const handleSubmit = async (event) => {

    event.preventDefault();

    console.log("SUBMIT CLICKED");

    try {

        setError("");

        const taskData = {
            title,
            description
        };

        console.log("TASK DATA:", taskData);

        if (editingId) {

            await updateTask(editingId, taskData);

            setEditingId(null);

        } else {

            await createTask(taskData);

        }

        setTitle("");
        setDescription("");

        await loadTasks();

    } catch (err) {

        setError(err.message);

    }
};


    // EDIT TASK

    const handleEdit = (task) => {

        setTitle(task.title);

        setDescription(task.description);

        setEditingId(task._id);

    };


    // DELETE TASK

    const handleDelete = async (id) => {

        const confirmed = window.confirm(
            "Are you sure you want to delete this task?"
        );

        if (!confirmed) return;


        try {

            await deleteTask(id);

            await loadTasks();

        } catch (err) {

            setError(err.message);

        }

    };


    return (

        <section
            id="projects"
            className="projects"
        >

            <h1>My Tasks</h1>


            {/* CREATE / UPDATE FORM */}

            <form onSubmit={handleSubmit}>

                <input
                    type="text"
                    placeholder="Enter task title"
                    value={title}
                    onChange={(event) =>
                        setTitle(event.target.value)
                    }
                    required
                />


                <input
                    type="text"
                    placeholder="Enter description"
                    value={description}
                    onChange={(event) =>
                        setDescription(event.target.value)
                    }
                />


                <button type="submit">

                    {editingId
                        ? "Update Task"
                        : "Add Task"}

                </button>

            </form>


            {/* LOADING */}

            {loading && <Spinner />}


            {/* ERROR */}

            {error && (
                <ErrorMessage message={error} />
            )}


            {/* TASK LIST */}

            {!loading && !error && (

                <div>

                    {tasks.length === 0 ? (

                        <p>No tasks available.</p>

                    ) : (

                        tasks.map((task) => (

                            <div
                                key={task._id}
                                className="task-card"
                            >

                                <h3>
                                    {task.title}
                                </h3>

                                <p>
                                    {task.description}
                                </p>

                                <p>
                                    Status:{" "}

                                    {task.completed
                                        ? "Completed"
                                        : "Not Completed"}
                                </p>


                                <button
                                    onClick={() =>
                                        handleEdit(task)
                                    }
                                >
                                    Edit
                                </button>


                                <button
                                    onClick={() =>
                                        handleDelete(task._id)
                                    }
                                >
                                    Delete
                                </button>

                            </div>

                        ))

                    )}

                </div>

            )}

        </section>

    );

}


export default Projects;