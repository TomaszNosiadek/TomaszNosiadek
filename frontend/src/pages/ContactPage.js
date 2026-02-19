import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle } from 'lucide-react';
import axios from 'axios';
import { useLanguage } from '../context/LanguageContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const ContactPage = () => {
  const { language, t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      await axios.post(`${API}/contact`, formData);
      setStatus({ type: 'success', message: t('contact.form.success') });
      setFormData({ name: '', email: '', phone: '', company: '', message: '' });
    } catch (error) {
      setStatus({ type: 'error', message: t('contact.form.error') });
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: MapPin,
      label: t('contact.info.address'),
      value: 'ul. Przemysłowa 15\n00-001 Warszawa, Polska',
      href: null,
    },
    {
      icon: Phone,
      label: t('contact.info.phone'),
      value: '+48 123 456 789',
      href: 'tel:+48123456789',
    },
    {
      icon: Mail,
      label: t('contact.info.email'),
      value: 'kontakt@staltechinvest.pl',
      href: 'mailto:kontakt@staltechinvest.pl',
    },
  ];

  return (
    <div className="min-h-screen bg-[#09090B] pt-20">
      {/* Hero */}
      <section data-testid="contact-hero" className="py-24 md:py-32 relative">
        <div className="absolute inset-0 grid-lines opacity-20" />
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 relative">
          <span className="text-primary text-sm font-semibold uppercase tracking-widest">
            {t('contact.subtitle')}
          </span>
          <h1 className="font-['Barlow_Condensed'] text-5xl md:text-6xl lg:text-7xl font-bold text-white uppercase mt-4 mb-6">
            {t('contact.title')}
          </h1>
          <p className="text-xl text-zinc-400 max-w-3xl">
            {language === 'pl'
              ? 'Masz pytania lub potrzebujesz wyceny? Skontaktuj się z nami, a odpowiemy najszybciej jak to możliwe.'
              : 'Haben Sie Fragen oder benötigen Sie ein Angebot? Kontaktieren Sie uns und wir werden so schnell wie möglich antworten.'}
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section data-testid="contact-section" className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Form */}
            <div className="order-2 lg:order-1">
              <h2 className="font-['Barlow_Condensed'] text-2xl md:text-3xl font-bold text-white uppercase mb-8">
                {language === 'pl' ? 'WYŚLIJ WIADOMOŚĆ' : 'NACHRICHT SENDEN'}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6" data-testid="contact-form">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-zinc-400 text-sm uppercase tracking-wider">
                      {t('contact.form.name')} *
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      data-testid="contact-name-input"
                      className="bg-[#18181B] border-white/10 focus:border-primary rounded-none h-12 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-zinc-400 text-sm uppercase tracking-wider">
                      {t('contact.form.email')} *
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      data-testid="contact-email-input"
                      className="bg-[#18181B] border-white/10 focus:border-primary rounded-none h-12 text-white"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-zinc-400 text-sm uppercase tracking-wider">
                      {t('contact.form.phone')}
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      data-testid="contact-phone-input"
                      className="bg-[#18181B] border-white/10 focus:border-primary rounded-none h-12 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company" className="text-zinc-400 text-sm uppercase tracking-wider">
                      {t('contact.form.company')}
                    </Label>
                    <Input
                      id="company"
                      name="company"
                      type="text"
                      value={formData.company}
                      onChange={handleChange}
                      data-testid="contact-company-input"
                      className="bg-[#18181B] border-white/10 focus:border-primary rounded-none h-12 text-white"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-zinc-400 text-sm uppercase tracking-wider">
                    {t('contact.form.message')} *
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    data-testid="contact-message-input"
                    className="bg-[#18181B] border-white/10 focus:border-primary rounded-none text-white resize-none"
                  />
                </div>

                {status.message && (
                  <div
                    data-testid="form-status"
                    className={`flex items-center gap-3 p-4 ${
                      status.type === 'success'
                        ? 'bg-green-500/10 border border-green-500/30 text-green-400'
                        : 'bg-red-500/10 border border-red-500/30 text-red-400'
                    }`}
                  >
                    {status.type === 'success' ? (
                      <CheckCircle size={20} />
                    ) : (
                      <AlertCircle size={20} />
                    )}
                    {status.message}
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={loading}
                  data-testid="contact-submit-button"
                  className="bg-primary text-white hover:bg-primary/90 h-14 px-10 rounded-none font-bold uppercase tracking-wider shadow-[4px_4px_0px_0px_rgba(255,255,255,0.1)] hover:translate-x-1 hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    language === 'pl' ? 'Wysyłanie...' : 'Senden...'
                  ) : (
                    <>
                      {t('contact.form.submit')}
                      <Send size={18} className="ml-2" />
                    </>
                  )}
                </Button>
              </form>
            </div>

            {/* Map & Info */}
            <div className="order-1 lg:order-2">
              <h2 className="font-['Barlow_Condensed'] text-2xl md:text-3xl font-bold text-white uppercase mb-8">
                {language === 'pl' ? 'DANE KONTAKTOWE' : 'KONTAKTDATEN'}
              </h2>

              {/* Contact Info */}
              <div className="space-y-6 mb-10">
                {contactInfo.map((item, index) => (
                  <div key={index} className="flex items-start gap-4" data-testid={`contact-info-${index}`}>
                    <div className="w-12 h-12 bg-primary/10 border border-primary/30 flex items-center justify-center flex-shrink-0">
                      <item.icon size={20} className="text-primary" />
                    </div>
                    <div>
                      <p className="text-zinc-500 text-sm uppercase tracking-wider mb-1">{item.label}</p>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="text-white hover:text-primary transition-colors whitespace-pre-line"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-white whitespace-pre-line">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Google Map */}
              <div data-testid="google-map" className="w-full aspect-[4/3] bg-[#18181B] border border-white/10">
                <iframe
                  title="Stal Tech Invest Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2443.5750442888254!2d21.01222771579614!3d52.22967597975857!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x471ecc8c92692e49%3A0xc2e97ae5311f2dc!2sWarszawa%2C%20Polska!5e0!3m2!1spl!2sus!4v1635000000000!5m2!1spl!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              {/* Working Hours */}
              <div className="mt-8 p-6 bg-[#18181B] border border-white/5">
                <h3 className="font-['Barlow_Condensed'] text-lg font-bold text-white uppercase mb-4">
                  {language === 'pl' ? 'GODZINY PRACY' : 'ARBEITSZEITEN'}
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-zinc-400">{language === 'pl' ? 'Poniedziałek - Piątek' : 'Montag - Freitag'}</span>
                    <span className="text-white">07:00 - 17:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">{language === 'pl' ? 'Sobota' : 'Samstag'}</span>
                    <span className="text-white">08:00 - 14:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">{language === 'pl' ? 'Niedziela' : 'Sonntag'}</span>
                    <span className="text-zinc-500">{language === 'pl' ? 'Zamknięte' : 'Geschlossen'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section data-testid="contact-bottom-cta" className="py-16 bg-[#18181B]/50 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 text-center">
          <p className="text-zinc-400 text-lg mb-4">
            {language === 'pl'
              ? 'Gwarantujemy 100% zaangażowania, terminowość i wysoką jakość wykonania.'
              : 'Wir garantieren 100% Engagement, Pünktlichkeit und hohe Ausführungsqualität.'}
          </p>
          <div className="flex items-center justify-center gap-2 text-primary">
            <span className="font-['Barlow_Condensed'] text-xl font-bold">NIEDAX</span>
            <span className="text-zinc-500">|</span>
            <span className="text-zinc-400">{language === 'pl' ? 'Oficjalny Partner' : 'Offizieller Partner'}</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
