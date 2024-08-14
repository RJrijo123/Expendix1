import React, {useEffect, useState} from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import moneySVG from "../../img/money.svg";
//import { createExpAction } from "../../redux/slices/expenses/expenseSlices";
import { createIncomeAction } from "../../redux/slices/income/incomeSlices";
import DisabledButton from "../../components/DisabledButton";
import ErrorDisplayMessage from "../../components/ErrorDisplayMessage";

// import { useHistory } from "react-router-dom";
// import { addNewExpAction } from "../../redux/slices/expenses/expenseAction";
// import DisabledButton from "../../components/DisabledButton";
// import navigate from "../../utils/navigate";

// Form validation
 const formSchema = Yup.object({
   title: Yup.string().required("Title is required"),
   description: Yup.string().required("Description is required"),
   amount: Yup.number().required("Amount is required"),
 });

const AddIncome = () => {
  const history = useNavigate();
  // Dispatch action
  const dispatch = useDispatch();

  // Expense
  // const expenses = useSelector((state) => state?.expenses);
  // const { expLoading, expAppErr, expServerErr, isExpCreated } = expenses;

  // Initialize form
   const formik = useFormik({
     initialValues: {
       title: "",
       description: "",
       amount: "",
     },
     onSubmit: (values) => {
      //console.log(values);
      dispatch(createIncomeAction(values));
       //dispatch(addNewExpAction(values));
     },
     validationSchema: formSchema,
   });

  // Redirect
  // const history = useHistory();
  // useEffect(() => {
  //   if (isExpCreated) {
  //     navigate(history, "user-profile-expenses", undefined);
  //   }
  // }, [isExpCreated]);
  const state = useSelector(state => state.income);
  const {loading, appErr, serverErr, expenseCreated, isIncCreated } = state;

  // Redirect
  useEffect(() => {
    if (isIncCreated) history("/incomes"); // Corrected navigation usage
  }, [isIncCreated, history]);

  return (
    <>
      <section className="py-5 bg-dark vh-100">
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
                  <span className="text-muted">Income</span>
                  <h2 className="mb-4 fw-light">Record New Income</h2>
                  {/* Display expense Err */}
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
                  {/* Err */}
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
                  {/* Err */}
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
                  {/* Err */}
                  <div className="text-danger mb-2">
                     {formik.touched.amount && formik.errors.amount} 
                  </div>
                  {/* {expLoading ? (
                    <DisabledButton />
                  ) : ( */}
                  {loading ? (
                    <DisabledButton/>
                  ) : (
                    <button
                      type="submit"
                      className="btn btn-danger mb-4 w-100"
                    >
                      Record Income
                    </button>
                    )}
                  {/* )} */}
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AddIncome;
