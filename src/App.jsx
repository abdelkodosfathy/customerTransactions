import React, { useState, useEffect } from "react";
import axios from "axios";
import "./index.css";
import CustomerTable from "./CustomerTable";
import Example from "./Example";

const App = () => {
  const [customers, setCustomers] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);
  const [filter, setFilter] = useState({ name: "", amount: "" });

  useEffect(() => {
    const fetchData = async () => {
      const customerData = await axios.get("/db.json");
      setCustomers(customerData.data.customers);
      setTransactions(customerData.data.transactions);
    };
    fetchData();
  }, []);

  const handleCustomerSelect = (customerId) => {
    setSelectedCustomerId(customerId);
  };

  const handleFilterChange = (event) => {
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
      <Example data={transactions} customerId={selectedCustomer?.id} />
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
