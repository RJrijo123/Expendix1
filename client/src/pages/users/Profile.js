//import React from 'react';
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userProfileAction } from "../../redux/slices/users/usersSlices";
//import GraphData from "../../components/GraphData";
import calcTransaction from "../../utils/accountStatistics";
import UserProfileStats from "./UserProfileStats";
import { useNavigate } from "react-router-dom";
import LoadingComponent from "../../components/Loading";
import ErrorDisplayMessage from "../../components/ErrorDisplayMessage";
import { fetchAccountStatsAction } from "../../redux/slices/accountStats/accountStatsSlices";
/*import { userProfileAction } from "../../../redux/slices/users/usersSlices";
import calTransaction from "../../../utils/accStatistics";
import DashboardData from "../../../components/Dashboard/DashboardData";
import navigate from "../../../utils/navigate";
import UserProfileStats from "./UserProfileStats";
import DataGraph from "../../../components/Dashboard/DataGrap";
import useDateFormatter from "../../../hooks/useDateFormatter";
import LoadingComponent from "../../../components/Loading/Loading";
import ErrorDisplayMessage from "../../../components/ErrorDisplayMessage"; */

const Profile = () => {
  // const [expResult, setExpResult] = useState([]);
  // const [incResult, setIncResult] = useState([]); 
  const dispatch = useDispatch();
  const history = useNavigate();
   useEffect(() => {
       dispatch(userProfileAction());
       dispatch(fetchAccountStatsAction());
   }, [dispatch]);
  // //history
  // const history = useHistory();
   const state = useSelector(state => state.users);
   const { loading, appErr, serverErr, userAuth, profile, accountDetails } = state;
   console.log(profile);
   
   //income stats
   const incResult = profile?.income && calcTransaction(profile?.income)
   //expens stats
   const expResult = profile?.expenses && calcTransaction(profile?.expenses)

   //console.log(incomeResult, expenseResult);

  //  const totalIncome = profile?.income?.reduce((acc, curr) => {
  //   return acc + Number(curr?.amount);
  //  }, 0); 
  //  const totalExp = profile?.expenses?.reduce((acc, curr) => {
  //   return acc + Number(curr?.amount);
  //  }, 0);
  // //income
  // useEffect(() => {
  //   if (profile?.expenses) {
  //     const expenses = calTransaction(profile?.expenses);
  //     setExpResult(expenses);
  //   }
  //   if (profile?.income) {
  //     const income = calTransaction(profile?.income);
  //     setIncResult(income);
  //   }
  // }, [profile?.income]);

  // // console.log(results);
  // // const income = profile?.income;
  // // const totalIncome = income
  // //   ?.map(inc => inc?.amount)
  // //   .reduce((acc, curr) => {
  // //     return acc + curr;
  // //   }, 0);

  // // //Total Expenses
  // // const expenses = profile?.expenses;
  // // const totalExp = expenses
  // //   ?.map(inc => inc?.amount)
  // //   .reduce((acc, curr) => {
  // //     return acc + curr;
  // //   }, 0);

  // // //Average expenses
  // // const averageExp = totalExp / 2;

  // // //min Expense

  // // const expensesArr = profile?.expenses?.map(exp => exp?.amount);
  // // const minExpenses = Math.min(...expensesArr);
  // // const maxExpenses = Math.max(...expensesArr);

  // // console.log(maxExpenses, totalExp); */

  return (
    <>
     {/* {userLoading ? (
        <LoadingComponent />
      ) : userAppErr || userServerErr ? (
        <>
          <ErrorDisplayMessage>
            {userServerErr} {userAppErr}
          </ErrorDisplayMessage>
        </>
      ) : ( */}
        
     {/* )} */}

     {loading ? <LoadingComponent/>: appErr || serverErr? <ErrorDisplayMessage>
      {serverErr} {appErr}
     </ErrorDisplayMessage>:<section className="py-5">
          <div className="container">
            <div className="position-relative p-8 border rounded-2">
              <div className="d-flex mb-6 align-items-center">
                <img
                  className="img-fluid me-4 rounded-2"
                  //   style="width: 64px; height: 64px;"
                  //src="https://images.unsplash.com/photo-1593789382576-54f489574d26?ixlib=rb-1.2.1&amp;q=80&amp;fm=jpg&amp;crop=faces&amp;cs=tinysrgb&amp;fit=crop&amp;h=128&amp;w=128"
                    src='https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png'
                  alt=""
                  style={{ marginLeft:"20px", height:"140px", width:"140px" }}
                />
                <div>
                  <h6 className="fw-bold mb-0">
                    <span>
                      {profile?.firstname} {profile?.lastname}
                    </span> 
                    <span className="badge ms-2 bg-primary-light text-primary">
                      {/* {accountDetails?.expenseStats[0]?.totalRecordsExp + accountDetails?.incomeStats[0]?.totalRecordsIncome} {" "} 
                      Records Created */}
                    </span>
                  </h6>
                  <p className="mb-0">{profile?.email}</p> 
                  <p className="mb-0">Date Joined: 22-Apr-2024</p>
                  <button className="btn btn-warning" onClick={() => history('/update-profile', { state: { user: userAuth } })} style={{ backgroundColor: 'rgba(144, 238, 144, 0.8)', fontWeight: 'bold' }}>
  Edit Profile
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
    <path d="M13.5 1a.5.5 0 0 1 .5.5v13a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 .5-.5h11zM12 2h-10v12h10V2z"/>
    <path fill-rule="evenodd" d="M4.646 11.854a.5.5 0 0 0 0 .708l1.5 1.5a.5.5 0 0 0 .708 0l8-8a.5.5 0 0 0 0-.708l-1.5-1.5a.5.5 0 0 0-.708 0l-8 8z"/>
    <path fill-rule="evenodd" d="M10.854 5.646a.5.5 0 0 0 0 .708l.646.646-4 4-.646-.646a.5.5 0 0 0-.708 0l-3.5 3.5a.5.5 0 0 0 0 .708l1.5 1.5a.5.5 0 0 0 .708 0l3.5-3.5a.5.5 0 0 0 0-.708l-.646-.646 4-4z"/>
    <path fill-rule="evenodd" d="M10 7l1-1-7-7-1 1v1l7 7z"/>
  </svg>
</button>

                </div>
                {/* <GraphData income={accountDetails?.incomeStats[0]?.totalIncome} expense={accountDetails?.expenseStats[0]?.totalExp}/> */}
              </div>

              <p className="mb-8"> </p>

             <UserProfileStats
                numOfTransExp={profile?.expenses?.length}
                avgExp={expResult?.avg}
                totalExp={expResult?.sumTotal}
                minExp={expResult?.min}
                maxExp={expResult?.max}
                numOfTransInc={profile?.income?.length}
                avgInc={incResult?.avg}
                totalInc={incResult?.sumTotal}
                minInc={incResult?.min}
            maxInc={incResult?.max} 
              />
              <div className="d-flex align-items-center justify-content-center">
                <button
                onClick={() => history("/expenses")} className="btn me-4 w-100 btn-danger d-flex align-items-center justify-content-center">
               {/*   onClick={() => navigate(history, "user-profile-expenses", "")}  */}
                  
            
                  <span>View Expenses History</span>
                </button>
                <button
                onClick={() => history("/incomes")} className="btn w-100 btn-outline-success d-flex align-items-center justify-content-center">
               {/*   onClick={() => navigate(history, "user-profile-income", "")} */}
                  
    
                  <span>View Income History</span>
                </button>
              </div>
            </div>
          </div>
        </section>}
    </>
  );
};

export default Profile;