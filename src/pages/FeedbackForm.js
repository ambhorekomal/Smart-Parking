import { useState } from "react";
import { motion } from "framer-motion";

function FeedbackForm() {
  const [name, setName] = useState("");
  const [carNumber, setCarNumber] = useState("");
  const [feedback, setFeedback] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !feedback) {
      alert("❌ Name and Feedback are required");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, carNumber, message: feedback }),
      });

      const data = await response.json();

      if (data.error) {
        alert(`❌ ${data.error}`);
      } else {
        alert(`✅ ${data.message}`);
        setName("");
        setCarNumber("");
        setFeedback("");
      }
    } catch (err) {
      console.error(err);
      alert("❌ Failed to submit feedback. Try again.");
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="max-w-lg mx-auto bg-gray-50 p-8 rounded-xl shadow-md space-y-6"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        placeholder="Your Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
      <input
        type="text"
        placeholder="Car Number (e.g. MH 12 AB 1234)"
        value={carNumber}
        onChange={(e) => setCarNumber(e.target.value.toUpperCase())}
        className="w-full p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <textarea
        placeholder="Your Feedback"
        rows="4"
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
        className="w-full p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      ></textarea>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        type="submit"
        className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Submit Feedback
      </motion.button>
    </motion.form>
  );
}

export default FeedbackForm;
