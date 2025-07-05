module.exports = ({ env }) => ({
  connection: {
    client: 'sqlite',
    connection: {
      filename: env('DATABASE_FILENAME', './data/database.db'),
    },
    useNullAsDefault: true,
  },
});
