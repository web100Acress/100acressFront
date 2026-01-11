import React from "react";
import { Camera, ImagePlus, CheckCircle } from "lucide-react";

const GalleryCategory = ({ 
  fileData, 
  handleFileChange, 
  handleOtherImageChange 
}) => {
  return (
    <div className="space-y-4 bg-white p-4 rounded-xl">
      <div className="text-center mb-2">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Camera className="w-5 h-5 text-gray-700" />
          <p className="text-lg font-bold text-gray-900">Let's see your property</p>
        </div>
        <p className="text-xs text-gray-600">High-quality images attract the right buyers</p>
      </div>
      
      <div className="space-y-3">
        {/* Front Image Upload */}
        <div className="bg-gray-50 p-3.5 rounded-lg border border-gray-200">
          <label htmlFor="frontImage" className="flex items-center gap-2 mb-2.5">
            <div className="p-1.5 bg-white rounded-lg border border-gray-300">
              <Camera className="w-4 h-4 text-gray-700" />
            </div>
            <span className="text-xs font-bold text-gray-800 uppercase tracking-wide">Front Image</span>
          </label>
          
          <div className="relative group">
            <input
              type="file"
              name="frontImage"
              onChange={(e) => handleFileChange(e, "frontImage")}
              accept="image/*"
              id="frontImage"
              className={`h-10 w-full rounded-lg bg-white border-1.5 px-3 outline-none transition-all duration-200 cursor-pointer text-sm font-medium
                file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-gray-900 file:text-white hover:file:bg-gray-800 ${
                fileData.frontImage
                  ? "border-gray-900 bg-white" 
                  : "border-gray-300 hover:border-gray-500 focus:border-gray-900"
              }`}
            />
            {fileData.frontImage && (
              <div className="absolute right-3 top-2.5 text-green-600">
                <CheckCircle className="w-4 h-4" />
              </div>
            )}
          </div>
          {fileData.frontImage && (
            <p className="text-xs text-gray-600 mt-1.5 ml-0.5">✓ Image selected</p>
          )}
        </div>

        {/* Additional Images Upload */}
        <div className="bg-gray-50 p-3.5 rounded-lg border border-gray-200">
          <label htmlFor="otherImage" className="flex items-center gap-2 mb-2.5">
            <div className="p-1.5 bg-white rounded-lg border border-gray-300">
              <ImagePlus className="w-4 h-4 text-gray-700" />
            </div>
            <span className="text-xs font-bold text-gray-800 uppercase tracking-wide">Additional Images</span>
            <span className="text-xs font-semibold text-gray-600 ml-auto">(3-4 recommended)</span>
          </label>
          
          <div className="relative group">
            <input
              type="file"
              multiple
              name="otherImage"
              onChange={handleOtherImageChange}
              accept="image/*"
              id="otherImage"
              className={`h-10 w-full rounded-lg bg-white border-1.5 px-3 outline-none transition-all duration-200 cursor-pointer text-sm font-medium
                file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-gray-900 file:text-white hover:file:bg-gray-800 ${
                fileData.otherImage.length > 0
                  ? "border-gray-900 bg-white" 
                  : "border-gray-300 hover:border-gray-500 focus:border-gray-900"
              }`}
            />
            {fileData.otherImage.length > 0 && (
              <div className="absolute right-3 top-2.5 text-green-600 flex items-center gap-1.5">
                <span className="text-xs font-semibold">{fileData.otherImage.length}</span>
                <CheckCircle className="w-4 h-4" />
              </div>
            )}
          </div>
          {fileData.otherImage.length > 0 && (
            <p className="text-xs text-gray-600 mt-1.5 ml-0.5">✓ {fileData.otherImage.length} image{fileData.otherImage.length !== 1 ? 's' : ''} selected</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default GalleryCategory;