import React, { useEffect, useState } from "react";
import axios from "axios";

const EventSourcing = () => {
  const [messages, setMessages] = useState([]);
  const [value, setValue] = useState("");

  useEffect(() => {
    subscribe();
  }, []);

  const subscribe = async () => {
    try {
      const eventSource = new EventSource(`http://localhost:5000/connect`);
      eventSource.onmessage = (e) => {
        console.log('newMessage', e.data)
        let data = e.data;
        const message = JSON.parse(data);
        console.log(data);
        setMessages(prevState => [message, ...prevState])
        setValue('')
      };
    } catch (e) {
      console.log(e);
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault()
    await axios.post("http://localhost:5000/new-messages", {
      message: value,
      id: Date.now(),
    });
  };

  return (
    <div className="center">
      <div>
        <form className="form" onSubmit={sendMessage}>
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            type="text"
          />
          <button type="submit" >Отправить</button>
        </form>
        <div className="messages">
          {messages.map((mess) => (
            <div className="message" key={mess.id}>
              {mess.message}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventSourcing;
