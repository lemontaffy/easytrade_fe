"use client";

import Link from "next/link";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center">
    <h1 className="text-4xl font-bold text-gray-800 mb-4">404 - Page Not Found</h1>
    <p className="text-lg text-gray-600 mb-8">
      Sorry, the page you’re looking for doesn’t exist.
    </p>
    <Link href="/">
      <p className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        Go Back to Home
      </p>
    </Link>
  </div>
  );
}

export default NotFound;