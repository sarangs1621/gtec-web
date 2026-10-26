import { Bot, Briefcase, Code2, ImageIcon, Network, PencilRuler, TrendingUp, type LucideIcon } from "lucide-react";

const SITE = "https://www.gteceducation.com";

export type Course = {
  slug: string;
  title: string;
  summary: string;
  description: string;
  tags: string[];
  note: string;
  icon: LucideIcon;
};

export const COURSES: Course[] = [
  {
    slug: "robotics",
    title: "Robotics",
    summary: "Design, build and program smart machines with electronics, AI, automation and embedded systems.",
    description:
      "Design, build and program smart machines with electronics, AI, automation and embedded systems — from your first circuit to autonomous robots.",
    tags: ["Arduino & Raspberry Pi", "AI & automation", "IoT & sensors", "Embedded C"],
    note: "Hands-on labs · All ages",
    icon: Bot,
  },
  {
    slug: "software",
    title: "Software",
    summary: "Coding, web and app development, databases and testing.",
    description:
      "Learn to code and ship real software — programming fundamentals, web and app development, databases and testing, from beginner to advanced.",
    tags: ["Python", "Java", "Web & app dev", "Databases"],
    note: "Beginner to advanced",
    icon: Code2,
  },
  {
    slug: "multimedia",
    title: "Multimedia",
    summary: "Graphic design, animation, video editing and 3D modelling.",
    description:
      "Studio-based training in graphic design, 2D and 3D animation, video editing and motion graphics using industry-standard tools.",
    tags: ["Graphic design", "2D / 3D animation", "Video editing", "Motion graphics"],
    note: "Studio-based training",
    icon: ImageIcon,
  },
  {
    slug: "hardware-and-networking",
    title: "Hardware & Networking",
    summary: "Build, manage and repair computers and networks, hands-on.",
    description:
      "Lab-based training to assemble, maintain and repair computers, and to design, configure and manage networks and servers.",
    tags: ["PC assembly", "Networking", "Cisco track", "Servers"],
    note: "Lab-based training",
    icon: Network,
  },
  {
    slug: "finance-and-business-management",
    title: "Finance & Business",
    summary: "Accounting, Tally, business management — theory plus practice.",
    description:
      "Practical accounting, Tally and SAP, plus business management fundamentals — theory paired with real-world practice.",
    tags: ["Tally", "SAP", "Accounting", "Business management"],
    note: "Tally & SAP tracks",
    icon: TrendingUp,
  },
  {
    slug: "cad",
    title: "CAD",
    summary: "Industry tools for engineering, architecture and product design.",
    description:
      "Autodesk-aligned training in the CAD tools used across engineering, architecture and product design, including 3D modelling.",
    tags: ["AutoCAD", "3D modelling", "Architecture", "Mechanical design"],
    note: "Autodesk-aligned",
    icon: PencilRuler,
  },
  {
    slug: "non-it-programs",
    title: "Non-IT Programs",
    summary: "Languages, business, hospitality, healthcare and skilled trades.",
    description:
      "Career and language tracks beyond IT — languages, business skills, hospitality, healthcare and skilled trades.",
    tags: ["Languages", "Hospitality", "Healthcare", "Business skills"],
    note: "Career & language tracks",
    icon: Briefcase,
  },
];

export const courseUrl = (slug: string) => `${SITE}/courses/${slug}`;

export const STATS = [
  { value: 25, suffix: "+", label: "Years of legacy" },
  { value: 800, suffix: "+", label: "Training centres" },
  { value: 23, suffix: "", label: "Countries served" },
  { value: 3.2, suffix: "M", label: "Students trained" },
  { value: 5000, suffix: "+", label: "Expert teachers" },
];

const FLAG = `${SITE}/storage/app/public/country/`;
/** Head office: House of G-TEC, Calicut. Globe arcs start here. */
export const HQ: [number, number] = [11.25, 75.78];

/** Rough country centres for the globe markers, [lat, lon]. */
const COORDS: Record<string, [number, number]> = {
  Africa: [2, 21], Australia: [-25, 134], Bahrain: [26, 50.5], Egypt: [27, 30], Ghana: [7.9, -1], India: HQ, Iran: [32, 53],
  Kenya: [0.5, 37.5], Kuwait: [29, 47.5], Malawi: [-13.5, 34], Malaysia: [4, 102], Mexico: [23, -102], Oman: [21, 57],
  Philippines: [12, 122], Qatar: [25, 51], "Saudi Arabia": [24, 45], Singapore: [1.3, 103.8], "Sri Lanka": [7.5, 80.7],
  Tanzania: [-6, 35], UAE: [24, 54], UK: [54, -2], USA: [39, -98], Zambia: [-13, 28],
};

