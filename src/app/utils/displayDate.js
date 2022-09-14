export function displayDate(data) {
  const date = new Date(parseInt(data));
  const dateNow = new Date();
  const diffYear = dateNow.getFullYear() - date.getFullYear();
  if (diffYear === 0) {
    const diffDay = dateNow.getDay() - date.getDay();
    if (diffDay === 0) {
      const diffHour = dateNow.getHours() - date.getHours();
      if (diffHour === 0) {
        const diffMinute = dateNow.getMinutes() - date.getMinutes();
        if (diffMinute >= 0 && diffMinute < 5) return "1 минуту назад";
        if (diffMinute >= 5 && diffMinute < 10) return "5 минут назад";
        if (diffMinute >= 10 && diffMinute < 30) {
          return "10 минут назад";
        }
        return "30 минут назад";
      }
      return `${date.getHours()}:${date.getMinutes()}`;
    }
    return `${date.getDay()} ${date.toLocaleString("default", {
      month: "long"
    })}`;
  }
  return `${date.getFullYear()}.${date.getMonth() + 1}_${date.getDate()}`;
}
