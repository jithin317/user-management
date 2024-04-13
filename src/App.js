import Router from "./routes";
import "./index.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Fragment } from "react";

function App() {
  return (
    <Fragment>
      <ToastContainer stacked />
      <Router />
    </Fragment>
  );
}

export default App;
