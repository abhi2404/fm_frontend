import { useRef } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import bgimg from "../assets/yogaimg.jpg";
import Navbar from "../components/Navbar";
import { BaseUrl } from "../App";

const Form = ({setLoggedIn,loggedIn}) => {
  const formElem = useRef();
  let navigate = useNavigate();
  const onSubmitFunc = (e) => {
    e.preventDefault();
    const formInputs = [...formElem.current.elements].filter(
      (e) => e.type !== "submit"
    );
    const obj = {};
    formInputs.map((elem) => {
      obj[elem.name] = elem.value;
    });
    // if (obj.age < 18 || obj.age > 65) return;
    if (
      Object.values(obj)
        .map((e) => e.trim())
        .includes("")
    ) {
      console.log("invalid");
      return;
    }
    console.log(obj);
    axios
      .post(`${BaseUrl}api/register/`, obj, {
        withCredentials: true,
      })
      .then(
        (res) => {
          console.log(res.data.msg);
          Swal.fire({
            title: "Success!",
            text: res.data.msg,
            icon: 'success',
            confirmButtonText: 'OK'
          })
          navigate("/login");
        },
        (err) => {
          console.log(err.response.status);
          Swal.fire({
            title: "Warning!",
            text: err.response.data.msg,
            icon: 'warning',
            confirmButtonText: 'OK'
          })
        }
      )
    .catch(res=>{
      console.log(res);
    })
  };

  return (
    <>
    <Navbar loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>
    <div
      style={{ backgroundImage: `url(${bgimg})` }}
      className="w-screen h-screen flex justify-center items-center bg-no-repeat bg-cover bg-center overflow-scroll"
    >
      <section className=" p-6 pb-4 sm:max-w-4xl w-full sm:mt-16 overflow-scroll mt-80 mx-auto bg-cyan-500/80 rounded-md shadow-md dark:bg-gray-800">
        <h1 className="text-xl font-bold text-white capitalize dark:text-white">
          Registration Form
        </h1>
        <form ref={formElem}>
          <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            <div>
              <label
                className="text-white dark:text-gray-200"
                htmlFor="firstName"
              >
                First Name
              </label>
              <input
                id="firstName"
                name="fname"
                type="text"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />
            </div>
            <div>
              <label
                className="text-white dark:text-gray-200"
                htmlFor="lastName"
              >
                Last Name
              </label>
              <input
                id="lastName"
                name="lname"
                type="text"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />
            </div>
            <div>
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
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />
            </div>
            <div>
              <label
                className="text-white dark:text-gray-200"
                htmlFor="phone"
              >
                Phone Number
              </label>
              <input
                id="phone"
                name="phone"
                type="number"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />
            </div>
            <div>
              <label
                className="text-white dark:text-gray-200"
                htmlFor="emailAddress"
              >
                Email Address
              </label>
              <input
                id="emailAddress"
                name="email"
                type="email"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />
            </div>

            <div>
              <label className="text-white dark:text-gray-200" htmlFor="age">
                Date of Birth
              </label>
              <input
                id="age"
                name="dob"
                type="date"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
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
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />
            </div>

            <div>
              <label
                className="text-white dark:text-gray-200"
                htmlFor="passwordConfirmation"
              >
                Password Confirmation
              </label>
              <input
                id="passwordConfirmation"
                name="passwordConfirmation"
                type="password"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />
            </div>
          </div>

          <div className="flex justify-end mt-4">
            <button
              onClick={onSubmitFunc}
              className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-pink-500 rounded-md hover:bg-pink-700 focus:outline-none focus:bg-gray-600"
            >
              Register
            </button>
          </div>
        </form>
      </section>
    </div>
    </>
  );
};

export default Form;
