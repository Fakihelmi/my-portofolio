
import React, { useEffect, useState } from "react";
import {
  ArrowDown,
  ArrowUpRight,
  Briefcase,
  Calendar,
  Code2,
  Cpu,
  Download,
  ExternalLink,
  Github,
  Globe,
  GraduationCap,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  Smartphone,
  Users,
  Wrench,
  X
} from "lucide-react";

// =====================================================
// TYPES
// =====================================================

type Language = "id" | "en";

type Bilingual = {
  id: string;
  en: string;
};

type Project = {
  title: string;
  category: Bilingual;
  description: Bilingual;
  technologies: string[];
  github: string;
  cover: {
    background: string;
    accent: string;
    shortName: string;
    number: string;
  };
};

type Experience = {
  period: Bilingual;
  position: Bilingual;
  company: string;
  description: Bilingual;
};

type Organization = {
  position: Bilingual;
  name: string;
  description: Bilingual;
};

type Photo = {
  src: string;
  title: Bilingual;
  description: Bilingual;
};

// =====================================================
// PERSONAL DATA
// =====================================================

const PERSONAL = {
  name: "Fakih Helmi Maulana",
  university: "Universitas Pasundan",
  email: "helmifakih5@gmail.com",
  phone: "0857-1929-5413",
  location: "Bekasi, Jawa Barat",
  github: "https://github.com/Fakihelmi",
  linkedin:
    "https://www.linkedin.com/in/fakih-helmi-maulana/",
  cv: "/resume.pdf",
  photo: "/foto-saya.jpg"
};

// =====================================================
// TRANSLATIONS
// =====================================================

const TEXT = {
  id: {
    nav: {
      about: "Tentang Saya",
      experience: "Pengalaman",
      skills: "Keahlian",
      projects: "Proyek",
      organization: "Organisasi",
      contact: "Kontak"
    },

    graduate: "LULUSAN TEKNIK INFORMATIKA",
    welcome: "Halo, Saya",
    welcomeDescription:
      "Lulusan Teknik Informatika Universitas Pasundan dengan pengalaman dalam pengembangan aplikasi web, mobile, dan Internet of Things. Saya senang membangun solusi teknologi yang fungsional dan bermanfaat.",
    explore: "Jelajahi Portofolio",
    download: "Unduh CV",
    contactMe: "Hubungi Saya",

    heroTitle1: "Mengembangkan Solusi",
    heroTitle2: "Digital yang Bermanfaat",
    heroDescription:
      "Lulusan Teknik Informatika Universitas Pasundan dengan pengalaman dalam pengembangan aplikasi web, mobile, dan Internet of Things (IoT). Memiliki ketertarikan dalam membangun sistem yang efisien, fungsional, dan mudah digunakan.",
    role: "Lulusan Teknik Informatika",
    location: "Domisili",
    githubProfile: "Profil GitHub",

    aboutLabel: "PROFIL",
    aboutTitle: "Tentang Saya",
    aboutText:
      "Saya adalah lulusan Teknik Informatika Universitas Pasundan dengan IPK 3,46. Memiliki pengalaman dalam pengembangan aplikasi mobile, pembangunan antarmuka web, administrasi basis data, serta integrasi perangkat keras melalui sistem Internet of Things. Selain kemampuan teknis, saya juga berpengalaman dalam kepemimpinan organisasi, komunikasi, dan koordinasi tim.",
    aboutCards: [
      ["Pendidikan", "S1 Teknik Informatika"],
      ["Bidang Keahlian", "Web, Mobile & IoT"],
      ["Pengalaman", "Profesional & Organisasi"]
    ],

    experienceLabel: "RIWAYAT PROFESIONAL",
    experienceTitle: "Pengalaman Kerja",
    experienceText:
      "Pengalaman profesional dalam pengembangan perangkat lunak, pengelolaan data, dan penerapan teknologi.",

    skillsLabel: "KOMPETENSI",
    skillsTitle: "Keahlian & Teknologi",
    skillsText:
      "Teknologi dan perangkat kerja yang saya gunakan untuk mengembangkan aplikasi dan sistem terintegrasi.",

    projectsLabel: "HASIL KARYA",
    projectsTitle: "Proyek Pilihan",
    projectsText:
      "Beberapa proyek pengembangan web, mobile, dan Internet of Things. Setiap proyek dilengkapi repository GitHub agar implementasi kode dapat diperiksa.",
    sourceCode: "Lihat Source Code",

    organizationLabel: "KEPEMIMPINAN",
    organizationTitle: "Pengalaman Organisasi",
    organizationText:
      "Pengalaman dalam koordinasi organisasi, kepemimpinan tim, perencanaan kegiatan, dan kerja sama.",

    galleryTitle: "Dokumentasi Kegiatan HMTIF",
    galleryText:
      "Dokumentasi kegiatan selama menjalankan tanggung jawab sebagai Sekretaris Jenderal HMTIF Universitas Pasundan.",
    viewPhoto: "Lihat Foto",
    closePhoto: "Tutup Foto",

    educationLabel: "AKADEMIK",
    educationTitle: "Pendidikan",
    degree: "Sarjana Teknik Informatika",
    educationPeriod: "November 2022 - September 2026",
    gpa: "IPK",
    educationText:
      "Fokus pada analisis sistem, pengembangan aplikasi web dan mobile, teknologi basis data, serta Internet of Things.",

    contactLabel: "MARI TERHUBUNG",
    contactTitle: "Mari Berdiskusi & Berkolaborasi",
    contactText:
      "Saya terbuka untuk kesempatan kerja, kolaborasi proyek, dan diskusi mengenai pengembangan aplikasi web, mobile, serta Internet of Things.",

    footerRole:
      "Lulusan Teknik Informatika | Software Developer",
    copyright: "Hak cipta dilindungi."
  },

  en: {
    nav: {
      about: "About Me",
      experience: "Experience",
      skills: "Skills",
      projects: "Projects",
      organization: "Leadership",
      contact: "Contact"
    },

    graduate: "INFORMATICS ENGINEERING GRADUATE",
    welcome: "Hello, I'm",
    welcomeDescription:
      "An Informatics Engineering graduate from Universitas Pasundan with experience in web development, mobile applications, and Internet of Things. I enjoy building practical and meaningful technology solutions.",
    explore: "Explore Portofolio",
    download: "Download CV",
    contactMe: "Contact Me",

    heroTitle1: "Developing Meaningful",
    heroTitle2: "Digital Solutions",
    heroDescription:
      "An Informatics Engineering graduate from Universitas Pasundan with experience in web development, mobile applications, and Internet of Things (IoT). Passionate about building efficient, functional, and user-friendly systems.",
    role: "Informatics Engineering Graduate",
    location: "Based in",
    githubProfile: "GitHub Profile",

    aboutLabel: "PROFILE",
    aboutTitle: "About Me",
    aboutText:
      "I am an Informatics Engineering graduate from Universitas Pasundan with a GPA of 3.46/4.00. My experience includes mobile application development, web interface development, database administration, and hardware integration through Internet of Things systems. I also have experience in organizational leadership, communication, and team coordination.",
    aboutCards: [
      ["Education", "Bachelor of Informatics Engineering"],
      ["Specialization", "Web, Mobile & IoT"],
      ["Experience", "Professional & Leadership"]
    ],

    experienceLabel: "PROFESSIONAL BACKGROUND",
    experienceTitle: "Work Experience",
    experienceText:
      "Professional experience in software development, data management, and technology implementation.",

    skillsLabel: "EXPERTISE",
    skillsTitle: "Skills & Technologies",
    skillsText:
      "Technologies and tools I use to develop applications and integrated systems.",

    projectsLabel: "SELECTED WORK",
    projectsTitle: "Featured Projects",
    projectsText:
      "A selection of web, mobile, and Internet of Things projects. Each project includes a GitHub repository for reviewing its implementation.",
    sourceCode: "View Source Code",

    organizationLabel: "LEADERSHIP",
    organizationTitle: "Organizational Experience",
    organizationText:
      "Experience in organizational coordination, team leadership, event planning, and collaboration.",

    galleryTitle: "HMTIF Activity Documentation",
    galleryText:
      "Documentation of activities during my role as Secretary General of HMTIF at Universitas Pasundan.",
    viewPhoto: "View Photo",
    closePhoto: "Close Photo",

    educationLabel: "ACADEMIC BACKGROUND",
    educationTitle: "Education",
    degree: "Bachelor of Informatics Engineering",
    educationPeriod: "November 2022 - September 2026",
    gpa: "GPA",
    educationText:
      "Focused on systems analysis, web and mobile development, database technologies, and Internet of Things.",

    contactLabel: "GET IN TOUCH",
    contactTitle: "Let's Connect & Collaborate",
    contactText:
      "I am open to professional opportunities, collaborative projects, and conversations about web, mobile, and Internet of Things development.",

    footerRole:
      "Informatics Engineering Graduate | Software Developer",
    copyright: "All rights reserved."
  }
};

