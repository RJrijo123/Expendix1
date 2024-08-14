import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ContentDetails from "../../components/ContentDetails";
import AppPagination from "../../components/AppPagination";
import LoadingComponent from "../../components/Loading";
import ErrorDisplayMessage from "../../components/ErrorDisplayMessage";
import { fetchAllIncomeAction } from "../../redux/slices/income/incomeSlices";

const IncomeList = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(fetchAllIncomeAction(page));
  }, [dispatch, page]);

  const incomeState = useSelector(state => state?.income);
  const { loading, incomeList, appErr, serverErr } = incomeState;

  return (
    <>
      {loading ? (
        <LoadingComponent />
      ) : appErr || serverErr ? (
        <ErrorDisplayMessage>
          {serverErr} {appErr}
        </ErrorDisplayMessage>
      ) : (
        <section className="py-6">
          <div className="container-fluid">
            <div className="position-relative border rounded-2">
              <div className="pt-8 px-8 mb-8">
                <h6 className="mb-0 fs-3">Recent Income transactions</h6>
                <p className="mb-0">
                  Below is the history of your Income transactions records
                </p>
                <Link
                  to="/add-income"
                  className="btn btn-outline-success me-2 m-2"
                >
                  New Income
                </Link>
              </div>
              <table className="table">
                <thead>
                  <tr className="table-active">
                    <th scope="col">
                      <button className="btn d-flex align-items-center text-uppercase">
                        <small>Withdrawed By</small>
                      </button>
                    </th>
                    <th scope="col">
                      <button className="btn d-flex align-items-center text-uppercase">
                        <small>Title</small>
                      </button>
                    </th>
                    <th scope="col">
                      <button className="btn d-flex align-items-center text-uppercase">
                        <small>Description</small>
                      </button>
                    </th>
                    <th scope="col">
                      <button className="btn d-flex align-items-center text-uppercase">
                        <small>Amount</small>
                      </button>
                    </th>
                    <th scope="col">
                      <button className="btn d-flex align-items-center text-uppercase">
                        <small>Date</small>
                      </button>
                    </th>
                    <th scope="col">
                      <button className="btn d-flex align-items-center text-uppercase">
                        <small>Action</small>
                      </button>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {incomeList?.docs?.length <= 0 ? (
                    <tr>
                      <td colSpan="6">
                        <h1>No Income Found</h1>
                      </td>
                    </tr>
                  ) : (
                    incomeList?.docs?.map(income => (
                      <ContentDetails item={income} key={income?._id} />
                    ))
                  )}
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
            <AppPagination setPage={setPage} pageNumber={incomeList?.totalPages} />
          </div>
        </section>
      )}
    </>
  );
};

export default IncomeList;
