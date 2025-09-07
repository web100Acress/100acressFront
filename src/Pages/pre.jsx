import { Button } from "../Components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../Components/ui/Card";
import { QrCode, Building, MapPin, Phone, Globe, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg">
                <Building className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                100Acress
              </span>
            </div>
            <nav className="flex items-center gap-6">
              <Link to="/qr-generator">
                <Button className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white">
                  <QrCode className="w-4 h-4 mr-2" />
                  QR Generator
                </Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              Real Estate
            </span>
            <br />
            <span className="text-gray-800">Made Simple</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Find your dream property with India's most trusted real estate platform. 
            From luxury villas to affordable homes, we have it all.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white px-8 py-4 text-lg">
              <Building className="w-5 h-5 mr-2" />
              Explore Properties
            </Button>
            <Link to="/qr-generator">
              <Button size="lg" variant="outline" className="border-blue-200 text-blue-700 hover:bg-blue-50 px-8 py-4 text-lg">
                <QrCode className="w-5 h-5 mr-2" />
                Generate QR Codes
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Why Choose 100Acress?</h2>
            <p className="text-xl text-gray-600">Comprehensive real estate solutions for all your needs</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[Building, MapPin, QrCode, Phone].map((Icon, index) => {
              const features = [
                {
                  title: "Verified Properties",
                  description: "All properties are verified and authenticated by our expert team"
                },
                {
                  title: "Prime Locations",
                  description: "Properties in the most sought-after locations across India"
                },
                {
                  title: "QR Code Marketing",
                  description: "Generate QR codes for easy property sharing and marketing"
                },
                {
                  title: "24/7 Support",
                  description: "Round-the-clock customer support for all your queries"
                }
              ];
              return (
                <Card key={index} className="text-center p-6 bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <CardHeader className="pb-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-xl">{features[index].title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{features[index].description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-green-600">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl font-bold mb-4">Need QR Codes for Your Properties?</h2>
          <p className="text-xl mb-8 opacity-90">
            Generate professional QR codes for property listings, contact information, and website links. 
            Perfect for marketing materials, business cards, and property brochures.
          </p>
          <Link to="/qr-generator">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold">
              Generate QR Code Now
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg">
                  <Building className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold">100Acress</span>
              </div>
              <p className="text-gray-400">
                India's trusted real estate platform for buying, selling, and renting properties.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Properties</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Agents</a></li>
                <li><Link to="/qr-generator" className="hover:text-white transition-colors">QR Generator</Link></li>
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Services</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Buy Property</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Rent Property</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Sell Property</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Property Valuation</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Contact</h3>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  +91 9876543210
                </li>
                <li className="flex items-center gap-2">
                  <Globe className="w-4 h-4" />
                  www.100acress.com
                </li>
                <li className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  India
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 100Acress. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
