module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/live/:slug',
      handler: 'live.findCurrent',
      config: {
        auth: false,
      },
    },
  ],
};
