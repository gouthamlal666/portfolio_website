export const profile = {
  firstName: "Goutham",
  lastName: "Lal",
  role: "Full Stack Developer & Cloud Engineer",
  focus: ["Laravel", "DevOps", "Cloud"],
  location: "Calicut, Kerala, India",
  timeZone: "Asia/Kolkata",
  email: "gouthamlal666@gmail.com",
  phone: "+91 85904 85146",
  phoneHref: "tel:+918590485146",
  cvUrl: "/Goutham_Lal_CV.pdf",
  socials: {
    github: "https://github.com/gouthamlal666",
    linkedin: "https://www.linkedin.com/in/goutham-lal-505780297/",
    instagram: "https://www.instagram.com/geek._.zz/",
  },
  summary: [
    "Full Stack Developer with hands-on agency experience designing, building, deploying and maintaining modern web applications and e-commerce platforms.",
    "Strong in PHP, Laravel, CodeIgniter, JavaScript, Vue.js, MySQL and RESTful API development, with practical DevOps skills across Linux, Docker, CI/CD, Git and production server deployment.",
    "Comfortable owning features end-to-end — from database design and backend logic to responsive UI, third-party integrations, go-live and production support. Currently deepening expertise in AWS, Azure, GCP, Kubernetes, Terraform and multi-cloud infrastructure.",
  ],
};

export const stats = [
  { value: "2+", label: "Years in agency delivery" },
  { value: "20+", label: "Key projects delivered" },
  { value: "2,283", label: "Automated tests on one platform" },
  { value: "1,100+", label: "Products managed in a live store" },
];

export type Role = {
  title: string;
  company: string;
  companyType: string;
  companyUrl?: string;
  period?: string;
  current?: boolean;
  stack: string[];
  highlights: string[];
  /** Show every highlight instead of collapsing the extras behind a toggle */
  showAllHighlights?: boolean;
  /** Optional extra detail */
  about?: string;
  facts?: { label: string; value: string; href?: string }[];
  focus?: { title: string; items: string[] }[];
};

export const experience: Role[] = [
  {
    title: "Full Stack Developer & Cloud Engineer",
    company: "Geo Design Media",
    companyType: "Design & Digital Agency · London & Essex, UK",
    companyUrl: "https://geodesignmedia.co.uk/",
    period: "Jun 2026 — Present",
    current: true,
    stack: ["Laravel", "PHP", "JavaScript", "MySQL", "Linux", "Docker", "CI/CD", "Cloudflare", "AWS / Azure / GCP"],
    highlights: [
      "Building and maintaining websites and web applications for the agency's UK clients, from development through to launch.",
      "Owning the cloud side of delivery — hosting, deployments, DNS, SSL and production server management for client projects.",
      "Working within a multidisciplinary team of designers, developers and IT professionals across London and Essex.",
    ],
    about:
      "Geo Design Media is a UK creative agency of designers, developers and IT professionals based in London and Essex, working with clients internationally. The team takes projects from concept and visualisation through to implementation — across branding, print and web.",
    facts: [
      { label: "Based", value: "London · Basildon · Chelmsford · Colchester" },
      { label: "Company", value: "Geo Design Media Ltd · No. 12814144", href: "https://find-and-update.company-information.service.gov.uk/company/12814144" },
    ],
    focus: [
      {
        title: "Full stack development",
        items: [
          "Client websites and web applications, from build to launch",
          "Backend logic, databases and third-party integrations",
          "Responsive, design-accurate interfaces built with the design team",
          "Maintenance, fixes and feature work on live client sites",
        ],
      },
      {
        title: "Cloud engineering",
        items: [
          "Hosting, server set-up and production deployments",
          "Domains, DNS, SSL and Cloudflare configuration",
          "Monitoring and troubleshooting live environments",
          "Automating releases with Git-based CI/CD workflows",
        ],
      },
    ],
  },
  {
    title: "Full Stack Developer",
    company: "Makeit Ads",
    companyType: "Creative & Digital Agency",
    stack: ["Laravel", "PHP", "Vue.js", "JavaScript", "MySQL", "Bootstrap", "Git", "cPanel", "Cloudflare", "GA4 / GTM"],
    highlights: [
      "Built and maintained responsive websites and dynamic web applications for client and business projects using Laravel, PHP, Vue.js, JavaScript, Bootstrap and MySQL.",
      "Designed and integrated REST APIs connecting frontend and backend systems, plus third-party services and external APIs.",
      "Implemented authentication, user management, dashboards, CRUD modules and core business logic.",
      "Developed e-commerce features including product & category management, search, filtering, customer accounts and checkout workflows.",
      "Designed MySQL schemas and relationships, and wrote optimized queries for data-heavy features.",
      "Deployed and managed production sites on cPanel, Hostinger and Linux servers — handling DNS, SSL and Cloudflare configuration.",
      "Diagnosed and resolved live production issues: server errors, .env and routing misconfigurations, database faults and failed deployments.",
      "Implemented GA4 and Google Tag Manager tracking; optimized sites for performance, usability and SEO.",
      "Worked across the full lifecycle — requirement analysis, development, testing, deployment and maintenance — using Git/GitHub workflows.",
    ],
  },
  {
    title: "Junior Full Stack Developer",
    company: "ViralMafia",
    companyType: "Digital Marketing Agency",
    showAllHighlights: true,
    stack: ["PHP", "Laravel", "CodeIgniter", "jQuery", "AJAX", "MySQL", "Bootstrap", "Git"],
    highlights: [
      "Developed responsive websites and web applications with PHP, Laravel, CodeIgniter, JavaScript, HTML, CSS, Bootstrap and MySQL.",
      "Built MVC-based backend functionality: dynamic pages, forms, authentication systems, dashboards and database-driven features.",
      "Created and consumed REST APIs; added interactive experiences with AJAX and jQuery.",
      "Translated design specifications into pixel-accurate, responsive user interfaces.",
      "Investigated and fixed bugs, optimized database queries and improved existing features.",
      "Assisted with deployments, hosting setup, domain configuration, SSL and production troubleshooting.",
      "Collaborated with designers and team members to deliver client projects on time and to specification.",
    ],
  },
];

