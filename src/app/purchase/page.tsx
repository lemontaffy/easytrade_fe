'use client';

import React, { useState } from "react";
import requester from "../utils/requester";
import Editor from "../components/modals/Editor";
import ThumbnailUpload from "../components/modals/Thumbnail";
import DetailItem from "../components/modals/DetailItem";
import PeriodPicker from "../components/modals/DatePeriodPicker";
import { DEFARULTTODATE, formatDate, parseDate, TODATEWEEK } from "../utils/constants";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

const CreateItemForm: React.FC = () => {
  const { userId, activeProfileId } = useSelector((state: RootState) => state.settings.auth);

  const [mainItem, setMainItem] = useState({
    userId: userId,
    profileId: activeProfileId,
    thumbnailFile: null as File | null,
    title: "",
    tags: "",
    salesStartDate: DEFARULTTODATE,
    salesEndDate: TODATEWEEK,
    qrCode: "",
    productBoard: "",
  });

  const [detailItems, setDetailItems] = useState([
    {
      detailName: "",
      detailImageFile: null as File | null,
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
    const updatedDetails = [...detailItems];
    updatedDetails[index].detailImageFile = file;

    // Generate preview
    const reader = new FileReader();
    reader.onload = () => {
      updatedDetails[index].preview = reader.result as string;
      setDetailItems(updatedDetails);
    };
    reader.readAsDataURL(file);
  };

  const handleAddItem = () => {
    setDetailItems([
      ...detailItems,
      { detailName: "", detailImageFile: null, price: "", leftovers: "", maxBuyCount: "", preview: null },
    ]);
  };

  const handleRemoveItem = (index: number) => {
    const updatedDetails = [...detailItems];
    updatedDetails.splice(index, 1);
    setDetailItems(updatedDetails);
  };

  const handleMainFileChange = (file: File) => {
    setMainItem({ ...mainItem, thumbnailFile: file });
  };

  const handleSubmit = async () => {
    if (mainItem.title.trim() === "" || detailItems.some((item) => item.detailName.trim() === "")) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      const formData = new FormData();

      // Append main item details
      const mainItemData = { ...mainItem };
      delete mainItemData.thumbnailFile; // Remove file reference from JSON
      formData.append("item", JSON.stringify(mainItemData));

      if (mainItem.thumbnailFile) {
        formData.append("thumbnail", mainItem.thumbnailFile);
      }

      // Check if detail items exist
      if (detailItems.length === 0) {
        throw new Error("Detail items are required.");
      }

      // Append detail items
      detailItems.forEach((detail, index) => {
        const detailData = { ...detail };
        delete detailData.detailImageFile; // Remove file reference from JSON
        formData.append(`detailItems`, JSON.stringify(detailData));

        if (detail.detailImageFile) {
          formData.append(`detailItemThumbnails`, detail.detailImageFile);
        }
      });

      // Log the FormData
      console.log("FormData Content:");
      for (let [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
      }

      // Send the request
      const response = await requester!.filePost("/api/items", formData);

      alert("Item created successfully!");
    } catch (error) {
      console.error("Error creating item:", error);
      alert("Failed to create item.");
    }
  };


  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Create New Item</h2>

        {/* Main Item Section */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Main Item</h3>
          <ThumbnailUpload onFileChange={handleMainFileChange} />
          <input
            type="text"
            placeholder="Title"
            value={mainItem.title}
            onChange={(e) => setMainItem({ ...mainItem, title: e.target.value })}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 w-full mt-4"
          />
        </div>

        {/* Period Picker Section */}
        <div className="w-full mb-8">
          <PeriodPicker
            startDate={parseDate(mainItem.salesStartDate)}
            endDate={parseDate(mainItem.salesEndDate)}
            onStartChange={(date) => setMainItem({ ...mainItem, salesStartDate: formatDate(date) })}
            onEndChange={(date) => setMainItem({ ...mainItem, salesEndDate: formatDate(date) })}
          />
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
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg shadow-sm transition w-full sm:w-auto"
          >
            + Add Detail Item
          </button>
        </div>

        {/* Editor Section */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Product Board</h3>
          <div className="overflow-hidden rounded-lg border border-gray-300">
            <Editor data={mainItem.productBoard} />
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center mt-8">
          <button
            onClick={handleSubmit}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-lg shadow-md transition w-full sm:w-auto"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateItemForm;
