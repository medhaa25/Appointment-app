import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Login from "./login";
import "./register.css";
import { useDispatch } from "react-redux";
import { registerUser } from "../../redux/counterSlice";
//git change example
function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLogin, setIsLogin] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: emailRegex.test(value)
          ? ""
          : "Please enter a valid email address.",
      }));
    } else if (name === "password") {
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: passwordRegex.test(value)
          ? ""
          : "Password must be at least 5 characters long and contain at least one uppercase and one lowercase letter.",
      }));
    } else if (name === "confirmPassword") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        confirmPassword:
          value === formData.password ? "" : "Passwords do not match.",
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (errors.email || errors.password || errors.confirmPassword) {
      alert("Please fix the errors in the form.");
      return;
    }

    dispatch(registerUser(formData));
    console.log("User registered:", formData);

    navigate("/home");
  };

  const inputFields = [
    { label: "Name", type: "text", name: "name" },
    { label: "Email", type: "email", name: "email", error: errors.email },
    {
      label: "Password",
      type: "password",
      name: "password",
      error: errors.password,
    },
    {
      label: "Confirm Password",
      type: "password",
      name: "confirmPassword",
      error: errors.confirmPassword,
    },
  ];

  return isLogin ? (
    <Login onSwitch={() => setIsLogin(false)} />
  ) : (
    <div className="register">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        {inputFields.map((field, index) => (
          <div key={index}>
            <label htmlFor={field.name}>{field.label}</label>
            <input
              type={field.type}
              id={field.name}
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
              required
            />
            {field.error && <p style={{ color: "red" }}>{field.error}</p>}
          </div>
        ))}
        <button type="submit">Register</button>
      </form>
      <p className="action-btn">
        Already have an account?{" "}
        <button type="button" onClick={() => setIsLogin(true)} className="btn">
          Login
        </button>
      </p>
    </div>
  );
}

export default Register;
