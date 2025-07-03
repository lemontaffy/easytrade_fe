import requester from "@/utils/requester";
import Link from "next/link";
import React, { useEffect, useState } from "react";

interface Item {
  id: number;
  thumbnailUrl: string;
  title: string;
  likes: number;
  hits: number;
}

interface RegisteredItemsProps {
    items: Item[];
 }

const RegisteredItems: React.FC<RegisteredItemsProps> = ({ items }) => {

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Registered Items</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item: Item) => (
          <Link key={item.id} href={`/items/${item.id}`}>
          <div
            key={item.id}
            className="bg-white rounded-lg shadow-md overflow-hidden border"
          >
            <img
              src={item.thumbnailUrl}
              alt={item.title}
              className="h-48 w-full object-cover"
            />
            <div className="p-4">
              <h2 className="text-lg font-bold text-gray-800">{item.title}</h2>
              <div className="mt-2 flex justify-between items-center">
                <span className="text-gray-600">Likes: {item.likes}</span>
                <span className="text-gray-600">Hits: {item.hits}</span>
              </div>
            </div>
          </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RegisteredItems;