export const COUNTRIES = (
  [
    ["Africa", "17-09-25-04-58-AFRICA.png", "https://gtecafrica.com/"],
    ["Australia", "17-09-25-04-11-australian-flag.jpg"],
    ["Bahrain", "bh.png"],
    ["Egypt", "17-09-25-04-35-27140.jpg", "https://www.gtecegypt.com/"],
    ["Ghana", "17-09-25-04-05-GHANA.png"],
    ["India", "in.png"],
    ["Iran", "ir.png"],
    ["Kenya", "17-09-25-04-26-KENYA.png"],
    ["Kuwait", "kw.png", "https://www.gteckuwait.com/"],
    ["Malawi", "17-09-25-04-43-MALAWI.png"],
    ["Malaysia", "my.png", "https://www.gteceducation.com.my/"],
    ["Mexico", "mx.png"],
    ["Oman", "17-09-25-04-46-OMAN-FLAG.png"],
    ["Philippines", "ph.png"],
    ["Qatar", "qa.png", "https://www.gtecqatar.com/"],
    ["Saudi Arabia", "sa.png"],
    ["Singapore", "sg.png", "https://gteceducation.com.sg/"],
    ["Sri Lanka", "lk.png"],
    ["Tanzania", "17-09-25-04-45-TANZANIA.png"],
    ["UAE", "ae.png", "https://gtecqusais.com/"],
    ["UK", "17-09-25-04-58-UK.jpg"],
    ["USA", "22-09-25-12-22-USA-flag-2.jpg"],
    ["Zambia", "17-09-25-04-42-ZAMBIA.png"],
  ] as [string, string, string?][]
).map(([name, flag, url]) => ({ name, flag: FLAG + flag, url: url ?? `${SITE}/centres`, coords: COORDS[name] }));

const AFF = `${SITE}/storage/app/public/affliation/`;
export const AFFILIATIONS = [
  ["IAAP UK", "26-08-25-05-13-6.jpg", "https://www.iaapuk.org/"],
  ["ABMA", "13-09-25-12-39-19.jpg", "https://abma.uk.com/"],
  ["QuickBooks", "13-09-25-12-17-6.jpg", "https://quickbookstraining.com/"],
  ["Autodesk", "13-09-25-12-53-17.jpg", "https://www.autodesk.com/"],
  ["Certiport ESB", "13-09-25-12-24-13.jpg", "https://certiport.pearsonvue.com/"],
  ["EC-Council", "13-09-25-12-34-14.jpg", "https://www.eccouncil.org/"],
  ["SAP", "13-09-25-12-57-5.jpg", "https://www.sap.com/"],
  ["Microsoft", "13-09-25-12-05-8.jpg", "https://learn.microsoft.com/"],
  ["Adobe", "13-09-25-12-55-18.jpg", "https://www.adobe.com/"],
  ["IAB", "13-09-25-12-05-12.jpg", "https://www.iab.org.uk/"],
  ["Keltron", "13-09-25-11-13-1.jpg", "https://www.keltron.org/"],
  ["IC3", "13-09-25-11-41-11.jpg", "https://certiport.pearsonvue.com/"],
  ["Zoho", "13-09-25-11-44-3.jpg", "https://www.zoho.com/"],
  ["Meta", "13-09-25-11-06-9.jpg", "https://www.meta.com/"],
  ["Tally", "13-09-25-11-42-4.jpg", "https://tallysolutions.com/"],
  ["IT Specialist", "13-09-25-11-24-10.jpg", "https://certiport.pearsonvue.com/"],
  ["Cisco", "13-09-25-12-26-15.jpg", "https://www.cisco.com/"],
  ["Certiport", "13-09-25-12-29-16.jpg", "https://certiport.pearsonvue.com/"],
].map(([name, img, url]) => ({ name, img: AFF + img, url }));

export const TESTIMONIALS = [
  { name: "Lakshmi Suresh", kind: "YouTube story", url: "https://www.youtube.com/watch?v=kxxyws9GHqk", tone: "blue", thumb: "/thumbs/kxxyws9GHqk.jpg" },
  { name: "Sharanya", kind: "Instagram reel", url: "https://www.instagram.com/reel/Cvwuaz4oK6P/", tone: "light", thumb: "/thumbs/Cvwuaz4oK6P.jpg" },
  { name: "Gowri Sunil", kind: "Instagram reel", url: "https://www.instagram.com/reel/DM-XVqqzH7C/", tone: "red", thumb: "/thumbs/DM-XVqqzH7C.jpg" },
  { name: "Dilsana", kind: "Instagram reel", url: "https://www.instagram.com/reel/CvpE3KMolt2/", tone: "light", thumb: "/thumbs/CvpE3KMolt2.jpg" },
  { name: "Fathima Shakeela", kind: "YouTube story", url: "https://www.youtube.com/watch?v=n8gT_TGFKhE", tone: "blue", thumb: "/thumbs/n8gT_TGFKhE.jpg" },
  { name: "Rishana", kind: "Instagram reel", url: "https://www.instagram.com/reel/Czqw7zYviSl/", tone: "light" },
] as const;

