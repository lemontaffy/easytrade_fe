import React, { useState } from "react";

interface DetailItemProps {
    index: number;
    detail: {
        detailName: string;
        detailImageFile: File | null,
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
        <div className="flex flex-col sm:flex-row items-start sm:space-x-4 mb-4 bg-gray-50 p-4 rounded-lg shadow-sm space-y-4 sm:space-y-0">
            {/* Image Upload Section */}
            <div className="w-full sm:w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg overflow-hidden cursor-pointer relative">
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
            <div className="flex-1 space-y-2 w-full">
                <div className="flex items-center">
                    <label className="w-24 text-sm font-medium text-gray-700">Product</label>
                    <input
                        type="text"
                        value={detail.detailName}
                        onChange={(e) => onChange(index, "detailName", e.target.value)}
                        placeholder="Enter product name"
                        className="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="flex items-center">
                    <label className="w-24 text-sm font-medium text-gray-700">Price</label>
                    <input
                        type="number"
                        value={detail.price}
                        onChange={(e) => onChange(index, "price", e.target.value)}
                        placeholder="Enter price"
                        className="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="flex items-center">
                    <label className="w-24 text-sm font-medium text-gray-700">
                        <span className="block sm:hidden">Left.</span>
                        <span className="hidden sm:block">Leftovers</span>
                    </label>
                    <input
                        type="number"
                        value={detail.leftovers}
                        onChange={(e) => onChange(index, "leftovers", e.target.value)}
                        placeholder="Enter leftovers"
                        className="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="flex items-center">
                    <label className="w-24 text-sm font-medium text-gray-700">
                        <span className="block sm:hidden">Res.</span>
                        <span className="hidden sm:block">Restriction</span>
                    </label>
                    <input
                        type="number"
                        value={detail.maxBuyCount}
                        onChange={(e) => onChange(index, "maxBuyCount", e.target.value)}
                        placeholder="Enter restriction"
                        className="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            </div>

            {/* Remove Button */}
            <div className="w-full sm:w-auto flex justify-end">
                <button
                    onClick={() => onRemove(index)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg text-sm shadow-sm w-full sm:w-auto"
                >
                    Remove
                </button>
            </div>
        </div>
    );
};

export default DetailItem;
