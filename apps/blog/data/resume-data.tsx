//? TSX files will be ignored by Content Layer

import { GitHubIcon } from '@/components/resume/icons/GitHubIcon';
import { LinkedInIcon } from '@/components/resume/icons/LinkedInIcon';
import { XIcon } from '@/components/resume/icons/XIcon';

export const RESUME_DATA = {
  name: 'Billy Jacoby',
  initials: 'WKJ',
  location: 'Brodheadsville, PA',
  locationLink: 'https://www.google.com/maps/place/Brodheadsville',
  about:
    'Engineering leader specializing in mobile — scaling teams, architecture, and product delivery',
  summary:
    'Engineering leader with a decade of hands-on product development, currently heading mobile at Injective Labs. I specialize in architecting and delivering high-performance, mobile-first applications at scale. With a strong foundation in TypeScript, React, React Native, and Node.js, I bring both technical depth and engineering leadership to every engagement — from early-stage product development to scaling systems for hundreds of thousands of users.',
  avatarUrl: 'https://avatars.githubusercontent.com/u/27246508?v=4',
  personalWebsiteUrl: 'https://billyjacoby.com',
  contact: {
    email: 'billyjacoby@gmail.com',
    /**
     * Shown only in the printed/PDF output. This is a visual treatment, not a
     * privacy control — the value is still present in the served HTML source.
     */
    printOnlyTel: '+1 (631) 307-2188',
    social: [
      {
        name: 'GitHub',
        url: 'https://github.com/billyjacoby',
        icon: GitHubIcon,
      },
      {
        name: 'LinkedIn',
        url: 'https://www.linkedin.com/in/billyjacoby/',
        icon: LinkedInIcon,
      },
      {
        name: 'X',
        url: 'https://x.com/billyjacoby',
        icon: XIcon,
      },
    ],
  },
  work: [
    {
      company: 'Injective Labs',
      link: 'https://injective.com',
      badges: ['Remote'],
      title: 'Head of Mobile Development',
      start: 'Sept 2024',
      end: 'Present',
      highlights: [
        'Own and execute mobile engineering strategy, delivering scalable, user-centric applications aligned with evolving product and platform needs',
        'Lead and mentor fellow engineers while driving cross-functional collaboration across product, platform, and infrastructure teams',
        'Architect and ship complex, high-performance mobile applications that interface with distributed systems and real-time data pipelines',
        'Designed and implemented a backend-for-frontend (BFF) platform powering critical internal systems, leveraging Node.js, TypeScript, Hono, MongoDB, Redis, and BullMQ to enable scalable, resilient workflows',
      ],
    },
    {
      company: '28 Wellness',
      link: 'https://28.co',
      badges: ['Remote'],
      title: 'Technical Lead → Head of Engineering',
      start: 'June 2023',
      end: 'Sept 2024',
      highlights: [
        'Served as the primary engineer owning architecture, development, and delivery across the platform',
        'Scaled infrastructure to support rapid growth from 50K to over 500K monthly active users',
        'Translated business goals into clear technical initiatives and shipped multiple projects end-to-end',
        'Built and managed a hybrid team of internal engineers and contractors',
      ],
    },
    {
      company: 'Frontrunner',
      link: 'https://twitter.com/frontrunnerxyz',
      badges: ['Remote'],
      title: 'Software Engineer → Senior Software Engineer',
      start: 'Jan 2022',
      end: 'June 2023',
      highlights: [
        'Led frontend development for web and mobile applications from concept to production',
        'Defined and implemented frontend architecture across platforms',
        'Ensured alignment between engineering work and business priorities, consistently delivering on schedule',
      ],
    },
    {
      company: 'Solspace Wallet',
      badges: ['Remote'],
      title: 'Software Engineer',
      start: '2020',
      end: '2022',
      highlights: [
        'Designed and built a React Native app for secure interaction with the Solana blockchain',
        'Integrated Bluetooth hardware wallets and optimized performance for real-world usage',
        'Implemented caching and scaling strategies to support thousands of concurrent users',
      ],
    },
    {
      company: 'Prometheus Technology',
      link: 'https://www.prometheus-ts.com',
      badges: ['Owner'],
      title: 'Owner / Software Engineer',
      start: '2016',
      end: '2021',
      highlights: [
        'Founded and operated a custom software consultancy',
        'Delivered web applications and e-commerce solutions for mid-to-large-sized clients',
        'Worked across a wide range of technologies to build tailored, scalable products',
      ],
    },
  ],
  education: [
    {
      school: 'Palm Beach State College',
      degree: 'Associate of Arts',
      date: 'c. 2020',
    },
  ],
  skills: [
    'TypeScript',
    'React',
    'React Native',
    'Node.js',
    'System Design',
    'Distributed Systems',
    'API Design',
    'MongoDB',
    'SQL Databases',
    'Redis',
    'BullMQ',
    'Mobile Architecture',
  ],
  projects: [
    {
      title: '28 Wellness',
      techStack: ['Full Time', 'TypeScript', 'Next.js', 'tRPC', 'React Native'],
      description: "A women's health fitness platform and mobile application.",
      link: {
        label: '28.co',
        href: 'https://28.co/',
      },
    },
    {
      title: 'Browsernaut',
      techStack: ['Side Project', 'TypeScript', 'Rust', 'Desktop App', 'Tauri'],
      description:
        'A macOS application that opens URLs in various applications beyond web browsers.',
      link: {
        label: 'Browsernaut on GitHub',
        href: 'https://github.com/billyjacoby/browsernaut',
      },
    },
    {
      title: 'Bird Watcher',
      techStack: ['Side Project', 'TypeScript', 'React Native', 'NVR'],
      description: 'A mobile app built to interface with Frigate NVR.',
      link: {
        label: 'Bird Watcher on GitHub',
        href: 'https://github.com/billyjacoby/bird-watcher',
      },
    },
    {
      title: 'Frontrunner',
      techStack: ['Full Time', 'Next.js', 'React', 'React Native', 'Web3'],
      description:
        'A decentralized sports betting platform built on the Injective blockchain.',
    },
    {
      title: 'Solspace Wallet',
      techStack: ['React Native', 'Bluetooth', 'Web3', 'Solana'],
      description:
        'A web3 wallet for Solana that connects to a hardware wallet via Bluetooth.',
    },
  ],
} as const;
