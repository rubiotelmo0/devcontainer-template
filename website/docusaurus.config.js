module.exports = {
  title: 'Documentation',
  url: 'http://localhost:3000',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          routeBasePath: '/',
        },
        blog: false,
        pages: false,
      },
    ],
  ],
  themeConfig: {
    navbar: {
      title: 'Documentation',
    },
  },
};
