import { Config } from "@/types/config";
import { MdOutlineDevices, MdAttachment } from "react-icons/md";
import { IoSchoolOutline } from "react-icons/io5";
import { PiTrophy, PiBooks, PiMediumLogoBold } from "react-icons/pi";
import { GoalIcon } from '@primer/octicons-react'
import { LuGithub, LuPencil, LuLinkedin, LuRss, LuMail, LuMapPin } from "react-icons/lu";
import { FaXTwitter } from "react-icons/fa6";
import { FaReact, FaAws, FaSkiing } from "react-icons/fa";
import { TbPhoneCalling } from "react-icons/tb";
import { IoCalendarOutline } from "react-icons/io5";
import { AiOutlinePython } from "react-icons/ai";
import { RiJavaLine, RiJavascriptLine } from "react-icons/ri";
import { SiLatex, SiFastapi, SiKubernetes, SiPostman, SiSolidity } from "react-icons/si";
import { BiLogoFlask } from "react-icons/bi";
import { VscTerminalLinux, VscAzure } from "react-icons/vsc";
import { DiRedis, DiScala } from "react-icons/di";
import { CgGym, CgPiano } from "react-icons/cg";
import {
  TbBrandCpp, TbBrandTypescript,
  TbBrandGolang, TbBrandNextjs,
  TbBrandDjango, TbBrandDocker, TbBrandMysql,
  TbMarkdown, TbBrandAstro, TbBrandTerraform,
  TbPhotoSquareRounded
} from "react-icons/tb";

