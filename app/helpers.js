// Formatters

export function formatHours(amountOfHours) {
  const hour = (amountOfHours < 24
    ? amountOfHours
    : amountOfHours % 24
  ).toString();

  return `${hour.length < 2 ? `0${hour}` : hour}:00`;
}
