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

const Example = ({ data, customerId = null, customerName = "" }) => {
  // Filter transactions based on selected customer ID
  const customerTransactions = data.filter(
    (transaction) => transaction.customer_id == customerId,
  );

  // Calculate total amount per date for the selected customer
  const chartData = customerTransactions.reduce((acc, transaction) => {
    const existing = acc.find((item) => item.date === transaction.date);
    if (existing) {
      existing.amount += transaction.amount;
    } else {
      acc.push({ date: transaction.date, amount: transaction.amount });
    }
    return acc;
  }, []);

  console.log(customerId);

  return (
    <div className="chart-container">
      {customerName ? (
        <h2>Statistics for {customerName}</h2>
      ) : (
        <h2>Please Select The Customer</h2>
      )}
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={chartData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
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
      </ResponsiveContainer>
    </div>
  );
};

export default Example;
