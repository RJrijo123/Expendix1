import React from "react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import * as Yup from "yup";
import { updateProfileAction } from "../../redux/slices/users/usersSlices";
import LoadingComponent from "../../components/Loading";
import ErrorDisplayMessage from "../../components/ErrorDisplayMessage";
import DisabledButton from "../../components/DisabledButton";

const formSchema = Yup.object({
  firstname: Yup.string().required("firstname is required"),
  lastname: Yup.string().required("lastname is required"),
  email: Yup.string().required("email is required"),
});

const UpdateProfile = () => {
  const navigate = useNavigate(); // Use useNavigate hook to get navigation function
  const dispatch = useDispatch();
  const states = useSelector(state => state?.users);
  const { userLoading, userAppErr, userServerErr, isEdited } = states;
  const location = useLocation();
  const { state } = location;
  const user = state && state.user ? state.user : null;

  const formik = useFormik({
    initialValues: {
      firstname: user?.firstname || "",
      lastname: user?.lastname || "",
      email: user?.email || "",
    },
    onSubmit: async values => {
      await dispatch(updateProfileAction(values));
      navigate("/profile"); // Navigate to profile page after successful update
    },
    validationSchema: formSchema,
  });

  return (
    <>
      {userAppErr || userServerErr ? (
        <ErrorDisplayMessage>
          {userServerErr} {userAppErr}
        </ErrorDisplayMessage>
      ) : (
        <section className="py-5 bg-secondary vh-100">
          <div className="container text-center">
            <div className="row mb-4">
              <div className="col-12 col-md-8 col-lg-5 mx-auto">
                <div className="p-4 shadow-sm rounded bg-white">
                  <form onSubmit={formik.handleSubmit}>
                    <span className="text-muted">Update Profile</span>
                    <h4 className="mb-4 fw-light">Profile</h4>
                    <div className="mb-3 input-group">
                      <input
                        value={formik.values.firstname}
                        onBlur={formik.handleBlur("firstname")}
                        onChange={formik.handleChange("firstname")}
                        className="form-control"
                        type="text"
                        placeholder="Enter firstname"
                      />
                    </div>
                    <div className="text-danger mb-2">
                      {formik.touched.firstname && formik.errors.firstname}
                    </div>
                    <div className="mb-3 input-group">
                      <input
                        value={formik.values.lastname}
                        onBlur={formik.handleBlur("lastname")}
                        onChange={formik.handleChange("lastname")}
                        className="form-control"
                        type="text"
                        placeholder="Enter lastname"
                      />
                    </div>
                    <div className="text-danger mb-2">
                      {formik.touched.lastname && formik.errors.lastname}
                    </div>
                    <div className="mb-3 input-group">
                      <input
                        value={formik.values.email}
                        onBlur={formik.handleBlur("email")}
                        onChange={formik.handleChange("email")}
                        className="form-control"
                        type="email"
                        placeholder="Enter email"
                      />
                    </div>
                    <div className="text-danger mb-2">
                      {formik.touched.email && formik.errors.email}
                    </div>
                    <div
                      className="btn-group"
                      role="group"
                      aria-label="Basic mixed styles example"
                    >
                      {userLoading ? (
                        <DisabledButton />
                      ) : (
                        <button type="submit" className="btn btn-warning">
                          Update
                        </button>
                      )}
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default UpdateProfile;
