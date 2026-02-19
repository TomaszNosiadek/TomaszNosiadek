import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Cable, Layers, Box, Construction, MountainSnow, MessageSquare, CheckCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Button } from '../components/ui/button';

const ServicesPage = () => {
  const { language, t } = useLanguage();

  const services = [
    {
      icon: Cable,
      title: t('services.items')[0].title,
      desc: t('services.items')[0].desc,
      features: language === 'pl' 
        ? ['Trasy kablowe NIEDAX', 'Systemy stalowe i aluminiowe', 'Montaż zgodny z normami']
        : ['NIEDAX Kabeltrassen', 'Stahl- und Aluminiumsysteme', 'Normgerechte Montage'],
      featured: true,
    },
    {
      icon: Layers,
      title: t('services.items')[1].title,
      desc: t('services.items')[1].desc,
      features: language === 'pl'
        ? ['Drabinki kablowe', 'Duże obciążenia', 'Różne szerokości']
        : ['Kabelleitern', 'Hohe Belastungen', 'Verschiedene Breiten'],
    },
    {
      icon: Box,
      title: t('services.items')[2].title,
      desc: t('services.items')[2].desc,
      features: language === 'pl'
        ? ['Korytka perforowane', 'Korytka pełne', 'Systemy ocynkowane']
        : ['Perforierte Rinnen', 'Geschlossene Rinnen', 'Verzinkte Systeme'],
    },
    {
      icon: Construction,
      title: t('services.items')[3].title,
      desc: t('services.items')[3].desc,
      features: language === 'pl'
        ? ['Konstrukcje wsporcze', 'Uchwyty i wieszaki', 'Elementy montażowe']
        : ['Tragkonstruktionen', 'Halterungen und Aufhänger', 'Montageelemente'],
    },
    {
      icon: MountainSnow,
      title: t('services.items')[4].title,
      desc: t('services.items')[4].desc,
      features: language === 'pl'
        ? ['Podesty ruchome', 'Rusztowania', 'Prace specjalistyczne']
        : ['Hubarbeitsbühnen', 'Gerüste', 'Spezialarbeiten'],
    },
    {
      icon: MessageSquare,
      title: t('services.items')[5].title,
      desc: t('services.items')[5].desc,
      features: language === 'pl'
        ? ['Dobór systemów', 'Optymalizacja kosztów', 'Wsparcie techniczne']
        : ['Systemauswahl', 'Kostenoptimierung', 'Technische Unterstützung'],
    },
  ];

  const benefits = language === 'pl'
    ? [
        '15+ lat doświadczenia na rynku niemieckim',
        'Współpraca z NIEDAX - liderem branży',
        'Wykwalifikowany zespół monterów',
        'Własny sprzęt i flota pojazdów',
        'Terminowość i elastyczność',
        'Gwarancja jakości wykonania',
      ]
    : [
        '15+ Jahre Erfahrung auf dem deutschen Markt',
        'Zusammenarbeit mit NIEDAX - Branchenführer',
        'Qualifiziertes Monteurteam',
        'Eigene Ausrüstung und Fahrzeugflotte',
        'Pünktlichkeit und Flexibilität',
        'Qualitätsgarantie',
      ];

  return (
    <div className="min-h-screen bg-[#09090B] pt-20">
      {/* Hero */}
      <section data-testid="services-hero" className="py-24 md:py-32 relative">
        <div className="absolute inset-0 grid-lines opacity-20" />
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 relative">
          <span className="text-primary text-sm font-semibold uppercase tracking-widest">
            {t('services.subtitle')}
          </span>
          <h1 className="font-['Barlow_Condensed'] text-5xl md:text-6xl lg:text-7xl font-bold text-white uppercase mt-4 mb-6">
            {t('services.title')}
          </h1>
          <p className="text-xl text-zinc-400 max-w-3xl">
            {language === 'pl'
              ? 'Oferujemy kompleksowe usługi montażu systemów tras kablowych dla obiektów przemysłowych, logistycznych i komercyjnych.'
              : 'Wir bieten umfassende Montageservices für Kabeltrassen-Systeme für Industrie-, Logistik- und Gewerbeobjekte.'}
          </p>
        </div>
      </section>

      {/* Services Grid - Bento Style */}
      <section data-testid="services-grid" className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <div
                key={index}
                data-testid={`service-card-${index}`}
                className={`bg-[#18181B] border border-white/5 p-8 hover:border-primary/50 transition-all duration-300 group ${
                  service.featured ? 'lg:col-span-2 lg:row-span-2' : ''
                }`}
              >
                <service.icon 
                  size={service.featured ? 48 : 36} 
                  className="text-primary mb-6 group-hover:scale-110 transition-transform" 
                />
                <h3 className={`font-['Barlow_Condensed'] font-bold text-white uppercase mb-4 ${
                  service.featured ? 'text-3xl md:text-4xl' : 'text-xl'
                }`}>
                  {service.title}
                </h3>
                <p className={`text-zinc-400 mb-6 leading-relaxed ${
                  service.featured ? 'text-lg' : 'text-sm'
                }`}>
                  {service.desc}
                </p>
                <ul className="space-y-2">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-zinc-300 text-sm">
                      <CheckCircle size={16} className="text-primary flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section data-testid="services-process" className="py-24 md:py-32 bg-[#18181B]/50">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <div className="text-center mb-16">
            <h2 className="font-['Barlow_Condensed'] text-3xl md:text-4xl font-bold text-white uppercase mb-4">
              {language === 'pl' ? 'JAK PRACUJEMY' : 'WIE WIR ARBEITEN'}
            </h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">
              {language === 'pl'
                ? 'Nasz proces realizacji projektu jest przejrzysty i efektywny'
                : 'Unser Projektrealisierungsprozess ist transparent und effizient'}
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {(language === 'pl'
              ? [
                  { num: '01', title: 'Konsultacja', desc: 'Analiza potrzeb i wymagań projektu' },
                  { num: '02', title: 'Wycena', desc: 'Przygotowanie szczegółowej oferty' },
                  { num: '03', title: 'Realizacja', desc: 'Profesjonalny montaż przez nasz zespół' },
                  { num: '04', title: 'Odbiór', desc: 'Kontrola jakości i przekazanie dokumentacji' },
                ]
              : [
                  { num: '01', title: 'Beratung', desc: 'Analyse der Projektanforderungen' },
                  { num: '02', title: 'Angebot', desc: 'Erstellung eines detaillierten Angebots' },
                  { num: '03', title: 'Realisierung', desc: 'Professionelle Montage durch unser Team' },
                  { num: '04', title: 'Abnahme', desc: 'Qualitätskontrolle und Dokumentation' },
                ]
            ).map((step, index) => (
              <div
                key={index}
                data-testid={`process-step-${index}`}
                className="relative text-center"
              >
                <span className="font-['Barlow_Condensed'] text-6xl font-bold text-primary/20">
                  {step.num}
                </span>
                <h3 className="font-['Barlow_Condensed'] text-xl font-bold text-white uppercase -mt-4 mb-2">
                  {step.title}
                </h3>
                <p className="text-zinc-400 text-sm">{step.desc}</p>
                {index < 3 && (
                  <ArrowRight 
                    size={24} 
                    className="text-primary/30 absolute top-8 -right-3 hidden md:block" 
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section data-testid="services-benefits" className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <h2 className="font-['Barlow_Condensed'] text-3xl md:text-4xl font-bold text-white uppercase mb-6">
                {language === 'pl' ? 'DLACZEGO WARTO Z NAMI WSPÓŁPRACOWAĆ' : 'WARUM MIT UNS ZUSAMMENARBEITEN'}
              </h2>
              <ul className="space-y-4">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-4">
                    <CheckCircle size={20} className="text-primary mt-1 flex-shrink-0" />
                    <span className="text-zinc-300">{benefit}</span>
                  </li>
                ))}
              </ul>
              <Link to="/contact" className="inline-block mt-8">
                <Button
                  data-testid="services-cta-button"
                  className="bg-primary text-white hover:bg-primary/90 h-14 px-10 rounded-none font-bold uppercase tracking-wider shadow-[4px_4px_0px_0px_rgba(255,255,255,0.1)] hover:translate-x-1 hover:-translate-y-1 transition-all duration-300"
                >
                  {t('hero.cta')}
                  <ArrowRight size={20} className="ml-2" />
                </Button>
              </Link>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1645152981706-50ad7d304e9b?crop=entropy&cs=srgb&fm=jpg&q=85"
                alt="Equipment"
                className="w-full aspect-[4/3] object-cover"
              />
              <div className="absolute inset-0 border-4 border-primary/20 translate-x-4 translate-y-4 -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section data-testid="services-cta-section" className="py-24 md:py-32 bg-primary/10 border-t border-primary/20">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 text-center">
          <h2 className="font-['Barlow_Condensed'] text-3xl md:text-4xl font-bold text-white uppercase mb-6">
            {language === 'pl' ? 'POTRZEBUJESZ WYCENY?' : 'BENÖTIGEN SIE EIN ANGEBOT?'}
          </h2>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto mb-10">
            {language === 'pl'
              ? 'Skontaktuj się z nami, a przygotujemy bezpłatną wycenę dla Twojego projektu.'
              : 'Kontaktieren Sie uns und wir erstellen Ihnen ein kostenloses Angebot für Ihr Projekt.'}
          </p>
          <Link to="/contact">
            <Button
              data-testid="services-final-cta"
              className="bg-primary text-white hover:bg-primary/90 h-14 px-12 rounded-none font-bold uppercase tracking-wider text-base shadow-[4px_4px_0px_0px_rgba(255,255,255,0.1)] hover:translate-x-1 hover:-translate-y-1 transition-all duration-300"
            >
              {t('cta.button')}
              <ArrowRight size={20} className="ml-2" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
