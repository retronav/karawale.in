interface Config {
  copyrightHolder: string;
  title: string;
  description: string;
  site: string;
  menus: {
    [key: string]: {
      label: string;
      path: string;
    }[];
  };
  webmention: {
    webmentionUrl: string;
    pingbackUrl: string;
    meUrl: string;
  };
}

const config: Partial<Config> = {
  copyrightHolder: 'Pranav Karawale',
  title: 'Pranav Karawale',
  description: "Pranav Karawale's personal website",
  site: 'https://obnerd.in',
  menus: {
    navbar: [
      {
        label: 'projects',
        path: 'https://gh.obnerd.in',
      },
      {
        label: 'posts',
        path: '/posts',
      },
    ],
    footerSocial: [
      {
        label: 'github',
        path: 'https://github.com/obnoxiousnerd',
      },
      {
        label: 'linkedin',
        path: 'https://www.linkedin.com/in/pranav-karawale/',
      },
      {
        label: 'rss',
        path: '/posts/index.xml',
      },
    ],
  },
  webmention: {
    webmentionUrl: 'https://webmention.io/obnerd.in/webmention',
    pingbackUrl: 'https://webmention.io/obnerd.in/xmlrpc',
    meUrl: 'https://github.com/obnoxiousnerd',
  },
};

export default config;
