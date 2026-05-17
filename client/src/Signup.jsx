import { useState } from "react"
import axios from "axios"

function Signup() {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSignup = async () => {

        try {

            const response = await axios.post(
                "https://team-task-manager-1-a80f.onrender.com/signup",
                {
                    name,
                    email,
                    password,
                    role: "admin"
                }
            )

            alert(response.data.message)

        } catch (error) {

            console.log(error)

            alert("Signup Failed")

        }

    }

    return (

        <div>

            <div className="bg-white p-8 rounded-lg shadow-lg w-96">

                <h2 className="text-3xl font-bold text-center mb-6">
                    Signup
                </h2>

                <input
                    type="text"
                    placeholder="Enter Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border p-3 rounded w-full mb-4"
                />

                <input
                    type="email"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border p-3 rounded w-full mb-4"
                />

                <input
                    type="password"
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border p-3 rounded w-full mb-4"
                />

                <button
                    onClick={handleSignup}
                    className="bg-green-500 text-white w-full py-3 rounded"
                >
                    Signup
                </button>

            </div>

        </div>

    )

}

export default Signup