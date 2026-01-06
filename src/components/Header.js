import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Icons } from './Icons';
import { siteConfig, navigationLinks } from '../data/config';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md' : 'bg-white'
      }`}
    >
      {/* Top Bar */}
      <div className="bg-primary-900 text-white py-2 hidden md:block">
        <div className="container flex justify-between items-center text-sm">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2">
              <Icons.clock className="w-4 h-4" />
              24/7 Emergency Service Available
            </span>
          </div>
          <span className="text-primary-200">Licensed & Insured Professionals</span>
        </div>
      </div>

      {/* Main Header */}
      <div className="container">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-primary-600 flex items-center justify-center">
              <Icons.garage className="w-6 h-6 text-white" />
            </div>
            <div className="hidden sm:block">
              <span className="font-bold text-lg text-slate-900 block leading-tight">
                Houston Garage Door
              </span>
              <span className="text-xs text-slate-500">Repair Pros</span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {navigationLinks.map((link) => (
              <Link 
                key={link.href} 
                href={link.href}
                className="text-slate-600 hover:text-primary-600 font-medium transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link 
              href="/contact/"
              className="btn-accent hidden sm:inline-flex"
            >
              Get Free Quote
            </Link>
            
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 text-slate-600"
            >
              {isOpen ? (
                <Icons.x className="w-6 h-6" />
              ) : (
                <Icons.menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden pb-4 border-t">
            <nav className="flex flex-col gap-1 pt-4">
              {navigationLinks.map((link) => (
                <Link 
                  key={link.href} 
                  href={link.href}
                  className="px-4 py-3 text-slate-600 hover:text-primary-600 hover:bg-slate-50 rounded-lg transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <Link 
                  href="/contact/"
                  className="btn-accent mt-2 justify-center"
                  onClick={() => setIsOpen(false)}
                >
                  Get Free Quote
                </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
