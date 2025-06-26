import React, { useState, useRef } from 'react';
import { QrCode, Download, Copy, Home, MapPin, Phone, Mail, Globe, Building } from 'lucide-react';
import { Button } from '../../Components/ui/button';
import { Input } from '../../Components/ui/Input';
import { Label } from '../../Components/ui/Label';
import { Card, CardContent, CardHeader, CardTitle } from '../../Components/ui/Card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../Components/ui/Select';
import {
  Textarea
} from '../../Components/ui/Textarea';
import { useToast } from '../../hooks/use-toast';

const QRGenerator = () => {
  const [qrData, setQrData] = useState('https://www.100acress.com/');
  const [qrType, setQrType] = useState('url');
  const [qrSize, setQrSize] = useState(256);
  const [qrColor, setQrColor] = useState('#1a365d');
  const [bgColor, setBgColor] = useState('#ffffff');
  const [propertyDetails, setPropertyDetails] = useState({
    title: '',
    location: '',
    price: '',
    contact: '',
    description: ''
  });
  const qrRef = useRef(null);
  const { toast } = useToast();

  const generateQRURL = () => {
    let data = qrData;

    if (qrType === 'property') {
      data = `Property: ${propertyDetails.title}\nLocation: ${propertyDetails.location}\nPrice: ${propertyDetails.price}\nContact: ${propertyDetails.contact}\nDescription: ${propertyDetails.description}\nWebsite: https://www.100acress.com/`;
    }

    const params = new URLSearchParams({
      data: data,
      size: `${qrSize}x${qrSize}`,
      format: 'png',
      color: qrColor.replace('#', ''),
      bgcolor: bgColor.replace('#', ''),
      qzone: '1',
      margin: '10'
    });

    return `https://api.qrserver.com/v1/create-qr-code/?${params.toString()}`;
  };

  const downloadQR = () => {
    const link = document.createElement('a');
    link.href = generateQRURL();
    link.download = `100acress-qr-${Date.now()}.png`;
    link.click();

    toast({
      title: "QR Code Downloaded!",
      description: "Your QR code has been saved successfully.",
    });
  };

  const copyQRLink = () => {
    navigator.clipboard.writeText(generateQRURL());
    toast({
      title: "Link Copied!",
      description: "QR code image link copied to clipboard.",
    });
  };

  const qrTypes = [
    { value: 'url', label: 'Website URL', icon: Globe },
    { value: 'property', label: 'Property Details', icon: Building },
    { value: 'contact', label: 'Contact Info', icon: Phone },
    { value: 'custom', label: 'Custom Text', icon: QrCode }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 mt-10">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-blue-600 rounded-xl">
              <QrCode className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              100Acress QR Generator
            </h1>
          </div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Generate dynamic QR codes for your properties, contact information, and website links.
            Perfect for marketing materials, business cards, and property listings.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Controls Panel */}
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-xl">
                <Building className="w-5 h-5 text-blue-600" />
                QR Code Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* QR Type Selection */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">QR Code Type</Label>
                <Select value={qrType} onValueChange={setQrType}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {qrTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        <div className="flex items-center gap-2 px-3 py-2 text-sm text-gray-800 bg-white hover:bg-gray-100 cursor-pointer rounded-md">
                          <type.icon className="w-4 h-4 text-gray-500" />
                          <span>{type.label}</span>
                        </div>

                        {/* chnages aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa */}

                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Content Based on Type */}
              {qrType === 'url' && (
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Website URL</Label>
                  <Input
                    type="url"
                    value={qrData}
                    onChange={(e) => setQrData(e.target.value)}
                    placeholder="https://www.100acress.com/"
                    className="w-full"
                  />
                </div>
              )}

              {qrType === 'property' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Property Title</Label>
                      <Input
                        value={propertyDetails.title}
                        onChange={(e) => setPropertyDetails({ ...propertyDetails, title: e.target.value })}
                        placeholder="3BHK Luxury Villa"
                      />
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Location</Label>
                      <Input
                        value={propertyDetails.location}
                        onChange={(e) => setPropertyDetails({ ...propertyDetails, location: e.target.value })}
                        placeholder="Gurgaon, Haryana"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Price</Label>
                      <Input
                        value={propertyDetails.price}
                        onChange={(e) => setPropertyDetails({ ...propertyDetails, price: e.target.value })}
                        placeholder="₹2.5 Crores"
                      />
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Contact</Label>
                      <Input
                        value={propertyDetails.contact}
                        onChange={(e) => setPropertyDetails({ ...propertyDetails, contact: e.target.value })}
                        placeholder="+91 9876543210"
                      />
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Description</Label>
                    <Textarea
                      value={propertyDetails.description}
                      onChange={(e) => setPropertyDetails({ ...propertyDetails, description: e.target.value })}
                      placeholder="Beautiful property with modern amenities..."
                      rows={3}
                    />
                  </div>
                </div>
              )}

              {qrType === 'contact' && (
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Contact Information</Label>
                  <Textarea
                    value={qrData}
                    onChange={(e) => setQrData(e.target.value)}
                    placeholder="100Acress Real Estate&#10;Phone: +91 9876543210&#10;Email: info@100acress.com&#10;Website: https://www.100acress.com/"
                    rows={4}
                  />
                </div>
              )}

              {qrType === 'custom' && (
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Custom Text</Label>
                  <Textarea
                    value={qrData}
                    onChange={(e) => setQrData(e.target.value)}
                    placeholder="Enter your custom text here..."
                    rows={4}
                  />
                </div>
              )}

              {/* Customization Options */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">QR Size</Label>
                  <Select value={qrSize.toString()} onValueChange={(value) => setQrSize(parseInt(value))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="128">128x128</SelectItem>
                      <SelectItem value="256">256x256</SelectItem>
                      <SelectItem value="512">512x512</SelectItem>
                      <SelectItem value="1024">1024x1024</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-sm font-medium">QR Color</Label>
                  <div className="flex gap-2">
                    <Input
                      type="color"
                      value={qrColor}
                      onChange={(e) => setQrColor(e.target.value)}
                      className="w-16 h-10 p-1 border rounded"
                    />
                    <Input
                      type="text"
                      value={qrColor}
                      onChange={(e) => setQrColor(e.target.value)}
                      className="flex-1"
                    />
                  </div>
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium">Background Color</Label>
                <div className="flex gap-2">
                  <Input
                    type="color"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    className="w-16 h-10 p-1 border rounded"
                  />
                  <Input
                    type="text"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    className="flex-1"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* QR Preview and Actions */}
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-xl">
                <QrCode className="w-5 h-5 text-green-600" />
                QR Code Preview
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* QR Code Display */}
              <div className="flex justify-center">
                <div
                  ref={qrRef}
                  className="p-6 bg-white rounded-2xl shadow-lg border-2 border-gray-100"
                  style={{ backgroundColor: bgColor }}
                >
                  <img
                    src={generateQRURL()}
                    alt="Generated QR Code"
                    className="max-w-full h-auto"
                    style={{ width: qrSize, height: qrSize }}
                  />
                </div>
              </div>

              {/* Brand Badge */}
              <div className="text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-full text-sm font-medium">
                  <Home className="w-4 h-4" />
                  100Acress.com
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-4">
                <Button
                  onClick={downloadQR}
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
                <Button
                  onClick={copyQRLink}
                  variant="outline"
                  className="border-green-200 text-green-700 hover:bg-green-50"
                >
                  <Copy className="w-4 h-4 mr-2" />
                  Copy Link
                </Button>
              </div>

              {/* Usage Tips */}
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                <h4 className="font-medium text-blue-900 mb-2">Usage Tips:</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Use high contrast colors for better scanning</li>
                  <li>• Test QR codes before printing</li>
                  <li>• Larger sizes work better for print materials</li>
                  <li>• Include your brand logo for recognition</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Features Section */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          {[
            {
              icon: MapPin,
              title: "Property QR Codes",
              description: "Generate QR codes for property listings with all details included"
            },
            {
              icon: Phone,
              title: "Contact Information",
              description: "Create QR codes with your contact details for easy sharing"
            },
            {
              icon: Globe,
              title: "Website Links",
              description: "Direct visitors to your website or specific property pages"
            }
          ].map((feature, index) => (
            <Card key={index} className="text-center p-6 bg-white/60 backdrop-blur-sm border-0 shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QRGenerator;