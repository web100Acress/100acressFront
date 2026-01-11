import React from "react";

const GalleryCategoryMobile = ({ 
  fileData, 
  handleFileChange, 
  handleOtherImageChange 
}) => {
  return (
    <div className="block md:hidden px-4 pb-6 pt-4 bg-white rounded-2xl shadow-sm space-y-5">
      
      {/* Header */}
      <div className="text-center space-y-1">
        <p className="text-[16px] font-bold text-gray-900">
          Let’s see your property
        </p>
        <p className="text-[12px] text-gray-600 leading-tight">
          High-quality photos attract serious buyers
        </p>
      </div>

      {/* Upload Section */}
      <div className="space-y-4">

        {/* Front Image */}
        <div className="space-y-2">
          <label className="text-[13px] font-semibold text-gray-800">
            Front Image
          </label>

          <div className="relative">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange(e, "frontImage")}
              className="h-12 w-full rounded-xl border border-gray-300 bg-white px-3 text-sm outline-none file:mr-3 file:rounded-lg file:border-0 file:bg-red-50 file:px-3 file:py-1.5 file:text-sm file:font-semibold file:text-red-600 hover:file:bg-red-100 focus:border-red-500 focus:ring-2 focus:ring-red-100"
            />

            {fileData.frontImage && (
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500 text-xs font-semibold">
                ✓ Uploaded
              </span>
            )}
          </div>
        </div>

        {/* Other Images */}
        <div className="space-y-2">
          <label className="text-[13px] font-semibold text-gray-800">
            Additional Images (3–4)
          </label>

          <div className="relative">
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleOtherImageChange}
              className="h-12 w-full rounded-xl border border-gray-300 bg-white px-3 text-sm outline-none file:mr-3 file:rounded-lg file:border-0 file:bg-red-50 file:px-3 file:py-1.5 file:text-sm file:font-semibold file:text-red-600 hover:file:bg-red-100 focus:border-red-500 focus:ring-2 focus:ring-red-100"
            />

            {fileData.otherImage.length > 0 && (
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500 text-xs font-semibold">
                {fileData.otherImage.length} selected
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GalleryCategoryMobile;
