'use client';

import { useState } from "react";
import requester from "../utils/requester";
import { useRouter } from "next/navigation";


const RegisterPage: React.FC = () => {
  const [param, setParam] = useState({
    username: "",
    email: "",
    password: "",
    authProvider: "local",
  });
  const router = useRouter();

  const handleRegister = async () => {
    requester.post(`/api/user/register`, param).then(response => {
    console.log(response);
    if (response.status === 201) {
      router.push("/login");
    } else {
      alert("Registration failed. Please try again.");
    }});
  };

  return (
    <div className="page-content" style={{ maxWidth: "400px", margin: "0 auto", padding: "20px" }}>
      <h1>Register</h1>
      <div style={{ marginBottom: "10px" }}>
        <input
          type="text"
          placeholder="Name"
          value={param.username}
          onChange={(e) => setParam({ ...param, username: e.target.value })}
          required
          style={{ display: "block", marginBottom: "10px", width: "100%" }}
        />
        <input
          type="email"
          placeholder="Email"
          value={param.email}
          onChange={(e) => setParam({ ...param, email: e.target.value })}
          required
          style={{ display: "block", marginBottom: "10px", width: "100%" }}
        />
        <input
          type="password"
          placeholder="Password"
          value={param.password}
          onChange={(e) => setParam({ ...param, password: e.target.value })}
          required
          style={{ display: "block", marginBottom: "20px", width: "100%" }}
        />
      </div>
      <button
        onClick={handleRegister}
        style={{
          display: "block",
          width: "100%",
          background: "#007BFF",
          color: "#fff",
          padding: "10px",
          border: "none",
          cursor: "pointer",
        }}
      >
        Register
      </button>
    </div>
  );
};

export default RegisterPage;
