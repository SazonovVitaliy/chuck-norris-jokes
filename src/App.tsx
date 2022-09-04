import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import AppRoutes from "./components/AppRoutes";
import store from "./store/store";
const App = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <AppRoutes />
      </Provider>
    </BrowserRouter>
  );
};

export default App;
