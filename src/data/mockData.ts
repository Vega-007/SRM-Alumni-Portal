export interface Alumni {
  id: string;
  name: string;
  degree: string;
  batch: string;
  company: string;
  companyLogoText: string; // Text placeholder for logo
  role: string;
  ctc: string;
  linkedin: string;
  imageUrl: string;
  featured: boolean;
  city: string;
}

export interface SuccessStory {
  id: string;
  name: string;
  degree: string;
  batch: string;
  company: string;
  role: string;
  title: string;
  quote: string;
  story: string;
  imageUrl: string;
}

export interface MapHub {
  id: string;
  name: string;
  coordinates: { x: number; y: number }; // percentage coords (0-100) for responsive SVG plotting
  alumniCount: number;
  topCompanies: string[];
}

export const MOCK_STATS = [
  { label: "Total Alumni", value: "15,000+", detail: "Across 45+ countries" },
  { label: "Highest Package", value: "₹42.5 LPA", detail: "Offered by Amazon" },
  { label: "Partner Companies", value: "500+", detail: "Recruiting globally" },
  { label: "Placement Rate", value: "98.2%", detail: "Consistent past 5 years" }
];

export const MOCK_COMPANIES = [
  { name: "Google", logoText: "Google" },
  { name: "Amazon", logoText: "Amazon" },
  { name: "Microsoft", logoText: "Microsoft" },
  { name: "Meta", logoText: "Meta" },
  { name: "Apple", logoText: "Apple" },
  { name: "Netflix", logoText: "Netflix" },
  { name: "Stripe", logoText: "Stripe" },
  { name: "Zoho", logoText: "Zoho" },
  { name: "TCS", logoText: "TCS" },
  { name: "Cognizant", logoText: "Cognizant" }
];

