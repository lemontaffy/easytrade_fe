import React, { useState } from "react";

const ThumbnailUpload: React.FC = () => {
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setThumbnailPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="mb-8">
      <h3 className="text-xl font-semibold text-gray-700 mb-4">Thumbnail *</h3>
      <label
        htmlFor="thumbnail-upload"
        className="block w-full h-[20.25vw] max-h-[1080px] max-w-[1920px] border-2 border-dashed border-gray-300 rounded-lg cursor-pointer flex items-center justify-center bg-gray-100 hover:bg-gray-200 transition"
      >
        {thumbnailPreview ? (
          <img
            src={thumbnailPreview}
            alt="Thumbnail Preview"
            className="object-cover w-full h-full rounded-lg"
          />
        ) : (
          <div className="text-center">
            <div className="flex flex-col items-center text-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 text-gray-500"
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
              <p className="text-lg text-gray-600 font-medium mt-2">
                Click here to upload Image
              </p>
              <p className="text-sm text-gray-500">1920x1080px</p>
            </div>
          </div>
        )}
      </label>
      {/* Hidden input for file upload */}
      <input
        id="thumbnail-upload"
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
};

export default ThumbnailUpload;