export type Project = {
  name: string;
  tagline: string;
  kind: string;
  url?: string;
  domain?: string;
  repo?: string;
  description: string;
  features: string[];
  metrics?: { value: string; label: string }[];
  stack: string[];
};

export const featuredProjects: Project[] = [
  {
    name: "MathsEleven",
    tagline: "CSSE 11+ Maths Preparation Platform",
    kind: "Subscription EdTech SaaS",
    url: "https://mathseleven.co.uk",
    domain: "mathseleven.co.uk",
    description:
      "Subscription platform preparing children for the Essex CSSE 11+ grammar-school exams. Parents subscribe and assign work; children practise in their own themed area — with adaptive practice that targets each child's weakest topics, timed mock exams scored against cohort data, a free 60-minute diagnostic with instant PDF reports, a 95-subtopic syllabus tracker and 17 maths mini-games.",
    features: [
      "Adaptive Practice",
      "Timed Mock Exams",
      "PDF Diagnostics",
      "Syllabus Tracker",
      "Mini Games",
      "Parent & Child Areas",
      "Stripe Subscriptions",
      "Google OAuth + Child PIN",
      "Shop & Exam Centre",
      "Admin Console & Audit Log",
      "AI Chat Widget",
    ],
    metrics: [
      { value: "57", label: "Controllers" },
      { value: "88", label: "Services" },
      { value: "48", label: "Livewire components" },
      { value: "129", label: "Routes" },
      { value: "2,283", label: "Automated tests" },
    ],
    stack: ["Laravel 11", "PHP 8.2", "Livewire 3", "Alpine.js", "Tailwind CSS 4", "MySQL 8", "Stripe", "Resend", "Hostinger"],
  },
  {
    name: "Avaa Boutique",
    tagline: "Fashion E-Commerce Platform",
    kind: "Full Stack Development",
    url: "https://avaaboutique.com",
    domain: "avaaboutique.com",
    description:
      "Production e-commerce store for an Indian ethnic-wear boutique, with a custom Laravel admin control centre managing a catalogue of 1,100+ products. Live KPI dashboards for sales, revenue, paid orders, pending fulfilment and customers, role-based admin & staff access with activity logs, and end-to-end order, payment, shipping and inventory workflows.",
    features: [
      "KPI Dashboard",
      "Activity Logs",
      "Orders",
      "Products & Categories",
      "Inventory",
      "Customers",
      "Coupons",
      "Payments",
      "Shipping",
      "Reports",
      "Banners & Videos",
      "Blogs",
      "SEO Settings",
      "Admin & Staff Roles",
    ],
    metrics: [
      { value: "1,100+", label: "Products" },
    ],
    stack: ["Laravel", "PHP", "MySQL", "JavaScript", "Bootstrap", "REST APIs"],
  },
  {
    name: "RemoteTeam OS",
    tagline: "Remote Team Management Platform",
    kind: "SaaS · TALL stack",
    repo: "https://github.com/gouthamlal666/remoteteam_os",
    description:
      "An all-in-one workspace for remote teams — departments, projects and tasks with a review workflow, team chat, meetings, daily and weekly reports, time tracking and HR records. Role-based visibility keeps super admins, department admins and members to exactly what they should see, while remote-first profiles show each teammate's timezone, local time, working hours and presence.",
    features: [
      "Roles & Policies",
      "Departments & People",
      "Projects & Kanban Board",
      "Task Review Workflow",
      "Checklists & Attachments",
      "Team Chat & DMs",
      "Meetings & Attendance",
      "Daily & Weekly Reports",
      "Performance Analytics",
      "Time Tracking",
      "Notifications & Email",
      "Command Palette",
      "Timezones & Presence",
      "Employee Records & Documents",
      "Activity Timeline",
    ],
    metrics: [
      { value: "3", label: "Access roles" },
      { value: "26", label: "Livewire components" },
    ],
    stack: ["Laravel 13", "Livewire 4", "Alpine.js", "Tailwind CSS 4", "MySQL / MariaDB"],
  },
  {
    name: "GymStack",
    tagline: "Multi-tenant Gym Management SaaS",
    kind: "SaaS · TALL stack",
    repo: "https://github.com/gouthamlal666/gym_stack",
    description:
      "A multi-tenant gym management platform with a premium Personal Training suite. Gyms run members, memberships, billing, attendance and trainers across multiple branches, while PT clients get sessions, body tracking, private progress photos, fitness assessments, workout programmes, nutrition plans and goals that update automatically from assessments.",
    features: [
      "Multi-tenant & Branches",
      "Role Permissions",
      "Email OTP & 2FA",
      "Memberships & Freezes",
      "Invoices & Refunds",
      "Finance Reports",
      "PT Packages & Booking",
      "Body Tracking",
      "Progress Photos",
      "Workout Builder",
      "Nutrition & Goals",
      "Attendance Heatmaps",
      "WhatsApp & Email Reminders",
      "Audit Log",
    ],
    metrics: [
      { value: "8", label: "User roles" },
      { value: "3", label: "Scheduled jobs" },
    ],
    stack: ["Laravel 13", "Livewire 4", "Tailwind CSS 4", "Alpine.js", "Chart.js", "MySQL", "WhatsApp Cloud API"],
  },
];

