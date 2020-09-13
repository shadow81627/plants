module.exports = {
  ci: {
    collect: {
      staticDistDir: './dist',
      maxAutodiscoverUrls: 0,
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
}
