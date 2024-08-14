import React, { useEffect } from "react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import moneySVG from "../../img/money.svg";
import { createExpAction } from "../../redux/slices/expenses/expenseSlices";
import { useNavigate } from "react-router-dom";
import DisabledButton from "../../components/DisabledButton";
import ErrorDisplayMessage from "../../components/ErrorDisplayMessage";


// Form validation
const formSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  amount: Yup.number().required("Amount is required"),
});

const AddExpense = (props) => {
  const history = useNavigate(); // Corrected useNavigate hook usage
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      amount: "",
    },
    onSubmit: (values) => {
      dispatch(createExpAction(values));
    },
    validationSchema: formSchema,
  });

  const state = useSelector(state => state.expenses);
  const {loading, appErr, serverErr, expenseCreated, isExpCreated } = state;

  // Redirect
  useEffect(() => {
    if (isExpCreated) history("/expenses"); // Corrected navigation usage
  }, [isExpCreated, history]);

  return (
    <>
      <section className="py-5 bg-secondary vh-100">
        <div className="container text-center">
          <div className="d-inline-block mb-5">
            <img
              className="img-fluid"
              src={moneySVG}
              alt="SVGeXPENSES"
              width="200"
            />
          </div>
          <div className="row mb-4">
            <div className="col-12 col-md-8 col-lg-5 mx-auto">
              <div className="p-4 shadow-sm rounded bg-white">
                <form onSubmit={formik.handleSubmit}>
                  <span className="text-muted">Expense</span>
                  <h2 className="mb-4 fw-light">Record New Expense</h2>
                  {/* display error */}
                  {serverErr || appErr ? (
                  <ErrorDisplayMessage>
                      {serverErr} {appErr}
                  </ErrorDisplayMessage>
                  ) : null}

                  <div className="mb-3 input-group">
                    <input
                      value={formik.values.title}
                      onBlur={formik.handleBlur("title")}
                      onChange={formik.handleChange("title")}
                      className="form-control"
                      type="text"
                      placeholder="Enter Title"
                    />
                  </div>
                  <div className="text-danger mb-2">
                     {formik.touched.title && formik.errors.title} 
                  </div>
                  <div className="mb-3 input-group">
                    <input
                      value={formik.values.description}
                      onBlur={formik.handleBlur("description")}
                      onChange={formik.handleChange("description")}
                      className="form-control"
                      type="text"
                      placeholder="Enter Description"
                    />
                  </div>
                  <div className="text-danger mb-2">
                     {formik.touched.description && formik.errors.description} 
                  </div>
                  <div className="mb-3 input-group">
                    <input
                      value={formik.values.amount}
                      onBlur={formik.handleBlur("amount")}
                      onChange={formik.handleChange("amount")}
                      className="form-control"
                      type="number"
                      placeholder="Enter Amount"
                    />
                  </div>
                  <div className="text-danger mb-2">
                     {formik.touched.amount && formik.errors.amount} 
                  </div>
                  {loading ? (
                    <DisabledButton/>
                  ) : (
                    <button
                    type="submit"
                    className="btn btn-danger mb-4 w-100"
                  >
                    Record Expense
                  </button>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AddExpense;
