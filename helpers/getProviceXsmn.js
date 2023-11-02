// eslint-disable-next-line import/no-anonymous-default-export
module.exports = (date) => {
  const dayOfWeek = new Date(date).getDay();
  const listProvince = [];
  switch (dayOfWeek) {
    case 0: //sunday
      listProvince.push(32); //Tiền Giang
      listProvince.push(28); //Kiên Giang
      listProvince.push(37); //Đà Lạt
      break;
    case 1: //monday
      listProvince.push(26); //Đồng Tháp
      listProvince.push(33); //HCM
      listProvince.push(22); //Cà Mau
      break;
    case 2: //Tuesday
      listProvince.push(36); //Vũng Tàu
      listProvince.push(18); //Bến Tre
      listProvince.push(17); //Bạc Liêu
      break;
    case 3: //Wednesday
      listProvince.push(23); //Cần thơ
      listProvince.push(30); //Sóc Trăng
      listProvince.push(25); //Đồng Nai
      break;
    case 4: //Thursday
      listProvince.push(16); //An Giang
      listProvince.push(21); //Bình Thuận
      listProvince.push(31); //Tây Ninh
      break;
    case 5: //Friday
      listProvince.push(19); //Bình Dương
      listProvince.push(35); //Vĩnh Long
      listProvince.push(34); //Trà Vinh
      break;
    case 6: //Saturday
      listProvince.push(29); //Long An
      listProvince.push(27); //Hậu Giang
      listProvince.push(33); //HCM
      listProvince.push(20); //Bình Phước
      break;
    default:
      break;
  }
  return listProvince;
};
