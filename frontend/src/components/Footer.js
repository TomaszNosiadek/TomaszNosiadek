import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();

  const quickLinks = [
    { path: '/', label: t('nav.home') },
    { path: '/about', label: t('nav.about') },
    { path: '/services', label: t('nav.services') },
    { path: '/projects', label: t('nav.projects') },
    { path: '/contact', label: t('nav.contact') },
  ];

  return (
    <footer data-testid="footer" className="bg-[#09090B] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-primary flex items-center justify-center">
                <span className="font-bold text-white text-xl font-['Barlow_Condensed']">ST</span>
              </div>
              <span className="font-bold text-white text-xl font-['Barlow_Condensed'] tracking-wider">
                STAL TECH INVEST
              </span>
            </div>
            <p className="text-zinc-400 leading-relaxed mb-6 max-w-md">
              {t('footer.description')}
            </p>
            <div className="flex items-center gap-2 text-zinc-500 text-sm">
              <span>Partner:</span>
              <span className="text-primary font-semibold">NIEDAX</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold uppercase tracking-wider mb-6 font-['Barlow_Condensed'] text-lg">
              {t('footer.quickLinks')}
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    data-testid={`footer-link-${link.path.replace('/', '') || 'home'}`}
                    className="text-zinc-400 hover:text-primary transition-colors text-sm uppercase tracking-wider"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-bold uppercase tracking-wider mb-6 font-['Barlow_Condensed'] text-lg">
              {t('nav.contact')}
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-primary mt-0.5 flex-shrink-0" />
                <span className="text-zinc-400 text-sm">
                  ul. Przemysłowa 15<br />
                  00-001 Warszawa, Polska
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-primary flex-shrink-0" />
                <a href="tel:+48123456789" className="text-zinc-400 hover:text-primary transition-colors text-sm">
                  +48 123 456 789
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-primary flex-shrink-0" />
                <a href="mailto:kontakt@staltechinvest.pl" className="text-zinc-400 hover:text-primary transition-colors text-sm">
                  kontakt@staltechinvest.pl
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-zinc-500 text-sm">
            © {new Date().getFullYear()} Stal Tech Invest Sp. z o.o. {t('footer.rights')}
          </p>
          <div className="flex items-center gap-6 text-zinc-500 text-xs">
            <span>NIP: 000-000-00-00</span>
            <span>REGON: 000000000</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
