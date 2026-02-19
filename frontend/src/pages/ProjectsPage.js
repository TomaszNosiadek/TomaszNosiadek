import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Calendar, Filter } from 'lucide-react';
import axios from 'axios';
import { useLanguage } from '../context/LanguageContext';
import { Button } from '../components/ui/button';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const ProjectsPage = () => {
  const { language, t } = useLanguage();
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        await axios.post(`${API}/seed`);
        const response = await axios.get(`${API}/projects`);
        setProjects(response.data);
        setFilteredProjects(response.data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  useEffect(() => {
    if (activeCategory === 'all') {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter(p => p.category === activeCategory));
    }
  }, [activeCategory, projects]);

  const categories = [
    { key: 'all', label: t('projects.categories.all') },
    { key: 'automotive', label: t('projects.categories.automotive') },
    { key: 'logistics', label: t('projects.categories.logistics') },
    { key: 'commercial', label: t('projects.categories.commercial') },
    { key: 'industrial', label: t('projects.categories.industrial') },
  ];

  const clients = [
    'Mercedes-Benz Düsseldorf',
    'Amazon',
    'Ford Köln',
    'Nobilia',
    'Messe Köln',
    'Messe Essen',
    'Messe Düsseldorf',
    'Four Towers Frankfurt',
    'Uniklinikum Essen',
    'Klinikum Bonn Köln',
  ];

  return (
    <div className="min-h-screen bg-[#09090B] pt-20">
      {/* Hero */}
      <section data-testid="projects-hero" className="py-24 md:py-32 relative">
        <div className="absolute inset-0 grid-lines opacity-20" />
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 relative">
          <span className="text-primary text-sm font-semibold uppercase tracking-widest">
            {t('projects.subtitle')}
          </span>
          <h1 className="font-['Barlow_Condensed'] text-5xl md:text-6xl lg:text-7xl font-bold text-white uppercase mt-4 mb-6">
            {t('projects.title')}
          </h1>
          <p className="text-xl text-zinc-400 max-w-3xl">
            {language === 'pl'
              ? 'Poznaj nasze realizacje dla wiodących firm w Europie. Każdy projekt to dowód naszego doświadczenia i jakości.'
              : 'Entdecken Sie unsere Projekte für führende Unternehmen in Europa. Jedes Projekt ist ein Beweis für unsere Erfahrung und Qualität.'}
          </p>
        </div>
      </section>

      {/* Clients Marquee */}
      <section data-testid="clients-marquee" className="py-8 bg-[#18181B] border-y border-white/5 overflow-hidden">
        <div className="flex animate-scroll">
          {[...clients, ...clients].map((client, index) => (
            <span
              key={index}
              className="text-zinc-500 font-medium text-lg whitespace-nowrap px-8 hover:text-white transition-colors"
            >
              {client}
            </span>
          ))}
        </div>
        <style>{`
          @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-scroll {
            animation: scroll 30s linear infinite;
          }
        `}</style>
      </section>

      {/* Category Filter */}
      <section data-testid="projects-filter" className="py-12 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <div className="flex items-center gap-3 mb-6">
            <Filter size={18} className="text-primary" />
            <span className="text-zinc-400 text-sm uppercase tracking-wider">
              {language === 'pl' ? 'Filtruj według kategorii' : 'Nach Kategorie filtern'}
            </span>
          </div>
          <div className="flex flex-wrap gap-3">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                data-testid={`filter-${cat.key}`}
                className={`px-6 py-3 text-sm font-medium uppercase tracking-wider transition-all ${
                  activeCategory === cat.key
                    ? 'bg-primary text-white'
                    : 'bg-[#18181B] border border-white/10 text-zinc-400 hover:text-white hover:border-white/20'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section data-testid="projects-grid" className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-[#18181B] animate-pulse">
                  <div className="aspect-[4/3] bg-zinc-800" />
                  <div className="p-6 space-y-3">
                    <div className="h-4 bg-zinc-800 w-1/3" />
                    <div className="h-6 bg-zinc-800 w-2/3" />
                    <div className="h-4 bg-zinc-800" />
                  </div>
                </div>
              ))}
            </div>
          ) : filteredProjects.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-zinc-400 text-lg">
                {language === 'pl' ? 'Brak projektów w tej kategorii' : 'Keine Projekte in dieser Kategorie'}
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project, index) => (
                <div
                  key={project.id}
                  data-testid={`project-item-${index}`}
                  className="group bg-[#18181B] border border-white/5 hover:border-primary/50 transition-all duration-300 overflow-hidden"
                >
                  <div className="aspect-[4/3] overflow-hidden relative">
                    <img
                      src={project.image_url}
                      alt={project.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-primary/90 text-white text-xs px-3 py-1 uppercase tracking-wider font-medium">
                        {t(`projects.categories.${project.category}`)}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-zinc-500 text-sm mb-3">
                      <span className="flex items-center gap-1">
                        <MapPin size={14} />
                        {project.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar size={14} />
                        {project.year}
                      </span>
                    </div>
                    <h3 className="font-['Barlow_Condensed'] text-xl font-bold text-white uppercase mb-3">
                      {project.name}
                    </h3>
                    <p className="text-zinc-400 text-sm line-clamp-3">
                      {language === 'pl' ? project.description_pl : project.description_de}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Additional Clients */}
      <section data-testid="additional-clients" className="py-24 md:py-32 bg-[#18181B]/50">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <div className="text-center mb-16">
            <h2 className="font-['Barlow_Condensed'] text-3xl md:text-4xl font-bold text-white uppercase mb-4">
              {language === 'pl' ? 'WIĘCEJ KLIENTÓW' : 'WEITERE KUNDEN'}
            </h2>
            <p className="text-zinc-400 max-w-2xl mx-auto">
              {language === 'pl'
                ? 'Oprócz prezentowanych projektów, zrealizowaliśmy dziesiątki innych instalacji dla renomowanych firm.'
                : 'Neben den präsentierten Projekten haben wir Dutzende weiterer Installationen für renommierte Unternehmen durchgeführt.'}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {clients.map((client, index) => (
              <div
                key={index}
                className="bg-[#18181B] border border-white/5 p-6 text-center hover:border-primary/30 transition-colors"
              >
                <span className="text-zinc-400 font-medium text-sm">{client}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section data-testid="projects-cta" className="py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 warning-stripes opacity-30" />
        <div className="relative max-w-7xl mx-auto px-6 md:px-12 lg:px-24 text-center">
          <h2 className="font-['Barlow_Condensed'] text-3xl md:text-4xl font-bold text-white uppercase mb-6">
            {language === 'pl' ? 'CHCESZ DOŁĄCZYĆ DO NASZYCH KLIENTÓW?' : 'MÖCHTEN SIE ZU UNSEREN KUNDEN GEHÖREN?'}
          </h2>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto mb-10">
            {t('cta.subtitle')}
          </p>
          <Link to="/contact">
            <Button
              data-testid="projects-cta-button"
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

export default ProjectsPage;
