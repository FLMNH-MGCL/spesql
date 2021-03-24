module.exports = {
  title: 'SpeSQL',
  tagline: 'Software for Managing FLMNH Collection Data',
  url: 'https://flmnh-mgcl.github.io',
  baseUrl: '/spesql/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/logo.png',
  organizationName: 'FLMNH-MGCL', // Usually your GitHub org/user name.
  projectName: 'spesql', // Usually your repo name.
  plugins: [
    [
      require.resolve('@easyops-cn/docusaurus-search-local'),
      {
        hashed: true,
        indexBlog: false,
      },
    ],
  ],
  themeConfig: {
    prism: {
      theme: require('prism-react-renderer/themes/github'),
      darkTheme: require('./src/plugins/prism_themes/monokai'),
    },
    navbar: {
      title: 'SpeSQL',
      logo: {
        alt: 'SpeSQL Logo',
        src: 'img/logo.png',
      },
      items: [
        {
          to: 'docs/',
          activeBasePath: 'docs',
          label: 'Docs',
          position: 'left',
        },
        {
          href: 'https://github.com/FLMNH-MGCL/spesql/releases/latest',
          position: 'right',
          className: 'header-download-link header-icon-link',
          'aria-label': 'Download',
          title: 'Download',
        },
        {
          href: 'https://github.com/FLMNH-MGCL/spesql',
          position: 'right',
          className: 'header-github-link header-icon-link',
          'aria-label': 'GitHub repository',
          title: 'GitHub repository',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Getting Started',
              to: 'docs/',
            },
            { label: 'Usage', to: '/docs/homelayout' },
            { label: 'Additional Guides', to: '/docs/fieldguide' },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Twitter',
              href: 'https://twitter.com/KawaharaLab',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/FLMNH-MGCL/spesql',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} FLMNH-MGCL.`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
