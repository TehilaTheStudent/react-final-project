export const resetSessionStorage=()=>{
    sessionStorage.setItem('scrollPositionProducts', 0);

    sessionStorage.setItem('scrollPositionOrders', 0);

}

export const afterToday = (date) => {
  const currentDate = new Date(); // Get the current date

  // Example date string "13-10-2022"
  const dateString = date

  // Convert the date string to a Date object
  const dateParts = dateString.split("-"); // Split the string into parts
  const year = parseInt(dateParts[2], 10);
  const month = parseInt(dateParts[1], 10) - 1; // Months are zero-based (0 - 11)
  const day = parseInt(dateParts[0], 10);

  const targetDate = new Date(year, month, day);

  // Compare the target date with the current date
  if (targetDate > currentDate) {
      return true
  } else {
      return false
  }

}
export function compareDates(date1, date2) {
    // Split the date strings into parts
    const [day1, month1, year1] = date1.split('-').map(Number);
    const [day2, month2, year2] = date2.split('-').map(Number);
  
    // Compare the years
    if (year1 < year2) {
      return -1;
    } else if (year1 > year2) {
      return 1;
    }
  
    // Compare the months
    if (month1 < month2) {
      return -1;
    } else if (month1 > month2) {
      return 1;
    }
  
    // Compare the days
    if (day1 < day2) {
      return -1;
    } else if (day1 > day2) {
      return 1;
    }
  
    // Dates are equal
    return 0;
  }
  
  export const countQtyInCart=(cart)=>{
    return cart.reduce((sum,item)=>sum+item.qty,0)
  }

  