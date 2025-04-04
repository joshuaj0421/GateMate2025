import { useState } from "react";
import axios from "axios";
import backgroundImage from "../images/blue-agri-vector.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";

async function registerUser(email: string, pass: string, firstName: string, lastName: string) {
  try {
    const response = await axios.post("/api/v1/user/register", {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: pass,
    });
    console.log("Response: " + response);
  } catch (error) {
    console.error("Error:", error);
  }
}

function Register() {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [reenterPassword, setReenterPassword] = useState<string>("");
  const [inputError, setInputError] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);
  // const [emailError, setEmailError] = useState<boolean>(false);
  // const [passwordError, setPasswordError] = useState<boolean>(false);

  return (
    <div
      className="flex items-center justify-center h-screen font-Arvo"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      <div className="bg-Corp3 rounded-3xl pt-40 pb-40 p-36 shadow-xl shadow-Corp2">
        <div
          className={
            "flex flex-col gap-5 p-10 bg-Corp2 rounded-2xl shadow-inner shadow-Corp1"
          }
        >
          <div className="flex flex-col items-center gap-3">
            <FontAwesomeIcon size={"2xl"} icon={faUserPlus} />
            <h1 className="text-3xl text-center">Sign Up</h1>
          </div>
          <form id="form" className="flex flex-col gap-4">
            <input
              id="firstName"
              placeholder="First Name"
              className="max-w-xs rounded-lg p-2 bg-slate-300 text-black"
              value={firstName}
              onChange={(event) => setFirstName(event.target.value)}
            />

            <input
              id="lastName"
              placeholder="Last Name"
              className="max-w-xs rounded-lg p-2 bg-slate-300 text-black"
              value={lastName}
              onChange={(event) => setLastName(event.target.value)}
            />

            <input
              id="email"
              placeholder="Email"
              className="max-w-xs rounded-lg p-2 bg-slate-300 text-black"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />

            <input
              id="pass"
              placeholder="Password"
              className="max-w-xs rounded-lg p-2 bg-slate-300 text-black"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />

            <input
              id="reenter-pass"
              placeholder="Re-enter Password"
              className="max-w-xs rounded-lg p-2 bg-slate-300 text-black"
              type="password"
              value={reenterPassword}
              onChange={(event) => setReenterPassword(event.target.value)}
            />
            {inputError ? <p className="text-red-500 text-center text-xs italic">{error}</p> : null}
            {success ? <p className="text-green-500 text-center">Success</p> : null}
          </form>

          <button
            onClick={() => {
              if (
                firstName === "" ||
                lastName === "" ||
                email === "" ||
                password === "" ||
                reenterPassword === ""
              ) {
                setInputError(true);
                setSuccess(false);
                setError("One or more fields are empty");
              } else if (
                !/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(email)
              ) {
                setInputError(true);
                setSuccess(false);
                setError("Please enter a valid email address");
              } else if (password !== reenterPassword) {
                setInputError(true);
                setSuccess(false);
                setError("Passwords do not match");
              } else if (password.length < 8) {
                setInputError(true);
                setSuccess(false);
                setError("Password must be at least 8 characters");
              } else {
                registerUser(email, password, firstName, lastName);
                setSuccess(true);
                setInputError(false);
                window.location.href = "/";
              }
            }}
            className="border border-solid rounded-xl p-1 hover:bg-Corp3 hover:border-Corp3"
          >
            Sign Up
          </button>

          <button
            className="border border-solid rounded-xl p-1 hover:bg-Corp3 hover:border-Corp3"
            onClick={() => {
              window.location.href = "/";
            }}
          >
            Back to Sign In
          </button>
        </div>
      </div>
    </div>
  );
}

export default Register;
