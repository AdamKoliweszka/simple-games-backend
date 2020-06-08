import { io } from "../../io";
import { verify } from "jsonwebtoken";

io.on("connection", (socket) => {
  socket.on("authentication", (data) => {
    verify(data.accessToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (!err) {
        socket.user = user.username;
        socket.join("users");
      }
    });
  });

  setTimeout(() => {
    if (!socket.user) {
      socket.disconnect("unauthorized");
    }
  }, 1000);
});