// =====================================================
// EXPERIENCES
// =====================================================

const EXPERIENCES: Experience[] = [
  {
    period: {
      id: "Agustus 2025 - Desember 2025",
      en: "August 2025 - December 2025"
    },
    position: {
      id: "Full Stack Mobile App",
      en: "Full Stack Mobile App Developer"
    },
    company: "PT. ARG",
    description: {
      id:
        "Mengembangkan dan memelihara aplikasi mobile untuk kebutuhan perusahaan pertambangan, serta mendukung pengembangan perangkat lunak agar berjalan sesuai kebutuhan.",
      en:
        "Developed and maintained mobile applications for a mining company, supporting software development and improvements to meet operational requirements."
    }
  },
  {
    period: {
      id: "April 2023 - Juli 2023",
      en: "April 2023 - July 2023"
    },
    position: {
      id: "Front End & Database Administrator",
      en: "Front End & Database Administrator"
    },
    company: "Dinas Kota Cilegon",
    description: {
      id:
        "Mengembangkan antarmuka aplikasi Web GIS Kota Cilegon, merancang skema basis data, dan mengelola data untuk kebutuhan sistem informasi geografis.",
      en:
        "Developed the front-end interface for Cilegon City's Web GIS application, designed database schemas, and managed geographical information data."
    }
  },
  {
    period: {
      id: "Februari 2023 - Maret 2023",
      en: "February 2023 - March 2023"
    },
    position: {
      id: "Perencanaan Tata Ruang",
      en: "Spatial Planning"
    },
    company: "Dinas Kota Bogor",
    description: {
      id:
        "Melaksanakan survei lapangan daerah rawan bencana, mendukung simulasi kesiapsiagaan bencana, dan melakukan pemetaan digital.",
      en:
        "Conducted field surveys in disaster-prone areas, supported disaster preparedness simulations, and performed digital mapping."
    }
  }
];

// =====================================================
// PROJECTS
// =====================================================

