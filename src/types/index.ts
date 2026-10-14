export interface NavLink {
  label: string;
  href: string;
}

export interface NavAction {
  label: string;
  href: string;
  variant?: "ghost" | "primary" | "outline";
}

export interface NavigationData {
  logo?: {
    text: string;
    href: string;
    image?: string;
  };
  links: NavLink[];
  actions?: NavAction[];
}

export interface FooterColumn {
  title: string;
  links: NavLink[];
}

export interface FooterSocial {
  name: string;
  href: string;
  icon?: string;
}

export interface FooterData {
  brand: {
    name: string;
    description: string;
    copyright: string;
    credits?: string;
  };
  columns: FooterColumn[];
  newsletter: {
    title: string;
    description: string;
    placeholder: string;
    buttonText: string;
  };
  socials: FooterSocial[];
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface FaqsData {
  badge: string;
  title: string;
  description: string;
  items: FaqItem[];
}

export interface TestimonialItem {
  id: string;
  name?: string;
  author?: string;
  role: string;
  company?: string;
  rating: number;
  quote: string;
  avatar: string;
}

export interface TestimonialsData {
  badge: string;
  title: string;
  description: string;
  items: TestimonialItem[];
}

export interface PricingPlan {
  id: string;
  name: string;
  price: string;
  period: string;
  description: string;
  badge?: string;
  popular?: boolean;
  buttonText: string;
  buttonVariant: "primary" | "outline" | string;
  buttonHref?: string;
  features: string[];
}

export interface DraggableChipItem {
  id: string;
  label: string;
  className: string;
  bgGradient: string;
  shadowColor: string;
  initialRotation: number;
}

export interface HomeData {
  hero: {
    badge: {
      tag: string;
      text: string;
    };
    title: string;
    description: string;
    cta: {
      label: string;
      href: string;
    };
    rating: {
      score: string;
      count: string;
      avatars: string[];
    };
    preview: {
      label: string;
      thumbnail: string;
    };
  };
  logoCloud: {
    title: string;
    logos: { name: string; icon: string }[];
  };
  metrics: {
    badge: string;
    manifestoText?: string;
    items: {
      id: string;
      value: string;
      number?: number;
      suffix?: string;
      label: string;
      color: string;
    }[];
    chips?: DraggableChipItem[];
  };
  bundle: {
    badge: string;
    title: string;
    description: string;
    items: {
      id: string;
      title: string;
      description: string;
      icon?: string;
      image?: string;
    }[];
  };
  sprintWorkflow: {
    badge: string;
    title: string;
    description: string;
    cards: {
      phase: string;
      title: string;
      description: string;
      cta: {
        label: string;
        href: string;
      };
      image: string;
    }[];
  };
  engine: {
    badge: string;
    title: string;
    description: string;
    features: {
      id: string;
      title: string;
      description: string;
    }[];
  };
  pricing: {
    badge: string;
    title: string;
    description: string;
    plans: PricingPlan[];
  };
  ctaBanner: {
    badge?: string;
    title: string;
    description: string;
    buttonText?: string;
    buttonHref?: string;
    cta?: {
      label: string;
      href: string;
    };
  };
}

export interface TeamMember {
  id?: string;
  name: string;
  role: string;
  avatar: string;
  socials?: {
    x?: string;
    twitter?: string;
    linkedin?: string;
    instagram?: string;
    github?: string;
    [key: string]: string | undefined;
  };
}

export interface AboutData {
  hero: {
    title: string;
    description: string;
    featuredQuote: {
      score: string;
      text: string;
    };
    images: {
      main: string;
      secondary: string;
    };
  };
  story: {
    badge: string;
    headline: string;
    description: string;
    stats: { number: number; suffix?: string; value?: string; label: string }[];
  };
  missionVision: {
    badge: string;
    title: string;
    description: string;
    image: string;
    problem: {
      title: string;
      description: string;
    };
    solution: {
      title: string;
      description: string;
    };
  };
  team: {
    badge: string;
    title: string;
    description: string;
    members: TeamMember[];
  };
}

export interface JobOpening {
  id: string;
  title: string;
  description: string;
  location: string;
  workType?: string;
  type?: string;
  salary: string;
  applyHref?: string;
  applyUrl?: string;
}

export interface CareerData {
  hero: {
    title: string;
    description: string;
    image?: string;
  };
  jobOpenings: {
    title?: string;
    badge?: string;
    description?: string;
    privacyDisclaimer?: string;
    privacyLink?: {
      label: string;
      href: string;
    };
    jobs: JobOpening[];
  };
}

export interface ContactInfoCard {
  id?: string;
  type?: string;
  label?: string;
  title?: string;
  description?: string;
  value: string;
  href: string;
  icon?: string;
}

export interface ContactData {
  hero: {
    title: string;
    description: string;
  };
  form: {
    title: string;
    description: string;
    fields: {
      firstName: { label: string; placeholder: string };
      lastName: { label: string; placeholder: string };
      email: { label: string; placeholder: string };
      phone: { label: string; placeholder: string };
      message: { label: string; placeholder: string };
    };
    privacy: {
      prefix: string;
      linkLabel: string;
      linkHref: string;
    };
    submitButton: {
      label: string;
    };
  };
  map: {
    embedUrl: string;
    openInMapsText: string;
    openInMapsHref: string;
  };
  infoCards: ContactInfoCard[];
}

export interface BlogPost {
  slug: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  image: string;
  excerpt: string;
  content?: {
    overview: string;
    sections: {
      heading?: string;
      body?: string;
      quote?: string;
      quoteAuthor?: string;
      bulletPoints?: string[];
    }[];
  };
}

export interface BlogData {
  hero: {
    title: string;
    description: string;
  };
  posts: BlogPost[];
}

export interface PrivacySection {
  id: string;
  heading: string;
  content: string;
}

export interface PrivacyPolicyData {
  title: string;
  lastUpdated: string;
  intro: string;
  sections: PrivacySection[];
}

export interface NotFoundData {
  code: string;
  title: string;
  description: string;
  button: {
    label: string;
    href: string;
  };
}
