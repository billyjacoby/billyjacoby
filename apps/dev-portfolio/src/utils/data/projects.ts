export type Project = {
  id: number;
  name: string;
  description: string;
  tools: string[];
  repo: string;
  role?: string;
  code?: string;
  demo?: string;
};

export const projectsData: Project[] = [
  {
    id: 1,
    name: 'Browsernaut',
    description:
      'Browsernaut is a macOS application designed to open URLs in various applications beyond web browsers such as Notion, Figma, Discord, and more. It provides a seamless experience by redirecting URLs to their corresponding applications.',
    tools: ['TypeScript', 'React', 'Rust', 'Tauri', 'Zustand'],
    role: '',
    code: '',
    repo: 'https://github.com/billyjacoby/browsernaut',
    demo: '',
  },
];

// Do not remove any property.
// Leave it blank instead as shown below

// {
//     id: 1,
//     name: '',
//     description: "",
//     tools: [],
//     role: '',
//     code: '',
//     demo: '',
//     image: crefin,
// },
