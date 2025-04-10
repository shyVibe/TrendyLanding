import { useState } from "react";
import { Link } from "wouter";
import MobileMenu from "@/components/mobile-menu";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  return (
    <header className="pt-6 px-4 md:px-0">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Link href="/">
            <span className="text-white font-bold text-2xl cursor-pointer">
              Growth<span className="text-primary">Hub</span>
            </span>
          </Link>
        </div>
        
        <nav className="hidden md:flex space-x-8">
          <a href="#features" className="text-white hover:text-primary transition duration-200">
            Features
          </a>
          <a href="#testimonials" className="text-white hover:text-primary transition duration-200">
            Testimonials
          </a>
          <a href="#contact" className="text-white hover:text-primary transition duration-200">
            Contact
          </a>
        </nav>
        
        <button 
          className="block md:hidden text-white"
          onClick={() => setIsMobileMenuOpen(true)}
          aria-label="Open menu"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
      
      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
    </header>
  );
}
