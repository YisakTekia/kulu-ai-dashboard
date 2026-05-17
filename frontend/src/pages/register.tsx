import React, { useState, type ChangeEvent, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";


interface FormData {
  name: string;
  email: string;
  password: string;
  role: string;
}

const Register = () => {
  
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    role: "translator", 
  });

  const navigate = useNavigate();

  
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    try {
      
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
      
      const response = await fetch(`${apiUrl}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Account created successfully! Please login.");
        navigate("/login"); 
      } else {
        toast.error(data.message || "Registration failed");
      }
    } catch (error) {
      toast.error("Network error. Is the server running?");
      console.error(error);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Create Account
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              name="name"
              required
              placeholder="Enter your full name"
              className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleChange}
              value={formData.name}
            />
          </div>

         
          <div>
            <label className="block text-sm font-medium text-gray-700">Email Address</label>
            <input
              type="email"
              name="email"
              required
              placeholder="name@example.com"
              className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleChange}
              value={formData.email}
            />
          </div>

          
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              required
              placeholder="Create a password"
              className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleChange}
              value={formData.password}
            />
          </div>

          
          <div>
            <label className="block text-sm font-medium text-gray-700">Role </label>
            <select
              name="role"
              className="w-full p-2 border border-gray-300 rounded mt-1 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleChange}
              value={formData.role}
            >
              <option value="translator">Translator </option>
              <option value="voice_artist">Voice Artist </option>
              <option value="transcriber">Transcriber </option>
              <option value="reviewer">Reviewer </option>
            </select>
            <p className="text-xs text-gray-500 mt-1">
              * Please select your correct role.
            </p>
          </div>

          
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition-colors duration-200 font-semibold"
          >
            Register
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline font-medium">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;