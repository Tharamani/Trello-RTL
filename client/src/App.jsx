import Header from "./components/Header";
import SideBar from "./components/SideBar";
import Body from "./components/Body";
import "./App.css";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Provider } from "react-redux";
import store from "./store/store";

function App() {
  return (
    <>
      <Provider store={store}>
        <DndProvider backend={HTML5Backend}>
          <div id="app">
            <Header />
            <div className="flex">
              <SideBar />
              <Body />
            </div>
          </div>
        </DndProvider>
      </Provider>
    </>
  );
}

export default App;
