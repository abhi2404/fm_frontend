import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from 'sweetalert2'
import { BaseUrl } from "../App";
import Navbar from "../components/Navbar";
import bg1 from "../assets/bg1.svg";
import bg2 from "../assets/bg2.svg";
import { useNavigate } from "react-router-dom";

const Dashboard = ({ setLoggedIn, loggedIn }) => {
    let navigate = useNavigate();

  const [payment, setPayment] = useState(0);
  const [shift, setShift] = useState(1)
  const [user, setUser] = useState({})
  const [paymentTime, setPaymentTime] = useState("")

  const bookFunc = (e)=>{
    e.preventDefault();
    console.log(shift);
    axios
    .post(`${BaseUrl}api/payment/`, {shift:shift} ,{
      withCredentials: true,
    })
    .then(
      (res) => {
        console.log(res.data);
        Swal.fire({
            title: "Success!",
            text: res.data.msg,
            icon: 'success',
            confirmButtonText: 'OK'
          })
        setPayment(1)
      },
      (err) => {
        console.log(err.response.status);
        Swal.fire({
          title: "Warning",
          text: err.response.data.msg,
          icon: 'warning',
          confirmButtonText: 'OK'
        })
      }
    )
    .catch((res) => {
      console.log(res);
    });
  }
  useEffect(() => {
    if(localStorage.getItem("loggedIn") === true){
        setLoggedIn(true)
    }
    console.log(localStorage.getItem("loggedIn"));
      axios
      .get(`${BaseUrl}api/UserDetails/`, {
        withCredentials: true,
      })
      .then(
        (res) => {
          console.log(res.data);
          setUser(res.data)
        },
        (err) => {
          console.log(err.response.msg);
        }
      )
      .catch((res) => {
        console.log(res);
      });
      axios
      .get(`${BaseUrl}api/plan_activity/`, {
        withCredentials: true,
      })
      .then(
        (res) => {
          console.log(res.data);
          setPayment(res.data.payment);
        },
        (err) => {
          console.log(err.response.status);
        }
      )
      .catch((res) => {
        console.log(res);
      });
      axios
      .get(`${BaseUrl}api/payment/`, {
        withCredentials: true,
      })
      .then(
        (res) => {
          console.log(res.data);
          setShift(res.data[0].shift)
          setPaymentTime(res.data[0].payment_time.split("T")[0])
        }
      )
      .catch((res) => {
        console.log(res);
      });
  }, [payment]);

  return (
    <div
      className=" h-screen w-screen bg-no-repeat bg-cover flex justify-center items-center"
      style={{ backgroundImage: `url(${bg1})` }}
    >
      <Navbar loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
      <div className="md:w-4/6 w-5/6 p-4 pb-6 mt-10 bg-slate-100/50 shadow-xl rounded-xl">
        {!payment ? (
          <div className="flex flex-col justify-evenly items-center">
            <h2 className="text-xl text-slate-700 my-8 ">Book Classes </h2>
            <form className="w-9/12 flex flex-col justify-center items-center">
              <div className="w-full">
                <label
                  className="text-slate-600 dark:text-gray-200 inline"
                  htmlFor="shift"
                >
                  Shift
                </label>
                <select
                  id="shift"
                  name="shift"
                  value = {shift}
                  onChange={(e)=>{setShift(e.target.value)}}
                  className="inline w-full px-4 py-2 mt-2 mb-10 text-gray-700 bg-white border border-gray-300 rounded-2xl dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                >
                  <option value={1}>6AM - 7AM</option>
                  <option value={2}>7AM - 8AM</option>
                  <option value={3}>8AM - 9AM</option>
                  <option value={4}>5AM - 6AM</option>
                </select>
              </div>
              <div className="mr-auto">
                <label
                  className="text-slate-600 dark:text-gray-200"
                  htmlFor="age"
                >
                  Fees
                </label>
                <input
                  id="age"
                  name="age"
                  type="number"
                  defaultValue={500}
                  disabled
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-xl dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                />
              </div>
              <div className=" mt-6 ml-auto">
                <button
                  onClick={bookFunc}
                  className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-blue-700 rounded-md hover:bg-blue-900 focus:outline-none focus:bg-gray-600"
                >
                  Book and Pay
                </button>
              </div>
            </form>
          </div>
        ):""}
        {payment ? (
          <div className="flex flex-col justify-evenly items-center">
            <h2 className="text-xl text-slate-700 my-10">Classes are booked for this month </h2>
            <form className="w-9/12 flex flex-col justify-center items-center">
            <div className="w-full mb-5">
              <label
                className="text-slate-600 dark:text-gray-200"
                htmlFor="firstName"
              >
                 Name
              </label>
              <input
                id="firstName"
                name="fname"
                type="text"
                defaultValue={`${user.first_name} ${user.last_name}`}
                disabled
                className="inline w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />
            </div>
              <div className="w-full">
                <label
                  className="text-slate-600 dark:text-gray-200 inline"
                  htmlFor="shift"
                >
                  Shift
                </label>
                <select
                  id="shift"
                  name="shift"
                  className="inline w-full px-4 py-2 mt-2 mb-6 text-gray-700 bg-white border border-gray-300 rounded-2xl dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                >
                  <option value={shift}>{shift}</option>
                  
                </select>
              </div>
              <div className="w-full mb-5">
              <label
                className="text-slate-600 dark:text-gray-200"
                htmlFor="firstName"
              >
                 Paid On
              </label>
              <input
                id="firstName"
                name="fname"
                type="text"
                defaultValue={paymentTime}
                disabled
                className="inline w-full px-4 py-2 mt-2 mb-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />
            </div>
            </form>
          </div>
        ):""}
      </div>
    </div>
  );
};

export default Dashboard;
