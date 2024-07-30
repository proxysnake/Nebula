export default function websocket(self: Window | any) {
  self.WebSocket = new Proxy(self.WebSocket, {
    construct(target, args) {
      return self.__dynamic.bare.createWebSocket(
        args[0],
        args[1],
        target,
        {
          "User-Agent": navigator.userAgent,
          Origin: self.__dynamic$location.origin,
        },
        ArrayBuffer.prototype
      );
    },
  });
};