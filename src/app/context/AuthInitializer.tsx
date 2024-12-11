'use client';

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { useEffect } from "react";
import { checkLoginAsync, logoutAsync } from "../store/slices/settingsSlice";
import { usePathname, useRouter } from "next/navigation";

const AuthInitializer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();
    const { isLoggedIn, profilePhoto } = useSelector((state: RootState) => state.settings.auth);
    const pathname = usePathname();

    useEffect(() => {
        const initializeAuth = async () => {
            console.log(isLoggedIn, profilePhoto);
            const token = localStorage.getItem("accessToken");
            if (token) {
                console.log("Initializing authentication...");
                await dispatch(checkLoginAsync()).unwrap();
            } else {
                throw new Error("No token found");
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
