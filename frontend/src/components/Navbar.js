import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Button } from './ui/button';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { language, toggleLanguage, t } = useLanguage();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { path: '/', label: t('nav.home') },
    { path: '/about', label: t('nav.about') },
    { path: '/services', label: t('nav.services') },
    { path: '/projects', label: t('nav.projects') },
    { path: '/contact', label: t('nav.contact') },
  ];

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <nav
      data-testid="navbar"
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-[#09090B]/95 backdrop-blur-md border-b border-white/5' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3" data-testid="logo-link">
            <div className="w-10 h-10 bg-primary flex items-center justify-center">
              <span className="font-bold text-white text-lg font-['Barlow_Condensed']">ST</span>
            </div>
            <div className="hidden sm:block">
              <span className="font-bold text-white text-lg font-['Barlow_Condensed'] tracking-wider">
                STAL TECH INVEST
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                data-testid={`nav-link-${link.path.replace('/', '') || 'home'}`}
                className={`text-sm font-medium tracking-wider uppercase transition-colors duration-200 ${
                  isActive(link.path)
                    ? 'text-primary'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Language Switcher & CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <button
              onClick={toggleLanguage}
              data-testid="language-switcher"
              className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-zinc-400 hover:text-white transition-colors border border-white/10 hover:border-white/20"
            >
              {language.toUpperCase()}
              <ChevronDown size={14} />
            </button>
            <Link to="/contact">
              <Button
                data-testid="nav-cta-button"
                className="bg-primary text-white hover:bg-primary/90 h-10 px-6 rounded-none font-bold uppercase tracking-wider text-sm"
              >
                {t('hero.cta')}
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-3">
            <button
              onClick={toggleLanguage}
              data-testid="mobile-language-switcher"
              className="px-2 py-1 text-sm font-medium text-zinc-400 border border-white/10"
            >
              {language.toUpperCase()}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              data-testid="mobile-menu-button"
              className="p-2 text-white"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div
          data-testid="mobile-menu"
          className="lg:hidden bg-[#09090B]/98 backdrop-blur-md border-t border-white/5"
        >
          <div className="px-6 py-6 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                data-testid={`mobile-nav-link-${link.path.replace('/', '') || 'home'}`}
                onClick={() => setIsOpen(false)}
                className={`block text-lg font-medium tracking-wider uppercase ${
                  isActive(link.path) ? 'text-primary' : 'text-zinc-400'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link to="/contact" onClick={() => setIsOpen(false)}>
              <Button
                data-testid="mobile-cta-button"
                className="w-full mt-4 bg-primary text-white hover:bg-primary/90 h-12 rounded-none font-bold uppercase tracking-wider"
              >
                {t('hero.cta')}
              </Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