export const MOCK_ALUMNI: Alumni[] = [
  {
    id: "1",
    name: "Aditya Vardhan",
    degree: "B.Tech CSE",
    batch: "2020",
    company: "Google",
    companyLogoText: "G",
    role: "Senior Software Engineer",
    ctc: "₹38.5 LPA",
    linkedin: "https://linkedin.com/in/adityavardhan",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop",
    featured: true,
    city: "San Francisco"
  },
  {
    id: "2",
    name: "Priyanka Nair",
    degree: "B.Tech IT",
    batch: "2019",
    company: "Microsoft",
    companyLogoText: "M",
    role: "Product Manager II",
    ctc: "₹32.0 LPA",
    linkedin: "https://linkedin.com/in/priyankanair",
    imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=300&auto=format&fit=crop",
    featured: true,
    city: "Seattle"
  },
  {
    id: "3",
    name: "Vikram Malhotra",
    degree: "B.Tech CSE",
    batch: "2021",
    company: "Amazon",
    companyLogoText: "A",
    role: "SDE II",
    ctc: "₹42.5 LPA",
    linkedin: "https://linkedin.com/in/vikrammalhotra",
    imageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300&auto=format&fit=crop",
    featured: true,
    city: "Seattle"
  },
  {
    id: "4",
    name: "Meera Krishnan",
    degree: "B.Tech ECE",
    batch: "2018",
    company: "Meta",
    companyLogoText: "Meta",
    role: "Machine Learning Engineer",
    ctc: "₹36.0 LPA",
    linkedin: "https://linkedin.com/in/meerakrishnan",
    imageUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=300&auto=format&fit=crop",
    featured: true,
    city: "London"
  },
  {
    id: "5",
    name: "Rohan Das",
    degree: "B.Tech CSE",
    batch: "2022",
    company: "Stripe",
    companyLogoText: "Stripe",
    role: "Backend Engineer",
    ctc: "₹28.5 LPA",
    linkedin: "https://linkedin.com/in/rohandas",
    imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=300&auto=format&fit=crop",
    featured: true,
    city: "San Francisco"
  },
  {
    id: "6",
    name: "Ananya Sen",
    degree: "B.Tech IT",
    batch: "2020",
    company: "Zoho",
    companyLogoText: "Zoho",
    role: "Lead UI Developer",
    ctc: "₹18.0 LPA",
    linkedin: "https://linkedin.com/in/ananyasen",
    imageUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=300&auto=format&fit=crop",
    featured: true,
    city: "Bengaluru"
  },
  {
    id: "7",
    name: "Siddharth Verma",
    degree: "B.Tech ME",
    batch: "2019",
    company: "Tesla",
    companyLogoText: "Tesla",
    role: "Automation Engineer",
    ctc: "₹29.0 LPA",
    linkedin: "https://linkedin.com/in/siddharthverma",
    imageUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=300&auto=format&fit=crop",
    featured: false,
    city: "San Francisco"
  },
  {
    id: "8",
    name: "Rhea Kapoor",
    degree: "B.Tech CSE",
    batch: "2023",
    company: "Netflix",
    companyLogoText: "N",
    role: "UI Engineer",
    ctc: "₹34.0 LPA",
    linkedin: "https://linkedin.com/in/rheakapoor",
    imageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop",
    featured: false,
    city: "Los Angeles"
  },
  {
    id: "9",
    name: "Karan Johar",
    degree: "B.Tech EEE",
    batch: "2018",
    company: "Schneider Electric",
    companyLogoText: "Schneider",
    role: "Power Systems Engineer",
    ctc: "₹15.5 LPA",
    linkedin: "https://linkedin.com/in/karanjohar",
    imageUrl: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=300&auto=format&fit=crop",
    featured: false,
    city: "Singapore"
  },
  {
    id: "10",
    name: "Shreya Ghoshal",
    degree: "MBA",
    batch: "2021",
    company: "TCS",
    companyLogoText: "TCS",
    role: "HR Business Partner",
    ctc: "₹12.0 LPA",
    linkedin: "https://linkedin.com/in/shreyaghoshal",
    imageUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=300&auto=format&fit=crop",
    featured: false,
    city: "Bengaluru"
  },
  {
    id: "11",
    name: "Abhinav Bindra",
    degree: "B.Tech CSE",
    batch: "2024",
    company: "Zoho",
    companyLogoText: "Zoho",
    role: "Associate Software Engineer",
    ctc: "₹9.5 LPA",
    linkedin: "https://linkedin.com/in/abhinavbindra",
    imageUrl: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=300&auto=format&fit=crop",
    featured: false,
    city: "Chennai"
  },
  {
    id: "12",
    name: "Tanvi Shah",
    degree: "M.Tech CSE",
    batch: "2020",
    company: "Intel",
    companyLogoText: "Intel",
    role: "Hardware Engineer",
    ctc: "₹24.0 LPA",
    linkedin: "https://linkedin.com/in/tanvishah",
    imageUrl: "https://images.unsplash.com/photo-1554151228-14d9def656e4?q=80&w=300&auto=format&fit=crop",
    featured: false,
    city: "Tokyo"
  },
  {
    id: "13",
    name: "Varun Dhawan",
    degree: "B.Tech CSE",
    batch: "2022",
    company: "Microsoft",
    companyLogoText: "M",
    role: "Software Engineer I",
    ctc: "₹26.0 LPA",
    linkedin: "https://linkedin.com/in/varundhawan",
    imageUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=300&auto=format&fit=crop",
    featured: false,
    city: "Bengaluru"
  },
  {
    id: "14",
    name: "Esha Gupta",
    degree: "B.Tech IT",
    batch: "2023",
    company: "Amazon",
    companyLogoText: "A",
    role: "SDE I",
    ctc: "₹28.0 LPA",
    linkedin: "https://linkedin.com/in/eshagupta",
    imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=300&auto=format&fit=crop",
    featured: false,
    city: "Bengaluru"
  },
  {
    id: "15",
    name: "Deepak Chahar",
    degree: "B.Tech ECE",
    batch: "2018",
    company: "Qualcomm",
    companyLogoText: "Q",
    role: "Staff Engineer",
    ctc: "₹31.5 LPA",
    linkedin: "https://linkedin.com/in/deepakchahar",
    imageUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=300&auto=format&fit=crop",
    featured: false,
    city: "Sydney"
  }
];

