test("GET to /api/v1/status should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status")
  expect(response.status).toBe(200)

  const responseBody = await response.json()
  expect(responseBody.updated_at).toBeDefined()

  const parsedUpdatedAt = new Date(responseBody.updated_at).toISOString()
  expect(responseBody.updated_at).toEqual(parsedUpdatedAt)

  const dependencies = responseBody.dependencies

  expect(dependencies).toBeDefined()
  expect(dependencies.postgres).toBeDefined()
  expect(dependencies.postgres.version).toBeDefined()
  expect(dependencies.postgres.max_connections).toBeDefined()
  expect(dependencies.postgres.used_connections).toBeDefined()
})