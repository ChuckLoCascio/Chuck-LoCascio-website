/**
 * Portfolio copy and structured resume data.
 * Case study narratives align with docs/DESIGN-CASE-STUDY-KNOWLEDGE.md.
 */

export interface ExperienceItem {
  company: string;
  title: string;
  location?: string;
  start: string;
  end: string;
  highlights: string[];
}

export interface OutcomeTile {
  value: string;
  description: string;
}

export interface CaseStudySummary {
  slug: string;
  client: string;
  title: string;
  tagline: string;
  role: string;
  duration: string;
  metrics: string[];
  /** When set, case study detail page renders outcome tiles instead of a plain metrics list. */
  outcomeTiles?: OutcomeTile[];
  quote?: { text: string; attribution: string };
  liveUrl?: string;
  prototypeUrl?: string;
  /** When true and both URLs exist, prototype is the primary CTA (e.g. Delivered Prototype). */
  prototypePrimary?: boolean;
}

export interface CaseStudyDetail extends CaseStudySummary {
  problem: string[];
  approach: string[];
  principles: string[];
  /** Section heading above problem copy (default: Challenge). */
  problemHeading?: string;
  /** When false, quote renders without an H2 (default: true). */
  showQuoteHeading?: boolean;
}

/** Homepage: AI patent block (diagram in `public/patent-explanation-driven-reasoning.png`). */
export const aiPatent = {
  title: "Explanation-driven reasoning engine",
  description:
    'Active AI patent holder granted on 07/04/2023: "Explanation-Driven Reasoning Engine".',
  /** Google Patents public page */
  url: "https://patents.google.com/patent/US20200349455A1/en?q=(charles+locascio)&oq=charles+locascio",
  thumbnailSrc: "/patent-explanation-driven-reasoning.png",
} as const;

