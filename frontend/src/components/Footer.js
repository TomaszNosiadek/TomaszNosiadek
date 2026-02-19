import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Linkedin } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

// WhatsApp icon component
const WhatsAppIcon = ({ size = 20, className = "" }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="currentColor"
    className={className}
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const LOGO_URL = "https://customer-assets.emergentagent.com/job_industrial-cable-sys/artifacts/4vzj1ejd_logostal.png";

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
              <img 
                src={LOGO_URL} 
                alt="Stal Tech Invest Logo" 
                className="h-14 w-auto object-contain"
              />
            </div>
            <p className="text-zinc-400 leading-relaxed mb-6 max-w-md">
              {t('footer.description')}
            </p>
            <div className="flex items-center gap-4 mb-4">
              <a
                href="https://www.linkedin.com/company/stal-tech-invest"
                target="_blank"
                rel="noopener noreferrer"
                data-testid="footer-linkedin"
                className="w-10 h-10 bg-[#18181B] border border-white/10 flex items-center justify-center text-zinc-400 hover:text-primary hover:border-primary/50 transition-all"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="https://wa.me/48123456789"
                target="_blank"
                rel="noopener noreferrer"
                data-testid="footer-whatsapp"
                className="w-10 h-10 bg-[#18181B] border border-white/10 flex items-center justify-center text-zinc-400 hover:text-green-500 hover:border-green-500/50 transition-all"
                aria-label="WhatsApp"
              >
                <WhatsAppIcon size={20} />
              </a>
            </div>
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
                  ul. Polna 20<br />
                  44-145 Pilchowice, Polska
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-primary flex-shrink-0" />
                <a href="tel:+48514332193 className="text-zinc-400 hover:text-primary transition-colors text-sm">
                  +48 514 332 193
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
