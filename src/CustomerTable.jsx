// const CustomerTable = ({
//   customers,
//   transactions,
//   filter,
//   onCustomerSelect,
// }) => {
//   function getTransactionsByAmount(customerId, amount) {
//     return transactions.filter(
//       (transaction) =>
//         transaction.customer_id === customerId &&
//         (transaction.amount === +amount || amount === 0),
//     );
//   }

//   const filteredCustomers = customers.filter((customer) => {
//     const nameMatches = customer.name
//       .toLowerCase()
//       .includes(filter.name.toLowerCase());
//     const amountMatches =
//       !filter.amount ||
//       filter.amount === "" ||
//       getTransactionsByAmount(+customer.id, +filter.amount).length > 0;
//     return nameMatches && amountMatches;
//   });

//   const handleCustomerClick = (customerId) => {
//     onCustomerSelect(customerId);
//   };

//   return (
//     <table>
//       <thead>
//         <tr>
//           <th>Name</th>
//           <th>Transaction Date</th>
//           <th>Transaction Amount</th>
//         </tr>
//       </thead>
//       <tbody>
//         {filteredCustomers.map((customer) =>
//           getTransactionsByAmount(+customer.id, +filter.amount).map(
//             (transaction) => (
//               <tr
//                 key={transaction.id}
//                 onClick={() => handleCustomerClick(customer.id)}
//               >
//                 <td>{customer.name}</td>
//                 <td>{transaction.date}</td>
//                 <td>{transaction.amount}</td>
//               </tr>
//             ),
//           ),
//         )}
//       </tbody>
//     </table>
//   );
// };

// export default CustomerTable;
import React, { useState } from "react";

const CustomerTable = ({
  customers,
  transactions,
  filter,
  onCustomerSelect,
}) => {
  const [hoveredCustomerId, setHoveredCustomerId] = useState(null);

  function getTransactionsByAmount(customerId, amount) {
    return transactions.filter(
      (transaction) =>
        transaction.customer_id === customerId &&
        (transaction.amount === +amount || amount === 0),
    );
  }

  const filteredCustomers = customers.filter((customer) => {
    const nameMatches = customer.name
      .toLowerCase()
      .includes(filter.name.toLowerCase());
    const amountMatches =
      !filter.amount ||
      filter.amount === "" ||
      getTransactionsByAmount(+customer.id, +filter.amount).length > 0;
    return nameMatches && amountMatches;
  });

  const handleCustomerClick = (customerId) => {
    onCustomerSelect(customerId);
  };

  const handleMouseEnter = (customerId) => {
    setHoveredCustomerId(customerId);
  };

  const handleMouseLeave = () => {
    setHoveredCustomerId(null);
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Transaction Date</th>
          <th>Transaction Amount</th>
        </tr>
      </thead>
      <tbody>
        {filteredCustomers.map((customer) => {
          const customerTransactions = getTransactionsByAmount(
            +customer.id,
            +filter.amount,
          );
          return (
            <React.Fragment key={customer.id}>
              {customerTransactions.map((transaction, index) => (
                <tr
                  key={transaction.id}
                  onClick={() => handleCustomerClick(customer.id)}
                  onMouseEnter={() => handleMouseEnter(customer.id)}
                  onMouseLeave={handleMouseLeave}
                  className={hoveredCustomerId === customer.id ? "hovered" : ""}
                >
                  {index === 0 && (
                    <td rowSpan={customerTransactions.length}>
                      {customer.name}
                    </td>
                  )}
                  <td>{transaction.date}</td>
                  <td>{transaction.amount}</td>
                </tr>
              ))}
            </React.Fragment>
          );
        })}
      </tbody>
    </table>
  );
};

export default CustomerTable;