/** LinkedIn recommendations — source: linkedin.com/in/locasciochuck */
export const testimonials: readonly {
  quote: string;
  author: string;
  role: string;
  date?: string;
}[] = [
  {
    quote:
      "I had a wonderful experience partnering with Chuck when I was developing a studio model at Wells Fargo as an Executive UX/UI Producer. Chuck is an amazing colleague, collaborator, and creator of exceptional user experiences. He holds a deep intellectual curiosity about user behavior, which drives a methodical (but agile) approach to codifying user friction points to create systems and interfaces to resolve them.",
    author: "Robert Criscione",
    role:
      "Marketing Operations & MarTech Leader | Accelerating Go-to-Market, Efficiency & Team Performance",
    date: "March 20, 2023",
  },
  {
    quote:
      "Chuck is sharp as a tack and far exceeded any expectations I had working with a consultant. I will continue to be a client of his due to his professionalism and strong sense of UX and product design.",
    author: "Timothy Farnham",
    role: "Founder — Black Lab Ironworks",
    date: "March 20, 2023",
  },
  {
    quote:
      "Chuck is an innovative and fast thinker who can readily visualize solutions that benefit the end user. You can count on Chuck to explore the possibilities of design solutions through rapid iteration and demonstrate high-level design thinking. Because of his collaborative style and work ethic, Chuck was a valuable member of the iShares product experience team, and will be difficult to replace. We saw almost immediate improvement in our products when Chuck joined.",
    author: "JJ Kyle Esguerra",
    role: "VP, Product & UX Designer at BlackRock",
    date: "March 20, 2023",
  },
  {
    quote:
      "Chuck & I worked together in a mobile design project for one of Accenture's clients. He motivated me to communicate more directly, be a faster UI/UX designer, brought enthusiasm daily, and relentlessly managed challenging client relationships to ensure we delivered the work needed on time and in an organized fashion. He managed with a low (to zero) ego mode, keeping his mindset open to learning, setting aside ego, and displaying an eagerness for the team to succeed.",
    author: "Claire E. Jacobson",
    role: "Lead Product Designer",
    date: "August 11, 2022",
  },
  {
    quote:
      "I am pleased to write this recommendation letter for Chuck. As the Lead UI/UX designer of the Artificial Intelligence (AI) team at Liquid Studio–Accenture, Chuck played a remarkable role in the delivery of AI assets built for C-suite demos, clients, and internal stakeholders. As the technical lead of the AI team, I worked closely with Chuck on several projects ranging from Virtual Agents (voice/chat channels), Computer Vision, Explainable AI, and Hotel recommendations. Chuck's working style and personality brought energy, excellent creativity, harmony, and beautiful designs while communicating with other software developers and AI engineers.",
    author: "Mohamad Nasr-Azadani",
    role:
      "Data Scientist | Entrepreneur & Startup Advisor | Keeping Energy at Bay",
    date: "February 10, 2022",
  },
  {
    quote:
      "Chuck is a dynamic and extremely perceptive designer. His skill set of understanding client's requirements and bringing their vision to UI/UX is phenomenal. He is a great team player and an excellent communicator. As a developer, I had a great time collaborating and working with him.",
    author: "Jatin Kumar Malane",
    role: "Engineering Manager at eBay",
    date: "October 15, 2020",
  },
  {
    quote:
      "Chuck worked with me in multiple projects as part of the Studio team. It's been a great experience working with him in each one of those projects. Take aways - great team player, collaborates very well with the developers - which is always a tough thing to deal with as a designer, ability to understand and differentiate client needs from wants and design solutions that create impact. Every client that he has worked on has praised the design output and the pattern he has created from usability perspective! Looking forward to working with you soon!!",
    author: "Hari Hara Prabhu",
    role: "Senior Technical Program Manager at AWS",
    date: "August 20, 2017",
  },
  {
    quote:
      "Chuck is exceptional. What makes him exceptional is the combination of his talent, his professionalism, his commitment, his reliability, and his passion. This guy will go very far in his career and I'm looking forward to the day he will lead a creative group. Chuck worked in my studio and the amount of work he tackled is just phenomenal. He was also instrumental in our delivery of the digital Brand 2.0, a huge accomplishment. Chuck is the dream of a producer. His work is not only impeccable, he always planned his work for successful delivery on time and budget.",
    author: "Richard M. Charette",
    role:
      "Trauma Informed Crisis, Alignment & Resilience Coach / Chief of Staff",
    date: "January 29, 2015",
  },
  {
    quote:
      "Chuck excels at being a strong team leader and a great communicator when teaching our business partners how to think about the brand and the design from an omni-channel perspective for the optimal customer experience. Chuck thrives on confidence, passion and determination to succeed through strategic design efforts. His hardworking tenacity to get the customer experience right is a bar he sets high for his team and himself.",
    author: "Hareem Cheema",
    role: "Senior Consultant | UX & Product Design | Ex-Amazon & T-Mobile",
    date: "June 8, 2015",
  },
  {
    quote:
      "Chuck excels at being a strong team leader and a great communicator when teaching our business partners how to think about the brand and the design from an omni-channel perspective for the optimal customer experience. Chuck thrives on confidence, passion and determination to succeed through strategic design efforts. His hardworking tenacity to get the customer experience right is a bar he sets high for his team and himself. I've had the opportunity to work with Chuck on many critical projects.",
    author: "Brandon Wan",
    role:
      "Portfolio Product & Payments Leader, Co-Founder, Advisor | Prudential, Payments, RLPL, Commenve, AMEX, Paypal",
    date: "June 6, 2015",
  },
];

export const person = {
  name: "Chuck LoCascio",
  title: "Lead Designer",
  tagline:
    "Designing AI-Native product experiences for startups and Enterprise B2B Finance and Technology companies.",
  email: "locascio.chuck@gmail.com",
  phone: "(415) 722-0181",
  site: "https://www.chucklocascio.com",
  linkedin: "https://www.linkedin.com/in/locasciochuck",
  linkedinHandle: "@locasciochuck",
  imageSrc: "/Chuck%20LoCascio%20Profile%20Photo.png",
  /** Homepage hero: right-aligned collage (`public/homepage-hero-image/chuck-collage-2026.png`). */
  heroCollageSrc: "/homepage-hero-image/chuck-collage-2026.png",
  /** Intrinsic pixel size of hero collage (for Next/Image layout, no crop). */
  heroCollageWidth: 2470,
  heroCollageHeight: 2646,
  resumePdf: "/chuck-locascio-resume.pdf",
} as const;

