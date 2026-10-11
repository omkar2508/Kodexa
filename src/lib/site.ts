import {
  Code2,
  Smartphone,
  PenTool,
  Megaphone,
  LayoutDashboard,
  Database,
  Cloud,
  Wrench,
  type LucideIcon,
} from "lucide-react";

export const BRAND = {
  name: "Kodexa",
  full: "Kodexa Digital",
  tagline: "We Design. We Develop. We Deliver.",
  email: import.meta.env["VITE_CONTACT_EMAIL"]?.trim() || undefined,
};

export type Service = {
  slug: string;
  title: string;
  icon: LucideIcon;
  desc: string;
  items: string[];
  useCases: string[];
};
export const services: Service[] = [
  {
    slug: "web",
    title: "Website Design & Development",
    icon: Code2,
    desc: "Plan and build responsive websites and web applications around your audience, content, and business goals.",
    items: [
      "Business websites",
      "Corporate websites",
      "College & educational websites",
      "Ecommerce websites",
      "Landing pages",
      "Portfolio websites",
      "Tourism & hospitality websites",
      "Custom web applications",
    ],
    useCases: [
      "Launching a new business or campaign site",
      "Replacing an outdated or hard-to-maintain website",
      "Presenting services, products, or admissions online",
    ],
  },
  {
    slug: "mobile",
    title: "Mobile Application Development",
    icon: Smartphone,
    desc: "Design and develop mobile experiences for Android, iOS, or cross-platform use, with scope agreed before work begins.",
    items: [
      "Android applications",
      "iOS applications",
      "Cross-platform applications",
      "Educational applications",
      "Fitness & wellness applications",
      "Business applications",
    ],
    useCases: [
      "Giving customers or members a mobile self-service experience",
      "Supporting learning, fitness, or business workflows",
      "Testing an app idea with a scoped first release",
    ],
  },
  {
    slug: "design",
    title: "UI/UX Design",
    icon: PenTool,
    desc: "Turn user and business needs into clear flows, interface designs, and prototypes that can be reviewed before development.",
    items: [
      "User research",
      "Wireframing",
      "Interactive prototyping",
      "Design systems",
      "Website redesign",
      "Mobile app interface design",
    ],
    useCases: [
      "Improving confusing journeys or navigation",
      "Validating a product concept before building it",
      "Creating consistent interfaces across web and mobile",
    ],
  },
  {
    slug: "marketing",
    title: "Digital Marketing",
    icon: Megaphone,
    desc: "Plan digital marketing work such as search visibility, content, and campaign measurement to support your business goals.",
    items: [
      "Search engine optimization",
      "Social media marketing",
      "Content strategy",
      "Paid advertising campaigns",
      "Lead generation",
      "Website analytics",
    ],
    useCases: [
      "Improving the discoverability of a website",
      "Planning content and channel activity",
      "Measuring visits and inquiries from digital campaigns",
    ],
  },
  {
    slug: "software",
    title: "Custom Software & Dashboards",
    icon: LayoutDashboard,
    desc: "Build purpose-specific internal tools, admin panels, and dashboards around the way your team manages work and information.",
    items: [
      "Business management systems",
      "Resource optimization dashboards",
      "Admin panels",
      "Reporting & analytics dashboards",
      "Workflow automation",
      "Custom enterprise applications",
    ],
    useCases: [
      "Replacing spreadsheet-heavy operational workflows",
      "Bringing reports and key records into one interface",
      "Managing schedules, resources, or internal requests",
    ],
  },
  {
    slug: "data",
    title: "Data Management & Automation",
    icon: Database,
    desc: "Organize, connect, and present business data, and identify repeatable tasks that can be automated.",
    items: [
      "Database design",
      "Data processing & reporting",
      "Data visualization",
      "Data integration",
      "Business process automation",
      "Administrative software solutions",
    ],
    useCases: [
      "Reducing repeated manual data entry",
      "Combining information needed for regular reports",
      "Making operational data easier to review",
    ],
  },
  {
    slug: "hosting",
    title: "Web Hosting & Cloud",
    icon: Cloud,
    desc: "Get help planning and configuring website deployment and cloud hosting, with the setup and ongoing responsibilities agreed per project.",
    items: [
      "Domain registration assistance",
      "Website hosting & deployment",
      "Cloud infrastructure setup",
      "SSL & security configuration",
      "Performance optimization",
      "Maintenance & backups",
    ],
    useCases: [
      "Preparing a website for launch",
      "Moving an existing site to a suitable hosting setup",
      "Reviewing deployment, backup, or performance needs",
    ],
  },
  {
    slug: "support",
    title: "Maintenance & IT Consulting",
    icon: Wrench,
    desc: "Get scoped technical guidance and ongoing website or application maintenance based on an agreed support arrangement.",
    items: [
      "Bug fixes & technical support",
      "Website updates",
      "Security improvements",
      "Performance monitoring",
      "Technical consultation",
    ],
    useCases: [
      "Keeping a live website or application updated",
      "Investigating a technical issue or performance concern",
      "Planning the next improvement to an existing system",
    ],
  },
];

