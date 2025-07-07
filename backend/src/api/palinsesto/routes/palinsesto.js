module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/palinsesto/template',
      handler: 'palinsesto.downloadTemplate',
      config: { auth: false },
    },
    {
      method: 'POST',
      path: '/palinsesto/upload',
      handler: 'palinsesto.upload',
      config: { auth: false },
    },
  ],
};