const PROJECTS: Project[] = [
  {
    title: "GPS Tracker IoT",
    category: {
      id: "Internet of Things",
      en: "Internet of Things"
    },
    description: {
      id:
        "Proyek pelacakan GPS berbasis Internet of Things dengan integrasi pemrograman embedded system dan perangkat keras.",
      en:
        "An IoT-based GPS tracking project integrating embedded system programming and hardware."
    },
    technologies: [
      "C++",
      "ESP32",
      "GPS",
      "Embedded System"
    ],
    github:
      "https://github.com/Fakihelmi/GPS_Tracker_io",
    cover: {
      background: "#102C4B",
      accent: "#78C8ED",
      shortName: "GPS TRACKER",
      number: "01"
    }
  },
  {
    title: "DriveTry",
    category: {
      id: "Aplikasi Mobile",
      en: "Mobile Application"
    },
    description: {
      id:
        "Proyek aplikasi Android yang dikembangkan dalam kegiatan praktikum pemrograman mobile, dengan fokus pada antarmuka dan implementasi fungsionalitas aplikasi.",
      en:
        "An Android application project developed during a mobile programming course, focusing on interface design and application functionality."
    },
    technologies: [
      "Android",
      "Mobile Development"
    ],
    github:
      "https://github.com/ziinspiration/app-praktikum-mobile",
    cover: {
      background: "#1F3E86",
      accent: "#B5D1FF",
      shortName: "DRIVETRY",
      number: "02"
    }
  },
  {
    title: "GarudaZone",
    category: {
      id: "Pengembangan Web",
      en: "Web Development"
    },
    description: {
      id:
        "Proyek pengembangan aplikasi web yang dikerjakan secara kolaboratif dengan repository kode sumber yang dapat diakses melalui GitHub.",
      en:
        "A collaborative web application development project with publicly accessible source code on GitHub."
    },
    technologies: [
      "Web Development",
      "Git",
      "GitHub"
    ],
    github:
      "https://github.com/rancagp/garudazone",
    cover: {
      background: "#183B45",
      accent: "#8AD4C3",
      shortName: "GARUDAZONE",
      number: "03"
    }
  },
  {
    title: "SehatPedia Android",
    category: {
      id: "Aplikasi Android",
      en: "Android Application"
    },
    description: {
      id:
        "Aplikasi rujukan digital berbasis Android yang dikembangkan menggunakan Kotlin sebagai implementasi pengembangan perangkat lunak mobile.",
      en:
        "An Android-based digital referral application developed using Kotlin as a mobile software development project."
    },
    technologies: [
      "Kotlin",
      "Android",
      "Mobile Development"
    ],
    github:
      "https://github.com/Fakihelmi/SehatPedia-Android",
    cover: {
      background: "#225461",
      accent: "#A3E2DB",
      shortName: "SEHATPEDIA",
      number: "04"
    }
  }
];

// =====================================================
// SKILLS
// =====================================================

const SKILLS = [
  {
    title: {
      id: "Pengembangan Web",
      en: "Web Development"
    },
    icon: Globe,
    items: [
      "Laravel",
      "PHP",
      "JavaScript",
      "REST API",
      "MySQL"
    ]
  },
  {
    title: {
      id: "Pengembangan Mobile",
      en: "Mobile Development"
    },
    icon: Smartphone,
    items: [
      "Kotlin",
      "Flutter",
      "Java",
      "Android"
    ]
  },
  {
    title: {
      id: "Internet of Things",
      en: "Internet of Things"
    },
    icon: Cpu,
    items: [
      "ESP32",
      "C++",
      "GPS",
      "Embedded System"
    ]
  },
  {
    title: {
      id: "Tools & Basis Data",
      en: "Tools & Databases"
    },
    icon: Wrench,
    items: [
      "Git",
      "GitHub",
      "PostgreSQL",
      "MySQL",
      "VS Code"
    ]
  }
];

// =====================================================
// ORGANIZATIONS
// =====================================================

const ORGANIZATIONS: Organization[] = [
  {
    position: {
      id: "Sekretaris Jenderal",
      en: "Secretary General"
    },
    name: "HMTIF — Universitas Pasundan",
    description: {
      id:
        "Bertanggung jawab dalam koordinasi internal organisasi, pengawasan program kerja, perencanaan strategis, tata kelola organisasi, dan evaluasi kinerja pengurus.",
      en:
        "Responsible for internal organizational coordination, program supervision, strategic planning, governance, and performance evaluation."
    }
  },
  {
    position: {
      id: "Head of Event Management",
      en: "Head of Event Management"
    },
    name: "Google Developer On Campus",
    description: {
      id:
        "Mengelola perencanaan kegiatan, pengembangan konsep acara, koordinasi tim, manajemen operasional, dan komunikasi dengan mitra serta stakeholder.",
      en:
        "Managed event planning, concept development, team coordination, operations, and communication with partners and stakeholders."
    }
  }
];

// =====================================================
// PHOTOS
// =====================================================

const PHOTOS: Photo[] = [
  {
    src: "/hmtif-kabinet.JPG",
    title: {
      id: "Presentasi Kabinet Kartala",
      en: "Kartala Cabinet Presentation"
    },
    description: {
      id: "Dokumentasi kegiatan Kabinet Kartala HMTIF.",
      en: "Documentation of an HMTIF Kartala Cabinet activity."
    }
  },
  {
    src: "/hmtif-tim.jpg",
    title: {
      id: "Bersama Pengurus HMTIF",
      en: "With the HMTIF Team"
    },
    description: {
      id: "Dokumentasi bersama pengurus organisasi HMTIF.",
      en: "Documentation with HMTIF organization members."
    }
  },
  {
    src: "/hmtif-kunjungan.jpg",
    title: {
      id: "Kegiatan Organisasi",
      en: "Organizational Activities"
    },
    description: {
      id: "Dokumentasi kegiatan dan relasi organisasi.",
      en: "Documentation of organizational activities and networking."
    }
  }
];

// =====================================================
// GLOBAL STYLE
// =====================================================

