import { useState } from "react"
import Login from "./Login"
import Signup from "./Signup"
import Dashboard from "./Dashboard"

function App() {

  const token = localStorage.getItem("token")
  const [isLogin, setIsLogin] = useState(true)

  return (

    <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">

      {token ? (
        <Dashboard />
      ) : (
        <div>

          {isLogin ? <Login /> : <Signup />}

          <button
            className="mt-4 text-white font-medium text-center block hover:underline"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin
              ? "Go to Signup"
              : "Go to Login"}
          </button>

        </div>
      )}

    </div>

  )

}

export default App