const config: Config = {
  avatar: '/images/profile.webp',
  title: "Jijun (Ferris) Chi",
  description: "I'm Jijun Chi, a ECE Meng graduate from University of Toronto, and an enthusiasm for Software Engineering 💻.",
  author: "Jijun (Ferris) Chi",
  keywords: [
    "Jijun Chi",
    "Software Engineering",
  ],
  status: "",
  siteURL: "https://me.1ferris.xyz",
  openGraph: {
    url: "https://me.1ferris.xyz/",
    type: "website",
    siteName: "Jijun (Ferris) Chi",
    title: "Jijun (Ferris) Chi",
    description: "I'm Jijun (Ferris) Chi, a ECE Meng graduate from University of Toronto, and an enthusiasm for Software Engineering 💻.",
    images: [
      {
        url: "https://docs.1chooo.com/images/cover-with-1chooo-com.png",
        width: 1200,
        height: 630,
        alt: "Jijun (Ferris) Chi - 1chooo Cover Image",
      },
    ],
  },
  navItems: [
    { path: '/', label: 'About' },
    { path: '/resume', label: 'Resume' },
    // { path: '/portfolio', label: 'Portfolio' },
    { path: '/post', label: 'Post' },
    // { path: '/gallery', label: 'Gallery' },
  ],
  contacts: [
    {
      icon: LuMapPin,
      title: "Location",
      content: "Toronto, Ontario 🇨🇦",
    },
    {
      icon: LuMail,
      title: "Email",
      link: "mailto:ferrischi201@gmail.com",
      content: "ferrischi201@gmail.com",
    },
    // {
    //   icon: TbPhoneCalling,
    //   title: "Phone",
    //   content: "404 Not Found 📲",
    // },
    {
      icon: LuGithub,
      title: "GitHub",
      link: "https://github.com/FerrisChi",
      content: "ferrischi",
    },
    // {
    //   icon: IoCalendarOutline,
    //   title: "Birthday",
    //   content: "January 27, 2002 🐻",
    // },
    {
      icon: LuLinkedin,
      title: "LinkedIn",
      link: "https://www.linkedin.com/in/jijun-chi-14b76b291/",
      content: "Jijun (Ferris) Chi",
    },
  ],
  socialLinks: [
    // { url: `https://github.com/1chooo`, icon: LuGithub, name: 'GitHub' },
    // { url: `https://www.linkedin.com/in/1chooo/`, icon: LuLinkedin, name: 'LinkedIn' },
    { url: `https://medium.com/@ferrischi201`, icon: PiMediumLogoBold, name: 'Medium' },
    // { url: `https://twitter.com/1chooo___`, icon: FaXTwitter, name: 'Twitter' },
    { url: `/rss.xml`, icon: LuRss, name: 'RSS Feed' },
    // { url: `/cv.pdf`, icon: MdAttachment, name: 'CV' },
  ],
  about: {
    "firstName": 'Jijun',
    "lastName": 'Chi',
    "middleName": "",
    "preferredName": "Ferris",
    "additionalName": "Ferris",
    "pronouns": 'He/Him',
    "githubUsername": "FerrisChi",
    "introduction": `
Hello👋, I'm Jijun (Ferris) Chi, a ECE Meng graduate from [University of Toronto 🍁](https://www.utoronto.ca/), and an enthusiasm for **Web development 💻** and ** AI/ML applications**. My intrests span across different areas of software engineering, including Full stack web development, database, distributed system, blockchain, Algorithm, and Machine Learning.

In the era of LLM, humans are no longer the only ones who can understand and generate code, but still have the upper hand in understanding the working context with years of experience, and providing domain-specific knowledge. I'm passionate about bridging the gap between cutting-edge AI research and practical applications, as well as building systems that leverage LLMs for private domain knowledge.

In my spare time, I play League, alongside working out 💪🏻, skiing⛷️, watching movies and a music lover🎹.
    `,
    "lifestyles": [
      {
        icon: LuGithub,
        title: "Developer",
        text: "Contributing to projects on GitHub."
      },
      {
        icon: FaSkiing,
        title: "Skiing",
        text: "Amateru but wholehearted skier."
      },
      {
        icon: CgGym,
        title: "Workouts",
        text: "Cardio & Strength training, also a ping-pong player."
      },
      {
        icon: CgPiano,
        title: "music",
        text: "Melodies are my morning brew."
      }
    ],
    "techStacks": {
      programmingLanguages: [
        { name: 'Python', icon: AiOutlinePython },
        { name: 'TypeScript', icon: TbBrandTypescript },
        { name: 'Golang', icon: TbBrandGolang },
        { name: 'C++', icon: TbBrandCpp },
        { name: 'Java', icon: RiJavaLine },
        { name: 'JavaScript', icon: RiJavascriptLine },
        { name: 'LaTeX', icon: SiLatex },
        { name: 'Markdown', icon: TbMarkdown },
        { name: 'SQL', icon: TbBrandMysql },
        { name: 'Solidity', icon: SiSolidity },
        { name: "Scala", icon: DiScala},
      ],
      frameworks: [
        { name: 'React', icon: FaReact },
        { name: 'FastAPI', icon: SiFastapi },
        { name: 'Flask', icon: BiLogoFlask },
        { name: 'Redis', icon: DiRedis },
        { name: 'Linux Terminal', icon: VscTerminalLinux },
        { name: 'AWS', icon: FaAws },
        { name: 'Next.js', icon: TbBrandNextjs },
        { name: 'Docker', icon: TbBrandDocker },
        { name: 'MySQL', icon: TbBrandMysql },
        { name: 'Django', icon: TbBrandDjango },
        { name: 'Kubernetes', icon: SiKubernetes },
        { name: 'Postman', icon: SiPostman },
      ],
    }
  },
  resume: {
    "educations": {
      "icon": IoSchoolOutline,
      "title": "Education",
      "items": [
        {
          "company": "University of Toronto",
          "location": "Ontario, Canada",
          "role": "M.Eng Electrical & Computer Engineering",
          "duration": "Sep. 2023 — Jun. 2025",
          "tasksMarkdown": `
  - **GPA:** 3.96/4.0
  - **Courses:** Creative Applications of Natural Language Processing(A+), Cloud computing(A+), Blockchain technologies(A+), Reinforcement learning(A+), Designing Modern Web-Scale Applications
          `
        },
        {
          "company": "Beijing University of Posts and Telecommunications",
          "location": "China",
          "role": "B.Comp.Sc Computer science and technology",
          "duration": "Sep. 2019 — Jul. 2023",
          "tasksMarkdown": `
  - **GPA:** 3.85/4.0 (2/437)
  - **Awards:** China National Scholarship(Top 3 in program), Silver Medal in The 46th ICPC Asia Regional Contest (International Collegiate Programming Contest) Jinan Site, Outstanding Student Leader of BUPT
          `
        }
      ]
    },
    "professionalExperiences": {
      "icon": MdOutlineDevices,
      "title": "Experience",
      "items": [
        {
          "company": "Centivizer",
          "location": "Toronto, CA",
          "role": "Full Stack Developer Intern",
          "duration": "May 2024 — Now",
          "tasksMarkdown": `
  - Engineered a competition mode and game summary page for an exercise-focused web game using Node.js, expanding global reach to 3 countries through i18next localization
  - Rebuilt the game using Next.js, TypeScript and Tailwind CSS, improving lighthouse performance by 26 points
  - Established real-time communication pipeline with Socket.io, enabling bidirectional data exchange between clients and peripheral hardware for pedal sensor data transmission and remote control
  - Optimized user experience by developing a tag-based voice search service to select travel destinations on IoT devices, improving user accessibility and stimulating user participation
          `
        }
      ]
    },
    "projects": {
      "icon": PiBooks,
      "title": "Projects",
      "items": [
        {
          "titleMarkdown": "Personalized recommendation in Q&A forum <span /> | Golang, TypeScript, React",
          "contentMarkdown": `
  - Contributed to Apache Answer open-source project by implementing a tailored recommendation feature and integrating Gorse recommender plugin, potentially to increase user engagement by 20%
  - Executed inclusive test cases; analyzed, debugged and troubleshot issues with PostgreSQL and MySQL
          `
        },
        {
          "titleMarkdown": "FreeCoupon, a Coupon Distribution System <span /> | Java, Spring Boot, Redis, MySQL, RocketMQ",
          "contentMarkdown": `
  - Developed a coupon schema creation module using Chain of Responsibility for parameter verification; prevented duplicate submissions with custom annotations and distributed locks
  - Built robust coupon schema query feature using Bloom filters and cache nullification to mitigate cache penetration and cache breakdown caused by malicious requests
  - Implemented fault-tolerant coupon distribution service using message queues, optimistic locking and spin retry mechanism to ensure accurate inventory management and prevent over-deduction
          `
        },
        {
          "titleMarkdown": "CourseCompanion, an AI-driven Academic Advisor <span /> | RAG, Django, Vue.js",
          "contentMarkdown": `
  - Engineered an AI agent to provide academic guidance to students, leveraging GPT and Retrieval-Augmentation-Generation techniques. Achieved a Recall@5 of 37% and an NDCG@5 of 96% for suggested courses
  - Developed full-stack web application while enhancing security and user convenience through OAuth2 authentication. Increased system responsiveness by 40% via Celery-based task processing
          `
        },
        {
          "titleMarkdown": "GPU-Accelerated Compressed Sampling GNN Framework <span /> | C++, CUDA, Python, PyTorch",
          "contentMarkdown": `
  - Proposed TCG(T-dimensional Compress Graph), a CUDA-level, tree-based data structure to compress graph data and integrated TCG-based graph sampling pipeline into Deep Graph Library(DGL)
  - Built up TCG-sampling-based graph neural network training on PyTorch, achieving up to a 10X reduction in memory usage and doubling speed of graph data transfer from CPU to GPU
          `
        }
      ]
    },
    "others": {
      "icon": PiTrophy,
      "title": "Skills & Others",
      "items": [
        {
          "titleMarkdown": "Technical Skills",
          "contentMarkdown": "HTML, CSS, REST, Scala, Solidity, Spark, Git, Jenkins, Docker, Bash, Linux, Matlab, Kubernetes"
        },
        {
          "titleMarkdown": "Other",
          "contentMarkdown": "CCF student fellow, 30 hours C++ tutor, G driver's licence"
        }
      ]
    }
  },
  "giscusConfig": {
    id: "comments",
    repo: "FerrisChi/vcard_1chooo",
    repoId: process.env.NEXT_PUBLIC_GISCUS_REPO_ID || '',
    category: "General",
    categoryId: process.env.NEXT_PUBLIC_GISCUS_CONFIG_CATEGORY_ID || '',
    mapping: "pathname",
    term: "Welcome to @giscus/react component!",
    reactionsEnabled: "1",
    emitMetadata: "1",
    inputPosition: "bottom",
    theme: "dark_tritanopia",
    lang: "en",
    loading: "lazy",
  },
  "googleAnalyticId": process.env.NEXT_PUBLIC_GA_ID || '',
  "googleTagManagerId": process.env.NEXT_PUBLIC_GTM_ID || '',
};

export default config;
