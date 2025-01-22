import database from 'infra/database.js'

async function status(request, response) {
  const updatedAt = new Date().toISOString()

  const serverVersionQuery = await database.query('SHOW server_version;')
  const maxConnectionsQuery = await database.query('SHOW max_connections;')
  const pgStatActivityQuery = await database.query("SELECT * FROM pg_stat_activity WHERE datname = 'local_db'")

  response.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      postgres: {
        version: parseInt(serverVersionQuery.rows[0].server_version),
        max_connections: parseInt(maxConnectionsQuery.rows[0].max_connections),
        used_connections: pgStatActivityQuery.rows.length
      }
    }
  })
}

export default status