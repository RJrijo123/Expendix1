import React, { useEffect } from "react";
import { useFormik } from "formik";
import { useDispatch,useSelector } from "react-redux";  //, useSelector
import * as Yup from "yup";
//import SuccessMessage from "../../../components/SuccessMessage";
//import ErrorDisplayMessage from "../../../components/ErrorDisplayMessage";
import DisabledButton from "../../../components/DisabledButton";
import bg from "../../../img/regback.png";
import Regis from "../../../img/reg.png";
import { registerUserAction } from "../../../redux/slices/users/usersSlices";
import useCustomNavigate from "../../../utils/navigate";

const formSchema = Yup.object({
  email: Yup.string().required("Email is required"),
  password: Yup.string().required("Password is required"),
  firstname: Yup.string().required("First name is required"), 
  lastname: Yup.string().required("Last name is required"),
});

const Register = ({ history }) => {
  const dispatch = useDispatch();

  // Ensure that users is defined with a default empty object
  const users = useSelector(state => state?.users) ?? {};
  const customNavigate = useCustomNavigate();
  const { userLoading, userAppErr, userSeverErr, isRegistered } = users;

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      firstname: "",
      lastname: "",
    },
    onSubmit: values => {
      dispatch(registerUserAction(values));
    },
    validationSchema: formSchema,
  });

  useEffect(() => {
    if (isRegistered) {
      customNavigate("/login");
    }
  }, [isRegistered, customNavigate]);

  // Redirect
  //setTimeout(() => {
   // if (isRegistered) history.push("/profile");
  //}, 3000);

  return (
    <section
  style={{ height: "120vh", backgroundColor: "#14213d" }}
  className="container-fluid py-5"
>
      <div style={{height: "120vh" , backgroundColor: "#000000" }} className="d-none d-md-block position-absolute top-0 start-0 w-75 h-120"></div>
      <div className="d-md-none position-absolute top-0 start-0 bg-primary w-100 h-100"></div>
      <div className="container position-relative mx-auto">
        <div className="row align-items-center">
          <div className="col-12 col-lg-5 mb-5">
            <div>
              <h2 className="display-5 fw-bold mb-4 " style={{ color: '#ee9b00' }} >
                Keep Track of your income and expenses flow
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
      src={Regis}
      alt=""
    />
            </div>
              <form onSubmit={formik.handleSubmit} > { /* onSubmit={formik.handleSubmit} */ }
                <span className="text-white">New User</span>
                <h3 className="fw-bold mb-5 text-white">Register</h3>

                {userAppErr || userSeverErr ? <div className="alert alert-danger" >{userSeverErr} {userAppErr} </div> : null }
              {/*  {registered && (
                  <SuccessMessage msg="Register Successfully. You will be redirected shortly" />
                )}  
                {userServerErr || userAppErr ? (
                  <div className="alert alert-danger" role="alert">
                    {userServerErr}
                    {userAppErr}
                  </div>
                ) : null}  */}
                <input
                  value={formik.values.firstname}
                  onBlur={formik.handleBlur("firstname")}
                  onChange={formik.handleChange("firstname")}
                  className="form-control mb-2"
                  type="text"
                  placeholder="First Name"
                />
                <div className="text-danger mb-2">
                  {formik.touched.firstname && formik.errors.firstname} 
                </div>
                <input
                  value={formik.values.lastname}
                  onBlur={formik.handleBlur("lastname")}
                  onChange={formik.handleChange("lastname")}
                  className="form-control mb-2"
                  type="text"
                  placeholder="Last Name"
                />
                <div className="text-danger mb-2">
                  {formik.touched.lastname && formik.errors.lastname} 
                </div>
                <input
                  value={formik.values.email}
                  onBlur={formik.handleBlur("email")}
                  onChange={formik.handleChange("email")}
                  className="form-control mb-2"
                  type="email"
                  placeholder="Email"
                />
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
                <div className="text-danger mb-2">
                  {formik.touched.password && formik.errors.password}  
                </div>
               {/* {userLoading ? (
                  <DisabledButton />
               ) : (  */}
                  {userLoading ? (
                    <DisabledButton/>
                  ) : (
                    <button
                    type="submit"
                    className="btn btn-secondary py-2 w-100 mb-4"
                  >
                    Register
                  </button> 
                  )}
              {/*  )}  */}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