export const experience: ExperienceItem[] = [
  {
    company: "O Three Verve",
    title: "Founder",
    start: "Nov 2024",
    end: "Present",
    highlights: [
      "Launched a new UI for EQ Sight on an Agentic AI platform.",
      "Released the EQ beta program, generating 6 new customer pilots.",
      "Created investor materials for Energy Quotient—pitch deck, website, and product flyers.",
    ],
  },
  {
    company: "BlackRock",
    title: "Senior Product Designer",
    start: "May 2023",
    end: "Nov 2024",
    highlights: [
      "Designed and shipped BlackRock Advisor Polling—+34.8% average monthly signed-in visitors.",
      "Design lead on Notifications for 200,000+ advisors; 8 user research interviews to improve engagement.",
      "Maintained accessibility standards; led Advisor Center platform efforts toward WCAG 2.0 compliance.",
    ],
  },
  {
    company: "BCGK",
    title: "Managing Partner",
    start: "Mar 2020",
    end: "Present",
    highlights: [
      "Managing a $22M AUM real estate portfolio (103 units).",
      "Cut portfolio-wide expenses 57% and improved NOI 40% with 96% occupancy.",
    ],
  },
  {
    company: "Grabbi",
    title: "Founding Designer",
    start: "Jul 2019",
    end: "Jan 2023",
    highlights: [
      "0→1 founding designer: iOS App Clips & Android Instant Apps; $60,000+ transactional volume.",
      "Designed the React merchant platform; onboarded the first 10 merchants in San Francisco.",
      "Designed the SmartMenu board with NFC tap-to-pay.",
    ],
  },
  {
    company: "Silicon Valley Bank",
    title: "Senior Product Designer",
    start: "Jun 2020",
    end: "May 2023",
    highlights: [
      "Designed SVB Go Back Office Admin—51% reduction in service cases.",
      "Built secured client admin tools for data integrity and self-service.",
      "Shipped Positive Pay features for fraud detection and security.",
    ],
  },
  {
    company: "BlackRock",
    title: "Senior Product Designer",
    start: "Apr 2019",
    end: "Apr 2020",
    highlights: [
      "Designed Explore By Goals Fund Screener—8,000+ new monthly visitors.",
      "Enhanced dashboards for financial decision-making workflows.",
    ],
  },
  {
    company: "Accenture",
    title: "Senior Product Designer",
    start: "Jan 2016",
    end: "Apr 2019",
    highlights: [
      "Designed an AI-driven sales demo tool—$2.8M in new business.",
      "Design lead in Liquid Studio AI team with data scientists and full-stack developers.",
      "Custom iOS container-tracking app shipped to 10,000+ internal users.",
    ],
  },
];

export const patentsAndAwards = [
  {
    name: "Explanation-Driven Reasoning Engine",
    detail: "US 11,694,102 B2 · Issued Jul 4, 2023",
  },
  {
    name: "Accenture Global Demo Awards Winner",
    detail: "Issued Sep 2018",
  },
];

