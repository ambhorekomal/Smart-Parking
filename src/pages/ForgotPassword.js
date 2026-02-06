import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Password validation: min 6 chars, 1 uppercase, 1 number
    if (newPassword.length < 6 || !/[A-Z]/.test(newPassword) || !/[0-9]/.test(newPassword)) {
      alert("❌ Password must be at least 6 characters, include 1 uppercase and 1 number");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, newPassword }),
      });

      const data = await response.json();

      if (data.error) {
        alert(`❌ ${data.error}`);
      } else {
        alert(`✅ ${data.message}`);
        navigate("/"); // go back to login
      }
    } catch (error) {
      console.error(error);
      alert("❌ Failed to reset password. Try again later.");
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
            if (window.confirm("Are you sure you want to cancel?")) {
              navigate("/");
            }
          }}
          className="absolute top-4 right-4 text-red-500 font-bold"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold text-center mb-6 text-blue-600">Forgot Password</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
