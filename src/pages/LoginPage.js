import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.error) {
        alert(data.error);
      } else {
        alert(data.message);
        localStorage.setItem("user", JSON.stringify(data));
        navigate("/dashboard");
      }
    } catch (error) {
      console.error(error);
      alert("Login failed. Please try again later.");
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-blue-200 bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://cdn.dribbble.com/userupload/23687646/file/original-9db38d247100a2f548cca96d38e7e9fe.gif')",
      }}
    >
      <div className="bg-white p-8 rounded-2xl shadow-lg w-96 relative">
        {/* Cancel Button */}
        <button
          onClick={() => {
            if (window.confirm("Are you sure you want to cancel login?")) {
              navigate("/");
            }
          }}
          className="absolute top-4 right-4 text-red-500 font-bold"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">Login</h2>

        <form onSubmit={handleLogin}>
          {/* Email */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Email</label>
            <input
              type="email"
              className="w-full px-3 py-2 border rounded-lg"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Password</label>
            <input
              type="password"
              className="w-full px-3 py-2 border rounded-lg"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
          >
            Login
          </button>
        </form>

        {/* Links */}
        <p className="text-sm text-center mt-4">
          Don’t have an account?{" "}
          <Link to="/register" className="text-blue-600 hover:underline">
            Register here
          </Link>
        </p>

        <p className="text-sm text-center mt-2">
          Forgot password?{" "}
          <Link to="/forgot-password" className="text-blue-600 hover:underline">
            Click here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