export const caseStudies: CaseStudySummary[] = [
  {
    slug: "eq-sight",
    client: "Energy Quotient",
    title: "EQ Sight",
    tagline:
      "Signal-first diagnostics for facility managers—AI hypotheses inline with waveform data.",
    role: "Staff Product Designer",
    duration: "12 weeks",
    metrics: [
      "6 new customer pilots after launch",
      "Facility-scale waveform monitoring at 224k points/sec",
    ],
    outcomeTiles: [
      { value: "6", description: "new customer pilots after launch" },
      {
        value: "224k",
        description: "data points per second — facility-scale waveform monitoring",
      },
    ],
    quote: {
      text: "We no longer have to hire an expert to investigate the root cause.",
      attribution: "Facility Manager, Texas Instruments",
    },
    liveUrl: "https://eq.systems/",
    prototypeUrl:
      "https://www.figma.com/proto/bCD3FOcGkhSXg3IOMvhgEd/Energy-Quotient?node-id=973-528",
    prototypePrimary: true,
  },
  {
    slug: "blackrock-advisor-center",
    client: "BlackRock",
    title: "BlackRock Advisor Center",
    tagline:
      "Designed and shipped Notifications, Saving, and Advisor Polling.",
    role: "Staff Product Designer",
    duration: "12 weeks",
    metrics: [
      "+34.8% average monthly signed-in visitors",
      "+2.7 article pages per session",
      "500+ votes on the first poll",
    ],
    outcomeTiles: [
      { value: "+34.8%", description: "average monthly signed-in visitors" },
      { value: "+2.7", description: "article pages per session" },
      { value: "500+", description: "votes on the first poll" },
    ],
    quote: {
      text: "We don't have a component like this today—it looks like BlackRock and gives our Financial Advisors something new and exciting.",
      attribution: "BlackRock Advisor Center stakeholder",
    },
    liveUrl: "https://www.blackrock.com/us/financial-professionals",
  },
  {
    slug: "grabbi-food-truck-self-checkout-platform",
    client: "Grabbi",
    title: "Grabbi – Food truck self checkout platform",
    tagline:
      "App Clips & Instant Apps, SmartMenu with NFC—physical-to-digital ordering under 10 seconds.",
    role: "Founding Designer",
    duration: "3 years",
    metrics: [
      "$60,000+ transactional volume in Year 1",
      "10+ merchants enrolled in San Francisco, CA",
      "2.8× increase in average order sizes",
      "60% increase in overall tips",
    ],
    outcomeTiles: [
      {
        value: "$60,000+",
        description: "transactional volume in Year 1",
      },
      {
        value: "10+",
        description: "Merchants signed up and enrolled in San Francisco, CA",
      },
      {
        value: "2.8×",
        description: "Increase in average order sizes",
      },
      {
        value: "60%",
        description: "increase in overall tips",
      },
    ],
    quote: {
      text: "I just used Grabbi for the first time, it took 10 seconds, I didn't have to wait in line I did it all from my phone it is super convenient. I love this thing.",
      attribution: "Grabbi Customer",
    },
    liveUrl: "https://www.grabbishop.com/",
  },
  {
    slug: "svb-online-banking",
    client: "Silicon Valley Bank",
    title: "SVB Online Banking",
    tagline:
      "Designed the back office administration workflows for adding services, adding users, editing user permissions, enrolling new clients, and adding fraud control service settings.",
    role: "Staff Product Designer",
    duration: "3 years",
    metrics: [
      "86% of clients migrated from legacy",
      "51% reduction in service cases",
      "Shipped Positive Pay for fraud detection and security",
    ],
    outcomeTiles: [
      { value: "86%", description: "of clients migrated from legacy" },
      { value: "51%", description: "reduction in service cases" },
      {
        value: "Positive Pay",
        description: "Shipped for fraud detection and security",
      },
    ],
  },
];

