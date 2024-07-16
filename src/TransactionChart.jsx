// src/TransactionChart.jsx

import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const TransactionChart = ({ transactions = [], customer = {} }) => {
  const customerTransactions = transactions.filter(
    (transaction) => transaction.customer_id === customer.id,
  );
  const data = customerTransactions.reduce((acc, transaction) => {
    const existing = acc.find((item) => item.date === transaction.date);
    if (existing) {
      existing.amount += transaction.amount;
    } else {
      acc.push({ date: transaction.date, amount: transaction.amount });
    }
    return acc;
  }, []);

  console.log("data: ", transactions);

  return (
    <div className="chart-container">
      <h2>Transaction Amounts for {customer.name}</h2>
      {/* <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="amount"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer> */}
      <LineChart width={500} height={300} data={transactions}>
        <Line type="monotone" dataKey="date" stroke="#2196f3" />
      </LineChart>
    </div>
  );
};

export default TransactionChart;
