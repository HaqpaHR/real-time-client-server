import "./App.css";
import LongPulling from "./LongPulling";
import EventSourcing from "./EventSourcing";
import WebSock from "./WebSocket";

function App() {
  return (
    <div className="app">
      {/*<LongPulling />*/}
      {/*<EventSourcing />*/}
      <WebSock />
    </div>
  );
}

export default App;
