import React, { useState, useEffect } from "react";
import axios from "axios";
import "./index.css";

import CustomerTable from "./CustomerTable";
import Example from "./Example";

//just for github pages
import data from "./db.json"; // importing local json data ..

const App = () => {
  //initial states comes from the api..
  const [customers, setCustomers] = useState([]);
  const [transactions, setTransactions] = useState([]);

  const [selectedCustomerId, setSelectedCustomerId] = useState(null);
  const [filter, setFilter] = useState({ name: "", amount: "" });
  // const [filter, setFilter] = useState({
  //   name: "",
  //   minAmount: "",
  //   maxAmount: "",
  // });

  //fetch the values from api..
  useEffect(() => {
    const fetchData = async () => {
      // uncomment this for the server
      // const customerData = await axios.get("http://localhost:5000/customers");
      // const transactionData = await axios.get(
      //   "http://localhost:5000/transactions",
      // );
      //setCustomers(customerData.data);
      //setTransactions(transactionData.data);

      //for github pags .. commint it
      setCustomers(data.customers);
      setTransactions(data.transactions);
    };
    fetchData();
  }, []);

  const handleCustomerSelect = (customerId) => {
    setSelectedCustomerId(customerId);
  };

  const handleFilterChange = (event) => {
    console.log(event.target.name, ": ", event.target.value);
    setFilter({ ...filter, [event.target.name]: event.target.value });
  };

  const selectedCustomer = customers.find(
    (customer) => customer.id === selectedCustomerId,
  );

  return (
    <div className="board">
      <h1>Customer Transactions</h1>
      <div className="filter-container">
        <label>
          Filter by name:
          <input
            name="name"
            value={filter.name}
            onChange={handleFilterChange}
          />
        </label>
        <label>
          Filter by amount:
          <input
            name="amount"
            value={filter.amount}
            onChange={handleFilterChange}
          />
        </label>
      </div>
      <Example
        data={transactions}
        customerId={selectedCustomer?.id}
        customerName={selectedCustomer?.name}
      />
      {/* {selectedCustomer && (
        <Example
          data={transactions.filter(
            (t) => t.customer_id === selectedCustomer.id,
          )}
        />
      )} */}
      <CustomerTable
        customers={customers}
        transactions={transactions}
        filter={filter}
        onCustomerSelect={handleCustomerSelect}
      />
    </div>
  );
};

export default App;
