'use client';

import requester from "@/utils/requester";
import React, { useEffect, useState } from "react";
import LinkSSOSection from "./LinkSSOSection";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { fetchUserProfileAsync, logoutAsync } from "@/store/slices/settingsSlice";
import { useRouter } from "next/navigation";

const SettingsPage: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const [user, setUser] = useState({
    id: 0,
    username: "",
    email: "",
    password: "",
    phoneNumber: "",
    address: "",
  });

  const [profiles, setProfiles] = useState<
    { id: number; nickname: string; photoUrl: string; active: boolean }[]
  >([]);
  
  const [activeProfileId, setActiveProfileId] = useState<number | null>(null);

  const handleLogout = async () => {
    await dispatch(logoutAsync()).unwrap();
    router.push("/");
  };

const reduxUser = useSelector((state: RootState) => state.settings.user);
const reduxProfiles = useSelector((state: RootState) => state.settings.profiles);

useEffect(() => {
  dispatch(fetchUserProfileAsync());
}, [dispatch]);

useEffect(() => {
  if (reduxUser) {
    setUser(reduxUser);
  }
  if (reduxProfiles) {
    setProfiles(reduxProfiles);
  }
}, [reduxUser, reduxProfiles]);

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="max-w-5xl w-full bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Settings</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
            <input
              type="tel"
              value={user.phoneNumber}
              onChange={(e) => setUser({ ...user, phoneNumber: e.target.value })}
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              value={user.password}
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
          <textarea
            value={user.address}
            onChange={(e) => setUser({ ...user, address: e.target.value })}
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={3}
          />
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Profiles</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {profiles.map((profile) => (
              <div
                key={profile.id}
                className={`relative p-4 border rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl ${
                  profile.active ? "border-green-500" : "border-gray-300"
                }`}
              >
                <img
                  src={profile.photoUrl}
                  alt={profile.nickname}
                  className="w-16 h-16 rounded-full mx-auto"
                />
                <p className="text-center text-gray-700 font-medium mt-2">
                  {profile.nickname}
                </p>
                {profile.active ? (
                  <span className="block mt-2 text-center text-green-500 font-semibold">
                    Active
                  </span>
                ) : (
                  <button
                    onClick={() => setActiveProfileId(profile.id)}
                    className="mt-2 w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    Set Active
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white py-2 px-6 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Logout
          </button>
        </div>

        <LinkSSOSection className="mt-8" />
      </div>
    </div>
  );
};

export default SettingsPage;
