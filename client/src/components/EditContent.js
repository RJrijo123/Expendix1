import React from "react";
import { useDispatch,useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useLocation } from "react-router-dom";
import moneySVG from "../img/money.svg";
//import { updateExpAction } from "../../redux/slices/expenses/expenseSlices"; // createExpAction,
//import DisabledButton from "../../components/DisabledButton";
import { updateExpAction } from "../redux/slices/expenses/expenseSlices";
import DisabledButton from "./DisabledButton";
import { updateIncomeAction } from "../redux/slices/income/incomeSlices";
//import { useNavigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";



const formSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  amount: Yup.number().required("Amount is required"),
});


//const navigate = useNavigate;
//const handleNavigation = () => {
  // Navigate to the desired path
 // navigate("/expenses");
//};

const EditContent = () => {
  const location = useLocation();
  const { state } = location;
  const navigate = useNavigate();


  // Check if state object and expense property exist
  const item = state && state.item ? state.item : null;

  // Log the expense data if available
  console.log(item);
  const dispatch = useDispatch();

  const expenses = location?.state?.item || {}; // Handle potential undefined values

  const formik = useFormik({
    initialValues: {
      title: item?.title || "123" , // Populate form fields with expense data if available
      description: item?.description ,
      amount: item?.amount ,
    },
    onSubmit: (values) => {
      const data = {
        ...values,
        id: item?._id,
      };
      item?.type === "income"
        ? dispatch(updateIncomeAction(data))
        : dispatch(updateExpAction(data));
    
      navigate("/expenses"); 
    },
    
    validationSchema: formSchema,
  });


  const expenseData = useSelector(state => state.expenses)
  console.log(expenseData);
 const {appErr, serverErr, expenseUpdated, loading} = expenseData; 
  return (
    <section className="py-5 bg-secondary vh-100">
      <div className="container text-center">
        <a className="d-inline-block mb-5">
          <img
            className="img-fluid"
            src={moneySVG}
            alt="SVGeXPENSES"
            width="200"
          />
        </a>
        <div className="row mb-4">
          <div className="col-12 col-md-8 col-lg-5 mx-auto">
            <div className="p-4 shadow-sm rounded bg-white">
              <form onSubmit={formik.handleSubmit} > {/* onSubmit={formik.handleSubmit}*/}
              {item?.type === "income" ? (
  <h2 className="mb-4 fw-light">Update Income</h2>
) : (
  <h2 className="mb-4 fw-light">Edit Expense</h2>
)}
                <div className="mb-3 input-group">
                  {appErr || serverErr ? <div>Err</div> : null} 
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
                  <DisabledButton />
                ) : (  
                <button type="submit" className="btn btn-primary mb-4 w-100">
                  Update
                </button>
                )}  
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}; 

export default EditContent;
