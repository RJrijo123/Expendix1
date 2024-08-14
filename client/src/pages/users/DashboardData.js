import React,{useEffect} from "react"; //, { useEffect }
import { useDispatch, useSelector } from "react-redux";
import LoadingComponent from "../../components/Loading";
import ErrorDisplayMessage from "../../components/ErrorDisplayMessage";
import { fetchAccountStatsAction } from "../../redux/slices/accountStats/accountStatsSlices";
import GraphData from "../../components/GraphData"
import currencyFormatter from "../../utils/currencyFormatter";

//import { fetchAccountStatsAction } from "../../redux/slices/accountStats/accountStatsSlices";
//import DataGrap from "./DataGrap";

 const DashboardData = () =>{
/*  avgExp,
  totalExp,
  minExp,
  maxExp,
  numOfTransExp,
  avgInc,
  totalInc,
  minInc,
  maxInc,
  numOfTransInc,
  netProfit,
}) => { */
 const dispatch = useDispatch();

 useEffect(() => {
  dispatch(fetchAccountStatsAction())
 }, [dispatch])
   //format curr
//   const formattedTotalExp = useCurrencyFormatter("USD", totalExp);
//   const formattedTotalInc = useCurrencyFormatter("USD", totalIncome);
// const formattedNetProfit = useCurrencyFormatter("USD", netProfit); 
  //format date
  const account = useSelector(state => state.account);
  const { loading, accountDetails, appErr, serverErr } = account;
  /* console.log(accountDetails?.expenseStats[0]); */
  return (
    <>
    {loading ? <LoadingComponent/>: appErr || serverErr ? <ErrorDisplayMessage>
      {serverErr} {appErr}
    </ErrorDisplayMessage> :
    <section className="py-6">
    <div className="container">
      {/* Grpah */}
      <GraphData income={accountDetails?.incomeStats[0]?.totalIncome} expense={accountDetails?.expenseStats[0]?.totalExp}/>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        {/* Grpah */}
     {/*   <DataGrap income={totalInc} expenses={totalExp} /> */}
      </div>
      {/* Net Profit */}
      <div style={{ textAlign: "center", margin: "20px" }}>
      {/*  <h2 classNameName="text-success">Net Profit : {formattedNetProfit}</h2>  */}
      </div>
      <div className="row">
        <div className="col-12 col-md-6 mb-6">
          <div className="p-8 border rounded-2">
            <div className="d-flex mb-6 align-items-start justify-content-between">
              <span
                className="d-inline-flex align-items-center justify-content-center bg-light-light rounded-2"
                style={{ width: "40px", height: "40px" }}
              ></span>
              {/* Expenses Start */}
              <span className="badge fs-2 bg-light text-danger">
                Total Expenses
              </span>
            </div>
            <h1 className="mb-4">{currencyFormatter("INR", accountDetails?.expenseStats[0]?.totalExp)}</h1>
               
            <p className="mb-0">
              <span>Number of Transactions: </span>
              <span className="text-danger ms-1">
                <span>{accountDetails?.expenseStats[0]?.totalRecordsExp}</span>
                  
              </span>
            </p>

            <p className="mb-0">
              <span>Minimum Amount: </span>
              <span className="text-danger ms-1">
                <span>{currencyFormatter("INR", accountDetails?.expenseStats[0]?.minExp)}</span> 
                 
              </span>
            </p>

            <p className="mb-0">
              <span>Maximum Amount: </span>
              <span className="text-danger ms-1">
                <span>{currencyFormatter("INR", accountDetails?.expenseStats[0]?.maxExp)}</span> 
               
              </span>
            </p>

            <p className="mb-0">
              <span>Average Amount: </span>
              <span className="text-danger ms-1">
                <span>{currencyFormatter("INR", accountDetails?.expenseStats[0]?.averageExp)}</span>
                  
              </span>
            </p>
          </div>
        </div>
        <div className="col-12 col-md-6 mb-6">
          <div className="p-8 border rounded-2">
            <div className="d-flex mb-6 align-items-start justify-content-between">
              <span
                className="d-inline-flex align-items-center justify-content-center bg-danger-light rounded-2"
                style={{ width: "40px", height: "40px" }}
              ></span>

              {/* Income Start */}
              <span className="badge fs-2 bg-light text-success">
                Total Income
              </span>
            </div>
            <h1 className="mb-4">{currencyFormatter("INR", accountDetails?.incomeStats[0]?.totalIncome)}</h1>
            

            <p className="mb-0">
              <span>Number of Transactions: </span>
              <span className="text-danger ms-1">
                <span>{accountDetails?.incomeStats[0]?.totalRecordsIncome}</span>
                 
              </span>
            </p>

            <p className="mb-0">
              <span>Minimum Amount: </span>
              <span className="text-danger ms-1">
                <span>{currencyFormatter("INR", accountDetails?.incomeStats[0]?.minIncome)}</span> 
                 
              </span>
            </p>

            <p className="mb-0">
              <span>Maximum Amount: </span>
              <span className="text-danger ms-1">
                <span>{currencyFormatter("INR", accountDetails?.incomeStats[0]?.maxIncome)}</span>
                 
              </span>
            </p>

            <p className="mb-0">
              <span>Average Amount: </span>
              <span className="text-danger ms-1">
                <span>{currencyFormatter("INR", accountDetails?.incomeStats[0]?.averageIncome)}</span>
                 
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
    }
    </>
  );
};

export default DashboardData;