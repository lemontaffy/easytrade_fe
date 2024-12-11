'use client';

import { useState } from "react";
import requester from "../utils/requester";
import { useRouter } from "next/navigation";
import axios from "axios";


const RegisterPage: React.FC = () => {

  const generateRandomNickname = () => {
    return `User${Math.random().toString(36).substring(2, 10)}`;
  };

  const [param, setParam] = useState({
    username: "",
    email: "",
    password: "",
    nickname: generateRandomNickname(),
    photo: null as File | null,
  });
  const router = useRouter();

  /* ******************************************
    methods
  /* ****************************************** */

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setParam((prev) => ({ ...prev, [name]: value }))
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setParam((prev) => ({ ...prev, photo: e.target.files[0] }));
    }
  };

  const handleRegister = async () => {
    const formData = new FormData();
  
    // Add user details as a JSON string
    formData.append(
      "user",
      JSON.stringify({
        username: param.username,
        email: param.email,
        password: param.password,
        nickname: param.nickname,
        authProvider: "local",
        roleId: 2,
      })
    );
  
    // Add photo file if available
    if (param.photo) {
      formData.append("photo", param.photo);
    }
  
    try {
      console.log("FormData contents:");
for (let pair of formData.entries()) {
  console.log(`${pair[0]}:`, pair[1]);
}
      const response = await axios.post(`/api/user/register`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
  
      if (response.status === 201) {
        console.log("User registered successfully");
        router.push("/login");
      } else {
        alert("Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      alert("An error occurred. Please try again.");
    }
  };
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-700">Register</h2>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Username</label>
          <input
            type="text"
            name="username"
            value={param.username}
            onChange={handleInputChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter your username"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={param.email}
            onChange={handleInputChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter your email"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            name="password"
            value={param.password}
            onChange={handleInputChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter your password"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Nickname</label>
          <input
            type="text"
            name="nickname"
            value={param.nickname}
            onChange={handleInputChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter a nickname or leave blank for a random one"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Profile Photo</label>
          <input
            type="file"
            accept="image/*"
            onChange={handlePhotoChange}
            className="mt-1 block w-full text-sm text-gray-500"
          />
        </div>

        <button
          onClick={handleRegister}
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500"
        >
          Register
        </button>
      </div>
    </div>
  );
}

export default RegisterPage;
