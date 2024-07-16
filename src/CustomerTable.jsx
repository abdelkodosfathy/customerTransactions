const CustomerTable = ({
  customers,
  transactions,
  filter,
  onCustomerSelect,
}) => {
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
        {filteredCustomers.map((customer) =>
          getTransactionsByAmount(+customer.id, +filter.amount).map(
            (transaction) => (
              <tr
                key={transaction.id}
                onClick={() => handleCustomerClick(customer.id)}
              >
                <td>{customer.name}</td>
                <td>{transaction.date}</td>
                <td>{transaction.amount}</td>
              </tr>
            ),
          ),
        )}
      </tbody>
    </table>
  );
};

export default CustomerTable;
