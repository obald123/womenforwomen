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
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1600&auto=format&fit=crop",
    category: "Program Update",
  },
  {
    id: "2",
    title: "Local market fair connects graduates to buyers",
    date: "February 2026",
    excerpt:
      "Graduates sold products and built new commercial relationships at a community market fair.",
    image:
      "https://images.unsplash.com/photo-1504198458649-3128b932f49b?q=80&w=1600&auto=format&fit=crop",
    category: "Impact Story",
  },
  {
    id: "3",
    title: "Digital VSLA pilot shows promising uptake",
    date: "January 2026",
    excerpt:
      "Early results from our digital VSLA pilot show improved savings practices and record-keeping.",
    image:
      "https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?q=80&w=1600&auto=format&fit=crop",
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
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: "s2",
    category: "Training",
    date: "08 Jul 2025",
    title: "Empowering Change through Skill Building",
    excerpt:
      "Vocational skills training continues to transform women's lives, giving them the tools they need to build sustainable livelihoods.",
    image:
      "https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: "s3",
    category: "Graduation",
    date: "12 Jun 2025",
    title: "Celebrating the Graduation of 100 Women in Mareba",
    excerpt:
      "One hundred women celebrated their graduation from the Stronger Women, Stronger Nation program in Mareba Sector, Bugesera District.",
    image:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: "s4",
    category: "Program Update",
    date: "04 May 2025",
    title: "Market Access Grows for Graduate Entrepreneurs",
    excerpt:
      "Graduates are connecting with buyers at regional markets, increasing incomes and business opportunities.",
    image:
      "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: "s5",
    category: "Impact Story",
    date: "22 Apr 2025",
    title: "Women-Led Cooperatives Strengthen Local Supply Chains",
    excerpt:
      "Cooperatives supported by our programs are now supplying local markets and creating steady livelihoods.",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: "s6",
    category: "Partnership",
    date: "10 Mar 2025",
    title: "New Partnership Expands Training Across Districts",
    excerpt:
      "A new collaboration will extend training and support services to an additional three districts this year.",
    image:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: "s7",
    category: "Program Update",
    date: "18 Feb 2025",
    title: "Savings Groups Digitize Record Keeping",
    excerpt:
      "Village savings groups adopted digital ledgers, improving transparency and boosting member confidence.",
    image:
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: "s8",
    category: "Impact Story",
    date: "02 Feb 2025",
    title: "Graduates Grow Cooperative Market Reach",
    excerpt:
      "Women-led cooperatives expanded distribution to new local markets, increasing incomes across households.",
    image:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: "s9",
    category: "Training",
    date: "19 Jan 2025",
    title: "Business Planning Bootcamp Launched",
    excerpt:
      "A new bootcamp equips entrepreneurs with pricing, budgeting, and sales skills for sustainable growth.",
    image:
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: "s10",
    category: "Graduation",
    date: "05 Jan 2025",
    title: "Eighty Women Celebrate Program Completion",
    excerpt:
      "Participants marked graduation with community leaders, showcasing new enterprises and success stories.",
    image:
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: "s11",
    category: "Cooperative",
    date: "14 Dec 2024",
    title: "Cooperative Leadership Training Series",
    excerpt:
      "A multi-week training series strengthened governance, teamwork, and decision-making skills.",
    image:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: "s12",
    category: "Success Story",
    date: "29 Nov 2024",
    title: "From Market Stall to Micro-Enterprise",
    excerpt:
      "A graduate used small grants and mentorship to turn a market stall into a thriving business.",
    image:
      "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: "s13",
    category: "Partnership",
    date: "12 Nov 2024",
    title: "District Partnership Expands Outreach",
    excerpt:
      "New district partnerships help the program reach more women in rural communities.",
    image:
      "https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: "s14",
    category: "Impact Story",
    date: "28 Oct 2024",
    title: "Community Forums Strengthen Support Networks",
    excerpt:
      "Local forums connect graduates with mentors, buyers, and peer support groups.",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1600&auto=format&fit=crop",
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
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1600&auto=format&fit=crop",
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
      "https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?q=80&w=1600&auto=format&fit=crop",
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
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1600&auto=format&fit=crop",
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
      "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?q=80&w=1600&auto=format&fit=crop",
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
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1600&auto=format&fit=crop",
  },
];
