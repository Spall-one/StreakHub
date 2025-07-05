module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/canali',
      handler: 'canale.find',
      config: { auth: false },
    },
  ],
};
