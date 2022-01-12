interface Config {
  copyrightHolder: string;
  title: string;
  description: string;
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
  }
}

const config: Partial<Config> = {
  copyrightHolder: 'Pranav Karawale',
  title: 'Pranav Karawale',
  description: "Pranav Karawale's personal website",
  menus: {
    navbar: [
      {
        label: 'Projects',
        path: 'https://gh.obnerd.in',
      },
      {
        label: 'Posts',
        path: '/posts',
      },
    ],
    footerSocial: [
      {
        label: 'GitHub',
        path: 'https://github.com/obnoxiousnerd',
      },
      {
        label: 'LinkedIn',
        path: 'https://www.linkedin.com/in/pranav-karawale/',
      },
      {
        label: 'Dev.to',
        path: 'https://dev.to/obnoxiousnerd',
      },
      {
        label: 'Stack Overflow',
        path: 'https://stackoverflow.com/users/12020232/pranav',
      },
    ],
  },
  webmention: {
    webmentionUrl: 'https://webmention.io/obnerd.in/webmention',
    pingbackUrl: 'https://webmention.io/obnerd.in/xmlrpc',
    meUrl: 'https://github.com/obnoxiousnerd',
  }
};

export default config;
