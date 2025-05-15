import { Hono } from 'hono'

const app = new Hono()

app.get('/', (c) => {
  return c.json({
    message: 'Hello, Komuitas IOT!'})
})

Deno.serve({ port: 7500 } ,app.fetch)
