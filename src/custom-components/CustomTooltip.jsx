const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const income = payload.find(item => item.dataKey === 'income')?.value;
    const expense = payload.find(item => item.dataKey === 'expense')?.value;

    return (
      <div className="bg-white p-3 rounded shadow border">
        <p className="font-semibold">{label}</p>
        <p className="text-blue-600">Income: {income}</p>
        <p className="text-red-500">Expense: {expense}</p>
      </div>
    );
  }
  return null;
};

export default CustomTooltip;