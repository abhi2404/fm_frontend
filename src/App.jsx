import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Form from "./Pages/Form";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";

export const BaseUrl = "https://abhi2404.pythonanywhere.com/";


function App() {

  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    if(localStorage.getItem("loggedIn") === true){
      setLoggedIn(true)
      // console.log(localStorage.getItem("loggedIn"));
    }
  }, [])
  
  return (
    <Routes>
      <Route
        path="/"
        index
        element={<Form loggedIn={loggedIn} setLoggedIn={setLoggedIn} />}
      />
      <Route
        path="/login"
        element={<Login loggedIn={loggedIn} setLoggedIn={setLoggedIn} />}
      />
      <Route
        path="/dashboard"
        element={<Dashboard loggedIn={loggedIn} setLoggedIn={setLoggedIn} />}
      />
    </Routes>
  );
}

export default App;
