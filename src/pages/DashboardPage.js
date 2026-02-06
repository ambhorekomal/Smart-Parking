import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import FeedbackForm from "./FeedbackForm"; // ✅ import FeedbackForm

const DashboardPage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="font-sans scroll-smooth">
      {/* Navbar */}
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="fixed top-0 w-full bg-white/80 backdrop-blur-md shadow z-50"
      >
        <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
          <h1 className="text-xl font-bold text-blue-600">Smart Parking</h1>
          <div className="space-x-6">
            <a href="#hero" className="text-gray-700 hover:text-blue-600">Home</a>
            <a href="#reviews" className="text-gray-700 hover:text-blue-600">Reviews</a>
            <a href="#feedback" className="text-gray-700 hover:text-blue-600">Feedback</a>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Logout
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section
        id="hero"
        className="relative h-screen flex items-center justify-center text-center text-white"
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://www.ensight-technologies.com/wp-content/uploads/2023/07/Home-Parking-2-1.gif')",
          }}
        ></div>
        <div className="absolute inset-0 bg-blue-900 bg-opacity-50"></div>
        <div className="relative z-10">
          <motion.h1
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, type: "spring" }}
            className="text-4xl md:text-6xl font-extrabold"
          >
            Welcome to Smart Parking
          </motion.h1>
          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mt-4 text-lg md:text-xl"
          >
            The future of hassle-free parking.
          </motion.p>
          <motion.a
            href="#feedback"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="mt-6 inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-lg"
          >
            Book Your Parking Now
          </motion.a>
        </div>
      </section>

      {/* Reviews Section */}
      <section id="reviews" className="py-20 bg-gray-100 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-3xl font-semibold mb-10 text-blue-700"
        >
          User Reviews
        </motion.h2>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 px-6">
          {[
            { text: "Super easy to use, I booked in seconds!", name: "Ramesh" },
            { text: "Saved me so much time finding a parking spot.", name: "Priya" },
            { text: "Clean interface, smooth experience!", name: "Arjun" },
          ].map((review, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: i * 0.3 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
            >
              <p className="italic">"{review.text}"</p>
              <h3 className="mt-4 font-bold">- {review.name}</h3>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Feedback Section */}
      <section id="feedback" className="py-20 bg-white text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-3xl font-semibold mb-10 text-blue-700"
        >
          Leave Your Feedback
        </motion.h2>

        {/* ✅ Use separate FeedbackForm component */}
        <FeedbackForm />
      </section>
    </div>
  );
};

export default DashboardPage;
