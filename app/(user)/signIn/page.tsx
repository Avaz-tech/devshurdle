"use client";
import { useState, useEffect } from "react";
import "./../../styles/login.css";

const LoginPage: React.FC = () => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const container = document.getElementById("container");
    if (isActive) {
      container?.classList.add("active");
    } else {
      container?.classList.remove("active");
    }
  }, [isActive]);

  return (
    <div className="w-full flex justify-center">
      <div className="container border mx-3" id="container">
        <div className="form-container sign-up">
          <form className="bg-background">
            <h1 className="my-3">Create Account</h1>
            <input type="text" placeholder="Name" />
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <button>Sign Up</button>
          </form>
        </div>
        <div className="form-container sign-in">
          <form>
            <h1 className="my-3">Sign In</h1>
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <a href="#">Forget Your Password?</a>
            <button>Sign In</button>
          </form>
        </div>
        <div className="toggle-container">
          <div className="toggle">
            <div className="toggle-panel toggle-left">
              <h1>Welcome Back!</h1>
              <p>Enter your personal details to use all of site features</p>
              <button onClick={() => setIsActive(false)} id="login">
                Sign In
              </button>
            </div>
            <div className="toggle-panel toggle-right">
              <h1>Hello, Friend!</h1>
              <p>Register with your personal details to use all of site features</p>
              <button onClick={() => setIsActive(true)} id="register">
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
