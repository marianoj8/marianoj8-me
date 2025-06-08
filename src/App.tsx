import { useState } from 'react';
import { Github, Linkedin, MessageCircle, Menu, X, ExternalLink, Mail, ChevronRight, Instagram, Twitter, Facebook } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { useTranslation } from 'react-i18next';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const { t, i18n } = useTranslation();

  function sendEmail(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (name === '' || email === '' || message === '') {
      alert('Preencha todos os campos...');
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header/Navigation */}
      <header className="bg-[#1A1A2E] text-white fixed w-full z-50">
        <nav className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <a href="#" className="text-2xl font-bold">Mariano JavaSwing</a>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden"
              onClick={toggleMenu}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              <a href="#about" className="hover:text-blue-400 transition-colors">{t('aboutMe')}</a>
              <a href="#skills" className="hover:text-blue-400 transition-colors">{t('technicalSkills01')}</a>
              <a href="#projects" className="hover:text-blue-400 transition-colors">{t('projects')}</a>
              <a href="#contact" className="hover:text-blue-400 transition-colors">{t('contact')}</a>
              <select onChange={(e) => changeLanguage(e.target.value)} className="style">
                <option selected value="en">English</option>
                <option value="pt">Português</option>
              </select>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'} pt-4`}>
            <div className="flex flex-col space-y-4">
              <a href="#about" className="hover:text-blue-400 transition-colors" onClick={toggleMenu}>{t('aboutMe')}</a>
              <a href="#skills" className="hover:text-blue-400 transition-colors" onClick={toggleMenu}>{t('technicalSkills01')}</a>
              <a href="#projects" className="hover:text-blue-400 transition-colors" onClick={toggleMenu}>{t('projects')}</a>
              <a href="#contact" className="hover:text-blue-400 transition-colors" onClick={toggleMenu}>{t('contact')}</a>
              <select onChange={(e) => changeLanguage(e.target.value)} className="style">
                <option selected value="en">English</option>
                <option value="pt">Português</option>
              </select>
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-[#1A1A2E] text-white">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Desenvolvedor Sênior
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-4">
            11+ anos de experiência
          </p>
          <p className="text-lg md:text-xl text-gray-400 mb-8">
            Especialista em Java e Microserviços
          </p>
          <a
            href="#contact"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg
                     hover:bg-blue-700 transition-colors duration-200"
          >
            Entre em Contato <ChevronRight className="ml-2" />
          </a>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="w-full md:w-1/3">
              <img
                src="https://avatars.githubusercontent.com/u/43576446?v=4"
                // src="https://images.unsplash.com/photo-1556157382-97eda2d62296?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
                alt="Mariano JavaSwing"
                className="rounded-2xl shadow-lg w-full"
              />
            </div>
            <div className="w-full md:w-2/3">
              <h2 className="text-3xl font-bold mb-6">{t('aboutMe')}</h2>
              <p className="text-lg text-gray-700 leading-relaxed">{t('aboutMeContent')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">{t('technicalSkills01')}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              'Java', 'Spring Boot', 'Dart',
              'MySQL', 'PostgreSQL', 'Kafka', 'Flutter',
              'Docker', 'Kubernetes', t('microservices'), 'APIs RESTful'
            ].map((skill) => (
              <div
                key={skill}
                className="bg-gray-50 rounded-xl p-6 text-center shadow-md
                         hover:shadow-lg transition-shadow duration-200"
              >
                <h3 className="text-lg font-semibold text-gray-800">{skill}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">{t('highlightKeyProjects')}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Project 1 */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="h-48 bg-gradient-to-r from-blue-500 to-blue-700"></div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">
                  Sistema de Venda e Compra de Bilhetes de Transportes
                </h3>
                <p className="text-gray-600 mb-4">
                  Aplicativo móvel desenvolvido em Flutter para facilitar a compra e
                  venda de bilhetes de transporte público. Integração com APIs de
                  pagamento e notificações em tempo real.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                    Flutter
                  </span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                    Kafka
                  </span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                    PostgreSQL
                  </span>
                </div>
                <a
                  href="https://wasp-bm24.web.app/#/login"
                  className="inline-flex items-center text-blue-600 hover:text-blue-700"
                >Ver Detalhes <ExternalLink size={16} className="ml-1" />
                </a>
              </div>
            </div>

            {/* Project 2 */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="h-48 bg-gradient-to-r from-green-500 to-green-700"></div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Carteira Monetária Digital</h3>
                <p className="text-gray-600 mb-4">
                  Sistema de carteira digital para transações seguras e rápidas,
                  com integração a bancos e criptomoedas. Desenvolvido com arquitetura
                  de microserviços usando Spring Boot.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                    Java
                  </span>
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                    Spring Boot
                  </span>
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                    MySQL
                  </span>
                </div>
                <a
                  href="#"
                  className="inline-flex items-center text-green-600 hover:text-green-700"
                >
                  Ver Detalhes <ExternalLink size={16} className="ml-1" />
                </a>
              </div>
            </div>

            {/* Project 3 */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="h-48 bg-gradient-to-r from-purple-500 to-purple-700"></div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">
                  Plataforma de Gerenciamento de Microserviços
                </h3>
                <p className="text-gray-600 mb-4">
                  Sistema para gerenciamento e monitoramento de microserviços,
                  com integração a Docker e Kubernetes.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                    Java
                  </span>
                  <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                    Docker
                  </span>
                  <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                    Kubernetes
                  </span>
                </div>
                <a
                  href="#"
                  className="inline-flex items-center text-purple-600 hover:text-purple-700"
                >
                  Ver Detalhes <ExternalLink size={16} className="ml-1" />
                </a>
              </div>
            </div>

            {/* Project 4 */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="h-48 bg-gradient-to-r from-green-500 to-green-700"></div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">
                  Plataforma de Consumo e Gerenciamento de Energia Doméstico
                </h3>
                <p className="text-gray-600 mb-4">
                  Sistema para gerenciamento e monitoramento de consume de Energia Eletrica. (Async Energy)
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                    Dart
                  </span>
                  <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                    Flutter
                  </span>
                  <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                    Firebase
                  </span>
                </div>
                <a
                  href="https://async-energy.web.app/"
                  target='_blank'
                  className="inline-flex items-center text-purple-600 hover:text-purple-700"
                >
                  Ver Detalhes <ExternalLink size={16} className="ml-1" />
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-[#1A1A2E] text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Entre em Contato</h2>
          <div className="max-w-2xl mx-auto">
            <form className="space-y-6" onSubmit={(e) => sendEmail(e)}>
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Nome
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700
                           focus:outline-none focus:border-blue-500 text-white"
                  placeholder="Seu nome"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  E-mail
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700
                           focus:outline-none focus:border-blue-500 text-white"
                  placeholder="seu@email.com"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Mensagem
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700
                           focus:outline-none focus:border-blue-500 text-white"
                  placeholder="Sua mensagem"
                  onChange={(e) => setMessage(e.target.value)}
                  value={message}
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg
                         hover:bg-blue-700 transition-colors duration-200"
              >
                Enviar Mensagem
              </button>
            </form>

            <div className="mt-12 flex justify-center space-x-6">
              <a href="https://www.facebook.com/JavaSwing/" target='_blank' className="text-gray-300 hover:text-white">
                <Facebook className="h-5 w-5" />
              </a>

              {/* GITHUB */}
              <a
                href="https://github.com/marianoj8"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Github size={24} />
              </a>

              {/* X */}
              <a href="https://x.com/MJavaswing" target='_blank' className="text-gray-300 hover:text-white">
                <Twitter className="h-5 w-5" />
              </a>

              {/* TELEGRAM */}
              <a
                href="https://t.me/marianoj8"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <MessageCircle size={24} />
              </a>

              {/* INSTAGRAM */}
              <a href="https://www.instagram.com/marianojavaswing/" target='_blank' className="text-gray-300 hover:text-white">
                <Instagram className="h-5 w-5" />
              </a>

              {/* LINKED-IN */}
              <a
                href="https://ao.linkedin.com/in/mariano-javaswing-a44763180"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Linkedin size={24} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1A1A2E] text-gray-400 py-8">
        <div className="container mx-auto px-4 text-center">
          <p>© 2024 Mariano J8. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;