import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from '../locales/en.json';
import pt from '../locales/pt.json';

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
    en: {
        translation: {
            aboutMe: "About Me",
            technicalSkills01: "Technical Skills",
            technicalSkills02: "Technical Skills",
            microservices: "Microservices",
            highlightKeyProjects: "Highlight key projects",
            projects: "Projects",
            contact: "Contact",
            aboutMeContent: "Senior Developer with over 11 years of experience in technologies such as Java, Spring, Kafka, MySQL, PostgreSQL, and Dart. Expert in microservices architecture and scalable system development. Passionate about creating innovative solutions, I have worked on challenging projects, ranging from high-performance systems to modern mobile applications and online payment system integrations."
        }
    },
    pt: {
        translation: {
            aboutMe: "Sobre Mim",
            technicalSkills01: "Habilidades",
            technicalSkills02: "Habilidades Técnicas",
            microservices: "Microserviços",
            highlightKeyProjects: "Projetos Destacados",
            projects: "Projetos",
            contact: "Contato",
            aboutMeContent: "Desenvolvedor sênior com mais de 11 anos de experiência em tecnologias como Java, Spring, Kafka, MySQL, PostgreSQL e Dart. Especialista em arquitetura de microserviços e desenvolvimento de sistemas escaláveis. Apaixonado por criar soluções inovadoras, já trabalhei em projetos desafiadores, desde sistemas de alta performance até aplicativos móveis modernos e integração de sistemas de pagamentos online.",
        }
    }
};

i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources,
        lng: "en", // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
        // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
        // if you're using a language detector, do not define the lng option

        interpolation: {
            escapeValue: false // react already safes from xss
        }
    });

export default i18n;