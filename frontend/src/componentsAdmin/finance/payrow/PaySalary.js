import React, { useState } from "react";
import StaffSearch from "./StaffSearch";
import PaymentForm from "./PaymentForm";
import ViewStaff from "./ViewStaff";
import axios from "../../../store/axios";
import { errorAlert, successAlert } from "../../../utils";

const today = new Date();
const currentMonth = today.getMonth();

function BillPayment() {
  const [userID, setuserID] = useState("");
  const [month, setmonth] = useState(currentMonth);
  const [amount, setamount] = useState("");
  const [date, setdate] = useState("");
  const [bank, setbank] = useState("");
  const [remarks, setremarks] = useState("");
  const [loading, setloading] = useState(false);
  const [transactions, settransactions] = useState([]);
  const [loadingStaff, setloadingStaff] = useState(false);
  const [user, setuser] = useState({});
  const [payrowType, setpayrowType] = useState({});
  const [balance, setbalance] = useState(100);
  const [totalBill, settotalBill] = useState(0);
  const [totalPaid, settotalPaid] = useState(0);

  const handleSelectStaff = async (id) => {
    setloadingStaff(true);
    setuserID(id);
    let transactionData = await axios.get(`/salary/user/${id}`);
    let alltransactions = transactionData.data;
    settransactions(alltransactions);

    let staffData = await axios.get(`/user/${id}`);
    let staff = staffData.data?.user;
    console.log(staff);
    setuser(staff);

    let payData = await axios.get(`/payrow/${staff?.position}`);
    let pay = payData?.data.docs;
    console.log(pay);
    setpayrowType(pay);

    const bill =
      Number(pay?.allowance) + Number(pay?.salary) + Number(pay?.bonus);

    let monthTrans = alltransactions.filter(
      (e) => Number(e?.month) === currentMonth
    );

    const paid = monthTrans?.reduce((accumulator, element) => {
      return Number(accumulator) + Number(element?.amount);
    }, 0);
    settotalBill(bill);
    settotalPaid(paid);
    setbalance(bill - paid);
    setloadingStaff(false);
  };

  const handlePayement = () => {
    setloading(true);
    axios
      .post("/salary/create", {
        date,
        amount,
        userID,
        month,
        salary: totalBill,
        year: new Date().getFullYear(),
        bank,
        paymentMethod: "",
      })
      .then((res) => {
        setloading(false);
        if (res.data.error) {
          errorAlert(res.data.error);
        }
        let newTransactions = [res.data.doc, ...transactions];

        let thisMonth = newTransactions.filter(
          (e) => Number(e?.month) === currentMonth
        );
        const paid = thisMonth?.reduce((accumulator, element) => {
          return Number(accumulator) + Number(element?.amount);
        }, 0);
        settransactions(newTransactions);
        settotalPaid(paid);
        setbalance(totalBill - paid);
        successAlert("Payment successfully done");
        setdate("");
        setamount("");
        setremarks("");
        setbank("");
      })
      .catch((err) => {
        console.log(err);
        setloading(false);
        errorAlert("Transaction Failed");
      });
  };

  return (
    <div>
      <div className="row">
        <div className="col-sm-6">
          <StaffSearch
            month={month}
            setmonth={setmonth}
            userID={userID}
            setuserID={handleSelectStaff}
            loading={loadingStaff}
          />
          {userID && !loadingStaff && (
            <>
              {" "}
              {balance > 0 ? (
                <PaymentForm
                  balance={balance}
                  amount={amount}
                  bank={bank}
                  setbank={setbank}
                  setamount={setamount}
                  month={month}
                  setmonth={setmonth}
                  date={date}
                  setdate={setdate}
                  remarks={remarks}
                  setremarks={setremarks}
                  handlePayement={handlePayement}
                  loading={loading}
                />
              ) : (
                <div className="content__container text-center">
                  {!payrowType && <h5 className="text-info">Salary Not set</h5>}
                </div>
              )}
            </>
          )}
        </div>
        <div className="col-sm-6">
          {userID && !loadingStaff && (
            <ViewStaff
              transactions={transactions}
              user={user}
              balance={balance}
              feetype={payrowType}
              totalBill={totalBill}
              total={totalPaid}
              id={userID}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default BillPayment;