export const portfolioCategories = [
  "Business Websites",
  "Personal Portfolios",
  "Ecommerce Websites",
  "College and Educational Websites",
  "Web Applications",
  "Mobile Applications",
  "Dashboards and Admin Panels",
  "UI/UX Design",
  "Fitness and Wellness",
  "Tourism and Virtual Tours",
  "Custom Software and Automation",
  "Financial Services",
  "Organization Websites",
] as const;

export type PortfolioCategory = (typeof portfolioCategories)[number];
export const filters = ["All Projects", ...portfolioCategories] as const;
export type PortfolioFilter = (typeof filters)[number];
export type Role =
  "Built by our team" | "Team contribution" | "Industry reference" | "Team role pending";

export type ProjectDetails = {
  context?: string;
  problem?: string;
  requirements?: string[];
  solution?: string;
  features?: string[];
  design?: string;
  implementation?: string;
  technologies?: string[];
  contribution?: string;
  results?: string;
};

export type Project = {
  slug: string;
  name: string;
  url: string;
  categories: PortfolioCategory[];
  role: Role;
  summary: string;
  previewImage?: { src: string; alt: string };
  details?: ProjectDetails;
  draftNote?: string;
};

export const projects: Project[] = [
  {
    slug: "resource-optimization-dashboard",
    name: "Resource Optimization Dashboard",
    url: "https://tdtlworld.com/resource-optimization-frontend/",
    categories: [
      "Dashboards and Admin Panels",
      "Web Applications",
      "Custom Software and Automation",
    ],
    role: "Built by our team",
    summary:
      "A resource-optimization dashboard for educational institutions, focused on timetable generation, faculty workload, room allocation, and laboratory utilization.",
    details: {
      context:
        "Educational institutions managing timetables, faculty workloads, rooms, and laboratories.",
      problem:
        "Manual scheduling can lead to timetable clashes, uneven faculty workloads, and underused rooms or laboratories.",
      requirements: [
        "Generate timetables from scheduling constraints",
        "Review faculty workload",
        "View room and laboratory utilization",
      ],
      solution:
        "A dashboard concept that brings scheduling and resource-utilization information into one place.",
      features: [
        "Timetable generation",
        "Faculty workload view",
        "Room allocation",
        "Laboratory utilization reporting",
      ],
      contribution: "Listed as built by the Kodexa team in the existing project portfolio.",
    },
  },
  {
    slug: "wonder-360-tours",
    name: "Wonder 360 Tours",
    url: "https://www.wonder360tours.com/",
    categories: ["Business Websites", "Tourism and Virtual Tours"],
    role: "Team contribution",
    summary:
      "A website for Wonder 360° Tours, which presents immersive digital experiences that help people explore spaces.",
    details: {
      context: "The live website introduces Wonder 360° Tours as a digital experience provider.",
      features: ["Immersive experience presentation", "Digital services showcase"],
      contribution:
        "Listed as a team contribution in the existing project portfolio; exact scope is not specified.",
    },
  },
  {
    slug: "fitverse-app",
    name: "FitVerse",
    url: "https://fit-verse-app.vercel.app/",
    categories: ["Web Applications", "Fitness and Wellness", "UI/UX Design"],
    role: "Built by our team",
    summary:
      "A browser-based workout analytics product. Its live website describes workout data analysis for Hevy, Strong, and Lyfta without requiring an account.",
    details: {
      context: "The website presents workout analytics for people using Hevy, Strong, or Lyfta.",
      features: [
        "Workout analytics",
        "Support for Hevy, Strong, and Lyfta",
        "No-account access, as stated on the live website",
      ],
      contribution: "Listed as built by the Kodexa team in the existing project portfolio.",
    },
  },
  {
    slug: "mahesh-portfolio",
    name: "Mahesh Portfolio",
    url: "https://mahesh9340.netlify.app/",
    categories: ["Personal Portfolios"],
    role: "Built by our team",
    summary:
      "A personal portfolio introducing Mahesh Dattatraya Babar, presenting his platform-engineering and software-development background, and linking to selected projects.",
    details: {
      context: "A personal website presenting its owner's professional profile and selected work.",
      features: ["Professional profile", "Work experience", "Selected projects"],
      contribution: "Listed as built by the Kodexa team in the existing project portfolio.",
    },
  },
  {
    slug: "cult-fit-reference",
    name: "Cult.fit",
    url: "https://www.cult.fit/",
    categories: ["Fitness and Wellness"],
    role: "Industry reference",
    summary:
      "An external fitness and wellness reference. Cult.fit is a third-party website and is not represented as Kodexa work.",
  },
  {
    slug: "rina-deshmukh-portfolio",
    name: "Rina Deshmukh Portfolio",
    url: "https://rina-deshmukh-portfolio.vercel.app/",
    categories: ["Business Websites", "Personal Portfolios", "Fitness and Wellness"],
    role: "Team role pending",
    summary:
      "The website presents Dr. Rina Deshmukh as an Ayurvedic healthcare practitioner and includes practice information, service and appointment links, and FAQs.",
    draftNote:
      "Portfolio inclusion and team contribution are unconfirmed. The live site also contains statistics and testimonial claims that are not independently verified; those claims are not repeated here.",
  },
  {
    slug: "financial-advisor",
    name: "Financial Advisor",
    url: "https://financial-advisior.vercel.app/",
    categories: [
      "Business Websites",
      "Financial Services",
      "Web Applications",
      "Dashboards and Admin Panels",
      "Custom Software and Automation",
    ],
    role: "Team role pending",
    summary:
      "A landing page for FinAdvise presenting financial-planning topics and proposed tools such as a chatbot, expense tracker, document OCR, financial-scam education, and learning activities.",
    details: {
      context:
        "The website describes a financial-planning and financial-education platform for individuals and businesses.",
      features: [
        "Investment planning, risk management, portfolio analysis, and goal-setting sections",
        "Portfolio overview panel",
        "Chatbot, expense-tracking, and document OCR concepts",
        "Financial-scam awareness and learning activities",
      ],
    },
    draftNote:
      "Team contribution and interactive behavior are unconfirmed. Financial performance, client-count, rating, and advisor claims shown on the live website have not been independently verified and are not represented as project results.",
  },
  {
    slug: "sgjss",
    name: "SGJSS",
    url: "https://sgjss.netlify.app/",
    categories: ["Organization Websites"],
    role: "Team role pending",
    summary:
      "A website for Shree Guru Jambeshwar Sewa Sansthan describing its public-service programs, including rural education, child welfare, women’s empowerment, health, environment, and agricultural support.",
    details: {
      context:
        "The website presents SGJSS as a social-service organization and describes its programs and activities.",
      features: [
        "Organization and program information",
        "Education, child-welfare, women’s-empowerment, health, environment, and agriculture sections",
        "Donation and contact links",
      ],
    },
    draftNote:
      "Team contribution is unconfirmed. Donation processing and other external services were not tested.",
  },
];

