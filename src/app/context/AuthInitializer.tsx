'use client';

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { useEffect } from "react";
import { checkLoginAsync, logoutAsync } from "../store/slices/settingsSlice";
import { usePathname, useRouter } from "next/navigation";

const AuthInitializer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();
    const { isLoggedIn } = useSelector((state: RootState) => state.settings.auth);
    const pathname = usePathname();

    useEffect(() => {
        const initializeAuth = async () => {
            try {
                const token = localStorage.getItem("accessToken");
                const refreshToken = localStorage.getItem("refreshToken");

                if (!token || !refreshToken) {
                    console.warn("No token or refresh token found. Redirecting to login...");
                    router.push("/login");
                    return;
                }

                console.log("Initializing authentication...");
                await dispatch(checkLoginAsync()).unwrap();
            } catch (error) {
                console.error("Authentication failed:", error);
                router.push("/login");
            }
        };

        // Only run if not on the 404 page
        if (pathname !== "/404") {
            initializeAuth();
        }
    }, [dispatch, router, pathname]);

    return <>{children}</>;
};

export default AuthInitializer;
