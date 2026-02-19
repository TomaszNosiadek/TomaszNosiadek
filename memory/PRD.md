# Stal Tech Invest - PRD

## Original Problem Statement
Stal Tech Invest Sp. z o.o. - profesjonalny montaż systemów tras kablowych w obiektach przemysłowych, logistycznych i komercyjnych. Ponad 15 lat doświadczenia na rynku niemieckim, współpraca z NIEDAX.

## User Requirements
- Pełna strona firmowa z podstronami (O nas, Usługi, Realizacje, Kontakt)
- Sekcja opinii klientów
- Mapa lokalizacji Google Maps
- Styl industrialny (ciemne odcienie, stal, beton)
- Logo firmy (wgrane przez użytkownika)
- Dwujęzyczność: Polski i Niemiecki
- Ikony social media: LinkedIn, WhatsApp

## User Personas
1. **Zarządcy obiektów przemysłowych** - szukają profesjonalnych wykonawców
2. **Firmy budowlane** - potrzebują podwykonawców do tras kablowych
3. **Deweloperzy centrów logistycznych** - wymagają terminowości i jakości
4. **Inwestorzy niemieckojęzyczni** - kontynuacja współpracy z rynku DE

## Core Requirements (Static)
- [x] Responsywna strona internetowa
- [x] 5 podstron: Home, O nas, Usługi, Realizacje, Kontakt
- [x] Przełącznik języka PL/DE
- [x] Formularz kontaktowy z zapisem do bazy
- [x] Mapa Google Maps
- [x] Sekcja opinii klientów
- [x] Logo firmowe
- [x] Ikony social media (LinkedIn, WhatsApp)

## What's Been Implemented (2026-02-19)
### Backend (FastAPI + MongoDB)
- API endpoints: /api/testimonials, /api/projects, /api/contact, /api/seed
- Modele Pydantic dla Testimonial, Project, ContactMessage
- Seed data z przykładowymi projektami i opiniami

### Frontend (React + Tailwind CSS)
- 5 stron: HomePage, AboutPage, ServicesPage, ProjectsPage, ContactPage
- LanguageContext dla obsługi PL/DE
- Navbar z logo, nawigacją, social media (LinkedIn, WhatsApp), przełącznikiem języka
- Footer z logo, linkami, social media
- Formularz kontaktowy z walidacją i wysyłką do API
- Google Maps embed
- Responsywny design mobilny

### Design System
- Kolory: #09090B (tło), #F97316 (primary orange), #18181B (surface)
- Fonty: Barlow Condensed (nagłówki), Manrope (body)
- Styl: Industrial Brutalism, ostre krawędzie, bez zaokrągleń

## Prioritized Backlog
### P0 (Done)
- [x] Strona główna z hero
- [x] Wszystkie 5 podstron
- [x] Dwujęzyczność PL/DE
- [x] Formularz kontaktowy
- [x] Logo i social media

### P1 (Future)
- [ ] Panel administracyjny do zarządzania treścią
- [ ] Integracja email (SendGrid/Resend) dla formularza
- [ ] Galeria zdjęć z możliwością uploadu
- [ ] CMS dla projektów i opinii

### P2 (Nice to have)
- [ ] Blog firmowy
- [ ] Kalkulator wyceny
- [ ] System rezerwacji spotkań
- [ ] Integracja z CRM

## Next Tasks
1. Dodać rzeczywiste dane kontaktowe firmy
2. Zaktualizować adres na mapie Google Maps
3. Wgrać więcej zdjęć realizacji
4. Rozważyć integrację email dla formularza kontaktowego
