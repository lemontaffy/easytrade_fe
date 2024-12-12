import React, { useState } from "react";

interface DetailItemProps {
  index: number;
  detail: {
    detailName: string;
    detailImageUrl: string;
    price: string;
    leftovers: string;
    maxBuyCount: string;
    preview?: string | null;
  };
  onChange: (index: number, key: string, value: string) => void;
  onFileChange: (index: number, file: File) => void;
  onRemove: (index: number) => void;
}

const DetailItem: React.FC<DetailItemProps> = ({ index, detail, onChange, onFileChange, onRemove }) => {
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileChange(index, file);
    }
  };

  return (
    <div className="flex items-start space-x-4 mb-4 bg-gray-50 p-4 rounded-lg shadow-sm">
      {/* Image Upload Section */}
      <div className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg overflow-hidden cursor-pointer relative">
        <label htmlFor={`detail-image-${index}`} className="w-full h-full flex items-center justify-center">
          {detail.preview ? (
            <img src={detail.preview} alt={`Detail ${index} Preview`} className="object-cover w-full h-full" />
          ) : (
            <div className="flex flex-col items-center text-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
              <span className="text-xs">Image upload</span>
              <span className="text-xs text-gray-400">(0/1)</span>
            </div>
          )}
        </label>
        <input
          id={`detail-image-${index}`}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileUpload}
        />
      </div>

      {/* Input Fields */}
      <div className="flex-1 space-y-2">
        <div className="flex items-center">
          <label className="w-24 text-sm font-medium text-gray-700">Product name</label>
          <input
            type="text"
            value={detail.detailName}
            onChange={(e) => onChange(index, "detailName", e.target.value)}
            placeholder="이름을 입력해주세요"
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex items-center">
          <label className="w-24 text-sm font-medium text-gray-700">Price</label>
          <input
            type="text"
            value={detail.price}
            onChange={(e) => onChange(index, "price", e.target.value)}
            placeholder="0원"
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex items-center">
          <label className="w-24 text-sm font-medium text-gray-700">Leftovers</label>
          <input
            type="text"
            value={detail.leftovers}
            onChange={(e) => onChange(index, "leftovers", e.target.value)}
            placeholder="9,999개"
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex items-center">
          <label className="w-24 text-sm font-medium text-gray-700">Restriction</label>
          <input
            type="text"
            value={detail.maxBuyCount}
            onChange={(e) => onChange(index, "maxBuyCount", e.target.value)}
            placeholder="9,999개"
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Remove Button */}
      <button
        onClick={() => onRemove(index)}
        className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg text-sm shadow-sm"
      >
        삭제
      </button>
    </div>
  );
};

export default DetailItem;
