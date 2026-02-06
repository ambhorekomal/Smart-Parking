import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [carNumber, setCarNumber] = useState(""); // NEW state for car number
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    // Input Validations
    if (!/^[a-zA-Z ]{2,50}$/.test(name)) {
      alert("❌ Name should be 2-50 letters");
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      alert("❌ Invalid email format");
      return;
    }
    if (password.length < 6 || !/[A-Z]/.test(password) || !/[0-9]/.test(password)) {
      alert("❌ Password must be at least 6 characters, include 1 uppercase and 1 number");
      return;
    }

    // Validate Indian car plate format
    const carNumberRegex = /^[A-Z]{2}\d{2}[A-Z]{2}\d{4}$/;
    if (!carNumberRegex.test(carNumber)) {
      alert("❌ Invalid Car Number. Use format like MH12AB1234");
      return;
    }

    // Send registration data to backend
    try {
      const response = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, carNumber }),
      });
      const data = await response.json();
      if (data.error) {
        alert(`❌ ${data.error}`);
      } else {
        alert(`✅ ${data.message}`);
        navigate("/"); // go to login page
      }
    } catch (error) {
      console.error(error);
      alert("❌ Registration failed. Try again later.");
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
      <div className="bg-white shadow-lg rounded-2xl p-8 w-96 relative">
        {/* Cancel Button */}
        <button
          onClick={() => {
            if (window.confirm("Are you sure you want to cancel registration?")) {
              navigate("/");
            }
          }}
          className="absolute top-4 right-4 text-red-500 font-bold"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
          Register
        </h2>
        <form onSubmit={handleRegister} className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="text"
            placeholder="Car Number (e.g. MH12AB1234)"
            value={carNumber}
            onChange={(e) => setCarNumber(e.target.value.toUpperCase())}
            className="w-full p-2 border rounded"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Register
          </button>
        </form>
        <p className="mt-4 text-center">
          Already have an account?{" "}
          <Link to="/" className="text-blue-500 font-semibold">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
