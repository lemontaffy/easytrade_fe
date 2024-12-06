'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';
import requester from '../utils/requester';

const SettingsPage: React.FC = () => {
  const router = useRouter();

  const validateToken = (token: string): boolean => {
    try {
      const decoded: { exp: number } = jwtDecode(token);
      const currentTime = Date.now() / 1000; // Current time in seconds
      return decoded.exp > currentTime; // Check if token is still valid
    } catch (error) {
      console.error("Token validation error:", error);
      return false;
    }
  };

  useEffect(() => {
    const checkAuth = async (): Promise<void> => {
      const accessToken = localStorage.getItem('accessToken');

      if (!accessToken || !validateToken(accessToken)) {
        console.warn("Access token is invalid or expired. Redirecting to /login...");
        router.replace('/login');
        return;
      }

      try {
        // Optionally validate the token with the backend
        await requester!.get('/api/auth/protected');
        console.log("User is authenticated");
      } catch (error) {
        console.error("Authentication failed:", error);
        router.replace('/login');
      }
    };

    checkAuth();
  }, [router]);

  return <h1>Settings Page</h1>;
};

export default SettingsPage;