export function filterProjects(category: PortfolioFilter): Project[] {
  if (category === "All Projects") return projects;
  return projects.filter((project) => project.categories.includes(category));
}

export const industries = [
  {
    name: "Education & Colleges",
    text: "Websites and admission information, alongside portals or scheduling dashboards where a project calls for them.",
    solutions: [
      "Institution and program websites",
      "Admissions and inquiry flows",
      "Timetable and resource dashboards",
    ],
  },
  {
    name: "Healthcare & Wellness",
    text: "Clear online information and inquiry or appointment journeys, designed around the provider's approved content and process.",
    solutions: [
      "Clinic and wellness websites",
      "Appointment inquiry flows",
      "Patient information pages",
    ],
  },
  {
    name: "Fitness & Sports",
    text: "Digital experiences for gyms, coaches, and fitness communities, from service discovery to member-facing tools.",
    solutions: [
      "Gym and coach websites",
      "Fitness and wellness applications",
      "Class or membership information",
    ],
  },
  {
    name: "Retail & Ecommerce",
    text: "Product discovery and online shopping experiences, with store features scoped to catalog and operational needs.",
    solutions: [
      "Product catalogs and ecommerce sites",
      "Shopping and inquiry flows",
      "Inventory or store administration tools",
    ],
  },
  {
    name: "Real Estate & Virtual Tours",
    text: "Property presentation and inquiry experiences that help prospective buyers or renters explore available information.",
    solutions: [
      "Property listing websites",
      "Virtual-tour presentation",
      "Lead and inquiry capture",
    ],
  },
  {
    name: "Small Businesses",
    text: "Practical digital foundations for small businesses that need to explain their services, receive inquiries, or simplify routine work.",
    solutions: [
      "Business websites and landing pages",
      "Search visibility planning",
      "Simple administrative tools",
    ],
  },
  {
    name: "Professional Services",
    text: "Clear, credible digital experiences for firms and independent professionals, with straightforward ways for prospective clients to get in touch.",
    solutions: [
      "Firm and professional websites",
      "Service and expertise pages",
      "Inquiry or booking integrations",
    ],
  },
  {
    name: "Startups & Tech",
    text: "Product design and development support for teams validating an idea or building software around a defined scope.",
    solutions: [
      "MVPs and product prototypes",
      "SaaS dashboards",
      "Landing pages and design systems",
    ],
  },
];

