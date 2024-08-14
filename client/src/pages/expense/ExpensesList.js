import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
//import ContentDetails from "../../components/ContentDetails/ContentDetails";
//import ErrorDisplayMessage from "../../components/ErrorDisplayMessage";
import { fetchAllExpAction } from "../../redux/slices/expenses/expenseSlices";
import ContentDetails from "../../components/ContentDetails";
import AppPagination from "../../components/AppPagination";
import LoadingComponent from "../../components/Loading";
import ErrorDisplayMessage from "../../components/ErrorDisplayMessage";
//import LoadingComponent from "../../components/Loading/Loading";

//import AppPagination from "../../components/Pagination/AppPagination";
//import { fetchExpensesAction } from "../../redux/slices/expenses/expenseAction";
//import { userProfileAction } from "../../redux/slices/users/usersSlices";
//import calTransaction from "../../utils/accStatistics";

const ExpensesList = () => {
//  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const [page, setPage]=useState(1)
  useEffect(() => {
    dispatch(fetchAllExpAction(+page));
  }, [dispatch, page,typeof setPage]);
  
  //expenses
  const allExpenses = useSelector(state => state?.expenses);
  const { loading, expenseList, appErr, serverErr } = allExpenses;
  console.log("page", page);
  //console.log({ loading, expenseList, appErr, serverErr });
  //const totalExp = calTransaction(expenseList?.docs ? expenseList?.docs : []);

  //user Expenses
 // useEffect(() => {
 //   dispatch(userProfileAction());
 // }, []);
 // const user = useSelector(state => state.users);
 // const { profile, userLoading, userAppErr, userServerErr } = user;

  return (
    <>
    {loading ? <LoadingComponent/> : appErr || serverErr ? 
    <ErrorDisplayMessage>
      {serverErr} {appErr}
      </ErrorDisplayMessage>:
      <section className="py-6">
      <div className="container-fluid">
        <div className="position-relative border rounded-2">
          <a
            className="position-absolute top-0 end-0 mt-4 me-4"
            href="#"
          ></a>
          <div className="pt-8 px-8 mb-8">
            <h6 className="mb-0 fs-3">Recent Expense transactions</h6>
            <p className="mb-0">
              Below is the history of your expense transactions records
            </p>
            <Link
              to="/add-expense"
              className="btn  btn-outline-danger me-2 m-2"
            >
              New Expense
            </Link>
          </div>
          <table className="table">
            <thead>
              <tr className="table-active">
                <th scope="col">
                  <button className="btn d-flex align-items-centerr text-uppercase">
                    <small>Withdrawed By</small>
                  </button>
                </th>
                <th scope="col">
                  <button className="btn d-flex align-items-centerr text-uppercase">
                    <small>Title</small>
                  </button>
                </th>
                <th scope="col">
                  <button className="btn d-flex align-items-centerr text-uppercase">
                    <small>Description</small>
                  </button>
                </th>
                <th scope="col">
                  <button className="btn d-flex align-items-centerr text-uppercase">
                    <small>Amount</small>
                  </button>
                </th>
                <th scope="col">
                  <button className="btn d-flex align-items-centerr text-uppercase">
                    <small>Date</small>
                  </button>
                </th>
                <th scope="col">
                  <button className="btn d-flex align-items-centerr text-uppercase">
                    <small>Action</small>
                  </button>
                </th>
              </tr>
            </thead>
            <tbody>
              <>
              {loading ? (
                <h1>Loading</h1> 
              ) : appErr || serverErr ? (
                <div>Err</div>
              ) : expenseList?.docs?.length <=0 ? (
                <h1>No Expense Found</h1>
              ) : (
              
              expenseList?.docs?.map(exp => (
             <ContentDetails item={exp} key={exp?._id}/>
              ))
              )}
             {/*   {expenseList?.length <= 0 ? (
                  <h2>No Expense Found</h2>
                ) : (
                  expenseList?.docs?.map(exp => (
                    <ContentDetails item={exp} key={exp?._id} />
                  ))
                  )} */}
              </>
            </tbody>
          </table>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "20px",
        }}
      >
        <AppPagination
          setPage={setPage}
          pageNumber={expenseList?.totalPages}/>
       {/* {expenseList?.docs?.length > 1 && (
          <AppPagination
            setPage={setPage}
            items={expenseList?.totalPages}
          />
       )} */}
      </div>
    </section>}
     {/* {expLoading ? (
        <LoadingComponent />
      ) : expAppErr || expServerErr ? (
        <ErrorDisplayMessage>
          {" "}
          {expServerErr}
          {expAppErr}
        </ErrorDisplayMessage>
      ) : ( */}
        
 {/*  )} */}
    </>
  );
};

export default ExpensesList;