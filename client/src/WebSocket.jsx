import React, { useRef, useState } from "react";
import axios from "axios";

const WebSock = () => {
  const [messages, setMessages] = useState([]);
  const [value, setValue] = useState("");
  const socket = useRef();
  const [connected, setConnected] = useState(false);
  const [username, setUsername] = useState("");

  const connect = () => {
    socket.current = new WebSocket("ws://localhost:5000");
    socket.current.onopen = () => {
      setConnected(true);
      const message = {
        event: "connection",
        username,
        id: Date.now(),
      };
      socket.current.send(JSON.stringify(message));
      console.log("Подключение установлено");
    };
    socket.current.onmessage = (event) => {
      const message = JSON.parse(event.data);
      setMessages((prevState) => [message, ...prevState]);
    };
    socket.current.onclose = () => {
      console.log("Socket close");
    };
    socket.current.onerror = () => {
      console.log("Socket error");
    };
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    const message = {
      username,
      message: value,
      id: Date.now(),
      event: "message",
    };
    socket.current.send(JSON.stringify(message));
    setValue("");
  };

  if (!connected) {
    return (
      <div className="center">
        <div className="form">
          <input
            type="text"
            placeholder="Введите имя"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
          <button onClick={connect}>Войти</button>
        </div>
      </div>
    );
  }

  return (
    <div className="center">
      <div>
        <form className="form" onSubmit={sendMessage}>
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            type="text"
          />
          <button type="submit">Отправить</button>
        </form>
        <div className="messages">
          {messages.map((mess) => (
            <div className="message" key={mess.id}>
              {mess.event === "connection" ? (
                <div className="connection_message">
                  Пользователь {mess.username} подключился
                </div>
              ) : (
                <div className="message">
                  {mess.username}: {mess.message}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WebSock;
