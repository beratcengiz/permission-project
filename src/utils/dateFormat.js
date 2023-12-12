const date = (value) => {
    if (!value) return "";
    let current_datetime = new Date(value);
    return (
      current_datetime.getDate() +
      "/" +
      (current_datetime.getMonth() + 1) +
      "/" +
      current_datetime.getFullYear() +
      " - " +
      current_datetime.getHours() +
      ":" +
      (current_datetime.getMinutes() < 10 ? "0" : "") +
      current_datetime.getMinutes()
    );
};
export default date;