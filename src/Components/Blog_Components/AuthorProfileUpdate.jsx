import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import api from "../../config/apiClient";
import { toast } from "react-hot-toast";

const AuthorProfileUpdate = () => {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [profile, setProfile] = useState({
    name: "",
    bio: "",
    linkedin: "",
    facebook: "",
    twitter: "",
    profilePicture: null,
    currentProfilePicture: ""
  });

  const sanitizeToken = (raw) => {
    if (!raw || typeof raw !== 'string') return '';
    let t = raw.trim();
    if (t.toLowerCase().startsWith('bearer ')) t = t.slice(7);
    if (t.startsWith('"') && t.endsWith('"')) {
      try { t = JSON.parse(t); } catch {}
    }
    return t.replace(/\"/g, '');
  };

  // Fetch current profile data
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        
        // Get current user info from localStorage
        const token = localStorage.getItem("myToken");
        const authToken = sanitizeToken(token);
        if (!authToken) {
          toast.error("Please login to update profile");
          return;
        }

        // Get user ID for profile fetch
        const userIdForEdit = (() => {
          try { 
            const agentData = JSON.parse(localStorage.getItem("agentData") || "null"); 
            return agentData?._id || localStorage.getItem("mySellerId"); 
          } catch { 
            return localStorage.getItem("mySellerId"); 
          }
        })();

        if (!userIdForEdit) {
          toast.error("User ID not found. Please login again.");
          return;
        }

        // Fetch user profile data using existing endpoint
        const response = await api.get(`postPerson/users/${userIdForEdit}/profile`, {
          headers: { 
            Authorization: authToken ? `Bearer ${authToken}` : undefined 
          }
        });

        if (response.status >= 200 && response.status < 300) {
          const profileData = response.data?.data || response.data || {};
          
          setProfile({
            name: profileData.name || profileData.fullName || "",
            bio: profileData.bio || profileData.about || "",
            linkedin: profileData.linkedin || "",
            facebook: profileData.facebook || "",
            twitter: profileData.twitter || "",
            profilePicture: null,
            currentProfilePicture: profileData.avatarUrl || profileData.profilePicture || ""
          });

          // Update localStorage with fetched data
          localStorage.setItem("userData", JSON.stringify({
            name: profileData.name || profileData.fullName || "",
            bio: profileData.bio || profileData.about || "",
            linkedin: profileData.linkedin || "",
            facebook: profileData.facebook || "",
            twitter: profileData.twitter || "",
            profilePicture: profileData.avatarUrl || profileData.profilePicture || ""
          }));
        } else {
          // Fallback to localStorage if API fails
          const userData = JSON.parse(localStorage.getItem("userData") || "{}");
          
          setProfile({
            name: userData.name || "",
            bio: userData.bio || "",
            linkedin: userData.linkedin || "",
            facebook: userData.facebook || "",
            twitter: userData.twitter || "",
            profilePicture: null,
            currentProfilePicture: userData.profilePicture || ""
          });
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
        
        // Fallback to localStorage on error
        const userData = JSON.parse(localStorage.getItem("userData") || "{}");
        
        setProfile({
          name: userData.name || "",
          bio: userData.bio || "",
          linkedin: userData.linkedin || "",
          facebook: userData.facebook || "",
          twitter: userData.twitter || "",
          profilePicture: null,
          currentProfilePicture: userData.profilePicture || ""
        });
        
        toast.error("Failed to load profile from database");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast.error("Please upload an image file");
        return;
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size should be less than 5MB");
        return;
      }

      setProfile(prev => ({
        ...prev,
        profilePicture: file
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!profile.name.trim()) {
      toast.error("Name is required");
      return;
    }

    try {
      setSaving(true);
      
      // Get user ID for profile update
      const userIdForEdit = (() => {
        try { 
          const agentData = JSON.parse(localStorage.getItem("agentData") || "null"); 
          return agentData?._id || localStorage.getItem("mySellerId"); 
        } catch { 
          return localStorage.getItem("mySellerId"); 
        }
      })();

      if (!userIdForEdit) {
        toast.error("User ID not found. Please login again.");
        setSaving(false);
        return;
      }

      const token = localStorage.getItem("myToken");
      const authToken = sanitizeToken(token);
      
      // Prepare profile data for API
      const profileData = {
        name: profile.name,
        bio: profile.bio,
        linkedin: profile.linkedin,
        facebook: profile.facebook,
        twitter: profile.twitter
      };

      let response;
      
      // Handle profile picture upload separately if exists
      if (profile.profilePicture) {
        const formData = new FormData();
        formData.append('avatar', profile.profilePicture);
        formData.append('name', profile.name);
        formData.append('bio', profile.bio);
        formData.append('linkedin', profile.linkedin);
        formData.append('facebook', profile.facebook);
        formData.append('twitter', profile.twitter);

        response = await api.put(`postPerson/users/${userIdForEdit}/profile`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: authToken ? `Bearer ${authToken}` : undefined
          }
        });
      } else {
        // Update without profile picture
        response = await api.put(`postPerson/users/${userIdForEdit}/profile`, profileData, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: authToken ? `Bearer ${authToken}` : undefined
          }
        });
      }

      if (response.status >= 200 && response.status < 300) {
        const updatedData = response.data?.data || response.data || {};
        
        // Update localStorage with new data
        const userData = {
          name: profile.name,
          bio: profile.bio,
          linkedin: profile.linkedin,
          facebook: profile.facebook,
          twitter: profile.twitter,
          profilePicture: updatedData.avatarUrl || updatedData.profilePicture || profile.currentProfilePicture
        };
        
        localStorage.setItem("userData", JSON.stringify(userData));
        
        // Update current profile picture if returned
        if (updatedData.avatarUrl || updatedData.profilePicture) {
          setProfile(prev => ({
            ...prev,
            currentProfilePicture: updatedData.avatarUrl || updatedData.profilePicture
          }));
        }
        
        toast.success("Profile updated successfully!");
      }
      
    } catch (error) {
      console.error('Error updating profile:', error);
      const errorMessage = error?.response?.data?.message || 
                        error?.message || 
                        "Failed to update profile. Please try again.";
      toast.error(errorMessage);
    } finally {
      setSaving(false);
    }
  };

  const removeProfilePicture = () => {
    setProfile(prev => ({
      ...prev,
      profilePicture: null,
      currentProfilePicture: ""
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>Update Profile | 100acress.com</title>
        <meta name="description" content="Update your author profile on 100acress.com blog." />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700;800&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </Helmet>

      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center gap-4">
            <a 
              href="/seo/blogs" 
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              ← Back to Blog Management
            </a>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8" style={{ fontFamily: "'Open Sans', sans-serif" }}>
            Update Author Profile
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Profile Picture */}
            <div className="flex flex-col items-center mb-8">
              <div className="relative">
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-200 bg-gray-100">
                  {profile.currentProfilePicture ? (
                    <img 
                      src={profile.currentProfilePicture} 
                      alt="Profile" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600">
                      <span className="text-white text-3xl font-bold">
                        {profile.name?.charAt(0)?.toUpperCase() || "A"}
                      </span>
                    </div>
                  )}
                </div>
                
                {/* Remove Picture Button */}
                {profile.currentProfilePicture && (
                  <button
                    type="button"
                    onClick={removeProfilePicture}
                    className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                    title="Remove profile picture"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
              
              {/* Upload Button */}
              <div className="mt-4">
                <input
                  type="file"
                  id="profilePicture"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
                <label
                  htmlFor="profilePicture"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
                >
                  {profile.profilePicture ? "Change Photo" : "Upload Photo"}
                </label>
              </div>
              
              {profile.profilePicture && (
                <p className="text-sm text-gray-600 mt-2">
                  New: {profile.profilePicture.name}
                </p>
              )}
            </div>

            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Name *
              </label>
              <input
                type="text"
                name="name"
                value={profile.name}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Your name"
                required
              />
            </div>

            {/* Bio */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                About Me
              </label>
              <textarea
                name="bio"
                value={profile.bio}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Tell readers about yourself, your expertise, and what you write about..."
              />
            </div>

            {/* Social Links */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* LinkedIn */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  LinkedIn Profile URL
                </label>
                <input
                  type="url"
                  name="linkedin"
                  value={profile.linkedin}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="https://linkedin.com/in/yourprofile"
                />
              </div>

              {/* Facebook */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Facebook Profile URL
                </label>
                <input
                  type="url"
                  name="facebook"
                  value={profile.facebook}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="https://facebook.com/yourprofile"
                />
              </div>

              {/* Twitter/X */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  X (Twitter) Profile URL
                </label>
                <input
                  type="url"
                  name="twitter"
                  value={profile.twitter}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="https://x.com/yourusername"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={saving}
                className="px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? "Saving..." : "Update Profile"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthorProfileUpdate;
