---
id: websocket
tags: [React, Hooks]
title: 'Custom Hook: useWebSocket'
sidebar_position: 1
sidebar_label: 'Custom Hook: useWebSocket'
---

## 前言

有鑒於遇到例如 `聊天` 、`即時通知`、`遊戲` 等需要即時更新的需求，常常需要使用到 WebSocket，這篇筆記用於儲存平常處理 WebSocket 的語法，供日後參考。

![image](/img/notes/Companion-Ninja.png)

> 參考範例（包含 WebSocket 連線）：https://github.com/steveseguin/Companion-Ninja

## WebSocket vs HTTP

> 通常可以按照使用情境，去選擇使用 WebSocket 或是走常見的 RESTful API。

- **HTTPS**：是基於 請求-回應（Request-Response） 的協定，當客戶端發送請求時，伺服器會回傳資料。通常處理完請求後，連線就會關閉。

- **WebSocket**：是基於 持久連線（Persistent Connection） 的協定，一旦客戶端和伺服器之間通過初始的握手 (handshake) 建立連線後，這個連線會一直保持開啟，直到任何一方主動關閉它。

### 常見的工具

> 通常會使用到的工具有，實務上會依照需求 & 過去的習慣來選擇使用。（有遇過後端真的只有聽過其中一種連線方式）。

- [`WebSocket API`](https://developer.mozilla.org/zh-TW/docs/Web/API/WebSocket)：一種基於 TCP 的應用層協定，提供全雙工通信通道，適合即時應用。
- [`Socket.IO`](https://socket.io)：一個 JavaScript 函式庫，提供了 WebSocket 的封裝，並且支援多種傳輸方式（如：XHR Polling、WebSocket、Flash Socket 等），可以在不同的瀏覽器和環境中使用。

比較細微的差異，就不在關公前面耍大刀，像是與六層傳輸協定的關係、WebSocket Secure (WSS)、等等的細節，可以另外找資料來了解。

**參考資料**

- [WebSocket | Socket.IO 與它的產地](https://medium.com/@Tim_Tsai/websocket-socket-io-與它的產地-7da96930bde9)

## 語法

> 這邊是以 `WebSocket API` 為例，來說明 WebSocket 的基本用法，同時提供一個簡單的聊天室範例：https://github.com/Chious/websocket-heartbeat

> 註：同時 React 的官方文件也提到，關於處理外部系統的生命週期，請參考 [`useEffect`](https://react.dev/reference/react/useEffect) 的說明，例如：初始化、cleanup function 等等。

- `hooks/useWebSocket.tsx`

```tsx
import { useEffect, useState, useRef } from 'react';


export default function useWebSocket(url) {
   const [isReady, setIsReady] = useState(false);
   const [val, setVal] = useState(null);
   const ws = useRef<WebSocket | null>(null);

   useEffect(() => {
      const socket = new WebSocket(url);
      ws.current = socket;

      socket.onopen = () => {
         setIsReady(true);
         console.log('WebSocket is open now.');
      };

      socket.onmessage = (event) => {
         setVal(event.data);
      };

      return () => {
         if (socket) {
            socket.close();
         }
      }
      }
   }, []);

   return [isReady, val, ws.current.bind(ws.current)];
}
```

- `pages/index.tsx`

```tsx
import useWebSocket from '../hooks/useWebSocket';

export default function Home() {
  const [isReady, val, sendMessage] = useWebSocket('wss://localhost:8080');

  const handleClick = () => {
    if (isReady) {
      sendMessage('Hello, WebSocket!');
    }
  };

  return (
    <div>
      <h1>WebSocket Example</h1>
      <button onClick={handleClick}>Send Message</button>
      {val && <p>Received: {val}</p>}
    </div>
  );
}
```

這邊是關於聊天室的簡單範例：

![](https://github.com/Chious/websocket-heartbeat/raw/main/screenshot-01.png)

## Ping Pong -- Websocket 的生命心跳!

**標題瞎翻自 [MDN](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API/Writing_WebSocket_servers#pings_and_pongs_the_heartbeat_of_websockets) XD**

> WebSocket 連線中，為了檢查連線是否正常，通常會使用 Ping Pong 機制來保持連線的穩定性。這個機制會定期發送 Ping 訊息，並等待伺服器回傳 Pong 訊息，以確認連線仍然有效。（例如:每 30 秒發送一次 Ping 訊息，如果沒有從 Server 回傳 Pong 訊息，就會重新連線）

**註：需要與後端討論實作的格式。**

![](https://raw.githubusercontent.com/Chious/websocket-heartbeat/main/screenshot-02.png)

`前端`：

1. Ping Pong：`前端` 傳送的 JSON

```ts
{
   type: 'ping',
   data: {
      time: Date.now(),
   },
}

```

2. Ping Pong：`後端` 接收的 JSON

```ts
{
   type: 'pong',
   data: {
      time: Date.now(),
   },
}
```

## 如何使用 Postman 測試 WebSocket

1. 開啟 Postman，並選擇 WebSocket 的連線方式。
   ![](/img/notes/Postman-WebSocket.png)
2. 在網址欄中輸入 WebSocket 的 URL，例如 `ws://localhost:8080`，然後點擊「Connect」按鈕。
   ![](/img/notes/Postman-WebSocket-2.png)
3. 在連線成功後，可以在 Postman 的右側面板中看到 WebSocket 的訊息。
4. 點擊「Send」按鈕，然後在輸入框中輸入要發送的訊息，例如 `{"type": "ping", "data": {"time": 123456789}}`，然後點擊「Send」按鈕。

## 參考資料

- [WebSocket - Web APIs | MDN](https://developer.mozilla.org/zh-TW/docs/Web/API/WebSocket)

- [useEffect | React](https://react.dev/reference/react/useEffect)
