import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom'; 
import './Signup.css';
import axios from 'axios';

function Signup() {
  const navigate = useNavigate(); 
  const [user, setUser] = useState({
    Firstname: "",
    Lastname: "",
    Email: ""
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/signup", user);
      setMessage(response.data.message);
    } catch (error) {
      setMessage("Signup failed");
    }
  };

  const PostData = async (e) => {
    e.preventDefault();
    const { Firstname, Lastname, Email } = user;

    const res = await fetch("/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        Firstname,
        Lastname,
        Email
      })
    });

    const data = await res.json();

    if (data.status === 422 || !data) {
      window.alert("Invalid Registration");
      console.log("Invalid Registration");
    } else {
      window.alert("Registered");
      console.log("Registered");

      navigate("/login"); 
    }
  };

  return (
    <>
      <div id="form">
        <form onSubmit={handleSubmit} className="register-form" id="register-form" method="POST">
          <h2>SUBSCRIBE TO OUR NEWSLETTER</h2>
          <p>A short sentence describing what someone will receive by subscribing</p>

          <div id="name">
            <input
              type="text"
              id="Firstname"
              name="Firstname"
              value={user.Firstname}
              onChange={handleChange}
              placeholder='FIRST NAME'
              required
            />

            <input
              type="text"
              id="Lastname"
              name="Lastname"
              value={user.Lastname}
              onChange={handleChange}
              placeholder='LAST NAME'
              required
            />
          </div>

          <input
            type="text"
            id="Email"
            name="Email"
            value={user.Email}
            onChange={handleChange}
            placeholder='EMAIL HERE'
            required
          />
          <button type="submit" name="signup" className="form-submit" value="registered" onClick={PostData}>SIGN UP</button>
        </form>
        {/* {message && <p>{message}</p>} */}
      </div>
    </>
  );
}

export default Signup;
