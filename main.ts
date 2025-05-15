import { Hono } from 'hono'

const app = new Hono()

app.get('/', (c) => {
  return c.json({
    message: 'Hello, Komuitas IOT!'})
});

app.get("/ws", (c) => {
  const { socket, response } = Deno.upgradeWebSocket(c.req.raw);

  socket.onopen = () => {
    console.log("🔌 WebSocket connected");
  };

  socket.onmessage = (e) => {
    console.log("📨 Message received:", e.data);
    socket.send("👋 Hello back from server!");
  };

  socket.onclose = () => {
    console.log("❌ WebSocket closed");
  };

  return response;
});

Deno.serve({ port: 7500 } ,app.fetch)
