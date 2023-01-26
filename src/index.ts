import http from "http";
import BrowserToRtmpServer from "@api.video/browser-to-rtmp-server";

const PORT = process.env.PORT || 1234;
const server = http.createServer((req, res) => {
  // if (req.method === "GET") {
  //   // 1. Tell the browser everything is OK (Status code 200), and the data is in plain text
  //   res.writeHead(200, {
  //     "Content-Type": "text/plain",
  //   });
  //   // 2. Write the announced text to the body of the page
  //   res.write("Hello, World!\n");
  //   // 3. Tell the server that all of the response headers and body have been sent
  //   res.end();
  // }
});

const browserToRtmpServer = new BrowserToRtmpServer(server, {
  socketio: {
    cors: {
      origin: ["http://localhost:3000"],
      methods: ["GET", "POST"],
      credentials: true,
    },
  },
  hooks: {
    start: (socket, config) => {
      // for instance, you can here access the socket associated to the current request:
      // const token = socket.handshake.auth.token; // retrieve the auth token
      // ...
      const rtmp = "rtmp://18.180.45.42:1935/proto-1/live-1"; // you can generate here the RTMP endpoint url according to your need:
      return {
        ...config,
        rtmp,
      };
    },
  },
});
browserToRtmpServer.on("error", (uuid, error) => {
  console.log(`Error for connection ${uuid}: ${error.message}`);
});

browserToRtmpServer.on("connection", (c) => {
  console.log(`New connection uuid: ${c.uuid}`);
});

server.listen(PORT);
console.log("[Start] - App Started, Port:", PORT);
