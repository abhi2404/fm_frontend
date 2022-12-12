import { useRef } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import bgimg from "../assets/yogaimg.jpg";
import Navbar from "../components/Navbar";
import { BaseUrl } from "../App";

const Login = ({setLoggedIn,loggedIn}) => {
  let navigate = useNavigate();
  const formElem = useRef();
  const loginSubmitFunc = (e) => {
    e.preventDefault();
    const formInputs = [...formElem.current.elements].filter(
      (e) => e.type !== "submit"
    );
    const obj = {};
    formInputs.map((elem) => {
      obj[elem.name] = elem.value;
    });
    if (
      Object.values(obj)
        .map((e) => e.trim())
        .includes("")
    ) {
      console.log("invalid");
      return;
    }
    axios
    .post(`${BaseUrl}api/login/`, obj, {
      withCredentials: true,
    })
    .then(
      (res) => {
        Swal.fire({
          title: "Success!",
          text: res.data.msg,
          icon: 'success',
          confirmButtonText: 'OK'
        })
        navigate("/dashboard");
        setLoggedIn(true);
        localStorage.setItem("loggedIn",true)
      },
      (err) => {
        console.log(err.response.status);
      }
    )
  .catch(res=>{
    console.log(res);
  })
  };
  return (
    <>
    <Navbar loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
      <div
        style={{ backgroundImage: `url(${bgimg})` }}
        className="w-screen h-screen flex flex-col justify-center items-center bg-no-repeat bg-cover bg-center"
      >
        <div className=" lg:w-1/4 md:w-2/4 sm:w-9/12 w-11/12 h-4/6 bg-cyan-500/80 rounded-xl flex flex-col items-center justify-around ">
          <h1 className="text-5xl text-white">Login</h1>
          <form className="w-10/12" ref={formElem}>
            <div className="mb-5 w-full">
              <label
                className="text-white dark:text-gray-200"
                htmlFor="username"
              >
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                className=" text-gray-700 rounded-lg w-11/12 bg-white border border-gray-300 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />
            </div>
            <div>
              <label
                className="text-white dark:text-gray-200"
                htmlFor="password"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                className=" text-gray-700 rounded-lg w-11/12 bg-white border border-gray-300 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />
            </div>
          </form>
          <div className=" mt-6 h-12 w-full flex justify-center">
            <button
              onClick={loginSubmitFunc}
              className="px-6 py-2 leading-5 w-3/6 text-white transition-colors duration-200 transform bg-pink-500 rounded-full hover:bg-pink-700 focus:outline-none focus:bg-gray-600"
            >
              Log In
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
