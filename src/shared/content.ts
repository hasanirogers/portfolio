import { html } from "lit";

export const education = html`
  <p>A.A.S. Computer Information Science</p>
  <p>Henry Ford Community College</p>
  <p>Dearborn, MI</p>
`;

export const workHistory = [
  {
    date: 'April 2020 - Present',
    description: 'Associate Director Technology, VML',
  },
  {
    date: 'October 2018 – April 2020',
    description: 'Tech Specialist, Tek Systems',
  },
  {
    date: 'May 2018 – October 2018',
    description: 'Senior Developer, Nexient',
  },
  {
    date: 'April 2014 - May 2018',
    description: 'Senior Web Developer, Optum',
  },
  {
    date: 'January 2011 - April 2014',
    description: 'Senior Web Application Developer, Campbell Ewald',
  },
  {
    date: 'October 2009 - December 2010',
    description: 'Frontend Web Developer, Bluewater Technologies',
  },
  {
    date: 'September 2007 - March 2009',
    description: 'Web Designer, Tell Vision Networks',
  },
  {
    date: 'January 2007 - September 2007',
    description: 'Web Designer, Henry Ford Community College',
  },
];

export const skills = [
  'AEM',
  'Angular',
  'Craft CMS',
  'CSS',
  'Design System',
  'Express.js',
  'Gutenberg',
  'HTML5',
  'JavaScript',
  'LAMP',
  'Lit',
  'MongoDB',
  'Node.js',
  'PHP',
  'React',
  'Redux',
  'Rest APIs',
  'Rollup',
  'SCSS',
  'Storybook',
  'TypeScript',
  'Vite',
  'Vue',
  'WCAG',
  'Web Components',
  'Webpack',
  'Woo Commerce',
  'WordPress',
  'Unit Testing',
  'Zod',
];

