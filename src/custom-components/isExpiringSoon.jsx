// Helper: check if lease expires within X days
const isExpiringSoon = (leaseEndDate, days = 30) => {
  const today = new Date();
  const end = new Date(leaseEndDate);

  const diffInMs = end - today;
  const diffInDays = diffInMs / (1000 * 60 * 60 * 24);

  return diffInDays >= 0 && diffInDays <= days;
};

export default isExpiringSoon;
