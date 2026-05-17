import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

function Dashboard() {

    const navigate = useNavigate()
    const [tasks, setTasks] = useState([])

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [assignedTo, setAssignedTo] = useState("")
    const [search, setSearch] = useState("")

    const handleCreateTask = async () => {


        try {

            await axios.post(
                "https://team-task-manager-1-a80f.onrender.com/tasks/create",
                {
                    title,
                    description,
                    assignedTo
                }
            )

            alert("Task Created")

            window.location.reload()

        } catch (error) {

            console.log(error)

        }

    }

    const handleDelete = async (id) => {

        try {

            await axios.delete(
                `https://team-task-manager-1-a80f.onrender.com/tasks/${id}`
            )

            alert("Task Deleted")

            window.location.reload()

        } catch (error) {

            console.log(error)

        }

    }

    const handleEdit = async (task) => {

        const newTitle = prompt(
            "Enter new title",
            task.title
        )

        if (!newTitle) return

        try {

            await axios.put(
                `https://team-task-manager-1-a80f.onrender.com/tasks/${task._id}`,
                {
                    title: newTitle
                }
            )

            alert("Task Updated")

            window.location.reload()

        } catch (error) {

            console.log(error)

        }

    }

    useEffect(() => {

        const token = localStorage.getItem("token")

        if (!token) {
            alert("Please Login First")
            navigate("/")
            return
        }

        const fetchProfile = async () => {

            try {

                const token = localStorage.getItem("token")

                const response = await axios.get(
                    "https://team-task-manager-1-a80f.onrender.com/profile",
                    {
                        headers: {
                            authorization: token
                        }
                    }
                )

                console.log(response.data)

            } catch (error) {

                console.log(error)

            }

        }

        const fetchTasks = async () => {

            try {

                const response = await axios.get(
                    "https://team-task-manager-1-a80f.onrender.com/tasks"
                )

                setTasks(response.data)

            } catch (error) {

                console.log(error)

            }

        }

        fetchProfile()
        fetchTasks()

    }, [navigate])

    return (

        <div className="min-h-screen p-6 bg-gray-100 flex flex-col items-center">

            <h2 className="text-3xl font-bold mb-5">
                Team Task Manager
            </h2>

            <input
                type="text"
                placeholder="Task Title"
                className="border p-2 rounded w-80 mb-3"
                onChange={(e) => setTitle(e.target.value)}
            />

            <br /><br />

            <input
                type="text"
                placeholder="Description"
                className="border p-2 rounded w-80 mb-3"
                onChange={(e) => setDescription(e.target.value)}
            />

            <br /><br />

            <input
                type="text"
                placeholder="Assigned To"
                className="border p-2 rounded w-80 mb-3"
                onChange={(e) => setAssignedTo(e.target.value)}
            />

            <br /><br />

            <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={handleCreateTask}
            >
                Add Task
            </button>

            <h3 className="text-xl font-bold mt-6 mb-4">
                Tasks
            </h3>

            <input
                type="text"
                placeholder="Search Task..."
                className="border p-2 rounded w-80 mb-4"
                onChange={(e) => setSearch(e.target.value)}
            />

            {
                tasks
                    .filter((task) =>
                        task.title.toLowerCase()
                            .includes(search.toLowerCase())
                    )
                    .map((task) => (
                        <div
                            key={task._id}
                            className="bg-white p-6 rounded-lg shadow-lg mb-4 w-96"
                        >

                            <h4 className="text-lg font-bold">
                                {task.title}
                            </h4>

                            <p className="text-gray-600">
                                {task.description}
                            </p>

                            <p className="font-medium">
                                {task.assignedTo}
                            </p>

                            <select
                                onChange={async (e) => {

                                    await axios.put(
                                        `https://team-task-manager-1-a80f.onrender.com/tasks/${task._id}`,
                                        {
                                            status: e.target.value
                                        }
                                    )

                                    window.location.reload()

                                }}
                                defaultValue={task.status}
                            >

                                <option>Pending</option>
                                <option>In Progress</option>
                                <option>Completed</option>

                            </select>

                            <button
                                className="bg-green-500 text-white px-3 py-1 rounded mr-2"
                                onClick={() => handleEdit(task)}
                            >
                                Edit
                            </button>

                            <button
                                className="bg-red-500 text-white px-3 py-1 rounded ml-2"
                                onClick={() => handleDelete(task._id)}
                            >
                                Delete
                            </button>

                        </div>
                    ))
            }

            <button
                className="bg-black text-white px-4 py-2 rounded mt-4"
                onClick={() => {

                    localStorage.removeItem("token")

                    alert("Logged Out")

                    window.location.reload()

                }}>
                Logout
            </button>

        </div>

    )

}

export default Dashboard