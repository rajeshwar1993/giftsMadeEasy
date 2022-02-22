// TODO needs config to add dynamic products link to sitemap

module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000',
  generateRobotsTxt: true, // (optional)
  changefreq: 'weekly',
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', disallow: '/admin' },
      { userAgent: '*', disallow: '/admin/*' },
      { userAgent: '*', disallow: '/profile' },
      { userAgent: '*', disallow: '/profile/*' },
      { userAgent: '*', disallow: '/products' },
      { userAgent: '*', disallow: '/products/*' },
      { userAgent: '*', allow: '/' }
    ]
  },
  exclude: [
    '/admin',
    '/admin/*',
    '/profile',
    '/profile/*',
    '/products',
    '/products/*'
  ]
};
