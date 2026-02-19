import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Star, Quote, ChevronLeft, ChevronRight, Award, Users, Briefcase, Clock } from 'lucide-react';
import axios from 'axios';
import { useLanguage } from '../context/LanguageContext';
import { Button } from '../components/ui/button';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const HomePage = () => {
  const { language, t } = useLanguage();
  const [testimonials, setTestimonials] = useState([]);
  const [projects, setProjects] = useState([]);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Seed data first
        await axios.post(`${API}/seed`);
        // Then fetch
        const [testimonialsRes, projectsRes] = await Promise.all([
          axios.get(`${API}/testimonials`),
          axios.get(`${API}/projects`)
        ]);
        setTestimonials(testimonialsRes.data);
        setProjects(projectsRes.data.slice(0, 3));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const clients = ['Mercedes-Benz', 'Amazon', 'Ford', 'Nobilia', 'Messe Köln', 'Messe Düsseldorf'];

  return (
    <div className="min-h-screen bg-[#09090B]">
      {/* Hero Section */}
      <section data-testid="hero-section" className="relative min-h-screen flex items-center">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1676207094190-bfbe93bbb393?crop=entropy&cs=srgb&fm=jpg&q=85"
            alt="Industrial cable trays"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#09090B]/80 via-[#09090B]/60 to-[#09090B]" />
        </div>

        {/* Grid Lines */}
        <div className="absolute inset-0 grid-lines opacity-30 z-0" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-32">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/30 mb-8 animate-fade-up">
            <Award size={16} className="text-primary" />
            <span className="text-primary text-sm font-semibold uppercase tracking-wider">
              {t('hero.badge')}
            </span>
          </div>

          {/* Title */}
          <h1 className="font-['Barlow_Condensed'] text-5xl md:text-7xl lg:text-8xl font-bold text-white uppercase tracking-tight leading-none mb-4 animate-fade-up animation-delay-100">
            {t('hero.title')}
            <br />
            <span className="text-primary">{t('hero.titleHighlight')}</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mb-10 leading-relaxed animate-fade-up animation-delay-200">
            {t('hero.subtitle')}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-up animation-delay-300">
            <Link to="/contact">
              <Button
                data-testid="hero-cta-primary"
                className="bg-primary text-white hover:bg-primary/90 h-14 px-10 rounded-none font-bold uppercase tracking-wider text-base shadow-[4px_4px_0px_0px_rgba(255,255,255,0.1)] hover:translate-x-1 hover:-translate-y-1 transition-all duration-300"
              >
                {t('hero.cta')}
                <ArrowRight size={20} className="ml-2" />
              </Button>
            </Link>
            <Link to="/projects">
              <Button
                data-testid="hero-cta-secondary"
                variant="outline"
                className="border-white/20 text-white hover:bg-white/5 h-14 px-10 rounded-none font-medium uppercase tracking-wider text-base"
              >
                {t('hero.ctaSecondary')}
              </Button>
            </Link>
          </div>

          {/* Client Logos */}
          <div className="mt-20 pt-10 border-t border-white/10 animate-fade-up animation-delay-400">
            <p className="text-zinc-500 text-sm uppercase tracking-widest mb-6">
              {language === 'pl' ? 'Zaufali nam' : 'Sie vertrauen uns'}
            </p>
            <div className="flex flex-wrap gap-8 items-center">
              {clients.map((client) => (
                <span key={client} className="text-zinc-500 font-medium text-lg hover:text-white transition-colors">
                  {client}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Decorative crosshair */}
        <span className="crosshair absolute bottom-10 right-10 hidden lg:block">+</span>
      </section>

      {/* Stats Section */}
      <section data-testid="stats-section" className="py-20 bg-[#18181B] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { value: '15+', label: t('about.experience'), icon: Clock },
              { value: '100+', label: t('about.projects'), icon: Briefcase },
              { value: '17', label: t('about.team'), icon: Users },
              { value: '50+', label: t('about.clients'), icon: Star },
            ].map((stat, index) => (
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

      {/* About Preview */}
      <section data-testid="about-preview-section" className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <span className="text-primary text-sm font-semibold uppercase tracking-widest">
                {t('about.subtitle')}
              </span>
              <h2 className="font-['Barlow_Condensed'] text-4xl md:text-5xl lg:text-6xl font-bold text-white uppercase mt-4 mb-6">
                {t('about.title')}
              </h2>
              <p className="text-zinc-400 leading-relaxed mb-8">
                {t('about.description')}
              </p>
              <Link to="/about">
                <Button
                  data-testid="about-cta"
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/5 h-12 px-8 rounded-none font-medium uppercase tracking-wider"
                >
                  {language === 'pl' ? 'Więcej o nas' : 'Mehr über uns'}
                  <ArrowRight size={18} className="ml-2" />
                </Button>
              </Link>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1695326612772-816651657d05?crop=entropy&cs=srgb&fm=jpg&q=85"
                alt="Workers on scaffolding"
                className="w-full aspect-[4/3] object-cover"
              />
              <div className="absolute -bottom-6 -left-6 bg-primary p-6 hidden md:block">
                <p className="font-['Barlow_Condensed'] text-4xl font-bold text-white">15+</p>
                <p className="text-white/80 text-sm uppercase tracking-wider">{t('about.experience')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Us Section */}
      <section data-testid="why-us-section" className="py-24 md:py-32 bg-[#18181B]/50">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <div className="text-center mb-16">
            <span className="text-primary text-sm font-semibold uppercase tracking-widest">
              {t('whyUs.subtitle')}
            </span>
            <h2 className="font-['Barlow_Condensed'] text-4xl md:text-5xl lg:text-6xl font-bold text-white uppercase mt-4">
              {t('whyUs.title')}
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {t('whyUs.items').map((item, index) => (
              <div
                key={index}
                data-testid={`why-us-item-${index}`}
                className="bg-[#18181B] border border-white/5 p-8 hover:border-primary/50 transition-colors duration-300 group"
              >
                <CheckCircle size={32} className="text-primary mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="font-['Barlow_Condensed'] text-xl font-bold text-white uppercase mb-3">
                  {item.title}
                </h3>
                <p className="text-zinc-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section data-testid="featured-projects-section" className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
            <div>
              <span className="text-primary text-sm font-semibold uppercase tracking-widest">
                {t('projects.subtitle')}
              </span>
              <h2 className="font-['Barlow_Condensed'] text-4xl md:text-5xl lg:text-6xl font-bold text-white uppercase mt-4">
                {t('projects.title')}
              </h2>
            </div>
            <Link to="/projects">
              <Button
                data-testid="projects-view-all"
                variant="outline"
                className="border-white/20 text-white hover:bg-white/5 h-12 px-8 rounded-none font-medium uppercase tracking-wider"
              >
                {t('projects.viewAll')}
                <ArrowRight size={18} className="ml-2" />
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <Link
                key={project.id}
                to="/projects"
                data-testid={`project-card-${index}`}
                className="group relative overflow-hidden bg-[#18181B] border border-white/5 hover:border-primary/50 transition-all duration-300"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={project.image_url}
                    alt={project.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <span className="text-primary text-xs uppercase tracking-widest">{project.location}</span>
                  <h3 className="font-['Barlow_Condensed'] text-xl font-bold text-white uppercase mt-2 mb-2">
                    {project.name}
                  </h3>
                  <p className="text-zinc-400 text-sm line-clamp-2">
                    {language === 'pl' ? project.description_pl : project.description_de}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      {testimonials.length > 0 && (
        <section data-testid="testimonials-section" className="py-24 md:py-32 bg-[#18181B]/50">
          <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
            <div className="text-center mb-16">
              <span className="text-primary text-sm font-semibold uppercase tracking-widest">
                {t('testimonials.subtitle')}
              </span>
              <h2 className="font-['Barlow_Condensed'] text-4xl md:text-5xl lg:text-6xl font-bold text-white uppercase mt-4">
                {t('testimonials.title')}
              </h2>
            </div>

            <div className="relative max-w-4xl mx-auto">
              <Quote size={64} className="text-primary/20 absolute -top-4 -left-4" />
              
              <div className="bg-[#18181B] border border-white/5 p-10 md:p-16 text-center">
                <div className="flex justify-center gap-1 mb-6">
                  {[...Array(testimonials[currentTestimonial]?.rating || 5)].map((_, i) => (
                    <Star key={i} size={20} className="text-primary fill-primary" />
                  ))}
                </div>
                
                <p className="text-xl md:text-2xl text-zinc-300 leading-relaxed mb-8 italic">
                  "{language === 'pl' 
                    ? testimonials[currentTestimonial]?.text_pl 
                    : testimonials[currentTestimonial]?.text_de}"
                </p>
                
                <p className="font-['Barlow_Condensed'] text-xl font-bold text-white uppercase">
                  {testimonials[currentTestimonial]?.name}
                </p>
                <p className="text-primary text-sm uppercase tracking-wider">
                  {testimonials[currentTestimonial]?.company}
                </p>
              </div>

              {/* Navigation */}
              {testimonials.length > 1 && (
                <div className="flex justify-center gap-4 mt-8">
                  <button
                    onClick={prevTestimonial}
                    data-testid="testimonial-prev"
                    className="p-3 border border-white/10 hover:border-primary/50 text-white hover:text-primary transition-colors"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button
                    onClick={nextTestimonial}
                    data-testid="testimonial-next"
                    className="p-3 border border-white/10 hover:border-primary/50 text-white hover:text-primary transition-colors"
                  >
                    <ChevronRight size={24} />
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section data-testid="cta-section" className="py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 warning-stripes opacity-50" />
        <div className="relative max-w-7xl mx-auto px-6 md:px-12 lg:px-24 text-center">
          <h2 className="font-['Barlow_Condensed'] text-4xl md:text-5xl lg:text-6xl font-bold text-white uppercase mb-6">
            {t('cta.title')}
          </h2>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto mb-10">
            {t('cta.subtitle')}
          </p>
          <Link to="/contact">
            <Button
              data-testid="cta-contact-button"
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

export default HomePage;
