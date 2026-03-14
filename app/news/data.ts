export type NewsItem = {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  image: string;
  category?: string;
};

export const articles: NewsItem[] = [
  {
    id: "1",
    title: "New cohort launched in Northern Province",
    date: "March 2026",
    excerpt:
      "We welcomed 300 new women into our 12-month training program focused on livelihoods and leadership.",
    image:
      "/images/site/gallery-1.jpg",
    category: "Program Update",
  },
  {
    id: "2",
    title: "Local market fair connects graduates to buyers",
    date: "February 2026",
    excerpt:
      "Graduates sold products and built new commercial relationships at a community market fair.",
    image:
      "/images/site/gallery-2.jpg",
    category: "Impact Story",
  },
  {
    id: "3",
    title: "Digital VSLA pilot shows promising uptake",
    date: "January 2026",
    excerpt:
      "Early results from our digital VSLA pilot show improved savings practices and record-keeping.",
    image:
      "/images/site/gallery-3.jpg",
    category: "Program Update",
  },
];

export const stories: NewsItem[] = [
  {
    id: "s1",
    category: "Impact Story",
    date: "26 Aug 2025",
    title: "Empowered Women, Thriving Communities",
    excerpt:
      "A look into how our core empowerment programs are creating lasting change in rural communities across seven districts in Rwanda.",
    image:
      "/images/site/gallery-4.jpg",
  },
  {
    id: "s2",
    category: "Training",
    date: "08 Jul 2025",
    title: "Empowering Change through Skill Building",
    excerpt:
      "Vocational skills training continues to transform women's lives, giving them the tools they need to build sustainable livelihoods.",
    image:
      "/images/site/gallery-5.jpg",
  },
  {
    id: "s3",
    category: "Graduation",
    date: "12 Jun 2025",
    title: "Celebrating the Graduation of 100 Women in Mareba",
    excerpt:
      "One hundred women celebrated their graduation from the Stronger Women, Stronger Nation program in Mareba Sector, Bugesera District.",
    image:
      "/images/site/gallery-6.jpg",
  },
  {
    id: "s4",
    category: "Program Update",
    date: "04 May 2025",
    title: "Market Access Grows for Graduate Entrepreneurs",
    excerpt:
      "Graduates are connecting with buyers at regional markets, increasing incomes and business opportunities.",
    image:
      "/images/site/gallery-7.jpg",
  },
  {
    id: "s5",
    category: "Impact Story",
    date: "22 Apr 2025",
    title: "Women-Led Cooperatives Strengthen Local Supply Chains",
    excerpt:
      "Cooperatives supported by our programs are now supplying local markets and creating steady livelihoods.",
    image:
      "/images/site/gallery-8.jpg",
  },
  {
    id: "s6",
    category: "Partnership",
    date: "10 Mar 2025",
    title: "New Partnership Expands Training Across Districts",
    excerpt:
      "A new collaboration will extend training and support services to an additional three districts this year.",
    image:
      "/images/site/gallery-9.jpg",
  },
  {
    id: "s7",
    category: "Program Update",
    date: "18 Feb 2025",
    title: "Savings Groups Digitize Record Keeping",
    excerpt:
      "Village savings groups adopted digital ledgers, improving transparency and boosting member confidence.",
    image:
      "/images/site/gallery-10.jpg",
  },
  {
    id: "s8",
    category: "Impact Story",
    date: "02 Feb 2025",
    title: "Graduates Grow Cooperative Market Reach",
    excerpt:
      "Women-led cooperatives expanded distribution to new local markets, increasing incomes across households.",
    image:
      "/images/site/gallery-11.jpg",
  },
  {
    id: "s9",
    category: "Training",
    date: "19 Jan 2025",
    title: "Business Planning Bootcamp Launched",
    excerpt:
      "A new bootcamp equips entrepreneurs with pricing, budgeting, and sales skills for sustainable growth.",
    image:
      "/images/site/gallery-12.jpg",
  },
  {
    id: "s10",
    category: "Graduation",
    date: "05 Jan 2025",
    title: "Eighty Women Celebrate Program Completion",
    excerpt:
      "Participants marked graduation with community leaders, showcasing new enterprises and success stories.",
    image:
      "/images/site/gallery-13.jpg",
  },
  {
    id: "s11",
    category: "Cooperative",
    date: "14 Dec 2024",
    title: "Cooperative Leadership Training Series",
    excerpt:
      "A multi-week training series strengthened governance, teamwork, and decision-making skills.",
    image:
      "/images/site/home-hero.jpg",
  },
  {
    id: "s12",
    category: "Success Story",
    date: "29 Nov 2024",
    title: "From Market Stall to Micro-Enterprise",
    excerpt:
      "A graduate used small grants and mentorship to turn a market stall into a thriving business.",
    image:
      "/images/site/home-impact.jpg",
  },
  {
    id: "s13",
    category: "Partnership",
    date: "12 Nov 2024",
    title: "District Partnership Expands Outreach",
    excerpt:
      "New district partnerships help the program reach more women in rural communities.",
    image:
      "/images/site/impact-hero.jpg",
  },
  {
    id: "s14",
    category: "Impact Story",
    date: "28 Oct 2024",
    title: "Community Forums Strengthen Support Networks",
    excerpt:
      "Local forums connect graduates with mentors, buyers, and peer support groups.",
    image:
      "/images/site/join-community.jpg",
  },
];

export const events = [
  {
    id: "e1",
    category: "Workshop",
    date: "March 28, 2026",
    time: "10:00 AM – 2:00 PM",
    location: "Rwamagana District Office",
    title: "VSLA DIGITAL SAVINGS WORKSHOP",
    excerpt:
      "A hands-on training session for savings group leaders to learn mobile money management and digital record-keeping tools.",
    image:
      "/images/site/gallery-1.jpg",
  },
  {
    id: "e2",
    category: "Competition",
    date: "May 10, 2026",
    time: "1:00 PM – 6:00 PM",
    location: "Bugesera District, Mareba Sector",
    title: "BUSINESS PLAN COMPETITION FINALS 2026",
    excerpt:
      "Watch as 25 women entrepreneurs pitch their business plans for seed funding awards.",
    image:
      "/images/site/gallery-2.jpg",
  },
  {
    id: "e3",
    category: "Graduation",
    date: "June 21, 2026",
    time: "10:00 AM – 1:00 PM",
    location: "Kayonza District, Eastern Province",
    title: "ABADACOGORA GRADUATION CEREMONY — KAYONZA",
    excerpt:
      "Celebrate with 75 young women as they graduate from the ABADACOGORA adolescent girls program.",
    image:
      "/images/site/gallery-3.jpg",
  },
  {
    id: "e4",
    category: "Community",
    date: "July 12, 2026",
    time: "9:30 AM – 3:30 PM",
    location: "Local Community Hall",
    title: "COMMUNITY ENGAGEMENT FORUM",
    excerpt:
      "An open forum for community members to discuss program results and upcoming initiatives.",
    image:
      "/images/site/gallery-4.jpg",
  },
  {
    id: "e5",
    category: "Fundraiser",
    date: "Aug 05, 2026",
    time: "6:00 PM – 9:00 PM",
    location: "City Event Center",
    title: "ANNUAL FUNDRAISER GALA",
    excerpt:
      "An evening gala to celebrate achievements and raise funds to expand our trainings.",
    image:
      "/images/site/gallery-5.jpg",
  },
];