export const projects = [
  {
    size: '2x2',
    slug: 'gxp',
    heading: 'Guest XP',
    thumb: '/assets/gxp-thumb.png',
    hero: '/assets/gxp.png',
    skills: ['JavaScript', 'HTML5', 'React', 'TypeScript', 'Rest APIs', 'Vite', 'SCSS', 'Axios', 'Zod', 'Unit Testing', 'WCAG'],
    description: 'Guest XP is an enterprise scheduling React app for Ford and Lincoln that I work.',
    link: 'https://www.avisford.com/fordgxp.aspx',
  },
  {
    size: '2x2',
    slug: 'doctor-at-my-door',
    heading: 'Doctor At My Door',
    thumb: '/assets/damd-thumb.png',
    hero: '/assets/damd.png',
    skills: ['JavaScript', 'HTML5', 'TypeScript', 'LAMP', 'Lit', 'PHP', 'SCSS', 'WordPress'],
    description: 'I built and launched the Doctor at My Door website.',
    link: 'https://doctoratmydoor.com',
  },
  {
    size: '2x1',
    slug: 'apeiron',
    heading: 'Apeiron',
    thumb: '/assets/apeiron-thumb.jpg',
    halfThumb: '/assets/apeiron-half.jpg',
    hero: '/assets/apeiron.jpg',
    skills: ['Design System', 'Lit', 'React', 'SCSS', 'Storybook', 'TypeScript', 'WCAG', 'Web Components', 'Webpack', 'Unit Testing'],
    description: 'Apeiron is the latest T-mobile design system. I worked on this project as it’s lead Web Developer. It’s an internal project so I can’t link to it.',
  },
  {
    size: '1x1',
    slug: 'ippm',
    heading: 'Interactive Posts (IPPM)',
    thumb: '/assets/ippm-thumb.jpg',
    hero: '/assets/ippm.png',
    skills: ['JavaScript', 'Gutenberg', 'HTML5', 'JavaScript', 'LAMP', 'Lit', 'PHP', 'React', 'WordPress'],
    description: 'A custom WordPress plugin I wrote and published. IPPM lets users craft beautiful JavaScript and CSS enhanced posts.',
    link: 'https://wordpress.org/plugins/interactive-posts-ippm'
  },
  // {
  //   size: '1x1',
  //   slug: 'pgs',
  //   heading: 'Precision Global Systems',
  //   thumb: '/assets/pgs-thumb.jpg',
  //   hero: '/assets/pgs.png',
  //   skills: ['JavaScript', 'Gutenberg', 'HTML5', 'JavaScript', 'LAMP', 'Lit', 'PHP', 'SCSS', 'Webpack', 'WordPress'],
  //   description: 'I do maintenance and support for Precision Global Systems. I’m also working on a rebuild of their site.',
  // },
  {
    size: '1x1',
    slug: 'indelible',
    heading: 'Indelible Designs',
    thumb: '/assets/indelible-thumb.jpg',
    hero: '/assets/indelible.png',
    skills: ['JavaScript', 'CSS', 'Express.js', 'Express.js', 'Lit', 'MongoDB', 'Node.js', 'Web Components'],
    description: 'I put together an app for Indelible Designs that displays a personalized message after a QR code is scanned. App is private so no link.',
  },
  {
    size: '1x1',
    slug: 'fds',
    heading: 'Ford Design System',
    thumb: '/assets/fds-thumb.jpg',
    hero: '/assets/fds.jpg',
    skills: ['Design System', 'Angular', 'JavaScript', 'Lit', 'React', 'SCSS', 'Storybook', 'Vue', 'WCAG', 'Web Components', 'Unit Testing'],
    description: 'I worked on the Ford Design System for nearly 2 years. I spearheaded using Web Components for a design system to work in multiple libraries.',
  },
  {
    size: '1x1',
    slug: 'prhc',
    heading: 'Patrick Riley Heating & Cooling',
    thumb: '/assets/prhc-thumb.jpg',
    hero: '/assets/prhc.png',
    skills: ['Craft CMS', 'CSS', 'JavaScript', 'HTML5', 'JavaScript'],
    description: 'I worked with Data Driven Marketers to make updates to the Patrick Riley Services site.',
    link: 'https://patrickrileyservices.com'
  },
  {
    size: '2x1',
    slug: 'corporate',
    heading: 'Ford Corporate',
    thumb: '/assets/corporate-thumb.jpg',
    halfThumb: '/assets/corporate-half.jpg',
    hero: '/assets/corporate.png',
    skills: ['AEM', 'JavaScript', 'HTML5', 'Webpack', 'SCSS'],
    description: 'I took the work I did on the Ford Design System and implemented them on the Ford Corporate website.',
    link: 'https://corporate.ford.com',
  },
  {
    size: '2x1',
    slug: 'checkout',
    heading: 'Ford Checkout',
    thumb: '/assets/checkout-thumb.jpg',
    halfThumb: '/assets/checkout-half.jpg',
    hero: '/assets/checkout.png',
    skills: ['AEM', 'JavaScript', 'HTMl5', 'JavaScript', 'React', 'Redux', 'Rest APIs', 'SCSS', 'Storybook'],
    description: 'I worked on the Checkout team for the Ford UK site.',
    link: 'https://www.ford.co.uk'
  },
  {
    size: '1x1',
    slug: 'fma',
    heading: 'Ford Member Account',
    thumb: '/assets/fma-thumb.jpg',
    hero: '/assets/fma.png',
    skills: ['JavaScript', 'HTML5', 'JavaScript', 'Lit', 'React', 'SCSS'],
    description: 'FMA is a single sign on solution app that I worked on. I also worked on other related projects here like it’s docs site and sandbox.',
  },
  // {
  //   size: '2x1',
  //   slug: 'antbell',
  //   heading: 'AntBell! Music',
  //   thumb: '/assets/antbell-thumb.jpg',
  //   halfThumb: '/assets/antbell-half.jpg',
  //   hero: '/assets/antbell.jpg',
  //   skills: ['JavaScript', 'HTMl5', 'JavaScript', 'LAMP', 'PHP', 'SCSS', 'Webpack', 'Woo Commerce', 'WordPress'],
  //   description: 'A Woo Commerce site I did for a local artist. It has a custom child theme built by me.',
  //   link: 'https://antbell.hasanirogers.me'
  // },
  {
    size: '2x1',
    slug: 'kemet',
    heading: 'Kemet UI',
    thumb: '/assets/kemet-thumb.jpg',
    halfThumb: '/assets/kemet-half.jpg',
    hero: '/assets/kemet.png',
    skills: ['Design System', 'JavaScript', 'HTMl5', 'TypeScript', 'Lit', 'Rollup', 'SCSS', 'Storybook', 'WCAG', 'Unit Testing', 'Vite'],
    description: 'I maintain my own Design System that uses Web Components for cross framework functionality.',
    link: 'https://kemet.dev'
  },
  {
    size: '1x1',
    slug: 'bob',
    heading: 'Bob Cards',
    thumb: '/assets/bob-thumb.jpg',
    hero: '/assets/bob.jpg',
    skills: ['JavaScript', 'Web Components', 'HTML5', 'TypeScript', 'LAMP', 'Lit', 'Vite', 'PHP', 'SCSS', 'WordPress'],
    description: 'A passion project I developed. It\'s a proof of concept. This a Lit app in Vite powered by a headless WordPress backend.',
    link: 'https://bobcards.app'
  },
  {
    size: '2x1',
    slug: 'gardens-care',
    heading: 'Gardens Care',
    thumb: '/assets/gardens-thumb.png',
    halfThumb: '/assets/gardens-half.png',
    hero: '/assets/gardens.png',
    skills: ['JavaScript', 'HTML5', 'TypeScript', 'LAMP', 'Lit', 'PHP', 'SCSS', 'WordPress'],
    description: 'I worked on various features and enhancements to the Gardens Care web site.',
    link: 'https://gardenscare.com'
  },
]
