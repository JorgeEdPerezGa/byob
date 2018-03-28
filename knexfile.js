module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/byob',
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds/dev'
    },
    setNullAsDefault: true
  },
  test: {
    client: 'pg',
    connection: 'postgres://localhost/byob-test',
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds/test'
    },
    setNullAsDefault: true
  }
}