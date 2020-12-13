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
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
}
