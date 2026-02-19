import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Award, Users, Shield, Truck, Wrench, Clock, CheckCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Button } from '../components/ui/button';

const AboutPage = () => {
  const { language, t } = useLanguage();

  const stats = [
    { value: '15+', label: t('about.experience'), icon: Clock },
    { value: '100+', label: t('about.projects'), icon: Award },
    { value: '17', label: t('about.team'), icon: Users },
    { value: '50+', label: t('about.clients'), icon: CheckCircle },
  ];

  const certifications = language === 'pl' 
    ? [
        'Uprawnienia do obsługi podestów ruchomych i przejezdnych',
        'Uprawnienia do obsługi wózków widłowych',
        'Szkolenia BHP i prace na wysokościach',
        'Certyfikacja partnera NIEDAX',
      ]
    : [
        'Berechtigungen für Hubarbeitsbühnen und fahrbare Arbeitsbühnen',
        'Berechtigungen für Gabelstapler',
        'Arbeitsschutzschulungen und Höhenarbeiten',
        'NIEDAX Partner-Zertifizierung',
      ];

  const equipment = language === 'pl'
    ? [
        { title: 'Flota pojazdów', desc: 'Własne samochody dostawcze do transportu materiałów i sprzętu', icon: Truck },
        { title: 'Narzędzia', desc: 'Profesjonalne narzędzia do montażu tras kablowych', icon: Wrench },
        { title: 'Podesty ruchome', desc: 'Dostęp do różnego typu podnośników i platform', icon: Shield },
        { title: 'Rusztowania', desc: 'Pełne wyposażenie w drabiny i rusztowania', icon: Award },
      ]
    : [
        { title: 'Fahrzeugflotte', desc: 'Eigene Lieferfahrzeuge für den Transport von Materialien und Geräten', icon: Truck },
        { title: 'Werkzeuge', desc: 'Professionelle Werkzeuge für die Kabeltrassen-Montage', icon: Wrench },
        { title: 'Hubarbeitsbühnen', desc: 'Zugang zu verschiedenen Arten von Hubarbeitsbühnen und Plattformen', icon: Shield },
        { title: 'Gerüste', desc: 'Vollständige Ausstattung mit Leitern und Gerüsten', icon: Award },
      ];

  return (
    <div className="min-h-screen bg-[#09090B] pt-20">
      {/* Hero Section */}
      <section data-testid="about-hero" className="py-24 md:py-32 relative">
        <div className="absolute inset-0 grid-lines opacity-20" />
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 relative">
          <span className="text-primary text-sm font-semibold uppercase tracking-widest">
            {t('about.subtitle')}
          </span>
          <h1 className="font-['Barlow_Condensed'] text-5xl md:text-6xl lg:text-7xl font-bold text-white uppercase mt-4 mb-6">
            {t('about.title')}
          </h1>
          <p className="text-xl text-zinc-400 max-w-3xl leading-relaxed">
            {t('about.description')}
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section data-testid="about-stats" className="py-16 bg-[#18181B] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center lg:text-left">
                <stat.icon size={32} className="text-primary mx-auto lg:mx-0 mb-4" />
                <p className="font-['Barlow_Condensed'] text-5xl md:text-6xl font-bold text-white mb-2">
                  {stat.value}
                </p>
                <p className="text-zinc-400 text-sm uppercase tracking-wider">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section data-testid="about-story" className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="font-['Barlow_Condensed'] text-3xl md:text-4xl font-bold text-white uppercase mb-6">
                {language === 'pl' ? 'NASZA HISTORIA' : 'UNSERE GESCHICHTE'}
              </h2>
              <div className="space-y-4 text-zinc-400 leading-relaxed">
                <p>
                  {language === 'pl' 
                    ? 'Stal Tech Invest Sp. z o.o. to firma z wieloletnim doświadczeniem na rynku niemieckim. Przez ponad 15 lat zdobywaliśmy wiedzę i umiejętności, realizując projekty dla najbardziej wymagających klientów w Europie.'
                    : 'Stal Tech Invest Sp. z o.o. ist ein Unternehmen mit langjähriger Erfahrung auf dem deutschen Markt. Über 15 Jahre haben wir Wissen und Fähigkeiten gesammelt und Projekte für die anspruchsvollsten Kunden in Europa realisiert.'}
                </p>
                <p>
                  {language === 'pl'
                    ? 'Nasza współpraca z NIEDAX, jednym z największych europejskich producentów systemów tras kablowych, pozwala nam oferować rozwiązania najwyższej jakości.'
                    : 'Unsere Zusammenarbeit mit NIEDAX, einem der größten europäischen Hersteller von Kabeltrassen-Systemen, ermöglicht es uns, Lösungen höchster Qualität anzubieten.'}
                </p>
                <p>
                  {language === 'pl'
                    ? 'Teraz przenosimy nasze doświadczenie na rynek polski, oferując te same standardy jakości i profesjonalizmu, które zapewniły nam sukces w Niemczech.'
                    : 'Jetzt bringen wir unsere Erfahrung auf den polnischen Markt und bieten die gleichen Qualitäts- und Professionalitätsstandards, die uns in Deutschland zum Erfolg verholfen haben.'}
                </p>
              </div>
            </div>
            <div className="order-1 lg:order-2 relative">
              <img
                src="https://images.unsplash.com/photo-1695326612772-816651657d05?crop=entropy&cs=srgb&fm=jpg&q=85"
                alt="Workers"
                className="w-full aspect-square object-cover"
              />
              <div className="absolute -bottom-6 -right-6 bg-[#18181B] border border-white/10 p-6">
                <p className="text-zinc-400 text-sm uppercase tracking-wider mb-1">Partner</p>
                <p className="font-['Barlow_Condensed'] text-2xl font-bold text-primary">NIEDAX</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section data-testid="about-certifications" className="py-24 md:py-32 bg-[#18181B]/50">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            <div>
              <h2 className="font-['Barlow_Condensed'] text-3xl md:text-4xl font-bold text-white uppercase mb-6">
                {language === 'pl' ? 'CERTYFIKACJE' : 'ZERTIFIZIERUNGEN'}
              </h2>
              <p className="text-zinc-400 mb-8">
                {language === 'pl'
                  ? 'Nasz zespół posiada wszystkie niezbędne uprawnienia i certyfikaty wymagane do wykonywania prac montażowych na najwyższym poziomie bezpieczeństwa.'
                  : 'Unser Team verfügt über alle erforderlichen Berechtigungen und Zertifikate für Montagearbeiten auf höchstem Sicherheitsniveau.'}
              </p>
              <ul className="space-y-4">
                {certifications.map((cert, index) => (
                  <li key={index} className="flex items-start gap-4">
                    <Shield size={20} className="text-primary mt-1 flex-shrink-0" />
                    <span className="text-zinc-300">{cert}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="font-['Barlow_Condensed'] text-3xl md:text-4xl font-bold text-white uppercase mb-6">
                {language === 'pl' ? 'WYPOSAŻENIE' : 'AUSRÜSTUNG'}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {equipment.map((item, index) => (
                  <div
                    key={index}
                    data-testid={`equipment-${index}`}
                    className="bg-[#18181B] border border-white/5 p-6 hover:border-primary/30 transition-colors"
                  >
                    <item.icon size={28} className="text-primary mb-4" />
                    <h3 className="font-['Barlow_Condensed'] text-lg font-bold text-white uppercase mb-2">
                      {item.title}
                    </h3>
                    <p className="text-zinc-400 text-sm">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section data-testid="about-team" className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <div className="text-center mb-16">
            <h2 className="font-['Barlow_Condensed'] text-3xl md:text-4xl font-bold text-white uppercase mb-4">
              {language === 'pl' ? 'NASZ ZESPÓŁ' : 'UNSER TEAM'}
            </h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">
              {language === 'pl'
                ? 'Posiadamy wykwalifikowany zespół około 17 doświadczonych monterów, gotowych do realizacji nawet najbardziej wymagających projektów.'
                : 'Wir haben ein qualifiziertes Team von etwa 17 erfahrenen Monteuren, die bereit sind, auch die anspruchsvollsten Projekte zu realisieren.'}
            </p>
          </div>

          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1645152981706-50ad7d304e9b?crop=entropy&cs=srgb&fm=jpg&q=85"
              alt="Team at work"
              className="w-full aspect-[21/9] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#09090B] via-transparent to-transparent" />
            <div className="absolute bottom-8 left-8 right-8 flex flex-wrap gap-6">
              <div className="bg-[#18181B]/90 backdrop-blur border border-white/10 px-6 py-4">
                <p className="font-['Barlow_Condensed'] text-3xl font-bold text-primary">~17</p>
                <p className="text-zinc-400 text-sm uppercase tracking-wider">
                  {language === 'pl' ? 'Monterów' : 'Monteure'}
                </p>
              </div>
              <div className="bg-[#18181B]/90 backdrop-blur border border-white/10 px-6 py-4">
                <p className="font-['Barlow_Condensed'] text-3xl font-bold text-primary">100%</p>
                <p className="text-zinc-400 text-sm uppercase tracking-wider">
                  {language === 'pl' ? 'Zaangażowania' : 'Engagement'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section data-testid="about-cta" className="py-24 md:py-32 bg-[#18181B]/50 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 text-center">
          <h2 className="font-['Barlow_Condensed'] text-3xl md:text-4xl font-bold text-white uppercase mb-6">
            {t('cta.title')}
          </h2>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto mb-10">
            {t('cta.subtitle')}
          </p>
          <Link to="/contact">
            <Button
              data-testid="about-cta-button"
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

export default AboutPage;
