import React, { createContext, useContext, useState, useEffect } from 'react';

const translations = {
  pl: {
    // Navigation
    nav: {
      home: 'Strona główna',
      about: 'O nas',
      services: 'Usługi',
      projects: 'Realizacje',
      contact: 'Kontakt',
    },
    // Hero
    hero: {
      badge: '15+ lat doświadczenia',
      title: 'PROFESJONALNY MONTAŻ',
      titleHighlight: 'TRAS KABLOWYCH',
      subtitle: 'Specjalizujemy się w profesjonalnym montażu wszystkich rodzajów systemów tras kablowych w obiektach przemysłowych, logistycznych i komercyjnych.',
      cta: 'Zapytaj o wycenę',
      ctaSecondary: 'Nasze realizacje',
    },
    // About
    about: {
      title: 'O NAS',
      subtitle: 'Kim jesteśmy',
      description: 'Stal Tech Invest Sp. z o.o. to firma specjalizująca się w profesjonalnym montażu wszystkich rodzajów systemów tras kablowych. Jesteśmy nową firmą na polskim rynku, jednak posiadamy ponad 15 lat doświadczenia zdobytego na rynku niemieckim, gdzie kontynuujemy współpracę z jednym z największych europejskich producentów systemów tras kablowych – NIEDAX.',
      experience: 'Lat doświadczenia',
      projects: 'Zrealizowanych projektów',
      team: 'Wykwalifikowanych monterów',
      clients: 'Zadowolonych klientów',
    },
    // Why us
    whyUs: {
      title: 'DLACZEGO MY',
      subtitle: 'Co nas wyróżnia',
      items: [
        { title: 'Doświadczenie międzynarodowe', desc: 'Ponad 15 lat pracy na wymagającym rynku niemieckim' },
        { title: 'Renomowani klienci', desc: 'Mercedes-Benz, Amazon, Ford, Nobilia i dziesiątki innych' },
        { title: 'Wykwalifikowany zespół', desc: 'Około 17 certyfikowanych monterów' },
        { title: 'Certyfikacje', desc: 'Uprawnienia do obsługi podestów ruchomych i wózków widłowych' },
        { title: 'Własna flota', desc: 'Samochody dostawcze i pełne wyposażenie techniczne' },
        { title: 'Elastyczność', desc: 'Szybkie terminy realizacji i dostosowanie do potrzeb klienta' },
      ],
    },
    // Services
    services: {
      title: 'USŁUGI',
      subtitle: 'Co oferujemy',
      items: [
        { title: 'Montaż tras kablowych', desc: 'Profesjonalna instalacja wszystkich typów systemów tras kablowych zgodnie z normami' },
        { title: 'Systemy drabinkowe', desc: 'Montaż drabinek kablowych do prowadzenia większych wiązek kabli' },
        { title: 'Korytka kablowe', desc: 'Instalacja korytków perforowanych i pełnych dla różnych zastosowań' },
        { title: 'Konstrukcje wsporcze', desc: 'Wykonanie i montaż konstrukcji wsporczych i uchwytów' },
        { title: 'Prace wysokościowe', desc: 'Realizacja projektów na dużych wysokościach z użyciem podestów ruchomych' },
        { title: 'Doradztwo techniczne', desc: 'Wsparcie w doborze optymalnych rozwiązań dla danego projektu' },
      ],
    },
    // Projects
    projects: {
      title: 'REALIZACJE',
      subtitle: 'Nasze projekty',
      viewAll: 'Zobacz wszystkie',
      categories: {
        all: 'Wszystkie',
        automotive: 'Motoryzacja',
        logistics: 'Logistyka',
        commercial: 'Komercja',
        healthcare: 'Szpitale',
        industrial: 'Przemysł',
      },
    },
    // Testimonials
    testimonials: {
      title: 'OPINIE',
      subtitle: 'Co mówią nasi klienci',
    },
    // Contact
    contact: {
      title: 'KONTAKT',
      subtitle: 'Skontaktuj się z nami',
      form: {
        name: 'Imię i nazwisko',
        email: 'Adres e-mail',
        phone: 'Telefon (opcjonalnie)',
        company: 'Firma (opcjonalnie)',
        message: 'Wiadomość',
        submit: 'Wyślij wiadomość',
        success: 'Wiadomość wysłana pomyślnie!',
        error: 'Wystąpił błąd. Spróbuj ponownie.',
      },
      info: {
        address: 'Adres',
        phone: 'Telefon',
        email: 'E-mail',
      },
    },
    // Footer
    footer: {
      description: 'Profesjonalny montaż systemów tras kablowych w obiektach przemysłowych, logistycznych i komercyjnych.',
      rights: 'Wszelkie prawa zastrzeżone.',
      quickLinks: 'Szybkie linki',
    },
    // CTA
    cta: {
      title: 'GOTOWY NA WSPÓŁPRACĘ?',
      subtitle: 'Skontaktuj się z nami i uzyskaj bezpłatną wycenę dla Twojego projektu',
      button: 'Skontaktuj się',
    },
  },
  de: {
    // Navigation
    nav: {
      home: 'Startseite',
      about: 'Über uns',
      services: 'Leistungen',
      projects: 'Projekte',
      contact: 'Kontakt',
    },
    // Hero
    hero: {
      badge: '15+ Jahre Erfahrung',
      title: 'PROFESSIONELLE MONTAGE VON',
      titleHighlight: 'KABELTRASSEN',
      subtitle: 'Wir sind spezialisiert auf die professionelle Montage aller Arten von Kabeltrassen-Systemen in Industrie-, Logistik- und Gewerbeobjekten.',
      cta: 'Angebot anfordern',
      ctaSecondary: 'Unsere Projekte',
    },
    // About
    about: {
      title: 'ÜBER UNS',
      subtitle: 'Wer wir sind',
      description: 'Stal Tech Invest Sp. z o.o. ist ein Unternehmen, das sich auf die professionelle Montage aller Arten von Kabeltrassen-Systemen spezialisiert hat. Wir sind ein neues Unternehmen auf dem polnischen Markt, verfügen jedoch über mehr als 15 Jahre Erfahrung auf dem deutschen Markt, wo wir weiterhin mit einem der größten europäischen Hersteller von Kabeltrassen-Systemen zusammenarbeiten – NIEDAX.',
      experience: 'Jahre Erfahrung',
      projects: 'Abgeschlossene Projekte',
      team: 'Qualifizierte Monteure',
      clients: 'Zufriedene Kunden',
    },
    // Why us
    whyUs: {
      title: 'WARUM WIR',
      subtitle: 'Was uns auszeichnet',
      items: [
        { title: 'Internationale Erfahrung', desc: 'Über 15 Jahre Arbeit auf dem anspruchsvollen deutschen Markt' },
        { title: 'Renommierte Kunden', desc: 'Mercedes-Benz, Amazon, Ford, Nobilia und Dutzende andere' },
        { title: 'Qualifiziertes Team', desc: 'Etwa 17 zertifizierte Monteure' },
        { title: 'Zertifizierungen', desc: 'Berechtigungen für Hubarbeitsbühnen und Gabelstapler' },
        { title: 'Eigene Flotte', desc: 'Lieferfahrzeuge und vollständige technische Ausrüstung' },
        { title: 'Flexibilität', desc: 'Schnelle Ausführungszeiten und Anpassung an Kundenbedürfnisse' },
      ],
    },
    // Services
    services: {
      title: 'LEISTUNGEN',
      subtitle: 'Was wir anbieten',
      items: [
        { title: 'Kabeltrassen-Montage', desc: 'Professionelle Installation aller Kabeltrassen-Systeme nach Normen' },
        { title: 'Kabelleitern', desc: 'Montage von Kabelleitern für größere Kabelbündel' },
        { title: 'Kabelrinnen', desc: 'Installation von perforierten und geschlossenen Rinnen für verschiedene Anwendungen' },
        { title: 'Tragkonstruktionen', desc: 'Herstellung und Montage von Tragkonstruktionen und Halterungen' },
        { title: 'Höhenarbeiten', desc: 'Projektdurchführung in großen Höhen mit Hubarbeitsbühnen' },
        { title: 'Technische Beratung', desc: 'Unterstützung bei der Auswahl optimaler Lösungen für das Projekt' },
      ],
    },
    // Projects
    projects: {
      title: 'PROJEKTE',
      subtitle: 'Unsere Referenzen',
      viewAll: 'Alle anzeigen',
      categories: {
        all: 'Alle',
        automotive: 'Automotive',
        logistics: 'Logistik',
        commercial: 'Gewerbe',
        healthcare: 'Krankenhäuser',
        industrial: 'Industrie',
      },
    },
    // Testimonials
    testimonials: {
      title: 'BEWERTUNGEN',
      subtitle: 'Was unsere Kunden sagen',
    },
    // Contact
    contact: {
      title: 'KONTAKT',
      subtitle: 'Kontaktieren Sie uns',
      form: {
        name: 'Vor- und Nachname',
        email: 'E-Mail-Adresse',
        phone: 'Telefon (optional)',
        company: 'Firma (optional)',
        message: 'Nachricht',
        submit: 'Nachricht senden',
        success: 'Nachricht erfolgreich gesendet!',
        error: 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.',
      },
      info: {
        address: 'Adresse',
        phone: 'Telefon',
        email: 'E-Mail',
      },
    },
    // Footer
    footer: {
      description: 'Professionelle Montage von Kabeltrassen-Systemen in Industrie-, Logistik- und Gewerbeobjekten.',
      rights: 'Alle Rechte vorbehalten.',
      quickLinks: 'Schnelllinks',
    },
    // CTA
    cta: {
      title: 'BEREIT ZUR ZUSAMMENARBEIT?',
      subtitle: 'Kontaktieren Sie uns und erhalten Sie ein kostenloses Angebot für Ihr Projekt',
      button: 'Kontakt aufnehmen',
    },
  },
};

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    const saved = localStorage.getItem('language');
    return saved || 'pl';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const t = (key) => {
    const keys = key.split('.');
    let value = translations[language];
    for (const k of keys) {
      value = value?.[k];
    }
    return value || key;
  };

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'pl' ? 'de' : 'pl');
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
