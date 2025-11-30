import { Button } from "../../../Components/ui/button";
import { Input } from "../../../Components/ui/Input";
import { Textarea } from "../../../Components/ui/Textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../Components/ui/Select";
import { Phone, Mail, MapPin, Send } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import api from "../../../config/apiClient";
import { cn } from "../../../lib/utils";

export const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    propertyType: "",
    budget: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name.trim() || !formData.phone.trim() || !formData.email.trim()) {
      toast.error("Please fill in all required fields.");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    // Phone validation (basic)
    if (formData.phone.length < 10) {
      toast.error("Please enter a valid phone number.");
      return;
    }

    setIsSubmitting(true);
    const loadingToast = toast.loading("Submitting your inquiry...");

    try {
      const payload = {
        name: formData.name.trim(),
        mobile: formData.phone.trim(),
        email: formData.email.trim(),
        projectName: `Dubai Property Inquiry - ${formData.propertyType || 'General'}`,
        address: `Budget: ${formData.budget || 'Not specified'} | Message: ${formData.message.trim() || 'No message'}`,
        source: "dubai_luxury_page",
      };

      const response = await api.post("/userInsert", payload);
      
      toast.dismiss(loadingToast);
      toast.success("Thank you! Our Dubai property expert will contact you shortly.", {
        duration: 5000,
      });
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        propertyType: "",
        budget: "",
        message: "",
      });
    } catch (error) {
      console.error("Contact form submission error:", error);
      toast.dismiss(loadingToast);
      toast.error(
        error?.response?.data?.message || 
        "Failed to submit. Please try again or contact us directly.",
        { duration: 5000 }
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* Blurry Video Background Effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-transparent">
        <div className="absolute inset-0 backdrop-blur-sm">
          <div className="h-full w-full bg-gradient-to-br from-gold/5 via-transparent to-gold/5 animate-pulse" />
        </div>
      </div>
      
      <div className="container relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left Side - Info */}
          <div className="space-y-8 animate-fade-in">
            <div>
              <span className="text-gold text-sm font-medium tracking-[0.3em] uppercase">
                Get in Touch
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mt-4 mb-6">
                Let's Find Your
                <span className="block text-gold">Dream Property</span>
              </h2>
              <p className="text-xl text-muted-foreground">
                Connect with our Dubai property experts for personalized assistance
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start space-x-4 group">
                <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center group-hover:bg-gold/20 transition-colors">
                  <Phone className="h-5 w-5 text-gold" />
                </div>
                <div>
                  <p className="text-white font-semibold mb-1">Phone</p>

                  <p className="text-muted-foreground">+91 8500-900-100</p>
               
                </div>
              </div>

              <div className="flex items-start space-x-4 group">
                <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center group-hover:bg-gold/20 transition-colors">
                  <Mail className="h-5 w-5 text-gold" />
                </div>
                <div>
                  <p className="text-white font-semibold mb-1">Email</p>

                  <p className="text-muted-foreground">support@100acress.com</p>

        

              </div>
              </div>

              {/* <div className="flex items-start space-x-4 group">
                <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center group-hover:bg-gold/20 transition-colors">
                  <MapPin className="h-5 w-5 text-gold" />
                </div>
                <div>
                  <p className="text-white font-semibold mb-1">Office</p>
                  <p className="text-muted-foreground">Business Bay, Dubai, UAE</p>
                </div>
              </div> */}
            </div>

           
            
            
          </div>

          {/* Right Side - Form */}
          <div className="animate-fade-in-scale">
            <form onSubmit={handleSubmit} className="glass-effect rounded-2xl border border-white/10 p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white">Full Name *</label>
                  <Input
                    required
                    placeholder="Enter Your Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="bg-black/30 border-white/10 text-white placeholder:text-muted-foreground focus:border-gold"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-white">Email *</label>
                  <Input
                    required
                    type="email"
                    placeholder="Enter Your Email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="bg-black/30 border-white/10 text-white placeholder:text-muted-foreground focus:border-gold"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-white">Phone Number *</label>
                <Input
                  required
                  type="tel"
                  placeholder="Enter Your phon Number"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="bg-black/30 border-white/10 text-white placeholder:text-muted-foreground focus:border-gold"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white">Property Type</label>
                  <Select onValueChange={(value) => setFormData({ ...formData, propertyType: value })}>
                    <SelectTrigger className="bg-black/30 border-white/10 text-white focus:border-gold">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent className="bg-card border-white/10">
                      <SelectItem value="apartment">Apartment</SelectItem>
                      <SelectItem value="villa">Villa</SelectItem>
                      <SelectItem value="penthouse">Penthouse</SelectItem>
                      <SelectItem value="townhouse">Townhouse</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-white">Budget Range (AED)</label>
                  <Select onValueChange={(value) => setFormData({ ...formData, budget: value })}>
                    <SelectTrigger className="bg-black/30 border-white/10 text-white focus:border-gold">
                      <SelectValue placeholder="Select budget" />
                    </SelectTrigger>
                    <SelectContent className="bg-card border-white/10">
                      <SelectItem value="1-5m">1M - 5M</SelectItem>
                      <SelectItem value="5-10m">5M - 10M</SelectItem>
                      <SelectItem value="10-20m">10M - 20M</SelectItem>
                      <SelectItem value="20m+">20M+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-white">Message</label>
                <Textarea
                  placeholder="Tell us about your requirements..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="bg-black/30 border-white/10 text-white placeholder:text-muted-foreground focus:border-gold min-h-[120px]"
                />
              </div>

              <Button 
                type="submit" 
                size="lg" 
                disabled={isSubmitting}
                className="w-full gradient-gold text-black hover:shadow-gold group disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
                <Send className={cn(
                  "ml-2 h-5 w-5 transition-transform",
                  !isSubmitting && "group-hover:translate-x-1"
                )} />
              </Button>

              <p className="text-xs text-center text-muted-foreground">
                By submitting this form, you agree to our terms and privacy policy
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