export type ProjectCategory = "SaaS & Apps" | "E-commerce & Trade" | "Hospitality" | "Business Websites";

export type ArchiveProject = {
  name: string;
  client: string;
  category: ProjectCategory;
  summary: string;
  highlights: string[];
  stack: string[];
  url?: string;
  repo?: string;
  /** Agency the project was delivered through */
  builtAt?: string;
};

const gh = (repo: string) => `https://github.com/gouthamlal666/${repo}`;

export const archiveProjects: ArchiveProject[] = [
  {
    name: "Billora",
    client: "GST invoicing SaaS · India",
    category: "SaaS & Apps",
    summary:
      "Invoicing app for Indian businesses — GST-ready invoices in seconds with CGST/SGST/IGST auto-calculation, UPI QR payments and WhatsApp sharing.",
    highlights: ["Invoices, quotes & recurring billing", "UPI QR codes & PDF export", "Payment tracking & reminders", "Template builder & AI invoice generator"],
    stack: ["Laravel 13", "Livewire 4", "DomPDF", "MySQL"],
    repo: gh("Billora_invoicewebapp"),
  },
  {
    name: "Task Management SPA",
    client: "Laravel API architecture",
    category: "SaaS & Apps",
    summary:
      "Single-page task manager on a Laravel REST API — full CRUD, completed/pending filters, validation and API Resources, driven entirely by AJAX.",
    highlights: ["RESTful /api/tasks endpoints", "Filtering & completion toggle", "Bootstrap modal editing", "Seeded sample data"],
    stack: ["Laravel", "REST API", "JavaScript", "Bootstrap", "MySQL"],
    repo: gh("laravel-task-manager"),
  },
  {
    name: "Invoice Management System",
    client: "Business application",
    category: "SaaS & Apps",
    summary:
      "Laravel app for creating and managing invoices, with relational schema design, validated CRUD and API-driven business logic.",
    highlights: ["Relational schema design", "Validated CRUD", "API-driven logic"],
    stack: ["Laravel", "PHP", "MySQL", "Bootstrap", "REST API"],
  },
  {
    name: "7's Trading",
    client: "Wholesale food distributor · UK & Europe",
    category: "E-commerce & Trade",
    summary:
      "B2B platform for a distributor of authentic Indian food brands (Thekkans, Brahmins, Maria's, Vishnu Bhavan), converted from static HTML to Laravel.",
    highlights: ["Brand-led product catalogue", "Trade sign-up, cart & quote requests", "Trade dashboard for retailers", "Admin: products, brands, stock, orders, users"],
    stack: ["Laravel 12", "PHP 8.2", "MySQL", "Blade"],
    repo: gh("7s-trading"),
  },
  {
    name: "Titan Drainage Solutions",
    client: "Drainage products · UK",
    category: "E-commerce & Trade",
    summary:
      "Product and accessories store with a full trade/wholesale portal for drainage and manhole-cover products.",
    highlights: ["Product & accessory catalogue with basket", "Trade sign-up, login & password reset", "Trade dashboard: orders, notifications, support", "Admin trade-account management"],
    stack: ["CodeIgniter 4", "PHP", "MySQL", "CKEditor"],
    repo: gh("titandrainage"),
  },
  {
    name: "Ottakombann",
    client: "Spirits brand · Kerala heritage",
    category: "E-commerce & Trade",
    summary:
      "Brand website for a Kerala-heritage spirits label infused with Ayurvedic ingredients — product collection, craft process and international distribution.",
    highlights: ["Product collection pages", "Process & heritage storytelling", "Distributors and UAE & Malta pages", "Groceries range"],
    stack: ["HTML5", "CSS3", "JavaScript"],
    repo: gh("ottakombann-website"),
  },
  {
    name: "Vembanad",
    client: "South Indian restaurant & lounge · UK",
    category: "Hospitality",
    url: "https://vembanadrestaurant.co.uk",
    builtAt: "Geo Design Media",
    summary:
      "Website for a Kerala restaurant and lounge, inspired by Vembanad Lake — menus, offers, the founders' story and direct routes to table reservations and online ordering.",
    highlights: [
      "Reserve a table & order online",
      "Offer banners: business lunch, Blue Light discount, seasonal",
      "Menu, lounge, gallery & founders' story",
      "FAQs, opening hours & legal pages",
    ],
    stack: ["HTML5", "Bootstrap 5", "JavaScript", "jQuery"],
  },
  {
    name: "D'bouk",
    client: "Lebanese restaurant",
    category: "Hospitality",
    summary:
      "Static restaurant site converted to Laravel with a MySQL-backed admin for online orders, table bookings and catering.",
    highlights: ["Online ordering with order queue", "Table bookings & closed dates", "Catering enquiries & contact inbox", "Menu, offers & gallery management"],
    stack: ["Laravel 13", "PHP 8.3", "MySQL"],
    repo: gh("dbouk"),
  },
  {
    name: "Signature Fine Cuisine",
    client: "South Indian restaurant · Tunbridge Wells",
    category: "Hospitality",
    summary:
      "Fine-dining restaurant and lounge website with menus, events, gallery and direct routes to ordering and table booking.",
    highlights: ["Menu & events pages", "Gallery", "Order online & book a table", "PHP contact mailer"],
    stack: ["HTML5", "CSS3", "JavaScript", "PHP"],
    repo: gh("signature-restuarant"),
  },
  {
    name: "Akdeniz",
    client: "Turkish restaurant · Coventry",
    category: "Hospitality",
    summary:
      "Restaurant website for Turkish Mediterranean dining — menu, gallery, events and private-dining enquiries with online ordering and reservations.",
    highlights: ["Menu & gallery", "Events & private dining", "Ordering & reservations links", "Legal pages"],
    stack: ["HTML5", "CSS3", "JavaScript"],
    repo: gh("akdeniz_restaurant"),
  },
  {
    name: "Platinum Peak Apartments",
    client: "Holiday apartments · Victoria Falls",
    category: "Hospitality",
    url: "https://platinumpeakapartments.com",
    summary:
      "Laravel 13 conversion of a holiday-apartment site with a SEO command centre and blog CMS, keeping every original URL intact.",
    highlights: ["Per-page SEO, JSON-LD & social meta", "Dynamic sitemap, robots & redirects", "Blog CMS with drafts & images", "Page health scores & feature tests"],
    stack: ["Laravel 13", "PHP 8.3", "MySQL", "SCSS"],
    repo: gh("platinumpeakapartments"),
  },
  {
    name: "Dove Court",
    client: "Care home · Wisbech",
    category: "Business Websites",
    url: "https://dovecourtwisbech.co.uk",
    summary:
      "Care-home website on Laravel with an admin for content and search visibility, migrated from existing pages without losing content.",
    highlights: ["Blog with advanced SEO fields", "Categorised gallery", "SEO settings per page", "Website banner manager"],
    stack: ["Laravel 13", "PHP 8.3", "MySQL"],
    repo: gh("dovecourt"),
  },
  {
    name: "Cleartone",
    client: "Ear-care clinic · Basildon",
    category: "Business Websites",
    url: "https://cleartoneearwaxremoval.com",
    summary:
      "Local-SEO focused site for a microsuction ear-wax removal clinic, with location landing pages and a blog managed from an admin panel.",
    highlights: ["Location pages for local search", "Blog CMS", "Google reviews integration", "Sitemap & llms.txt"],
    stack: ["Laravel 12", "PHP 8.2", "MySQL"],
    repo: gh("Cleartone-website"),
  },
  {
    name: "Therapeia",
    client: "Healing retreats · Florida",
    category: "Business Websites",
    summary:
      "Website for clinician-led healing retreats covering infertility, heartbreak, burnout and feeling lost — with a blog and a lead-capture guide.",
    highlights: ["4 retreat landing pages", "9-article blog", "Reviews & personal guide sign-up", "PHP contact handling"],
    stack: ["HTML5", "CSS3", "JavaScript", "PHP"],
    repo: gh("therapeia-website"),
  },
  {
    name: "Élite Aesthetics",
    client: "Interior design · Landing page",
    category: "Business Websites",
    summary: "Minimal, modern landing page for an interior-design brand with services, craft showcase and testimonials.",
    highlights: ["Responsive single-page layout", "Testimonials & blog teasers"],
    stack: ["HTML5", "CSS3", "JavaScript"],
    repo: gh("Elite-Aesthetics-LP"),
  },
];

