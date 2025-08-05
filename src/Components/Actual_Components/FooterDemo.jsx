import React from "react";
import LuxuryFooter from "./LuxuryFooter";
import Footer from "./Footer";

const FooterDemo = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-6 py-4">
          <h1 className="text-3xl font-bold text-gray-800">100acress Footer Demo</h1>
          <p className="text-gray-600 mt-2">
            Showcasing the new luxury photorealistic footer design
          </p>
        </div>
      </div>

      {/* Content Area */}
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Original Footer */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Original Footer
            </h2>
            <p className="text-gray-600 mb-4">
              The current footer design with the Indian flag gradient background.
            </p>
            <div className="border rounded-lg overflow-hidden">
              <Footer />
            </div>
          </div>

          {/* Luxury Footer */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Luxury Footer
            </h2>
            <p className="text-gray-600 mb-4">
              New photorealistic footer with aerial cityscape, animated elements, and luxury styling.
            </p>
            <div className="border rounded-lg overflow-hidden">
              <LuxuryFooter />
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-12 bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Luxury Footer Features
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-orange-800 mb-3">
                🎨 Photorealistic Design
              </h3>
              <p className="text-gray-700">
                Aerial perspective with winding asphalt road, 3D cityscape with skyscrapers, 
                luxury villas, and modern architecture.
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-blue-800 mb-3">
                ✨ Animated Elements
              </h3>
              <p className="text-gray-700">
                Floating clouds, flying birds, swaying trees, glowing building windows, 
                and flickering street lights for dynamic visual appeal.
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-green-800 mb-3">
                🌅 Sunset Atmosphere
              </h3>
              <p className="text-gray-700">
                Warm gradient sky transitioning from orange to lavender and blue, 
                creating a premium, aspirational atmosphere.
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-purple-800 mb-3">
                🏗️ 3D Architecture
              </h3>
              <p className="text-gray-700">
                Glass skyscrapers, luxury villas with rooftop gardens, 
                and boutique commercial buildings with realistic lighting effects.
              </p>
            </div>

            <div className="bg-gradient-to-br from-red-50 to-red-100 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-red-800 mb-3">
                🌸 Landscaping Details
              </h3>
              <p className="text-gray-700">
                Manicured flower beds, decorative street lamps, 
                and lush greenery lining the road edges.
              </p>
            </div>

            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-yellow-800 mb-3">
                💎 Luxury Styling
              </h3>
              <p className="text-gray-700">
                Sophisticated color palette, glass effects, backdrop blur, 
                and premium hover animations for a high-end feel.
              </p>
            </div>
          </div>
        </div>

        {/* Integration Instructions */}
        <div className="mt-12 bg-gray-50 rounded-lg p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Integration Instructions
          </h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                1. Replace the Footer Component
              </h3>
              <p className="text-gray-700 mb-4">
                To use the new luxury footer, replace the import of the original Footer component 
                with the LuxuryFooter component in your main layout or pages.
              </p>
              <div className="bg-gray-800 text-green-400 p-4 rounded-lg font-mono text-sm">
                <code>
                  // Replace this:<br/>
                  import Footer from "./Components/Actual_Components/Footer";<br/><br/>
                  // With this:<br/>
                  import LuxuryFooter from "./Components/Actual_Components/LuxuryFooter";
                </code>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                2. Update Component Usage
              </h3>
              <p className="text-gray-700 mb-4">
                Replace all instances of &lt;Footer /&gt; with &lt;LuxuryFooter /&gt; in your JSX.
              </p>
              <div className="bg-gray-800 text-green-400 p-4 rounded-lg font-mono text-sm">
                <code>
                  // Replace this:<br/>
                  &lt;Footer /&gt;<br/><br/>
                  // With this:<br/>
                  &lt;LuxuryFooter /&gt;
                </code>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                3. CSS Dependencies
              </h3>
              <p className="text-gray-700 mb-4">
                The luxury footer includes its own CSS file with enhanced animations and styling. 
                Make sure the CSS file is properly imported in the component.
              </p>
              <div className="bg-gray-800 text-green-400 p-4 rounded-lg font-mono text-sm">
                <code>
                  // The CSS import is already included in LuxuryFooter.jsx:<br/>
                  import "../../styles/LuxuryFooter.css";
                </code>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                4. Performance Considerations
              </h3>
              <p className="text-gray-700 mb-4">
                The luxury footer includes multiple animated elements. For better performance on 
                mobile devices, consider adding responsive design adjustments or reduced motion 
                preferences for users who prefer less animation.
              </p>
            </div>
          </div>
        </div>

        {/* Color Palette */}
        <div className="mt-12 bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Color Palette & Design System
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg mx-auto mb-2"></div>
              <p className="text-sm font-medium text-gray-800">Warm Orange</p>
              <p className="text-xs text-gray-600">#FF6B35 to #FF8E53</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg mx-auto mb-2"></div>
              <p className="text-sm font-medium text-gray-800">Sky Blue</p>
              <p className="text-xs text-gray-600">#87CEEB to #4682B4</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-lg mx-auto mb-2"></div>
              <p className="text-sm font-medium text-gray-800">Deep Green</p>
              <p className="text-xs text-gray-600">#B8E6B8 to #2E4A6B</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-gray-400 to-gray-600 rounded-lg mx-auto mb-2"></div>
              <p className="text-sm font-medium text-gray-800">Neutral Gray</p>
              <p className="text-xs text-gray-600">#E8B4B8 to #1a1a2e</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterDemo; 