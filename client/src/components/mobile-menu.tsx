import { Dialog, DialogContent } from "@/components/ui/dialog";
import { X } from "lucide-react";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="fixed inset-y-0 right-0 h-full w-[75%] max-w-sm rounded-none p-0 bg-background/95 backdrop-blur-sm">
        <div className="flex flex-col h-full p-6">
          <div className="flex justify-end mb-8">
            <button onClick={onClose} className="text-muted-foreground" aria-label="Close menu">
              <X className="h-6 w-6" />
            </button>
          </div>
          
          <nav className="flex flex-col space-y-6 text-lg">
            <a 
              href="#features" 
              className="text-white hover:text-primary transition duration-200 font-medium"
              onClick={onClose}
            >
              Features
            </a>
            <a 
              href="#testimonials" 
              className="text-white hover:text-primary transition duration-200 font-medium"
              onClick={onClose}
            >
              Testimonials
            </a>
            <a 
              href="#contact" 
              className="text-white hover:text-primary transition duration-200 font-medium"
              onClick={onClose}
            >
              Contact
            </a>
          </nav>
        </div>
      </DialogContent>
    </Dialog>
  );
}
