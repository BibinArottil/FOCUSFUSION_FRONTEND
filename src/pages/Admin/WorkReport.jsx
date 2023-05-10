import { useState, useRef } from "react";
import Table from "../../components/Ui/Table";
import axios from "../../instance/axios";
import ReactToPrint from "react-to-print";

export default function SalesReport() {
  const componentRef = useRef();
  const [data, setData] = useState([]);
  const [total,setTotal] = useState("")
  const [date, setDate] = useState({
    from: "",
    to: "",
  });

  const fetchData = async () => {
    await axios.post("/admin/sales", date).then((res) => {
      setData(res.data.data);
      console.log(res.data.data);
    });
  };

  const columns = [
    {
      name: "No:",
      selector: (row) => row.no,
      sortable: true,
    },
    {
      name: "Work Date",
      selector: (row) => row.date.split("T", [1]),
      sortable: true,
    },
    {
      name: "Company",
      selector: (row) => row.company,
      sortable: true,
    },
    {
      name: "Amount",
      selector: (row) => row.amount,
    },
    {
      name: "Payment",
      selector: (row) => row.payment,
    },
    {
      name: "Profit",
      selector: (row) => row.income,
    },
  ];

  const tableData = data.map((value, i) => {
    return {
      no: i + 1,
      company: value.company.companyName,
      date: value.date,
      amount: value.totalAmount,
      payment: value.photographerAmount,
      income: value.totalAmount - value.photographerAmount,
    };
  });

  return (
    <div className="w-full h-full">
      <div className="flex px-20 py-5">
        <h1 className="text-3xl font-semibold">Work Report</h1>
      </div>
      <div className="flex justify-evenly">
        <div>
          <label className="mx-2">Start Date :</label>
          <input
            className="rounded outline-none border p-1"
            type="date"
            onChange={(e) => setDate({ ...date, from: e.target.value })}
          />
        </div>
        <div>
          <label className="mx-2">End Date :</label>
          <input
            className="rounded outline-none border p-1"
            type="date"
            onChange={(e) => setDate({ ...date, to: e.target.value })}
          />
        </div>
        <button
          onClick={fetchData}
          className="bg-cyan-500 text-white rounded px-5"
        >
          Search
        </button>
        <ReactToPrint
          trigger={() => (
            <button className="bg-red-500 text-white rounded px-3">
              Download PDF
            </button>
          )}
          content={() => componentRef.current}
        />
      </div>

      <div ref={componentRef} className="mx-5 mt-5">
        <Table columns={columns} data={tableData} />
      </div>
    </div>
  );
}
