const WARN = 'warn'

module.exports = {
  ci: {
    collect: {
      url: [
        '/',
        '/404.html',
        '/species/',
        '/species/Creeping%20boobialla%20(Myoporum%20parvifolium)/',
        '/nurseries',
        '/nurseries/City%20Farm%20Nursery%20(Open%20Thursday%20to%20Sunday)/',
        '/sources/',
        '/releases/',
      ],
      staticDistDir: './dist',
      assert: {
        preset: 'lighthouse:recommended',
        assertions: {
          'unused-javascript': WARN,
          'unused-css-rules': WARN,
          'non-composited-animations': WARN,
          'errors-in-console': WARN,
          'valid-source-maps': WARN,
          'csp-xss': WARN,
          'preload-lcp-image': WARN,
        },
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
}
