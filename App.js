import { Provider } from "react-redux";
import store from "./app/src/redux/Store";
import Main from "./app/src/main";

export default function App() {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
}