function GlobalStyles() {
  return (
    <style>
      {`
        html {
          scroll-behavior: smooth;
        }

        body {
          margin: 0;
        }

        * {
          box-sizing: border-box;
        }

        @keyframes welcomeFloat {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-12px);
          }
        }

        @keyframes welcomeGlow {
          0%, 100% {
            opacity: 0.45;
          }
          50% {
            opacity: 0.75;
          }
        }

        @keyframes mainEnter {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .welcome-floating {
          animation: welcomeFloat 6s ease-in-out infinite;
        }

        .welcome-glow {
          animation: welcomeGlow 7s ease-in-out infinite;
        }

        .animate-main-enter {
          animation: mainEnter 650ms ease-out both;
        }

        .lift-card {
          transition:
            transform 300ms ease,
            box-shadow 300ms ease,
            border-color 300ms ease;
        }

        .lift-card:hover {
          transform: translateY(-6px);
          box-shadow:
            0 22px 50px rgba(15, 23, 42, 0.10),
            0 4px 12px rgba(37, 99, 235, 0.04);
          border-color: rgba(59, 130, 246, 0.25);
        }

        .project-cover {
          transition: transform 500ms ease;
        }

        .group:hover .project-cover {
          transform: scale(1.025);
        }

        @media (prefers-reduced-motion: reduce) {
          html {
            scroll-behavior: auto;
          }

          .welcome-floating,
          .welcome-glow,
          .animate-main-enter {
            animation: none;
          }

          .lift-card,
          .project-cover {
            transition: none;
          }

          .lift-card:hover,
          .group:hover .project-cover {
            transform: none;
          }
        }
      `}
    </style>
  );
}

// =====================================================
// SECTION HEADING
// =====================================================

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description: string;
};

function SectionHeading({
  eyebrow,
  title,
  description
}: SectionHeadingProps) {
  return (
    <div className="text-center max-w-2xl mx-auto">
      {eyebrow && (
        <p className="text-xs font-bold tracking-[0.18em] text-blue-600">
          {eyebrow}
        </p>
      )}

      <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 mt-3">
        {title}
      </h2>

      {description && (
        <p className="text-sm leading-[1.85] text-slate-600 mt-5">
          {description}
        </p>
      )}
    </div>
  );
}

// =====================================================
// PROJECT COVER
// =====================================================

type ProjectCoverProps = {
  project: Project;
  language: Language;
};

function ProjectCover({
  project,
  language
}: ProjectCoverProps) {
  const cover = project.cover;

  return (
    <div
      className="project-cover relative h-48 sm:h-56 overflow-hidden flex flex-col justify-between p-5 sm:p-6"
      style={{
        backgroundColor: cover.background
      }}
    >
      {/* GRID TEXTURE */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(90deg, white 1px, transparent 1px), linear-gradient(white 1px, transparent 1px)",
          backgroundSize: "28px 28px"
        }}
      />

      {/* GLOW */}
      <div
        className="absolute -right-12 -bottom-24 w-72 h-72 rounded-full blur-3xl opacity-20 pointer-events-none"
        style={{
          backgroundColor: cover.accent
        }}
      />

      {/* TOP */}
      <div className="relative z-10 flex justify-between items-start gap-3">
        <span className="px-3 py-1.5 bg-white/10 backdrop-blur-sm border border-white/15 text-white rounded-full text-[10px] sm:text-[11px] font-medium">
          {project.category[language]}
        </span>

        <span className="font-mono text-white/50 text-xs">
          / {cover.number}
        </span>
      </div>

      {/* PROJECT IDENTITY */}
      <div className="relative z-10">
        <div
          className="w-9 h-1 rounded-full mb-4"
          style={{
            backgroundColor: cover.accent
          }}
        />

        <h3 className="text-white text-2xl sm:text-3xl md:text-4xl font-black tracking-tight break-words">
          {cover.shortName}
        </h3>

        <p
          className="font-mono text-[9px] sm:text-[10px] tracking-[0.15em] mt-2"
          style={{
            color: cover.accent
          }}
        >
          SOFTWARE DEVELOPMENT / PORTOFOLIO
        </p>
      </div>
    </div>
  );
}

// =====================================================
// WELCOME SCREEN
// =====================================================

type WelcomeProps = {
  language: Language;
  setLanguage: (language: Language) => void;
  onEnter: () => void;
  transitioning: boolean;
};

