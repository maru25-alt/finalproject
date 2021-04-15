import React, { useState } from "react";
import axios from "./../../store/axios";
import { useForm } from "react-hook-form";
import { errorAlert } from "../../utils";
import { Link } from "react-router-dom";
import { handleLogin } from "../../store/apiCall";

const Login = ({ history }) => {
  const [userId, setuserId] = useState("");
  const [password, setpassword] = useState("");
  const [loading, setloading] = useState(false);
  const { register, handleSubmit, errors } = useForm();

  const handleSignin = () => {
    setloading(true);
    axios
      .post("/signin", { userID: userId, password })
      .then((res) => {
        const { data } = res;
        setloading(false);
        if (data.error) {
          return errorAlert(data.error);
        }

        const user = data?.user;
        handleLogin(user);
        history.push("/");
      })
      .catch((err) => {
        console.log(err);
        setloading(false);
        errorAlert("Connection  error try again later");
      });
  };

  return (
    <div className="c-app row login__page">
      <div className="col info__side">
        <div className="info__text-container">
          <h1>Welcome to D-System</h1>
          <p>
            Vestibulum ac diam sit amet quam vehicula elementum sed sit amet
            dui. Quisque velit{" "}
          </p>
        </div>
      </div>
      <div className="col form__side">
        <form className="form">
          <h1 className="title mb-5">Welcome to D-System</h1>
          <h3 className="mb-3">Sign In to your account</h3>
          <div className="mb-3">
            <div className="mb-3">
              <input
                value={userId}
                name="userId"
                ref={register({ required: true })}
                onChange={(e) => setuserId(e.target.value)}
                type="text"
                required
                placeholder="Enter your userID"
                autoComplete="username"
              />
              <br />
              {errors.userId && (
                <span className=" form-error text-danger mb-2">
                  UserID is required
                </span>
              )}
            </div>
            <div className="">
              <input
                type="password"
                placeholder="Enter your password"
                name="password"
                ref={register({ required: true })}
                value={password}
                required
                onChange={(e) => setpassword(e.target.value)}
                autoComplete="current-password"
              />
              <br />
              {errors.password && (
                <span className="form-error text-danger mb-2">
                  Password Required
                </span>
              )}
            </div>
          </div>
          <div className="mb-4">
            <Link to="/password/forget" color="link" className="px-0">
              Forgot password?
            </Link>
          </div>

          <div className="row">
            <div className="col-xs-6">
              <button
                className="primary__btn px-4"
                disabled={loading}
                onClick={handleSubmit(handleSignin)}
                type="submit"
              >
                {loading ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    <span className="visually-hidden">Loading...</span>
                  </>
                ) : (
                  <>Login</>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
