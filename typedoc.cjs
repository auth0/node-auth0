module.exports = {
  name: 'auth0',
  out: './docs/',
  exclude: [''],
  excludeExternals: false,
  excludePrivate: true,
  hideGenerator: true,
  readme: './README.md',
  visibilityFilters: {
    protected: false,
    inherited: true,
    external: true,
  },
  entryPoints: ['src/auth', 'src/management', 'src/userinfo', 'src/lib'],
  navigation: {
    includeGroups: true,
  },
};
