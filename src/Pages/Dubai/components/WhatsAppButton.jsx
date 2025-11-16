import { MessageCircle } from "lucide-react";
import { Button } from "../../../Components/ui/button";

export const WhatsAppButton = () => {
  const handleWhatsAppClick = () => {
    window.open("https://wa.me/971XXXXXXXX", "_blank");
  };

  return (
    <Button
      onClick={handleWhatsAppClick}
      size="lg"
      className="fixed bottom-8 right-8 z-50 rounded-full w-16 h-16 p-0 gradient-gold text-black shadow-gold hover:shadow-luxury group animate-float md:block hidden"
      aria-label="Contact via WhatsApp"
    >
      <MessageCircle className="h-7 w-7 group-hover:scale-110 transition-transform" />
      
      {/* Pulse Effect */}
      <span className="absolute inset-0 rounded-full bg-gold animate-ping opacity-20" />
    </Button>
  );
};
