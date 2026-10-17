const versions = require('./versions.json');

module.exports = {
  title: 'Devcontainer Template',
  tagline: 'A workspace for you and your coding agent.',
  favicon: 'img/devcontainer-favicon.png',
  url: 'https://rubiotelmo0.github.io',
  baseUrl: '/devcontainer-template/',
  trailingSlash: true,
  organizationName: 'rubiotelmo0',
  projectName: 'devcontainer-template',
  onBrokenLinks: 'throw',
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          routeBasePath: '/',
          versions: Object.fromEntries(
            ['current', ...versions].map((version) => [version, {badge: false}]),
          ),
        },
        blog: false,
        pages: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
  themes: [
    [
      require.resolve('@easyops-cn/docusaurus-search-local'),
      {
        // Keep the hash out of the query string to avoid preview-server redirects.
        hashed: 'filename',
        docsRouteBasePath: '/',
        indexBlog: false,
      },
    ],
  ],
  themeConfig: {
    navbar: {
      title: 'Devcontainer Template',
      items: [
        {
          type: 'docsVersionDropdown',
          position: 'right',
        },
        {
          href: 'https://github.com/rubiotelmo0/devcontainer-template',
          position: 'right',
          className: 'navbar-github-link',
          'aria-label': 'GitHub repository',
          title: 'GitHub repository',
        },
      ],
    },
  },
};
