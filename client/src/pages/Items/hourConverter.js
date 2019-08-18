const timeCalculator = (value, time) => {
  let internalTimer;
  internalTimer = `${value} `;
  internalTimer += value > 1 ? `${time}s` : time;
  internalTimer += " ago";
  return internalTimer;
};

const timeCreated = timeCreated => {
  let initial = new Date(timeCreated);
  let final = new Date();
  let dYear = final.getFullYear() - initial.getFullYear();
  if (dYear) return timeCalculator(dYear, "year");
  let dMonth = final.getMonth() - initial.getMonth();
  if (dMonth) return timeCalculator(dMonth, "month");
  let dDay = final.getDate() - initial.getDate();
  if (dDay) return timeCalculator(dDay, "day");
  return "Hot! Item added today!";
};

export default timeCreated;
