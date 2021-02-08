import BookStore from "./components/BookStore";
import { createStore } from "redux";
import bookReducer from "./reducer/bookstore";
import { Provider } from "react-redux";

//create redux store and use redux devtools
const store = createStore(
  bookReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
function App() {
  return (
    <div>
      <Provider store={store}>
        <BookStore />
      </Provider>
    </div>
  );
}

export default App;