export const MOCK_SUCCESS_STORIES: SuccessStory[] = [
  {
    id: "s1",
    name: "Aditya Vardhan",
    degree: "B.Tech CSE",
    batch: "2020",
    company: "Google",
    role: "Senior Software Engineer",
    title: "From Ramapuram Labs to Google Mountain View",
    quote: "The academic rigor at SRMIST, combined with self-initiated hackathons, built a foundation that helps me tackle complex infrastructure challenges daily at Google.",
    story: "During my time at SRMIST Ramapuram, I was deeply involved in the Coding Club and open-source contributions. The supportive faculty allowed us to build custom web applications for college departments, which gave me real-world development experience. In my third year, I secured an internship through SRM's placement drive, which later converted into a full-time role at Google. My advice to juniors is simple: don't just rely on textbooks. Build side projects, participate in hackathons, and connect with your seniors on LinkedIn.",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop"
  },
  {
    id: "s2",
    name: "Priyanka Nair",
    degree: "B.Tech IT",
    batch: "2019",
    company: "Microsoft",
    role: "Product Manager II",
    title: "Navigating My Path to Product Management",
    quote: "SRMIST taught me to look at engineering problems from a user's perspective, which is crucial in my role as a PM at Microsoft today.",
    story: "I started my journey at SRMIST as a software engineering enthusiast. However, organizing national-level symposiums and leading the student council made me realize my passion for management and product strategy. I transitioned from a software developer role at a startup to Product Management at Microsoft. The alumni network was incredibly helpful in reviewing my resume and conducting mock interviews. Always build communication skills alongside technical expertise.",
    imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop"
  },
  {
    id: "s3",
    name: "Meera Krishnan",
    degree: "B.Tech ECE",
    batch: "2018",
    company: "Meta",
    role: "Machine Learning Engineer",
    title: "Leading AI Advancements in London",
    quote: "The electronics and signal processing foundations I learned at SRMIST Ramapuram were instrumental in my pivot to deep learning.",
    story: "After graduating in ECE, I pursued my Master's degree in Artificial Intelligence at UCL, London. My final year project at SRMIST was on computer vision for medical diagnostics, which got published in a reputable IEEE journal with the help of my professors. That publication was key to my grad school acceptance. Now at Meta, I work on large recommendation models. For ECE students, AI and ML are excellent fields where you can combine hardware understanding with high-level software models.",
    imageUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=400&auto=format&fit=crop"
  }
];

export const MOCK_MAP_HUBS: MapHub[] = [
  {
    id: "h1",
    name: "San Francisco",
    coordinates: { x: 15, y: 35 }, // responsive placement on global SVG map
    alumniCount: 145,
    topCompanies: ["Google", "Stripe", "Tesla", "Apple"]
  },
  {
    id: "h2",
    name: "Seattle",
    coordinates: { x: 17, y: 25 },
    alumniCount: 210,
    topCompanies: ["Amazon", "Microsoft", "Boeing"]
  },
  {
    id: "h3",
    name: "London",
    coordinates: { x: 48, y: 28 },
    alumniCount: 98,
    topCompanies: ["Meta", "Google", "Barclays", "HSBC"]
  },
  {
    id: "h4",
    name: "Bengaluru",
    coordinates: { x: 72, y: 58 },
    alumniCount: 650,
    topCompanies: ["Zoho", "Microsoft", "Amazon", "TCS", "Flipkart"]
  },
  {
    id: "h5",
    name: "Singapore",
    coordinates: { x: 78, y: 64 },
    alumniCount: 85,
    topCompanies: ["DBS", "Schneider", "Grab", "Sea Group"]
  },
  {
    id: "h6",
    name: "Tokyo",
    coordinates: { x: 86, y: 38 },
    alumniCount: 42,
    topCompanies: ["Intel", "Sony", "Rakuten", "Toyota"]
  },
  {
    id: "h7",
    name: "Sydney",
    coordinates: { x: 90, y: 82 },
    alumniCount: 56,
    topCompanies: ["Atlassian", "Qualcomm", "Canva", "Macquarie"]
  }
];

export interface AlumniEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  imageUrl: string;
}

export const MOCK_EVENTS: AlumniEvent[] = [
  {
    id: "e1",
    title: "Annual Grand Alumni Meet 2026",
    date: "Dec 18, 2026",
    time: "17:00 IST",
    location: "SRM Ramapuram Campus Lawn, Chennai",
    description: "Reconnect with old classmates, expand your network, and meet current leadership at our flagship yearly gathering. Includes gala dinner and campus tours.",
    imageUrl: "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "e2",
    title: "Generative AI Industry Panel",
    date: "Oct 24, 2026",
    time: "19:00 IST",
    location: "Virtual Panel (Zoom / YouTube Live)",
    description: "Alumni engineering leaders at OpenAI, Microsoft, and Google share insights on building with LLMs, prompt systems, and pivoting your career into AI.",
    imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "e3",
    title: "KTR Tech Innovation Summit",
    date: "Nov 08, 2026",
    time: "09:30 IST",
    location: "Kattankulathur Campus Auditorium",
    description: "An interactive, multi-campus research expo featuring student-led prototype demos, VC pitch stands, and keynotes by distinguished alumni founders.",
    imageUrl: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "e4",
    title: "Global Startup Pitch Night",
    date: "Jan 12, 2027",
    time: "21:00 IST",
    location: "Virtual Webcast (India-US Collaboration)",
    description: "Watch alumni-led startups pitch live to early-stage venture capital firms. Ideal for founders seeking seed checks and strategic mentorship.",
    imageUrl: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=600&auto=format&fit=crop"
  }
];

