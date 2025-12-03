import { useState, useEffect } from 'react';
import { Github, Linkedin, MessageCircle, Menu, X, ExternalLink, Mail, ChevronRight, Instagram, Twitter, Facebook, Code2, Rocket, Zap, Moon, Sun } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { useTranslation } from 'react-i18next';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = ['about', 'skills', 'projects', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const { t, i18n } = useTranslation();

  function sendEmail(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (name === '' || email === '' || message === '') {
      alert(t('fillAllFields'));
      return;
    }

    const templateParams = {
      name: name,
      message: message,
      email: email,
    }

    emailjs.send('service_et13jdk', 'template_yj32pl3', templateParams, 'uSdQGv_eS-ztvEdX7')
      .then((response) => {
        setName('');
        setEmail('');
        setMessage('');
      })
      .catch((error) => {
        console.log("ERROR:", error);
      });
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  }

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    localStorage.setItem('darkMode', JSON.stringify(!darkMode));
  }

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-colors duration-300">
      {/* Header/Navigation */}
      <header className={`text-white fixed w-full z-50 transition-all duration-500 ${
        scrolled ? 'bg-slate-900/95 backdrop-blur-lg shadow-xl' : 'bg-transparent'
      }`}>
        <nav className="container mx-auto px-4 py-5">
          <div className="flex justify-between items-center">
            <a href="#" className="text-2xl font-bold flex items-center gap-2 group">
              <Code2 className="group-hover:rotate-12 transition-transform duration-300" />
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Mariano JavaSwing
              </span>
            </a>

            {/* Mobile Menu Button */}
            <select onChange={(e) => changeLanguage(e.target.value)} className="style md:hidden">
              <option selected value="en">English</option>
              <option value="pt">Português</option>
              <option value="ru">Русский</option>
            </select>

            <button
              className="md:hidden"
              onClick={toggleMenu}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              <a href="#about" className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                activeSection === 'about' ? 'bg-blue-500/20 text-blue-400' : 'hover:text-blue-400'
              }`}>{t('aboutMe')}</a>
              <a href="#skills" className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                activeSection === 'skills' ? 'bg-blue-500/20 text-blue-400' : 'hover:text-blue-400'
              }`}>{t('technicalSkills01')}</a>
              <a href="#projects" className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                activeSection === 'projects' ? 'bg-blue-500/20 text-blue-400' : 'hover:text-blue-400'
              }`}>{t('projects')}</a>
              <a href="#contact" className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                activeSection === 'contact' ? 'bg-blue-500/20 text-blue-400' : 'hover:text-blue-400'
              }`}>{t('contact')}</a>
              <select onChange={(e) => changeLanguage(e.target.value)} className="style">
                <option selected value="en">English</option>
                <option value="pt">Português</option>
                <option value="ru">Русский</option>
              </select>
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-lg hover:bg-blue-500/20 transition-all duration-300"
                aria-label="Toggle dark mode"
              >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'} pt-4`}>
            <div className="flex flex-col space-y-4">
              <a href="#about" className="hover:text-blue-400 transition-colors" onClick={toggleMenu}>{t('aboutMe')}</a>
              <a href="#skills" className="hover:text-blue-400 transition-colors" onClick={toggleMenu}>{t('technicalSkills01')}</a>
              <a href="#projects" className="hover:text-blue-400 transition-colors" onClick={toggleMenu}>{t('projects')}</a>
              <a href="#contact" className="hover:text-blue-400 transition-colors" onClick={toggleMenu}>{t('contact')}</a>
              <button
                onClick={toggleDarkMode}
                className="flex items-center gap-2 hover:text-blue-400 transition-colors"
              >
                {darkMode ? <><Sun size={20} /> Light Mode</> : <><Moon size={20} /> Dark Mode</>}
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full filter blur-[128px] animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500 rounded-full filter blur-[128px] animate-pulse" style={{animationDelay: '1s'}}></div>
          </div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 backdrop-blur-sm border border-blue-500/20 rounded-full mb-8 animate-fade-in">
              <Zap className="w-4 h-4 text-blue-400" />
              <span className="text-blue-300 text-sm font-medium">{t('yearsOfExp')}</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-slide-up">
              <span className="bg-gradient-to-r from-white via-blue-100 to-cyan-200 bg-clip-text text-transparent">
                {t('seniorJavaDeveloper')}
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-blue-200 mb-12 animate-slide-up" style={{animationDelay: '0.2s'}}>
              {t('expertIn')}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{animationDelay: '0.4s'}}>
              <a
                href="#contact"
                className="group relative inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-semibold overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/50"
              >
                <span className="relative z-10 flex items-center gap-2">
                  {t('contactMe')}
                  <ChevronRight className="group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </a>

              <a
                href="#projects"
                className="inline-flex items-center justify-center px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-xl font-semibold border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105"
              >
                <Rocket className="mr-2 w-5 h-5" />
                {t('projects')}
              </a>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-3 bg-white/60 rounded-full"></div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 relative dark:bg-slate-900/50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="w-full md:w-1/3 group">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-3xl opacity-20 group-hover:opacity-30 blur-xl transition-opacity duration-500"></div>
                <img
                  src="https://avatars.githubusercontent.com/u/43576446?v=4"
                  alt="Mariano JavaSwing"
                  className="relative rounded-2xl shadow-2xl w-full transform group-hover:scale-105 transition-transform duration-500 border-4 border-white/10 dark:border-slate-700"
                />
              </div>
            </div>
            <div className="w-full md:w-2/3">
              <div className="inline-block px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm font-semibold mb-6">
                {t('aboutMe')}
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-slate-900 to-slate-600 dark:from-slate-100 dark:to-slate-400 bg-clip-text text-transparent">
                {t('creatingSolutionsTitle')}
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                {t('aboutMeContent')}
              </p>
              <div className="flex flex-wrap gap-4 mt-8">
                <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="font-medium">{t('yearsExperience')}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                  <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
                  <span className="font-medium">{t('projectsDelivered')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-32 bg-white dark:bg-slate-800 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600"></div>
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm font-semibold mb-4">
              {t('technicalSkills02')}
            </div>
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 dark:from-slate-100 dark:to-slate-400 bg-clip-text text-transparent">
              {t('technologiesAndTools')}
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-6 max-w-6xl mx-auto">
            {[
              'Java', 'Spring Boot', 'Dart', 'Typescript',
              'MySQL', 'PostgreSQL', 'Firebase', 'Kafka', 'Flutter',
              'Docker', 'Kubernetes', t('microservices'), 'APIs RESTful'
            ].map((skill, index) => (
              <div
                key={skill}
                className="group relative bg-gradient-to-br from-white to-slate-50 dark:from-slate-700 dark:to-slate-600 rounded-2xl p-6 text-center shadow-lg hover:shadow-2xl transition-all duration-500 border border-slate-200 dark:border-slate-600 hover:border-blue-300 dark:hover:border-blue-500 hover:-translate-y-2"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/0 to-cyan-600/0 group-hover:from-blue-600/5 group-hover:to-cyan-600/5 rounded-2xl transition-all duration-500"></div>
                <h3 className="relative text-base font-bold text-slate-800 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{skill}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-32 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm font-semibold mb-4">
              {t('portfolio')}
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-slate-900 to-slate-600 dark:from-slate-100 dark:to-slate-400 bg-clip-text text-transparent">
              {t('highlightKeyProjects')}
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-lg max-w-2xl mx-auto">
              {t('projectsDescription')}
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Project 1 */}
            <div className="group bg-white dark:bg-slate-700 rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 border border-slate-200 dark:border-slate-600 hover:border-blue-300 dark:hover:border-blue-500 hover:-translate-y-2">
              <div className="h-56 bg-gradient-to-br from-blue-500 via-blue-600 to-cyan-600 relative overflow-hidden">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-500"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Rocket className="w-16 h-16 text-white/80 group-hover:scale-110 transition-transform duration-500" />
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {t('PublicTransportTicketSalesAndPurchaseSystem')}
                </h3>
                <p className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
                  {t('PublicTransportTicketSalesAndPurchaseSystemDescription')}
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="px-4 py-1.5 bg-blue-50 text-blue-700 rounded-full text-sm font-medium border border-blue-200">
                    Flutter
                  </span>
                  <span className="px-4 py-1.5 bg-blue-50 text-blue-700 rounded-full text-sm font-medium border border-blue-200">
                    Firebase
                  </span>
                </div>
                <a
                  href="https://wasp-bm24.web.app/login"
                  target='_blank'
                  className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold group/link"
                >
                  {t('viewDetails')}
                  <ExternalLink size={16} className="group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
                </a>
              </div>
            </div>

            {/* Project 2 */}
            <div className="group bg-white dark:bg-slate-700 rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 border border-slate-200 dark:border-slate-600 hover:border-emerald-300 dark:hover:border-emerald-500 hover:-translate-y-2">
              <div className="h-56 bg-gradient-to-br from-emerald-500 via-green-600 to-teal-600 relative overflow-hidden">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-500"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Zap className="w-16 h-16 text-white/80 group-hover:scale-110 transition-transform duration-500" />
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-slate-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">{t('digitalWallet')}</h3>
                <p className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
                  {t('digitalWalletDescription')}
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="px-4 py-1.5 bg-emerald-50 text-emerald-700 rounded-full text-sm font-medium border border-emerald-200">
                    Flutter
                  </span>
                  <span className="px-4 py-1.5 bg-emerald-50 text-emerald-700 rounded-full text-sm font-medium border border-emerald-200">
                    Firebase
                  </span>
                </div>
                <a
                  href="#"
                  className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-semibold group/link"
                >
                  {t('viewDetails')}
                  <ExternalLink size={16} className="group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
                </a>
              </div>
            </div>

            {/* Project 3 */}
            <div className="group bg-white dark:bg-slate-700 rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 border border-slate-200 dark:border-slate-600 hover:border-orange-300 dark:hover:border-orange-500 hover:-translate-y-2">
              <div className="h-56 bg-gradient-to-br from-orange-500 via-amber-600 to-yellow-600 relative overflow-hidden">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-500"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Code2 className="w-16 h-16 text-white/80 group-hover:scale-110 transition-transform duration-500" />
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-slate-100 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                  {t('microservicesPlatform')}
                </h3>
                <p className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
                  {t('microservicesPlatformDescription')}
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="px-4 py-1.5 bg-orange-50 text-orange-700 rounded-full text-sm font-medium border border-orange-200">
                    Java
                  </span>
                  <span className="px-4 py-1.5 bg-orange-50 text-orange-700 rounded-full text-sm font-medium border border-orange-200">
                    Docker
                  </span>
                  <span className="px-4 py-1.5 bg-orange-50 text-orange-700 rounded-full text-sm font-medium border border-orange-200">
                    Kubernetes
                  </span>
                </div>
                <a
                  href="#"
                  className="inline-flex items-center gap-2 text-orange-600 hover:text-orange-700 font-semibold group/link"
                >
                  {t('viewDetails')}
                  <ExternalLink size={16} className="group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
                </a>
              </div>
            </div>

            {/* Project 4 */}
            <div className="group bg-white dark:bg-slate-700 rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 border border-slate-200 dark:border-slate-600 hover:border-teal-300 dark:hover:border-teal-500 hover:-translate-y-2">
              <div className="h-56 bg-gradient-to-br from-teal-500 via-cyan-600 to-blue-600 relative overflow-hidden">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-500"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Zap className="w-16 h-16 text-white/80 group-hover:scale-110 transition-transform duration-500" />
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-slate-100 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                  {t('energyPlatform')}
                </h3>
                <p className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
                  {t('energyPlatformDescription')}
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="px-4 py-1.5 bg-teal-50 text-teal-700 rounded-full text-sm font-medium border border-teal-200">
                    HTML5
                  </span>
                  <span className="px-4 py-1.5 bg-teal-50 text-teal-700 rounded-full text-sm font-medium border border-teal-200">
                    CSS3
                  </span>
                  <span className="px-4 py-1.5 bg-teal-50 text-teal-700 rounded-full text-sm font-medium border border-teal-200">
                    TS/JS
                  </span>
                  <span className="px-4 py-1.5 bg-teal-50 text-teal-700 rounded-full text-sm font-medium border border-teal-200">
                    Firebase
                  </span>
                </div>
                <a
                  href="https://async-energy.web.app/"
                  target='_blank'
                  className="inline-flex items-center gap-2 text-teal-600 hover:text-teal-700 font-semibold group/link"
                >
                  {t('viewDetails')}
                  <ExternalLink size={16} className="group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
                </a>
              </div>
            </div>

            {/* Project 5 - SGDEA */}
            <div className="group bg-white dark:bg-slate-700 rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 border border-slate-200 dark:border-slate-600 hover:border-violet-300 dark:hover:border-violet-500 hover:-translate-y-2">
              <div className="h-56 bg-gradient-to-br from-violet-500 via-purple-600 to-fuchsia-600 relative overflow-hidden">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-500"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Code2 className="w-16 h-16 text-white/80 group-hover:scale-110 transition-transform duration-500" />
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-slate-100 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
                  {t('sgdeaTitle')}
                </h3>
                <p className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
                  {t('sgdeaDescription')}
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="px-4 py-1.5 bg-violet-50 text-violet-700 rounded-full text-sm font-medium border border-violet-200">
                    React
                  </span>
                  <span className="px-4 py-1.5 bg-violet-50 text-violet-700 rounded-full text-sm font-medium border border-violet-200">
                    TypeScript
                  </span>
                  <span className="px-4 py-1.5 bg-violet-50 text-violet-700 rounded-full text-sm font-medium border border-violet-200">
                    PostgreSQL
                  </span>
                  <span className="px-4 py-1.5 bg-violet-50 text-violet-700 rounded-full text-sm font-medium border border-violet-200">
                    Vite
                  </span>
                </div>
                <a
                  href="https://wasp-du.web.app/about"
                  target='_blank'
                  className="inline-flex items-center gap-2 text-violet-600 hover:text-violet-700 font-semibold group/link"
                >
                  {t('viewDetails')}
                  <ExternalLink size={16} className="group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-blue-500 rounded-full filter blur-[128px]"></div>
          <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-cyan-500 rounded-full filter blur-[128px]"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-blue-500/20 text-blue-300 rounded-full text-sm font-semibold mb-4 border border-blue-500/30">
              {t('contact')}
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              {t('contactMe')}
            </h2>
            <p className="text-blue-200 text-lg max-w-2xl mx-auto">
              {t('letsDiscuss')}
            </p>
          </div>
          <div className="max-w-2xl mx-auto">
            <form className="space-y-6 bg-white/5 backdrop-blur-lg p-8 md:p-10 rounded-3xl border border-white/10 shadow-2xl" onSubmit={(e) => sendEmail(e)}>
              <div>
                <label htmlFor="name" className="block text-sm font-semibold mb-3 text-blue-200">
                  {t('name')}
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-5 py-4 rounded-xl bg-white/10 border border-white/20
                           focus:outline-none focus:border-blue-400 focus:bg-white/15 text-white placeholder-white/40 transition-all duration-300 backdrop-blur-sm"
                  placeholder={t('yourName')}
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-semibold mb-3 text-blue-200">
                  E-mail
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-5 py-4 rounded-xl bg-white/10 border border-white/20
                           focus:outline-none focus:border-blue-400 focus:bg-white/15 text-white placeholder-white/40 transition-all duration-300 backdrop-blur-sm"
                  placeholder={t('yourEmail')}
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-semibold mb-3 text-blue-200">
                  {t('message')}
                </label>
                <textarea
                  id="message"
                  rows={5}
                  className="w-full px-5 py-4 rounded-xl bg-white/10 border border-white/20
                           focus:outline-none focus:border-blue-400 focus:bg-white/15 text-white placeholder-white/40 transition-all duration-300 backdrop-blur-sm resize-none"
                  placeholder={t('yourMessage')}
                  onChange={(e) => setMessage(e.target.value)}
                  value={message}
                ></textarea>
              </div>
              <button
                type="submit"
                className="group relative w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-semibold overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-blue-500/50"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {t('sendMessage')}
                  <Mail className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </button>
            </form>

            <div className="mt-12 flex justify-center flex-wrap gap-4">
              <a href="https://www.facebook.com/JavaSwing/" target='_blank' className="group p-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:scale-110">
                <Facebook className="h-6 w-6 text-blue-200 group-hover:text-white transition-colors" />
              </a>

              {/* GITHUB */}
              <a
                href="https://github.com/marianoj8"
                target="_blank"
                rel="noopener noreferrer"
                className="group p-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:scale-110"
              >
                <Github className="h-6 w-6 text-blue-200 group-hover:text-white transition-colors" />
              </a>

              {/* X */}
              <a href="https://x.com/MJavaswing" target='_blank' className="group p-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:scale-110">
                <Twitter className="h-6 w-6 text-blue-200 group-hover:text-white transition-colors" />
              </a>

              {/* TELEGRAM */}
              <a
                href="https://t.me/marianoj8"
                target="_blank"
                rel="noopener noreferrer"
                className="group p-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:scale-110"
              >
                <MessageCircle className="h-6 w-6 text-blue-200 group-hover:text-white transition-colors" />
              </a>

              {/* INSTAGRAM */}
              <a href="https://www.instagram.com/marianojavaswing/" target='_blank' className="group p-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:scale-110">
                <Instagram className="h-6 w-6 text-blue-200 group-hover:text-white transition-colors" />
              </a>

              {/* LINKED-IN */}
              <a
                href="https://ao.linkedin.com/in/mariano-javaswing-a44763180"
                target="_blank"
                rel="noopener noreferrer"
                className="group p-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:scale-110"
              >
                <Linkedin className="h-6 w-6 text-blue-200 group-hover:text-white transition-colors" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-400 py-12 border-t border-white/5">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <Code2 className="w-6 h-6 text-blue-400" />
              <span className="text-lg font-bold text-white">Mariano JavaSwing</span>
            </div>
            <p className="text-center">© 2024 Mariano J8. {t('allRightsReserved')}</p>
            <div className="text-sm text-slate-500">
              {t('developedWith')}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;