export const cities = ["Mumbai", "Pune", "Kolhapur", "Sangli", "Satara", "Pandharpur"];

export const process: [string, string][] = [
  ["Discovery", "Understand your business, users and requirements."],
  ["Planning", "Define scope, milestones and the right tech approach."],
  ["Design", "Wireframes, UI and interactive prototypes for feedback."],
  ["Development", "Build, integrate and review in regular iterations."],
  ["Testing & Launch", "QA across devices, then a careful deployment."],
  ["Maintenance", "Monitoring, updates and continuous improvement."],
];

export const faqs: [string, string][] = [
  [
    "What types of websites do you develop?",
    "Business, corporate, college, ecommerce, portfolio, tourism and landing page websites, plus custom web applications.",
  ],
  [
    "Do you develop mobile applications?",
    "Yes — Android, iOS and cross-platform apps, scoped to your needs and budget.",
  ],
  [
    "Can you build a custom dashboard for our business?",
    "Yes. We build admin panels, reporting and resource optimization dashboards tailored to your workflow.",
  ],
  [
    "Do you provide website hosting and maintenance?",
    "We help with domains, hosting, deployment, SSL, backups and ongoing maintenance plans.",
  ],
  [
    "Can you redesign an existing website?",
    "Yes. We audit what works, then redesign for clarity, speed and conversions.",
  ],
  [
    "Do you work with colleges and educational institutions?",
    "Yes — websites, portals and scheduling dashboards for institutions are a focus area.",
  ],
  [
    "How does your project development process work?",
    "Discovery, planning, design, development, testing & launch, then maintenance — with check-ins at every stage.",
  ],
  [
    "How can I request a quotation?",
    "The Get a Quote page can help you organize project details, but its delivery integration is not configured. Information entered there is not sent or saved.",
  ],
  [
    "Do you provide ongoing technical support?",
    "Yes, through maintenance and support arrangements agreed per project.",
  ],
  [
    "Do you work with clients outside Maharashtra?",
    "Remote delivery across India may be possible depending on project requirements and availability. This is confirmed during discovery.",
  ],
];
