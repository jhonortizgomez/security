import { UseState } from "../UseStates";
import { UseReducer } from "../UseReducer";
import "./App.css";

function App() {
  return (
    <div className="App">
      <UseState name="Use state" />
      <UseReducer name="Use reduce" />
    </div>
  );
}

export default App;
