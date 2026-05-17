import { useState } from "react"
import axios from "axios"

function Login() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleLogin = async () => {

        try {

            const response = await axios.post(
                "http://localhost:5000/api/auth/login",
                {
                    email,
                    password
                }
            )

            localStorage.setItem(
                "token",
                response.data.token
            )

            alert("Login Successful")

            window.location.reload()

        } catch (error) {

            console.log(error)

            alert("Invalid Credentials")
        }

    }

    return (

        <div>

            <div className="bg-white/95 backdrop-blur-md p-8 rounded-2xl shadow-2xl w-96">

                <h2 className="text-4xl font-bold text-center mb-6 text-gray-800">
                    Login
                </h2>

                <input
                    type="email"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border p-3 rounded w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <input
                    type="password"
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border p-3 rounded w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <button
                    onClick={handleLogin}
                    className="bg-blue-500 hover:bg-blue-600 text-white w-full py-3 rounded transition duration-300"
                >
                    Login
                </button>

            </div>

        </div>

    )

}

export default Login