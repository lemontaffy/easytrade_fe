'use client';

import { useState } from "react";
import { useRouter } from 'next/navigation';
import requester from "../utils/requester";
import { AppDispatch } from "../store/store";
import { setLoading } from "../store/slices/loadingSlice";
import { useDispatch } from "react-redux";
import { loginAsync } from "../store/slices/settingsSlice";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();

  // const handleLogin = async (): Promise<void> => {
  //   dispatch(setLoading(true));
  //   requester?.post(`/api/auth/login`, { email, password }).then(response => {
  //     console.log(response);
  //     if (response.status === 200) {
  //       dispatch(setLoading(false));
  //       // Step 1: Store tokens in localStorage
  //       localStorage.setItem('accessToken', response.data.accessToken);
  //       localStorage.setItem('refreshToken', response.data.refreshToken);

  //       console.log("go to settings");
  //       router.push("/settings");
  //     } else {
  //       dispatch(setLoading(false));
  //       alert("Registration failed. Please try again.");
  //     }
  //   });
  // };

  const handleLogin = async () => {
    try {
        await dispatch(loginAsync({ email, password })).unwrap();
        console.log("Login successful");
        router.push('/settings');
    } catch (error) {
        console.error("Error during login:", error);
    }
};

  const handleGoogleLogin = (): void => {
    window.location.href = "/api/google-login";
  };

  const goToRegister = (): void => {
    router.push("/register");
  };

  return (
    <div className="page-content" style={{ maxWidth: "400px", margin: "0 auto", padding: "20px" }}>
      <h1>Login</h1>
      <div style={{ marginBottom: "10px" }}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ display: "block", marginBottom: "10px", width: "100%" }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ display: "block", marginBottom: "20px", width: "100%" }}
        />
      </div>
      <button
        onClick={handleLogin}
        style={{
          display: "block",
          width: "100%",
          background: "#007BFF",
          color: "#fff",
          padding: "10px",
          border: "none",
          cursor: "pointer",
          marginBottom: "10px",
        }}
      >
        Login
      </button>
      <button
        onClick={handleGoogleLogin}
        style={{
          display: "block",
          width: "100%",
          background: "#4285F4",
          color: "#fff",
          padding: "10px",
          border: "none",
          cursor: "pointer",
          marginBottom: "10px",
        }}
      >
        Login with Google
      </button>
      <button
        onClick={goToRegister}
        style={{
          display: "block",
          width: "100%",
          background: "#ccc",
          color: "#000",
          padding: "10px",
          border: "none",
          cursor: "pointer",
        }}
      >
        Go to Register
      </button>
    </div>
  );
};

export default LoginPage;
