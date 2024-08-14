import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import bg from "../../../img/logback.png";
import login from "../../../img/log.png";
import { useDispatch, useSelector } from "react-redux";
import { loginUserAction } from "../../../redux/slices/users/usersSlices";

import DisabledButton from "../../../components/DisabledButton";
import useCustomNavigate from "../../../utils/navigate";


// Form validation
 const formSchema = Yup.object({
  email: Yup.string().required("Email is required"),
  password: Yup.string().required("Password is required"),
}); 

const Login = () => {
  //dispatch
  const dispatch = useDispatch();

  const customNavigate = useCustomNavigate();
 
//get data from store
  const user = useSelector(state => state?.users);
  const { userAppErr, userSeverErr, userLoading, userAuth } = user;
  
  // Move the useFormik hook to the top level
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: values => {
    dispatch(loginUserAction(values));
    },
    validationSchema: formSchema,
  });

  useEffect(() => {
    if (userAuth) {
      customNavigate("/profile");
    }
    // Check if isLogin is true before navigating
 //   if (users && users.isLogin) {
  //    navigate(history, "profile", undefined);
 //   }
  }, [userAuth, customNavigate]);

 // if (users && users.userLoading) {
 //   return <div>Loading...</div>;
  //}

  return (
    <section
  style={{ height: "120vh", backgroundColor: "#14213d" }}
  className="container-fluid py-5"
>
    <div style={{height: "120vh" , backgroundColor: "#000000" }} className="d-none d-md-block position-absolute top-0 start-0 w-75 h-120"></div>
      <div className="d-md-none position-absolute top-0 start-0 bg-primary w-100 h-120"></div>
      <div className="container position-relative mx-auto">
        <div className="row align-items-center">
        <div className="col-12 col-lg-5 mb-5">
            <div>
              <h2 className="display-5 fw-bold mb-4" style={{ color: '#ee9b00' }} >
              Know where your money goes, because every penny counts.
              </h2>
              <hr className="text-warning w-100" />
              <div>
              <img
              className="w-100 h-auto img-fluid"
              style={{ objectFit: "cover" }}
              src={bg}
              alt=""
              />
            </div>

            </div>
           
          </div>
         
          <div className="col-12 col-lg-5 ms-auto">
       
          <div style={{ backgroundColor: "#343a40" }} className="p-5 rounded text-center mb-5">
          <div>
    <img
      className="img-fluid"
      style={{ objectFit: "cover", width: "30%", height: "30%" }}
      src={login}
      alt=""
    />
            </div>
              <span className="text-white">Sign In</span>
              <h3 className="fw-bold mb-5 text-white">Login to your account</h3>
              {/* Display Err */}
              {/* users && (users.userAppErr || users.userServerErr) ? (
                <div className="alert alert-danger" role="alert">
                  {users.userAppErr || users.userServerErr}
                </div>
              ) : null*/} 
              {userAppErr || userSeverErr ? <div className="alert alert-danger" >{userSeverErr} {userAppErr} </div> : null }
              <form onSubmit={formik.handleSubmit}> 
                <input
                  value={formik.values.email}
                  onBlur={formik.handleBlur("email")}
                  onChange={formik.handleChange("email")}
                  className="form-control mb-2"
                  type="email"
                  placeholder="E-mail address"
                />
                {/* Err */}
                <div className="text-danger mb-2">
                  {formik.touched.email && formik.errors.email}
                </div>
                <input
                  value={formik.values.password}
                  onBlur={formik.handleBlur("password")}
                  onChange={formik.handleChange("password")}
                  className="form-control mb-2"
                  type="password"
                  placeholder="Password"
                />
                {/* Err */}
                <div className="text-danger mb-2">
                  {formik.touched.password && formik.errors.password}
                </div>

              
                  <div>
                  {userLoading ? (
                    <DisabledButton/>
                  ) : (
                    <button
                    type="submit"
                    className="btn btn-secondary py-2 w-100 mb-4"
                  >
                    Login
                  </button> 
                  )}
                  </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      
    </section>
  );
};

export default Login;
