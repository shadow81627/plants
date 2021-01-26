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
          'unused-javascript': 'warn',
          'unused-css-rules': 'warn',
          'non-composited-animations': 'warn',
          'errors-in-console': 'warn',
          'valid-source-maps': 'warn',
        },
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
}