export const skillGroups = [
  { label: "Backend", items: ["PHP", "Laravel", "CodeIgniter", "Python", "Django", "REST APIs", "MVC", "Auth & RBAC"] },
  {
    label: "Frontend",
    items: ["JavaScript", "Vue.js", "Next.js", "HTML5", "CSS3", "Bootstrap", "Livewire", "Alpine.js", "Tailwind CSS", "jQuery", "AJAX", "Swiper.js"],
  },
  { label: "Database", items: ["MySQL", "PostgreSQL", "SQLite", "Supabase", "Query Optimization"] },
  {
    label: "DevOps & Cloud",
    items: ["Linux Admin", "Bash / Shell", "Docker", "Kubernetes", "Terraform", "Ansible", "Jenkins", "GitHub Actions", "AWS", "Azure", "GCP", "Cloudflare", "cPanel", "Hostinger", "SSL / DNS"],
  },
  { label: "Tools", items: ["Git", "GitHub", "VS Code", "Composer", "npm", "Postman", "XAMPP", "phpMyAdmin", "UTM / Linux VMs"] },
  {
    label: "APIs & Integrations",
    items: ["REST API development", "API auth & JSON", "Webhooks", "Payment gateways", "WhatsApp Business API", "GA4 & Tag Manager", "AJAX APIs"],
  },
];

export const strengths = [
  "Full Stack Web Development",
  "Laravel & SaaS Applications",
  "REST API Design & Integration",
  "E-Commerce Development",
  "Database Design",
  "Deployment & Server Management",
  "Production Troubleshooting",
  "Website Migration",
];

export const alsoExperienced = [
  "CI/CD pipelines (GitHub Actions, Jenkins)",
  "Terraform IaC & Ansible automation",
  "Production deployment & troubleshooting",
  "SEO-friendly development",
  "Domain & DNS setup",
  ".env & environment config",
  "Performance optimization",
  "UI/UX implementation",
];

export const qualities = [
  "Problem Solving & Logical Thinking",
  "Debugging & Troubleshooting",
  "Project Ownership",
  "Client Communication",
  "Team Collaboration",
  "Quick Learning & Adaptability",
  "Time Management",
];

export const education = {
  title: "Diploma in Multimedia & Designing",
  detail: "Specialization: Full Stack Development (PHP Stack)",
};

export const languages = [
  { name: "English", level: "Professional" },
  { name: "Malayalam", level: "Native" },
];
