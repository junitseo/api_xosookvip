module.exports = (MyDate) => {

    const MyDateString = getDay2Digits(MyDate) + '-' + getMonth2Digits(MyDate) + '-' +MyDate.getFullYear()

    return MyDateString
}

function getMonth2Digits(date) {
    // 👇️ Add 1, because getMonth is 0-11
    const month = date.getMonth() + 1;
  
    if (month < 10) {
      return '0' + month;
    }
  
    return month;
}

function getDay2Digits(date) {
    const day = date.getDate();
  
    if (day < 10) {
      return '0' + day;
    }
  
    return day;
}