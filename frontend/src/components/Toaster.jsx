import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Toaster() {
  return (
    <ToastContainer
      position="top-center"
      autoClose={2000}
      hideProgressBar
      newestOnTop
      closeOnClick
      draggable={false}
      pauseOnHover
      toastClassName={() =>
        "relative flex p-4 mb-4 rounded-md shadow-md text-sm font-semibold justify-center"
      }
      bodyClassName={() => "flex items-center justify-center"}
    />
  );
}

export default Toaster;