export const NEWS = [
  { date: "09 Oct 2026", title: "Job Fair 2026 — in association with G-TEC Perinthalmanna", url: `${SITE}/newsandevent/44` },
  { date: "28 Sep 2026", title: "G-TEC Balussery organises Job Fair 2026", url: `${SITE}/newsandevent/53` },
];

export const FLASH = [
  { text: "09 Oct 2026 — Job Fair 2026 in association with G-TEC Perinthalmanna", url: `${SITE}/newsandevent/44` },
  { text: "28 Sep 2026 — G-TEC Balussery organises Job Fair 2026", url: `${SITE}/newsandevent/53` },
  {
    text: "New certificate verification portal live for enrolments from April 2026",
    url: "https://gems.gtec.education/StudentApplicationForm/certificate_validation",
  },
];

const SUB = `${SITE}/storage/app/public/subsidiary/`;
export const SUBSIDIARIES = [
  { name: "G-TEC College", img: SUB + "17-06-25-04-36-01.webp", url: "https://gteccollege.com/" },
  { name: "Gensmart Academy", img: SUB + "17-06-25-04-39-02.webp", url: "http://gensmartacademy.com/" },
  { name: "GOBS Bank", img: SUB + "17-06-25-04-39-03.webp", url: "https://www.gobsbank.com/" },
  { name: "G-TEC Online Learning", img: SUB + "17-06-25-04-45-05.webp", url: "https://gteconlinelearning.com" },
  { name: "G-TEC Global Campus", img: SUB + "17-06-25-04-35-06.webp", url: "https://gtecglobalcampus.com/" },
];

export const CONTACT = {
  address: ["House of G-TEC, Indus Avenue", "Calicut – 673002, Kerala, India"],
  phone: { label: "+91 495 408 8333", href: "tel:+914954088333" },
  whatsapp: { label: "+91 95269 93944", href: "https://wa.me/919526993944?text=Hello%20!", tel: "tel:+919526993944" },
  email: { label: "info@gteceducation.com", href: "mailto:info@gteceducation.com" },
  pay: `${SITE}/onlinepayment`,
};

export const SOCIAL = [
  { label: "Facebook", url: "https://www.facebook.com/TEAMGTEC" },
  { label: "Instagram", url: "https://www.instagram.com/teamgtec/" },
  { label: "LinkedIn", url: "https://www.linkedin.com/company/g-tec-groupofinstitutions" },
  { label: "YouTube", url: "https://www.youtube.com/gteceducations" },
];

export const STUDENT_LINKS = [
  { label: "Results Online", url: `${SITE}/resultsonline` },
  { label: "Verify Certificate", url: "https://gems.gtec.education/StudentApplicationForm/certificate_validation" },
  { label: "Training & Certifications", url: `${SITE}/trainingandcertifications` },
  { label: "Online Payment", url: `${SITE}/onlinepayment` },
  { label: "Our Placements", url: `${SITE}/placements` },
  { label: "View Vacancies", url: `${SITE}/vacancies` },
  { label: "G-TEC Job Fair", url: `${SITE}/jobfair` },
  { label: "Feedback", url: `${SITE}/feedback` },
];

export const FOOTER_LINKS = [
  {
    title: "Company",
    links: [
      { label: "About", url: "/about" },
      { label: "Leadership", url: `${SITE}/leadership` },
      { label: "Management Team", url: `${SITE}/managementteam` },
      { label: "G-TEC International", url: `${SITE}/gtecinternational` },
      { label: "Affiliations", url: `${SITE}/affiliations` },
      { label: "Awards & Recognition", url: `${SITE}/awardsrecognitions` },
      { label: "Blog", url: `${SITE}/blog` },
    ],
  },
  {
    title: "Students",
    links: [
      { label: "Courses", url: "/courses" },
      { label: "Student stories", url: "/students" },
      ...STUDENT_LINKS.slice(0, 4),
    ],
  },
  {
    title: "Careers & Partners",
    links: [
      { label: "Our Placements", url: `${SITE}/placements` },
      { label: "View Vacancies", url: `${SITE}/vacancies` },
      { label: "Post a Vacancy", url: `${SITE}/postvacancy` },
      { label: "Become a Partner", url: `${SITE}/becomeapartner` },
      { label: "Centres", url: "/centres" },
      { label: "News & events", url: "/news" },
    ],
  },
];

export const NAV = [
  { href: "/about", label: "About" },
  { href: "/courses", label: "Courses" },
  { href: "/centres", label: "Global" },
  { href: "/students", label: "Students" },
  { href: "/news", label: "News" },
];
