// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import PropTypes from "prop-types";
// import "./register.css";
// import { useDispatch, useSelector } from "react-redux";
// import { loginUser } from "../../redux/counterSlice";

// function Login({ onSwitch }) {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { user, error } = useSelector((state) => state.counter);
//   const [loginData, setLoginData] = useState({
//     email: "",
//     password: "",
//   });
//   const [rememberMe, setRememberMe] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setLoginData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     dispatch(loginUser({ ...loginData, rememberMe }));
//     if (user) {
//       console.log("Login successful");
//       navigate("/home");
//     }
//   };

//   const inputFields = [
//     { label: "Email", type: "email", name: "email" },
//     { label: "Password", type: "password", name: "password" },
//   ];

//   return (
//     <div className="register">
//       <h2>Login</h2>
//       <form onSubmit={handleSubmit}>
//         {inputFields.map((field, index) => (
//           <div key={index}>
//             <label htmlFor={field.name}>{field.label}</label>
//             <input
//               type={field.type}
//               id={field.name}
//               name={field.name}
//               value={loginData[field.name]}
//               onChange={handleChange}
//               required
//             />
//           </div>
//         ))}
//         <div>
//           <label>
//             <input
//               type="checkbox"
//               checked={rememberMe}
//               onChange={() => setRememberMe(!rememberMe)}
//             />
//             Remember Me
//           </label>
//         </div>
//         <button type="submit">Login</button>
//         {error && <p style={{ color: "red" }}>{error}</p>}
//       </form>
//       <p className="action-btn">
//         Don&apos;t have an account?{" "}
//         <button type="button" onClick={onSwitch} className="btn">
//           Register
//         </button>
//       </p>
//     </div>
//   );
// }

// Login.propTypes = {
//   onSwitch: PropTypes.func.isRequired,
// };

// export default Login;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import "./register.css";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/counterSlice";
import createStore from "../../redux/store";

function Login({ onSwitch }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, error } = useSelector((state) => state.counter);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [rememberMe, setRememberMe] = useState(false); // Add rememberMe state

  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRememberMeChange = (e) => {
    setRememberMe(e.target.checked);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { store, persistor } = createStore(rememberMe);

    dispatch(loginUser(loginData));
    if (user) {
      console.log("Login successful");
      navigate("/home");
    }
  };

  const inputFields = [
    { label: "Email", type: "email", name: "email" },
    { label: "Password", type: "password", name: "password" },
  ];

  return (
    <div className="register">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        {inputFields.map((field, index) => (
          <div key={index}>
            <label htmlFor={field.name}>{field.label}</label>
            <input
              type={field.type}
              id={field.name}
              name={field.name}
              value={loginData[field.name]}
              onChange={handleChange}
              required
            />
          </div>
        ))}
        <div>
          <label>
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={handleRememberMeChange}
            />
            Remember Me
          </label>
        </div>
        <button type="submit">Login</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
      <p className="action-btn">
        Don&apos;t have an account?{" "}
        <button type="button" onClick={onSwitch} className="btn">
          Register
        </button>
      </p>
    </div>
  );
}

Login.propTypes = {
  onSwitch: PropTypes.func.isRequired,
};

export default Login;
