// eslint-disable-next-line import/no-anonymous-default-export
module.exports = (date) => {
  const dayOfWeek = new Date(date).getDay();
  const listProvince = [];
  switch (dayOfWeek) {
    case 0: //sunday
      listProvince.push(9); //Kom Tum
      listProvince.push(8); //Khánh Hoà
      listProvince.push(7); //Huế
      break;
    case 1: //monday
      listProvince.push(7); //Huế
      listProvince.push(11); //Phú Yên
      break;
    case 2: //Tuesday
      listProvince.push(4); //Đắk Lắk
      listProvince.push(13); //Quảng Nam
      break;
    case 3: //Wednesday
      listProvince.push(8); //Khánh Hoà
      listProvince.push(3); //Đà Nẵng
      break;
    case 4: //Thursday
      listProvince.push(2); //Bình Định
      listProvince.push(12); //Quảng Bình
      listProvince.push(15); //Quảng Trị
      break;
    case 5: //Friday
      listProvince.push(6); //Gia Lai
      listProvince.push(10); //Ninh Thuận
      break;
    case 6: //Saturday
      listProvince.push(14); //Quảng Ngãi
      listProvince.push(3); //Đà Nẵng
      listProvince.push(5); //Đắk Nông
      break;
    default:
      break;
  }
  return listProvince;
};
