'use client';

import React, { useState } from "react";
import requester from "../utils/requester";
import Editor from "../components/modals/Editor";
import ThumbnailUpload from "../components/modals/Thumbnail";
import DetailItem from "../components/modals/DetailItem";

const CreateItemForm: React.FC = () => {
  const [mainItem, setMainItem] = useState({
    userId: 1,
    profileId: 1,
    thumbnailUrl: "",
    title: "",
    tags: "",
    salesStartDate: "",
    salesEndDate: "",
    qrCode: "",
    leftovers: 100,
    productBoard: "",
  });

  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const [detailItems, setDetailItems] = useState([
    {
      detailName: "",
      detailDescription: "",
      detailImageUrl: "",
      price: "",
      leftovers: "",
      maxBuyCount: "",
      preview: null, // Image preview
    },
  ]);

  const handleChange = (index: number, key: string, value: string) => {
    const updatedDetails = [...detailItems];
    updatedDetails[index][key] = value;
    setDetailItems(updatedDetails);
  };

  const handleFileChange = (index: number, file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      const updatedDetails = [...detailItems];
      updatedDetails[index].detailImageUrl = file.name;
      updatedDetails[index].preview = reader.result as string;
      setDetailItems(updatedDetails);
    };
    reader.readAsDataURL(file);
  };

  const handleAddItem = () => {
    setDetailItems([
      ...detailItems,
      { detailName: "", detailImageUrl: "", price: "", leftovers: "", maxBuyCount: "", preview: null },
    ]);
  };

  const handleRemoveItem = (index: number) => {
    const updatedDetails = [...detailItems];
    updatedDetails.splice(index, 1);
    setDetailItems(updatedDetails);
  };

  const handleSubmit = async () => {
    if (mainItem.title.trim() === "" || detailItems.some((item) => item.detailName.trim() === "")) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      const payload = {
        item: mainItem,
        detailItems,
      };

      const response = await requester!.post("/api/items", payload);
      alert("Item created successfully!");
    } catch (error) {
      console.error("Error creating item:", error);
      alert("Failed to create item.");
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Create New Item</h2>

        {/* Main Item Section */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Main Item</h3>
          <ThumbnailUpload />
          <div className="grid grid-cols-1 gap-4">
            <input
              type="text"
              placeholder="Title"
              value={mainItem.title}
              onChange={(e) => setMainItem({ ...mainItem, title: e.target.value })}
              className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 w-full"
            />
          </div>
        </div>

        {/* Detail Items Section */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Detail Items</h3>
          {detailItems.map((detail, index) => (
            <DetailItem
              key={index}
              index={index}
              detail={detail}
              onChange={handleChange}
              onFileChange={handleFileChange}
              onRemove={handleRemoveItem}
            />
          ))}
          <button
            onClick={handleAddItem}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow-sm transition"
          >
            + Add Detail Item
          </button>
        </div>

        {/* Editor Section */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Product Board</h3>
          <Editor data={mainItem.productBoard} />
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg shadow-md transition"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default CreateItemForm;
