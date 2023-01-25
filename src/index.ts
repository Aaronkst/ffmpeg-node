import http from "http";
import BrowserToRtmpServer from "@api.video/browser-to-rtmp-server";

const PORT = process.env.PORT || 1234;
const server = http.createServer();

const browserToRtmpServer = new BrowserToRtmpServer(server, {
  socketio: {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
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

server.listen(PORT);
console.log("[Start] - App Started, Port:", PORT);
