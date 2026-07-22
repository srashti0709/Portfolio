export const portfolioData = {
  profile: {
    name: "Srashti Shakya",
    title: "Software Developer",
    subtitle: "AI Integrations & Full Stack Engineer",
    email: "srashtishakya07@gmail.com",
    phone: "+91 8955054841",
    location: "Ajmer, Rajasthan - 305001",
    github: "https://github.com/srashti0709",
    linkedin: "https://www.linkedin.com/in/srashti-shakya/",
    leetcode: "https://leetcode.com/u/srashti0709/",
    portfolio: "https://github.com/srashti0709",
    photoUrl: "/srashti_photo.png",
    resumeUrl: "/srashti_resume.pdf",
    summary: "Full Stack Developer skilled in building scalable, AI-powered web applications with React.js, Node.js, Express.js, and MongoDB/MySQL. Experienced in designing REST APIs, integrating AI into production-style workflows, and applying strong DSA fundamentals to solve real-world problems, with a continuous drive to learn modern web technologies.",
    contactFormKey: "YOUR_WEB3FORMS_ACCESS_KEY_HERE" // Get your key from web3forms.com
  },
  skills: [
    // Languages
    { name: "C++", category: "Languages", rating: 90, icon: "Cplusplus", desc: "Main language for DSA and console systems", experience: "3 years", related: ["C", "SQL", "OOP"] },
    { name: "C", category: "Languages", rating: 80, icon: "C", desc: "Systems programming fundamentals", experience: "3 years", related: ["C++", "DSA"] },
    { name: "Java", category: "Languages", rating: 75, icon: "Java", desc: "Object-oriented software development", experience: "2 years", related: ["OOP", "Android"] },
    { name: "JavaScript", category: "Languages", rating: 92, icon: "Js", desc: "Web applications and full-stack logic", experience: "2 years", related: ["React.js", "Node.js", "Express.js"] },
    { name: "VB.NET", category: "Languages", rating: 65, icon: "Vb", desc: "Legacy desktop application support", experience: "1 year", related: ["Windows Forms", "SQL"] },
    
    // Frontend
    { name: "React.js", category: "Frontend", rating: 95, icon: "React", desc: "Modern interactive web layouts", experience: "2 years", related: ["Tailwind CSS", "Redux", "Vite"] },
    { name: "HTML5", category: "Frontend", rating: 95, icon: "Html", desc: "Semantic structure & SEO standards", experience: "3 years", related: ["CSS3", "React"] },
    { name: "CSS3", category: "Frontend", rating: 90, icon: "Css", desc: "Layouts, responsive designs & effects", experience: "3 years", related: ["Tailwind CSS", "Flexbox", "Grid"] },
    { name: "Tailwind CSS", category: "Frontend", rating: 95, icon: "Tailwind", desc: "Utility-first rapid styling", experience: "2 years", related: ["React.js", "CSS3"] },
    
    // Backend
    { name: "Node.js", category: "Backend", rating: 88, icon: "Node", desc: "Fast, asynchronous server runtimes", experience: "2 years", related: ["Express.js", "REST APIs", "npm"] },
    { name: "Express.js", category: "Backend", rating: 90, icon: "Express", desc: "Minimalist server routing and REST frameworks", experience: "2 years", related: ["Node.js", "MongoDB", "REST APIs"] },
    
    // Databases
    { name: "MongoDB", category: "Databases", rating: 85, icon: "Mongo", desc: "NoSQL document storage & aggregations", experience: "2 years", related: ["Mongoose", "Node.js"] },
    { name: "MySQL", category: "Databases", rating: 88, icon: "Mysql", desc: "Structured relational databases & transaction handling", experience: "2 years", related: ["SQL", "C++"] },
    
    // Tools & Platforms
    { name: "Git", category: "Tools", rating: 90, icon: "Git", desc: "Version control & collaborative repository management", experience: "3 years", related: ["GitHub"] },
    { name: "GitHub", category: "Tools", rating: 92, icon: "Github", desc: "CI/CD hosting and open-source project management", experience: "3 years", related: ["Git", "GitHub Actions"] },
    { name: "n8n", category: "Automation", rating: 85, icon: "N8n", desc: "Autonomous AI agent workflows and automation", experience: "1 year", related: ["Google Gemini API", "API Integration"] },
    { name: "Postman", category: "Tools", rating: 90, icon: "Postman", desc: "REST API testing and documentation", experience: "2 years", related: ["REST APIs"] },
    { name: "REST APIs", category: "Tools", rating: 92, icon: "Rest", desc: "API architectural designs and routing", experience: "2 years", related: ["Express.js", "Node.js"] },
    
    // Core Concepts
    { name: "Data Structures & Algorithms", category: "Concepts", rating: 90, icon: "Dsa", desc: "Problem solving and performance optimization", experience: "3 years", related: ["C++", "Java", "LeetCode"] },
    { name: "Object-Oriented Programming", category: "Concepts", rating: 88, icon: "Oop", desc: "Modular, class-based software architecture", experience: "3 years", related: ["C++", "Java"] },
    { name: "Responsive Web Design", category: "Concepts", rating: 95, icon: "Responsive", desc: "Mobile-first adaptive layouts", experience: "2 years", related: ["React.js", "Tailwind CSS"] }
  ],
  projects: [
    {
      id: "interview-ai",
      title: "Interview AI Platform",
      role: "Architect & Lead Full-Stack Developer",
      tagline: "AI-Powered Real-time Interview Simulator",
      description: "Architected a full-stack AI-powered mock interview platform simulating realistic, one-on-one interview experiences for job seekers, complete with live lip-synced video and audio agents.",
      features: [
        "Interactive AI interviewer with real-time voice conversation and a lip-synced AI avatar for human-like interaction.",
        "Engineered resume-based interview generation, dynamically creating role-specific questions across multiple interview categories.",
        "Delivered personalized, AI-generated feedback reports outlining detailed performance insights, strengths, and recommendations.",
        "Implemented secure authentication and a personalized candidate dashboard using React.js UI and secure Node.js/Express.js REST APIs."
      ],
      tech: ["React.js", "Node.js", "Express.js", "MongoDB", "REST APIs", "AI/Voice APIs"],
      liveUrl: "https://interview-ai-red-nine.vercel.app/",
      githubUrl: "https://github.com/srashti0709/InterviewAI.git",
      challenges: "Synchronizing real-time voice responses from AI models with the 2D/3D lip-synced avatar. Network latency often caused the voice to mismatch the lip animations.",
      solutions: "Engineered a buffer system utilizing client-side audio context analysis. Computed viseme markers on the server alongside audio generation, transmitting metadata synchronously to control rendering states.",
      architecture: [
        { name: "Frontend Client", type: "React SPA + WebRTC Audio Context" },
        { name: "Backend Router", type: "Express REST + WebSocket Manager" },
        { name: "AI Core", type: "Gemini / Custom Voice-to-Text & Viseme Generator" },
        { name: "Database", type: "MongoDB Atlas (Candidates, History, Transcripts)" }
      ],
      duration: "June 2026"
    },
    {
      id: "hiremate-ai",
      title: "HireMate AI Assistant",
      role: "Automation & Integration Engineer",
      tagline: "Intelligent Job Application Assistant",
      description: "Designed and built an AI-powered career assistance platform that automates end-to-end job application workflows, resume scoring, and cover letter optimization.",
      features: [
        "Developed autonomous AI agents using n8n to automate complex multi-stage resume analysis.",
        "Created personalized cover letter generators powered by custom agent prompt vectors.",
        "Integrated the Google Gemini API to power city-wise job searching and detailed skill gap analysis.",
        "Streamlined the job application process with webhook-based automation, cutting average application submission times."
      ],
      tech: ["React.js", "Node.js", "n8n", "Google Gemini API", "REST APIs"],
      githubUrl: "https://github.com/srashti0709/HireMateAi.git",
      challenges: "Handling rate limits, format discrepancies, and execution failures of asynchronous agents in n8n while updating the user dashboard live.",
      solutions: "Implemented SSE (Server-Sent Events) and webhooks to notify the frontend of agent milestones. Configured automatic retry loops and schema fallbacks within n8n workflows.",
      architecture: [
        { name: "Client Panel", type: "React App + Event Listeners" },
        { name: "Automation Bus", type: "n8n Self-hosted Agent Server" },
        { name: "LLM Pipeline", type: "Google Gemini API (Resume & Cover Letter Vectorizer)" },
        { name: "Job Aggregator", type: "REST endpoints connecting job feeds" }
      ],
      duration: "Nov 2025"
    },
    {
      id: "atm-system",
      title: "ATM Management System",
      role: "System Designer",
      tagline: "Console-Based Bank Account Simulation",
      description: "Built a console-based ATM simulation in C++ with secure MySQL database integration for persistent data storage and secure transactions.",
      features: [
        "Implemented secure admin and user authentication protocols via account number and encrypted PIN checks.",
        "Developed core transactional processes: account creation, balance checks, cash deposit, withdrawal, and PIN changes.",
        "Applied robust regex input validation and SQL injection prevention techniques.",
        "Simulated atomic database modifications to prevent race conditions during concurrent account operations."
      ],
      tech: ["C++", "SQL", "MySQL"],
      githubUrl: "https://github.com/srashti0709/AtmMachineProject.git",
      challenges: "Integrating standard C++ command line applications directly with relational databases over TCP sockets, managing platform-specific database drivers.",
      solutions: "Linked the native MySQL C++ Connector statically. Wrote custom sanitization wrappers around query parameters to secure database access without full ORM layers.",
      architecture: [
        { name: "Console Engine", type: "Compiled C++ application (OOP design)" },
        { name: "Driver Layer", type: "MySQL Connector/C++" },
        { name: "Relational DB", type: "MySQL Database Server (Accounts, Transactions)" }
      ],
      duration: "May 2025 - Jun 2025"
    },
    {
  id: "florenza",
  title: "Florenza",
  role: "Frontend Developer & UI Designer",
  tagline: "Modern Floral E-Commerce Landing Website",
  description: "Designed and developed a premium static flower e-commerce website featuring an elegant, responsive interface with smooth animations and a luxurious shopping experience using Tailwind CSS.",
  features: [
    "Developed a fully responsive multi-section e-commerce landing page optimized for desktop, tablet, and mobile devices.",
    "Designed visually appealing hero banners, featured flower collections, product showcase cards, testimonials, and promotional sections.",
    "Implemented modern UI interactions including hover animations, smooth scrolling, gradient effects, and interactive call-to-action buttons.",
    "Built reusable, clean, and scalable frontend components with a focus on performance, accessibility, and user experience."
  ],
  tech: [
    "HTML5",
    "Tailwind CSS",
    "JavaScript",
    "Responsive Design"
  ],
  liveUrl: "https://florenza.netlify.app/",
  challenges: "Creating a premium luxury floral shopping experience while maintaining excellent responsiveness, fast loading speed, and a clean component structure using only frontend technologies.",
  solutions: "Leveraged Tailwind CSS utility classes to build reusable responsive layouts, optimized images and typography, and incorporated subtle animations and consistent spacing to deliver a polished, modern UI.",
  architecture: [
    { name: "Frontend", type: "HTML5 + Tailwind CSS + JavaScript" },
    { name: "UI Components", type: "Responsive Sections & Reusable Cards" },
    { name: "Animations", type: "CSS Transitions & Hover Effects" },
    { name: "Deployment", type: "Static Website (Vercel/Netlify/GitHub Pages)" }
  ],
  duration: "October 2025"
},
{
  id: "discover-ajmer",
  title: "Discover Ajmer",
  role: "Frontend Developer",
  tagline: "Tourism & Heritage Information Website",
  description: "Developed a static tourism website showcasing the cultural heritage, historical landmarks, and popular attractions of Ajmer through an engaging and visually appealing user interface built using core web technologies.",
  features: [
    "Designed multiple informative pages highlighting Ajmer's tourist attractions, heritage sites, and local culture.",
    "Created an intuitive navigation system with organized sections for destinations, galleries, and travel information.",
    "Implemented interactive UI elements, image galleries, hover effects, and smooth page transitions using JavaScript.",
    "Focused on clean layouts and user-friendly design to provide an informative browsing experience."
  ],
  tech: [
    "HTML5",
    "CSS3",
    "JavaScript"
  ],
  githubUrl: "https://github.com/srashti0709/DiscoverAjmer.git",
  challenges: "Building an attractive tourism website using only HTML, CSS, and JavaScript while organizing large amounts of content into an easy-to-navigate interface.",
  solutions: "Structured the website with reusable layouts, interactive JavaScript components, and visually appealing CSS styling to enhance usability and present tourism information effectively.",
  architecture: [
    { name: "Frontend", type: "HTML5 + CSS3 + JavaScript" },
    { name: "UI", type: "Multi-page Static Website" },
    { name: "Interactivity", type: "JavaScript DOM Manipulation" },
    { name: "Deployment", type: "GitHub Repository" }
  ],
  duration: "November 2024"
},
  ],
  education: [
    {
      degree: "Bachelor’s of Computer Application (BCA)",
      institution: "Dezyne École College",
      duration: "2024 - Expected Graduation 2027",
      score: "Expected Top Division"
    },
    {
      degree: "Senior Secondary Education (12th Class)",
      institution: "St. Paul's School, Ajmer",
      duration: "2023 - 2024",
      score: "Percentage: 85%"
    },
    {
      degree: "Secondary Education (10th Class)",
      institution: "St. Paul's School, Ajmer",
      duration: "2021 - 2022",
      score: "Percentage: 87.6%"
    }
  ],
  certifications: [
    {
      title: "Deloitte Data Analytics Job Simulation",
      issuer: "Forage / Deloitte",
      date: "2024",
      description: "Completed virtual simulation involving data analysis, data visualization, and business insight generation using real-world enterprise scenarios."
    },
    {
      title: "Tata Group GenAI Powered Data Analytics",
      issuer: "Forage / Tata Group",
      date: "2024",
      description: "Applied generative AI models and tools for advanced data parsing, report generation, and solving business case problems."
    }
  ],
  achievements: [
    {
      title: "1st Place, Identity Exhibition",
      issuer: "Dezyne École",
      date: "2024",
      description: "Awarded top honors for designing and presenting innovative digital projects to industry judges."
    },
    {
      title: "1st Place, Console-Based Project",
      issuer: "Dezyne École",
      date: "2024",
      description: "Recognized for building the ATM Management System featuring advanced memory-safe transactional algorithms."
    },
    {
      title: "Runner-Up, Identity Exhibition",
      issuer: "Dezyne École",
      date: "2025",
      description: "Secured second place in a regional design and engineering showcase for an advanced web application prototype."
    }
  ],
  codingProfiles: [
    {
      platform: "GitHub",
      rating: "Active Developer",
      solved: "15+ Repositories",
      url: "https://github.com/srashti0709",
      username: "srashti0709"
    },
    {
      platform: "LeetCode",
      rating: "Specialist",
      solved: "120+ Solved",
      url: "https://leetcode.com/u/srashti0709/",
      username: "srashti0709"
    },
    {
      platform: "GeeksforGeeks",
      rating: "Ranked",
      solved: "45+ Solved",
      url: "https://www.geeksforgeeks.org/",
      username: "srashti0709"
    },
    {
      platform: "CodeChef",
      rating: "2-Star",
      solved: "30+ Solved",
      url: "https://www.codechef.com/",
      username: "srashti0709"
    }
  ]
};
