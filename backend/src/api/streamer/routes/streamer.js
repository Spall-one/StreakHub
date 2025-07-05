module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/streamer',
      handler: 'streamer.find',
      config: { auth: false },
    },
  ],
};