function WelcomeScreen({
  language,
  setLanguage,
  onEnter,
  transitioning
}: WelcomeProps) {
  const [typedName, setTypedName] = useState<string>("");
  const [photoLoaded, setPhotoLoaded] = useState<boolean>(true);

  const t = TEXT[language];

  // TYPEWRITER
  useEffect(() => {
    if (typedName.length >= PERSONAL.name.length) return;

    const timeout = window.setTimeout(() => {
      setTypedName(
        PERSONAL.name.slice(0, typedName.length + 1)
      );
    }, 85);

    return () => window.clearTimeout(timeout);
  }, [typedName]);

  return (
    <div
      className={`min-h-screen bg-white text-slate-900 relative overflow-hidden flex flex-col px-5 sm:px-8 md:px-12 lg:px-20 py-6 sm:py-8 transition-all duration-500 ${
        transitioning
          ? "opacity-0 scale-[0.98] blur-sm"
          : "opacity-100 scale-100"
      }`}
    >
      {/* BACKGROUND */}
      <div className="welcome-glow absolute -top-32 -left-32 w-[520px] h-[520px] bg-blue-100 rounded-full blur-[110px] pointer-events-none" />

      <div className="welcome-glow absolute -bottom-40 -right-32 w-[520px] h-[520px] bg-indigo-100 rounded-full blur-[110px] pointer-events-none" />

      {/* HEADER */}
      <header className="relative z-10 flex justify-between items-center gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <span className="w-10 h-10 shrink-0 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-600/20">
            <Code2 size={20} />
          </span>

          <span className="text-[10px] sm:text-xs font-mono font-bold tracking-[0.1em] text-slate-500 truncate">
            PORTOFOLIO / 2026
          </span>
        </div>

        {/* LANGUAGE */}
        <div className="flex items-center gap-1 bg-slate-50 p-1 rounded-lg border border-slate-200 shrink-0">
          <button
            type="button"
            onClick={() => setLanguage("id")}
            aria-pressed={language === "id"}
            className={`px-3 py-1.5 rounded-md text-xs font-bold transition ${
              language === "id"
                ? "bg-blue-600 text-white shadow-sm"
                : "text-slate-500 hover:text-blue-600"
            }`}
          >
            ID
          </button>

          <button
            type="button"
            onClick={() => setLanguage("en")}
            aria-pressed={language === "en"}
            className={`px-3 py-1.5 rounded-md text-xs font-bold transition ${
              language === "en"
                ? "bg-blue-600 text-white shadow-sm"
                : "text-slate-500 hover:text-blue-600"
            }`}
          >
            EN
          </button>
        </div>
      </header>

      {/* CONTENT */}
      <main className="relative z-10 flex-1 max-w-7xl mx-auto w-full grid lg:grid-cols-12 items-center gap-10 lg:gap-12 py-10 sm:py-14 lg:py-16">
        {/* LEFT */}
        <div className="lg:col-span-7 space-y-6 sm:space-y-7">
          <div className="inline-flex items-center gap-3">
            <span className="w-8 h-[2px] bg-blue-600 shrink-0" />

            <span className="text-[10px] sm:text-xs font-mono font-bold tracking-[0.12em] text-blue-600">
              {t.graduate}
            </span>
          </div>

          {/* NAME */}
          <h1 className="text-[clamp(2.5rem,6vw,5rem)] font-extrabold tracking-tight leading-[1.12] min-h-[120px] sm:min-h-[150px]">
            {t.welcome}

            <span className="block text-blue-600 mt-2 break-words">
              {typedName}

              <span className="inline-block border-r-[3px] border-blue-600 h-[0.85em] ml-1 animate-pulse" />
            </span>
          </h1>

          <p className="text-slate-600 leading-[1.8] sm:leading-[1.9] max-w-xl text-sm sm:text-base">
            {t.welcomeDescription}
          </p>

          {/* ACTIONS */}
          <div className="flex flex-wrap gap-3 sm:gap-4 pt-2 sm:pt-3">
            <a
              href={PERSONAL.cv}
              download="Fakih_Helmi_Maulana_CV.pdf"
              className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold text-sm shadow-lg shadow-blue-600/20 hover:shadow-xl hover:shadow-blue-600/30 hover:-translate-y-1 transition-all duration-300"
            >
              <Download size={17} />
              {t.download}
            </a>

            <a
              href={`mailto:${PERSONAL.email}`}
              className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3.5 border border-slate-300 bg-white text-slate-800 rounded-lg font-semibold text-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <Mail size={17} />
              {t.contactMe}
            </a>
          </div>

          {/* SOCIAL */}
          <div className="flex items-center gap-5 text-slate-400 pt-2 sm:pt-3">
            <a
              href={PERSONAL.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="hover:text-blue-600 hover:-translate-y-1 transition"
            >
              <Github size={22} />
            </a>

            <a
              href={PERSONAL.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="hover:text-blue-600 hover:-translate-y-1 transition"
            >
              <Linkedin size={22} />
            </a>

            <a
              href={`mailto:${PERSONAL.email}`}
              aria-label="Email"
              className="hover:text-blue-600 hover:-translate-y-1 transition"
            >
              <Mail size={22} />
            </a>
          </div>
        </div>

        {/* FLOATING PHOTO */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end">
          <div className="welcome-floating relative w-full max-w-[320px] sm:max-w-[390px]">
            <div className="absolute -inset-3 bg-blue-100/70 rounded-[28px] blur-xl" />

            <div className="relative bg-white p-3 rounded-2xl border border-slate-100 shadow-[0_28px_75px_rgba(30,64,175,0.17)]">
              {photoLoaded ? (
                <img
                  src={PERSONAL.photo}
                  alt={PERSONAL.name}
                  className="w-full h-[320px] sm:h-[420px] object-cover rounded-xl grayscale hover:grayscale-0 transition duration-700"
                  style={{
                    objectPosition: "center 25%"
                  }}
                  onError={() => setPhotoLoaded(false)}
                />
              ) : (
                <div className="h-[320px] sm:h-[420px] bg-blue-50 rounded-xl flex items-center justify-center">
                  <span className="text-7xl font-bold text-blue-200">
                    FM
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* ENTER */}
      <div className="relative z-10 flex justify-center pb-3 pt-5">
        <button
          type="button"
          onClick={onEnter}
          className="group flex flex-col items-center gap-3 text-slate-500 hover:text-blue-600 transition"
        >
          <span className="text-[10px] sm:text-[11px] font-mono font-bold tracking-[0.17em] uppercase">
            {t.explore}
          </span>

          <span className="w-12 h-12 rounded-full bg-white border border-slate-200 flex items-center justify-center shadow-md group-hover:bg-blue-600 group-hover:text-white group-hover:shadow-xl group-hover:shadow-blue-600/20 group-hover:-translate-y-1 transition-all duration-300">
            <ArrowDown size={19} />
          </span>
        </button>
      </div>
    </div>
  );
}

// =====================================================
// MAIN APPLICATION
// =====================================================

export default function App() {
  const [language, setLanguage] = useState<Language>(() => {
    try {
      return localStorage.getItem("portofolio-language") === "en"
        ? "en"
        : "id";
    } catch {
      return "id";
    }
  });

  const [hasEntered, setHasEntered] =
    useState<boolean>(false);

  const [isTransitioning, setIsTransitioning] =
    useState<boolean>(false);

  const [menuOpen, setMenuOpen] =
    useState<boolean>(false);

  const [selectedPhoto, setSelectedPhoto] =
    useState<Photo | null>(null);

  const [profileLoaded, setProfileLoaded] =
    useState<boolean>(true);

  const t = TEXT[language];

  // SAVE LANGUAGE
  useEffect(() => {
    document.documentElement.lang = language;

    document.title =
      language === "id"
        ? "Fakih Helmi Maulana | Portofolio"
        : "Fakih Helmi Maulana | Portofolio";

    try {
      localStorage.setItem("portofolio-language", language);
    } catch {
      // Storage unavailable.
    }
  }, [language]);

  // CLOSE MODAL
  useEffect(() => {
    if (!selectedPhoto) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedPhoto(null);
      }
    };

    document.addEventListener("keydown", closeOnEscape);

    return () => {
      document.removeEventListener(
        "keydown",
        closeOnEscape
      );
    };
  }, [selectedPhoto]);

  // ENTER TRANSITION
  const handleEnter = () => {
    setIsTransitioning(true);

    window.setTimeout(() => {
      setHasEntered(true);
      setIsTransitioning(false);
      window.scrollTo(0, 0);
    }, 450);
  };

  // NAVIGATION
  const navigation = [
    { href: "#about", label: t.nav.about },
    { href: "#experience", label: t.nav.experience },
    { href: "#skills", label: t.nav.skills },
    { href: "#projects", label: t.nav.projects },
    { href: "#organization", label: t.nav.organization },
    { href: "#contact", label: t.nav.contact }
  ];

  // WELCOME PAGE
  if (!hasEntered) {
    return (
      <>
        <GlobalStyles />

        <WelcomeScreen
          language={language}
          setLanguage={setLanguage}
          onEnter={handleEnter}
          transitioning={isTransitioning}
        />
      </>
    );
  }

  // =====================================================
  // MAIN PORTFOLIO
  // =====================================================

  return (
    <div className="min-h-screen bg-[#FCFBF9] text-slate-800 font-sans animate-main-enter overflow-x-hidden">
      <GlobalStyles />

      {/* NAVBAR */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-[72px] sm:h-[76px] flex items-center justify-between gap-3">
          {/* LOGO */}
          <a
            href="#home"
            className="flex items-center gap-2 sm:gap-3 min-w-0 shrink-0"
          >
            <span className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-600/20">
              <Code2 size={20} />
            </span>

            <span className="font-bold text-base sm:text-lg tracking-tight text-slate-900">
              Fakih Helmi
            </span>
          </a>

          {/* DESKTOP NAV */}
          <nav className="hidden xl:flex items-center gap-6">
            {navigation.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-slate-600 hover:text-blue-600 transition"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* ACTIONS */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* LANGUAGE */}
            <div
              className="flex items-center border border-slate-200 rounded-lg p-1 bg-slate-50"
              role="group"
              aria-label="Language / Bahasa"
            >
              <button
                type="button"
                onClick={() => setLanguage("id")}
                aria-pressed={language === "id"}
                className={`px-2.5 sm:px-3 py-1.5 rounded-md text-xs font-bold transition ${
                  language === "id"
                    ? "bg-blue-600 text-white shadow-sm"
                    : "text-slate-500 hover:text-blue-600"
                }`}
              >
                ID
              </button>

              <button
                type="button"
                onClick={() => setLanguage("en")}
                aria-pressed={language === "en"}
                className={`px-2.5 sm:px-3 py-1.5 rounded-md text-xs font-bold transition ${
                  language === "en"
                    ? "bg-blue-600 text-white shadow-sm"
                    : "text-slate-500 hover:text-blue-600"
                }`}
              >
                EN
              </button>
            </div>

            {/* CONTACT */}
            <a
              href={`mailto:${PERSONAL.email}`}
              className="hidden lg:inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold transition shadow-sm hover:shadow-lg hover:shadow-blue-600/20"
            >
              {t.contactMe}
              <ArrowUpRight size={15} />
            </a>

            {/* MOBILE MENU */}
            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={
                menuOpen ? "Close menu" : "Open menu"
              }
              aria-expanded={menuOpen}
              className="xl:hidden p-2 text-slate-700"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* MOBILE / TABLET NAV */}
        {menuOpen && (
          <nav className="xl:hidden bg-white border-t border-slate-100 px-6 py-4 space-y-1 max-h-[70vh] overflow-y-auto">
            {navigation.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="block py-3 text-sm font-medium text-slate-600 hover:text-blue-600"
              >
                {item.label}
              </a>
            ))}
          </nav>
        )}
      </header>

      {/* ==========================================
          HERO
      ========================================== */}

      <section
        id="home"
        className="pt-28 sm:pt-32 lg:pt-40 pb-20 sm:pb-24 px-5 sm:px-6 max-w-7xl mx-auto min-h-[80vh] flex items-center scroll-mt-20"
      >
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center w-full">
          {/* LEFT */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-7">
            <div className="inline-flex items-center gap-2 text-[10px] sm:text-xs font-bold tracking-[0.12em] text-blue-600">
              <GraduationCap size={18} />
              {t.graduate}
            </div>

            <h1 className="text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.12] font-extrabold tracking-tight text-slate-900">
              {t.heroTitle1}

              <span className="block text-blue-600">
                {t.heroTitle2}
              </span>
            </h1>

            <p className="text-slate-600 text-sm sm:text-base leading-[1.85] sm:leading-[1.9] max-w-xl">
              {t.heroDescription}
            </p>

            <div className="inline-flex items-center gap-2 text-sm text-slate-500">
              <MapPin size={17} />
              {t.location}: {PERSONAL.location}
            </div>

            {/* ACTIONS */}
            <div className="flex flex-wrap gap-3 sm:gap-4 pt-3">
              <a
                href={PERSONAL.cv}
                download="Fakih_Helmi_Maulana_CV.pdf"
                className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-lg shadow-md shadow-blue-600/15 hover:shadow-xl hover:shadow-blue-600/25 hover:-translate-y-1 transition-all duration-300"
              >
                <Download size={18} />
                {t.download}
              </a>

              <a
                href={PERSONAL.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3.5 bg-white border border-slate-200 hover:border-blue-300 text-slate-800 font-semibold text-sm rounded-lg hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <Github size={18} />
                {t.githubProfile}
              </a>
            </div>
          </div>

          {/* PROFILE CARD */}
          <div className="lg:col-span-5 lg:translate-y-8">
            <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-[0_15px_40px_rgba(15,23,42,0.08)] hover:shadow-[0_25px_60px_rgba(37,99,235,0.13)] hover:-translate-y-1 transition-all duration-500 max-w-[480px] mx-auto">
              <div className="relative overflow-hidden rounded-xl bg-slate-100 h-[330px] sm:h-[390px] lg:h-[420px]">
                {profileLoaded ? (
                  <img
                    src={PERSONAL.photo}
                    alt={PERSONAL.name}
                    className="w-full h-full object-cover"
                    style={{
                      objectPosition: "center 25%"
                    }}
                    onError={() => setProfileLoaded(false)}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-blue-50">
                    <span className="text-7xl font-bold text-blue-200">
                      FM
                    </span>
                  </div>
                )}
              </div>

              <div className="pt-5">
                <h3 className="text-lg sm:text-xl font-bold tracking-tight text-slate-900">
                  {PERSONAL.name}
                </h3>

                <p className="text-xs text-blue-600 font-semibold tracking-wider uppercase mt-1">
                  {t.role}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          ABOUT
      ========================================== */}

      <section
        id="about"
        className="py-20 sm:py-24 px-5 sm:px-6 bg-white border-y border-slate-200 scroll-mt-20"
      >
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            eyebrow={t.aboutLabel}
            title={t.aboutTitle}
            description={t.aboutText}
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-12 sm:mt-14">
            {t.aboutCards.map((card, index) => {
              const icons = [
                GraduationCap,
                Code2,
                Users
              ];

              const Icon = icons[index];

              return (
                <div
                  key={card[0]}
                  className="lift-card p-6 sm:p-7 rounded-xl bg-[#F8FAFC] border border-slate-100 text-center"
                >
                  <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-blue-50 flex items-center justify-center">
                    <Icon
                      size={23}
                      className="text-blue-600"
                    />
                  </div>

                  <p className="text-xs uppercase tracking-wider text-slate-500 font-semibold">
                    {card[0]}
                  </p>

                  <h3 className="text-base font-bold text-slate-900 mt-2">
                    {card[1]}
                  </h3>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ==========================================
          EXPERIENCE
      ========================================== */}

      <section
        id="experience"
        className="py-20 sm:py-24 px-5 sm:px-6 max-w-7xl mx-auto scroll-mt-20"
      >
        <SectionHeading
          eyebrow={t.experienceLabel}
          title={t.experienceTitle}
          description={t.experienceText}
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12 sm:mt-14">
          {EXPERIENCES.map((experience) => (
            <article
              key={experience.company}
              className="lift-card bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 shadow-sm"
            >
              <div className="flex items-center gap-2 text-blue-600">
                <Briefcase size={19} />

                <span className="text-xs font-semibold">
                  {experience.period[language]}
                </span>
              </div>

              <h3 className="text-lg sm:text-xl font-bold text-slate-900 mt-5">
                {experience.position[language]}
              </h3>

              <p className="text-blue-600 text-sm font-semibold mt-2">
                {experience.company}
              </p>

              <p className="text-sm leading-[1.8] text-slate-600 mt-5">
                {experience.description[language]}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* ==========================================
          SKILLS
      ========================================== */}

      <section
        id="skills"
        className="py-20 sm:py-24 px-5 sm:px-6 bg-white border-y border-slate-200 scroll-mt-20"
      >
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            eyebrow={t.skillsLabel}
            title={t.skillsTitle}
            description={t.skillsText}
          />

          <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-6 mt-12 sm:mt-14">
            {SKILLS.map((skill) => {
              const Icon = skill.icon;

              return (
                <div
                  key={skill.title.id}
                  className="lift-card bg-[#FCFBF9] border border-slate-200 rounded-2xl p-6 sm:p-7"
                >
                  <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-5">
                    <Icon
                      size={22}
                      className="text-blue-600"
                    />
                  </div>

                  <h3 className="font-bold text-slate-900 mb-5">
                    {skill.title[language]}
                  </h3>

                  <div className="flex flex-wrap gap-2">
                    {skill.items.map((item) => (
                      <span
                        key={item}
                        className="text-xs px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-slate-600"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ==========================================
          PROJECTS
      ========================================== */}

      <section
        id="projects"
        className="py-20 sm:py-24 px-5 sm:px-6 max-w-7xl mx-auto scroll-mt-20"
      >
        <SectionHeading
          eyebrow={t.projectsLabel}
          title={t.projectsTitle}
          description={t.projectsText}
        />

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 mt-12 sm:mt-14">
          {PROJECTS.map((project) => (
            <article
              key={project.title}
              className="lift-card bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm flex flex-col group"
            >
              {/* CUSTOM COVER */}
              <div className="overflow-hidden">
                <ProjectCover
                  project={project}
                  language={language}
                />
              </div>

              {/* CONTENT */}
              <div className="p-5 sm:p-7 flex flex-col flex-1">
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 group-hover:text-blue-600 transition">
                  {project.title}
                </h3>

                <p className="text-sm text-slate-600 leading-[1.8] mt-4">
                  {project.description[language]}
                </p>

                <div className="flex flex-wrap gap-2 mt-6">
                  {project.technologies.map((technology) => (
                    <span
                      key={technology}
                      className="text-xs bg-slate-100 text-slate-600 px-3 py-1.5 rounded-md"
                    >
                      {technology}
                    </span>
                  ))}
                </div>

                <div className="mt-auto pt-7">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-semibold shadow-sm hover:shadow-lg hover:shadow-blue-600/20 transition-all"
                  >
                    <Github size={17} />
                    {t.sourceCode}
                    <ExternalLink size={15} />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ==========================================
          ORGANIZATION
      ========================================== */}

      <section
        id="organization"
        className="py-20 sm:py-24 px-5 sm:px-6 bg-white border-y border-slate-200 scroll-mt-20"
      >
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            eyebrow={t.organizationLabel}
            title={t.organizationTitle}
            description={t.organizationText}
          />

          <div className="grid md:grid-cols-2 gap-6 lg:gap-7 mt-12 sm:mt-14">
            {ORGANIZATIONS.map((org) => (
              <article
                key={org.name}
                className="lift-card bg-[#FCFBF9] border border-slate-200 rounded-2xl p-6 sm:p-8"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mb-5">
                  <Users
                    size={24}
                    className="text-blue-600"
                  />
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                  {org.position[language]}
                </h3>

                <p className="text-sm font-semibold text-blue-600 mt-2">
                  {org.name}
                </p>

                <p className="text-sm text-slate-600 leading-[1.85] mt-5">
                  {org.description[language]}
                </p>
              </article>
            ))}
          </div>

          {/* GALLERY */}
          <div className="mt-16 sm:mt-20">
            <SectionHeading
              eyebrow=""
              title={t.galleryTitle}
              description={t.galleryText}
            />

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
              {PHOTOS.map((photo) => (
                <button
                  type="button"
                  key={photo.src}
                  onClick={() => setSelectedPhoto(photo)}
                  aria-label={`${t.viewPhoto}: ${photo.title[language]}`}
                  className="lift-card group bg-white border border-slate-200 rounded-2xl overflow-hidden text-left"
                >
                  <div className="h-56 sm:h-64 overflow-hidden bg-slate-100">
                    <img
                      src={photo.src}
                      alt={photo.title[language]}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                  </div>

                  <div className="p-5">
                    <h4 className="font-bold text-slate-900">
                      {photo.title[language]}
                    </h4>

                    <p className="text-sm text-slate-500 leading-relaxed mt-2">
                      {photo.description[language]}
                    </p>

                    <span className="inline-flex items-center gap-1 text-blue-600 text-xs font-semibold mt-4">
                      {t.viewPhoto}
                      <ExternalLink size={13} />
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          EDUCATION
      ========================================== */}

      <section className="py-20 sm:py-24 px-5 sm:px-6 max-w-5xl mx-auto">
        <SectionHeading
          eyebrow={t.educationLabel}
          title={t.educationTitle}
          description=""
        />

        <div className="lift-card bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm mt-12">
          <div className="flex flex-col sm:flex-row gap-5 sm:gap-6">
            <div className="w-14 h-14 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
              <GraduationCap
                size={29}
                className="text-blue-600"
              />
            </div>

            <div className="space-y-3">
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                Universitas Pasundan
              </h3>

              <p className="text-blue-600 font-semibold">
                {t.degree}
              </p>

              <p className="flex items-center gap-2 text-sm text-slate-500">
                <Calendar size={16} />
                {t.educationPeriod}
              </p>

              <p className="text-sm text-slate-700">
                {t.gpa}:{" "}
                <strong>
                  {language === "id"
                    ? "3,46"
                    : "3.46/4.00"}
                </strong>
              </p>

              <p className="text-sm text-slate-600 leading-[1.8]">
                {t.educationText}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          CONTACT
      ========================================== */}

      <section
        id="contact"
        className="py-20 sm:py-24 px-5 sm:px-6 bg-white border-t border-slate-200 scroll-mt-20"
      >
        <div className="max-w-5xl mx-auto">
          <SectionHeading
            eyebrow={t.contactLabel}
            title={t.contactTitle}
            description={t.contactText}
          />

          <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mt-10">
            <a
              href={`mailto:${PERSONAL.email}`}
              className="inline-flex items-center gap-2 px-5 sm:px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-semibold shadow-md shadow-blue-600/15 hover:shadow-lg transition"
            >
              <Mail size={18} />
              {PERSONAL.email}
            </a>

            <a
              href={PERSONAL.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 sm:px-6 py-3.5 border border-slate-200 rounded-lg text-sm font-semibold hover:bg-slate-50 hover:shadow-md transition"
            >
              <Github size={18} />
              GitHub
            </a>

            <a
              href={PERSONAL.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 sm:px-6 py-3.5 border border-slate-200 rounded-lg text-sm font-semibold hover:bg-slate-50 hover:shadow-md transition"
            >
              <Linkedin size={18} />
              LinkedIn
            </a>

            <a
              href={`tel:${PERSONAL.phone.replace(/\D/g, "")}`}
              className="inline-flex items-center gap-2 px-5 sm:px-6 py-3.5 border border-slate-200 rounded-lg text-sm font-semibold hover:bg-slate-50 hover:shadow-md transition"
            >
              <Smartphone size={18} />
              {PERSONAL.phone}
            </a>
          </div>
        </div>
      </section>

      {/* ==========================================
          FOOTER
      ========================================== */}

      <footer className="py-9 px-5 sm:px-6 border-t border-slate-200 text-center bg-[#FCFBF9]">
        <p className="text-lg font-bold text-slate-900">
          {PERSONAL.name}
        </p>

        <p className="text-sm text-slate-500 mt-2">
          {t.footerRole}
        </p>

        <p className="text-xs text-slate-400 mt-5">
          © 2026 Fakih Helmi Maulana. {t.copyright}
        </p>
      </footer>

      {/* ==========================================
          PHOTO MODAL
      ========================================== */}

      {selectedPhoto !== null && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4 sm:p-5"
          onClick={() => setSelectedPhoto(null)}
          role="presentation"
        >
          <div
            className="relative w-full max-w-5xl"
            role="dialog"
            aria-modal="true"
            aria-label={selectedPhoto.title[language]}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedPhoto(null)}
              aria-label={t.closePhoto}
              className="absolute -top-12 right-0 text-white hover:text-blue-300 transition"
            >
              <X size={27} />
            </button>

            <img
              src={selectedPhoto.src}
              alt={selectedPhoto.title[language]}
              className="w-full max-h-[70vh] sm:max-h-[75vh] object-contain rounded-lg"
            />

            <div className="text-center mt-5">
              <h3 className="text-white font-bold text-base sm:text-lg">
                {selectedPhoto.title[language]}
              </h3>

              <p className="text-slate-300 text-sm mt-2">
                {selectedPhoto.description[language]}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
