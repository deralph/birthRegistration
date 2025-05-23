import React, { useState, useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase"; // Ensure this path points to your Firebase configuration
import { Context } from "../main";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);
  const navigateTo = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const { email, password, confirmPassword } = form;

    if (!email || !password || !confirmPassword) {
      toast.error("Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Retrieve the ID token result to access custom claims
      const idTokenResult = await user.getIdTokenResult();
console.log(idTokenResult)
      // Check if the user has the 'admin' role
      // if (idTokenResult.claims.role === "admin") {
      //   toast.success("Login successful");
      //   setIsAuthenticated(true);
      //   navigateTo("/");
      // } else {
      //   // If the user is not an admin, sign them out and show an error
      //   await auth.signOut();
      //   toast.error("Access denied: Admins only");
      // }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
      setForm({ email: "", password: "", confirmPassword: "" });
    }
  };

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <section className="container form-component">
      <h1 className="form-title">WELCOME TO BIRTH REGISTRATION</h1>
      <p>Only Admins Are Allowed To Access These Resources!</p>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={form.confirmPassword}
          onChange={handleChange}
        />
        <div style={{ justifyContent: "center", alignItems: "center" }}>
          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Login;