const caseStudyDetails: Record<string, Omit<CaseStudyDetail, keyof CaseStudySummary>> = {
  "eq-sight": {
    problemHeading: "Challenge",
    problem: [
      "Today, Power quality is a $200B problem. 7 out of 10 equipment failure of unknown causes are suspected to be due to power quality. At the same time, U.S. electricity demand is skyrocketing, with projections of 2–3× demands on the grid by 2050.",
      "U.S. industries are “patching” power quality issues. You have unsustainable system redundancy with several back up generators in case one fails. As well as existing sensors that cannot handle modern grid complexities at scale in realtime. Making it very difficult for post-factor root cause analysis.",
    ],
    approach: [
      "Energy Quotient builds the power quality full stack. From raw data to insights and action. A new lens on power intelligence. EQ’s hardware performs continuous waveform monitoring, 224,000 points of data per second to capture events in full detail. Low-latency real-time data for power controls and power quality analysis on the same platform. 6 Mb/s of lossless data, memory-safe Rust code, and advanced analytics and root cause investigation backed by weeks of 24/7 waveform data storage.",
      "EQ Sight seamlessly integrates the UX workflows with AI for Facility managers to quickly diagnose and investigate the root cause of the power quality event. Where each minute the system is down can result in millions of lost revenue.",
    ],
    principles: [],
    showQuoteHeading: false,
  },
  "blackrock-advisor-center": {
    problemHeading: "Challenge",
    problem: [
      "Today, Financial Advisors do not have a way to keep their pulse on fast changing market trends. It is also difficult to understand how the broader FA community thinks about relevant topics and their impacts to client portfolios.",
      "Their time is extremely limited, and when doing market research, Financial Advisors need to know a little about a lot for their clients.",
    ],
    approach: [
      "To provide a simple, frictionless polling experience, one click or tap to vote. Display the results in a clear manner, and demonstrate educational value by offering related CTAs to explore more content and drive further engagement.",
      "Demonstrated the value of building for a design system with defined rules of scale, and future-proof the polling design process to scale across breakpoints.",
      "Audited the competitive landscape and identified ways to achieve fast pattern recognition and familiarity.",
      "Iterated through many concepts to bring the poll to life, creating a strong identity with brand awareness and motion design best practices.",
      "Worked closely with the engineering team to ensure what was accessible and built to spec.",
    ],
    principles: [],
    showQuoteHeading: false,
  },
  "grabbi-food-truck-self-checkout-platform": {
    problemHeading: "Challenge",
    problem: [
      "When food trucks get extremely busy they get long customer line ups and can lose out on that critical revenue with a customer deciding to abandon the line and change their mind.",
      "Once the order is received, on average it takes 13 minutes for your food to be ready, and up to 20 minutes during peak hours.",
      "Food truck merchants needed a way to take in more orders through a self checkout platform. Focusing on cooking food rather than taking orders and collecting payment.",
    ],
    approach: [
      "Visit Food truck parks. Observe how lines build up, speak to food truck operators and owners and pitch them on why they should be using Grabbi for their business.",
      "Sign up motivated merchants and be their support person through the onboarding experience. Work closely with food truck merchants to understand their needs.",
      "Provide customers with a new experience, allowing them to quickly order from a branded smart menu system, acting as the bridge from the physical to the digital experience.",
      "Gather on the ground intel from real world users on what is working, and what is not. Fine tune the ordering experience with user feedback, and design intuition.",
      "Further drive engagement by partnering closely with the founding team members.",
    ],
    principles: [],
    showQuoteHeading: false,
  },
  "svb-online-banking": {
    problemHeading: "Challenge",
    problem: [
      "Equip internal back office administrators for our banking clients to have the same capabilities and feature sets that they are used to in our legacy system.",
      "In order to migrate our clients, the back office features required were: Adding Users, Adding Client Services, Editing Users, Client Services, & Company Permissions",
    ],
    approach: [
      "Work closely with the business to align with their vision and client needs.",
      "Design according to technical requirements, establish user work flows for repeat tasks, and desired features.",
      "Maintain and contribute to the design system for all UI components.",
      "Work closely with the engineering team to deploy and QA design. Ensure hand off is built to spec.",
    ],
    principles: [],
  },
};

export function getCaseStudyBySlug(slug: string): CaseStudySummary | undefined {
  return caseStudies.find((c) => c.slug === slug);
}

export function getCaseStudyDetail(slug: string): CaseStudyDetail | undefined {
  const base = caseStudies.find((c) => c.slug === slug);
  const extra = caseStudyDetails[slug];
  if (!base || !extra) return undefined;
  return { ...base, ...extra };
}
