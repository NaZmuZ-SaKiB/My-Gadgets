export const convertTimeTo12HourFormat = (time24: string) => {
  const [h, m] = time24.split(":");
  let hours = parseInt(h, 10);
  const period = hours >= 12 ? "PM" : "AM";

  hours = hours % 12 || 12;

  const hours12 = hours.toString().padStart(2, "0");

  return `${hours12}:${m} - ${period}`;
};
