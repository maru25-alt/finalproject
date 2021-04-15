import React, { useState } from "react";
import SearchStudent from "./SearchStudent";
import PaymentForm from "./PaymentForm";
import ViewStudent from "./ViewStudent";
import axios from "../../../../store/axios";
import Loading from "../../../../Loading";
import { errorAlert, successAlert } from "../../../../utils";

function BillPayment() {
  const [year, setyear] = useState("");
  const [term, setterm] = useState("");
  const [classID, setclassID] = useState("");
  const [studentID, setstudentID] = useState("");
  const [studentOptions, setstudentOptions] = useState([]);
  const [amount, setamount] = useState("");
  const [date, setdate] = useState("");
  const [bank, setbank] = useState("");
  const [chequeNo, setchequeNo] = useState("");
  const [paymentType, setpaymentType] = useState("");
  const [applyTo, setapplyTo] = useState({
    all: false,
    tuition: false,
    examination: false,
    facility: false,
    maintenance: false,
  });
  const [remarks, setremarks] = useState("");
  const [loading, setloading] = useState(false);
  const [transactions, settransactions] = useState([]);
  const [loadingStudents, setloadingStudents] = useState(false);
  const [user, setuser] = useState({});
  const [feetype, setfeetype] = useState({});
  const [balance, setbalance] = useState(0);
  const [totalBill, settotalBill] = useState(0);
  const [totalPaid, settotalPaid] = useState(0);
  const [fees, setfees] = useState([]);

  const handleSelectStudent = async (id) => {
    setloading(true);
    let transactionData = await axios.get(`transactions/student/${id}`);
    if (transactionData.data?.error) {
      setloading(false);
      return errorAlert(transactionData.data?.error);
    }
    settransactions(transactionData?.data);

    let studentData = await axios.get(`/students/${id}`);
    if (studentData.data.error) {
      setloading(false);
      return errorAlert(studentData.data.error);
    }
    let student = studentData.data?.user;

    setuser(student);
    let feesData = await axios.get(`/fees`);
    if (feesData.data?.error) {
      setloading(false);
      return errorAlert(feesData.data?.error);
    }
    const bill = (feesData.data?.fees).reduce(
      (t, value) => Number(t) + Number(value.value),
      0
    );

    setfees(feesData.data?.fees);

    const paid = transactionData.data?.reduce((accumulator, element) => {
      return Number(accumulator) + Number(element?.amount);
    }, 0);

    console.log(paid);
    setstudentID(id);
    settotalBill(bill);
    settotalPaid(paid);
    setbalance(bill - paid);
    setloading(false);
  };

  const handleSelectClass = (id) => {
    setloadingStudents(true);
    setstudentOptions([]);
    setstudentID("");
    setclassID(id);
    axios
      .get(`/students/class/${id}`)
      .then((res) => {
        setloadingStudents(false);
        if (res.data.error) {
          errorAlert(res.data.error);
          return 0;
        }
        setstudentOptions(res.data.docs);
      })
      .catch((err) => {
        console.log(err);
        setloadingStudents(false);
      });
  };

  const handlePayement = () => {
    setloading(true);
    axios
      .post("/feespayment/create", {
        date,
        amount,
        paymentMethod: paymentType,
        term,
        description: remarks,
        bank,
        chequeNumber: chequeNo,
        category: "fees",
        userID: studentID,
        year: year,
        fees: totalBill,
      })
      .then((res) => {
        setloading(false);
        if (res.data.error) {
          errorAlert(res.data.error);
        }
        let newTransactions = [res.data.doc, ...transactions];
        settransactions(newTransactions);
        const paid = newTransactions?.reduce((accumulator, element) => {
          return Number(accumulator) + Number(element?.amount);
        }, 0);
        settotalPaid(paid);
        setbalance(totalBill - paid);
        successAlert("Payment successfully made");
        setdate("");
        setamount("");
        setremarks("");
        setchequeNo("");
        setbank("");
        setpaymentType("");
      })
      .catch(() => {
        setloading(false);
        errorAlert("Transaction Failed");
      });
  };

  return (
    <div>
      {loading && <Loading />}
      <div className="row">
        <div className="col-sm-6">
          <SearchStudent
            loading={loadingStudents}
            year={year}
            term={term}
            setterm={setterm}
            setyear={setyear}
            studentID={studentID}
            setstudentID={handleSelectStudent}
            setclassID={handleSelectClass}
            classID={classID}
            studentOptions={studentOptions}
          />

          {studentID && (
            <>
              {" "}
              {balance > 0 ? (
                <PaymentForm
                  balance={balance}
                  amount={amount}
                  chequeNo={chequeNo}
                  setchequeNo={setchequeNo}
                  bank={bank}
                  setbank={setbank}
                  setamount={setamount}
                  date={date}
                  applyTo={applyTo}
                  setapplyTo={setapplyTo}
                  setdate={setdate}
                  paymentType={paymentType}
                  setpaymentType={setpaymentType}
                  remarks={remarks}
                  setremarks={setremarks}
                  handlePayement={handlePayement}
                  loading={loading}
                />
              ) : (
                <div className="content__container text-center">
                  <h5 className="text-info">Fees not set</h5>
                </div>
              )}
            </>
          )}
        </div>
        <div className="col-sm-6">
          {studentID && (
            <ViewStudent
              transactions={transactions}
              user={user}
              balance={balance}
              feetype={feetype}
              fees={fees}
              totalBill={totalBill}
              total={totalPaid}
              id={studentID}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default BillPayment;
