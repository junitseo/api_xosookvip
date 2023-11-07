const PerpetualCalendar = require("../models/perpetualCalendar");

const crawlDataPerpetualCalendar = async (date, res) => {
    const url = `https://www.xoso88.info/lich-van-nien-ngay-${date}.html`;
    let data;
    request(url, function (error, response, html) {
        if (!error && response.statusCode === 200) {
            let $ = cheerio.load(html, { decodeEntities: false });
            data = $(".lich-van-nien");
            //lấy ra tiêu đề
            const title = data.eq(0).find("h1").text();
            //Tháng 11 Năm 2023
            const title_calendar = data.find(".lich-title").eq(0).text();
            //05
            const date_calendar = data.find(".lich-day-now").eq(0).text();
            //Ác khẩu, mãi mãi đừng để nó thốt ra từ miệng chúng ta, cho dù người ta có xấu bao nhiêu, có ác bao nhiêu. Bạn càng nguyền rủa họ, tâm bạn càng bị nhiễm ô, bạn hãy nghĩ, họ ch&
            const day_info_calendar = data.find(".lich-day-info").eq(0).text();
            //'Chủ Nhật'
            const calendar_day_of_week = data.find(".lich-day-of-week").eq(0).text();

            const calendar_day_al = data.find(".lich-day-al");
            const ul = calendar_day_al.find("ul");
            //'Ngày Đinh Mão'
            const number_one = ul.eq(0).find("li").eq(0).text();
            //22
            const number_calendar = ul.eq(0).find("li").eq(1).text();
            //'Tháng Nhâm Tuất'
            const number_two = ul.eq(0).find("li").eq(2).text();

            //'Giờ Canh Tý'
            const month_one = ul.eq(1).find("li").eq(0).text();
            //'Tháng 9'
            const month_calendar = ul.eq(1).find("li").eq(1).text();
            //'Năm Quý Mão'
            const month_two = ul.eq(1).find("li").eq(2).text();

            //'\n*****\nMão tinh tạo tác tiến điền ngưu,Mai táng quan tai bất đắc hưu,Trùng tang nhị nhật, tam nhân tử,Mại tận điền viên, bất năng lưu.Khai môn, phóng thủy chiêu tai họa,Tam tuế hài nhi bạch liễu đầu,Hôn nhân bất khả phùng nhật thử,Tử biệt sinh ly thật khả sầu.\n--------------------------\n'
            const calendar_day_tho = data.find(".lich-day-tho").eq(0).text();

            //THÔNG TIN CHUNG
            const calendar_day_row_title = data.find(".lich-day-row-title").eq(0).text();
            const calendar_day_row_desc = data.find(".lich-day-row-desc").eq(0);
            const calendar_day_row_desc_one = calendar_day_row_desc.find("div").eq(0).text();
            const calendar_day_row_desc_two = calendar_day_row_desc.find("div").eq(1).text();
            const calendar_day_row_title_three = calendar_day_row_desc.find("div").eq(2).text();

            //KẾT QUẢ XỔ SỐ MIỀN BẮC
            const calendar_day_row_title_xo_so_mb = data.find(".lich-day-row-title").eq(1).text();
            const calendar_day_row_desc_xo_so_mb = data.find(".lich-day-row-desc").eq(1).text();

            //KẾT QUẢ XỔ SỐ MIỀN TRUNG
            const calendar_day_row_title_xo_so_mt = data.find(".lich-day-row-title").eq(2).text();
            const calendar_day_row_desc_xo_so_mt_one = data.find(".lich-day-row-desc").eq(2).find(".lich-xs-item").eq(0).text();
            const calendar_day_row_desc_xo_so_mt_two = data.find(".lich-day-row-desc").eq(2).find(".lich-xs-item").eq(1).text();
            const calendar_day_row_desc_xo_so_mt_three = data.find(".lich-day-row-desc").eq(2).find(".lich-xs-item").eq(2).text();

            //KẾT QUẢ XỔ SỐ MIỀN NAM
            const calendar_day_row_title_xo_so_mn = data.find(".lich-day-row-title").eq(3).text();
            const calendar_day_row_desc_xo_so_mn_one = data.find(".lich-day-row-desc").eq(3).find(".lich-xs-item").eq(0).text();
            const calendar_day_row_desc_xo_so_mn_two = data.find(".lich-day-row-desc").eq(3).find(".lich-xs-item").eq(1).text();
            const calendar_day_row_desc_xo_so_mn_three = data.find(".lich-day-row-desc").eq(3).find(".lich-xs-item").eq(2).text();
            //GIỜ HOÀNG ĐẠO
            const calendar_day_row_title_time = data.find(".lich-day-row-title").eq(4).text();
            const calendar_day_row_desc_time = data.find(".lich-day-row-desc").eq(4).text();
            //MỆNH
            const life = data.find(".lich-day-row-title").eq(5).text();
            const life_desc = data.find(".lich-day-row-desc").eq(5).text();
            //TIẾT KHÍ
            const gas_secretion = data.find(".lich-day-row-title").eq(6).text();
            const gas_secretion_desc = data.find(".lich-day-row-desc").eq(6).text();
            //TRỰC
            const direct = data.find(".lich-day-row-title").eq(7).text();
            const direct_desc = data.find(".lich-day-row-desc").eq(7).text();
            //TUỔI XUNG KHẮC
            const conflicting_ages = data.find(".lich-day-row-title").eq(8).text();
            const conflicting_ages_desc = data.find(".lich-day-row-desc").eq(8).text();
            //HƯỚNG XUẤT HÀNH
            const departure_direction = data.find(".lich-day-row-title").eq(9).text();
            const departure_direction_desc_winter = data.find(".lich-day-row-desc").eq(3).find(".lich-row-item").eq(0).text();
            const departure_direction_desc_west = data.find(".lich-day-row-desc").eq(3).find(".lich-row-item").eq(1).text();
            const departure_direction_desc_male = data.find(".lich-day-row-desc").eq(3).find(".lich-row-item").eq(2).text();
            const departure_direction_desc_north = data.find(".lich-day-row-desc").eq(3).find(".lich-row-item").eq(3).text();
            //SAO TỐT
            const good_stars = data.find(".lich-day-row-title").eq(10).text();
            const good_stars_desc_one = data.find(".lich-day-row-desc").eq(10).find(".left-item").eq(0).text();
            const good_stars_desc_two = data.find(".lich-day-row-desc").eq(10).find(".left-item").eq(1).text();
            const good_stars_desc_three = data.find(".lich-day-row-desc").eq(10).find(".left-item").eq(2).text();
            const good_stars_desc_four = data.find(".lich-day-row-desc").eq(10).find(".left-item").eq(3).text();
            //SAO XẤU
            const bad_stars = data.find(".lich-day-row-title").eq(11).text();
            const bad_stars_desc_one = data.find(".lich-day-row-desc").eq(11).find(".left-item").eq(0).text();
            const bad_stars_desc_two = data.find(".lich-day-row-desc").eq(11).find(".left-item").eq(1).text();
            const bad_stars_desc_three = data.find(".lich-day-row-desc").eq(11).find(".left-item").eq(2).text();
            const bad_stars_desc_four = data.find(".lich-day-row-desc").eq(11).find(".left-item").eq(3).text();
            const bad_stars_desc_five = data.find(".lich-day-row-desc").eq(11).find(".left-item").eq(4).text();
            //NHỊ THẬP BÁT TÚ
            const twenty_eight_stars = data.find(".lich-day-row-title").eq(12).text();
            const twenty_eight_stars_desc_one = data.find(".lich-day-row-desc").eq(12).find(".lich-row-item").eq(0).text();
            const twenty_eight_stars_desc_two = data.find(".lich-day-row-desc").eq(12).find(".lich-row-item").eq(1).text();
            const twenty_eight_stars_desc_three = data.find(".lich-day-row-desc").eq(12).find(".lich-row-item").eq(2).text();
            const twenty_eight_stars_desc_four = data.find(".lich-day-row-desc").eq(12).find(".lich-row-item").eq(3).text();
            const twenty_eight_stars_desc_five = data.find(".lich-day-row-desc").eq(12).find(".lich-row-item").eq(4).text();
            const twenty_eight_stars_desc_six = data.find(".lich-day-row-desc").eq(12).find(".lich-row-item").eq(5).text();
            const twenty_eight_stars_desc_seven = data.find(".lich-day-row-desc").eq(12).find(".lich-row-item").eq(6).text();
            const twenty_eight_stars_desc_eight = data.find(".lich-day-row-desc").eq(12).find(".lich-row-item").eq(7).text();
            const twenty_eight_stars_desc_nine = data.find(".lich-day-row-desc").eq(12).find(".lich-row-item").eq(8).text();
            const twenty_eight_stars_desc_ten = data.find(".lich-day-row-desc").eq(12).find(".lich-row-item").eq(9).text();

            var perpetualCalendar = new PerpetualCalendar();
                perpetualCalendar.date = date,
                perpetualCalendar.title = title,
                perpetualCalendar.title_calendar = title_calendar,
                perpetualCalendar.date_calendar = date_calendar,
                perpetualCalendar.day_info_calendar = day_info_calendar,
                perpetualCalendar.calendar_day_of_week = calendar_day_of_week,
                perpetualCalendar.number_one = number_one,
                perpetualCalendar.number_calendar = number_calendar,
                perpetualCalendar.number_two = number_two,
                perpetualCalendar.month_two = month_two,
                perpetualCalendar.month_one = month_one,
                perpetualCalendar.month_calendar = month_calendar,
                perpetualCalendar.calendar_day_tho = calendar_day_tho,
                perpetualCalendar.calendar_day_row_title = calendar_day_row_title,
                perpetualCalendar.calendar_day_row_desc_one = calendar_day_row_desc_one,
                perpetualCalendar.calendar_day_row_desc_two = calendar_day_row_desc_two,
                perpetualCalendar.calendar_day_row_title_three = calendar_day_row_title_three,
                perpetualCalendar.calendar_day_row_title_xo_so_mb = calendar_day_row_title_xo_so_mb,
                perpetualCalendar.calendar_day_row_desc_xo_so_mb = calendar_day_row_desc_xo_so_mb,
                perpetualCalendar.calendar_day_row_title_xo_so_mt = calendar_day_row_title_xo_so_mt,
                perpetualCalendar.calendar_day_row_desc_xo_so_mt_one = calendar_day_row_desc_xo_so_mt_one,
                perpetualCalendar.calendar_day_row_desc_xo_so_mt_two = calendar_day_row_desc_xo_so_mt_two,
                perpetualCalendar.calendar_day_row_desc_xo_so_mt_three = calendar_day_row_desc_xo_so_mt_three,
                perpetualCalendar.calendar_day_row_title_xo_so_mn = calendar_day_row_title_xo_so_mn,
                perpetualCalendar.calendar_day_row_desc_xo_so_mn_one = calendar_day_row_desc_xo_so_mn_one,
                perpetualCalendar.calendar_day_row_desc_xo_so_mn_two = calendar_day_row_desc_xo_so_mn_two,
                perpetualCalendar.calendar_day_row_desc_xo_so_mn_three = calendar_day_row_desc_xo_so_mn_three,
                perpetualCalendar.calendar_day_row_title_time = calendar_day_row_title_time,
                perpetualCalendar.calendar_day_row_desc_time = calendar_day_row_desc_time,
                perpetualCalendar.life = life,
                perpetualCalendar.life_desc = life_desc,
                perpetualCalendar.gas_secretion = gas_secretion,
                perpetualCalendar.gas_secretion_desc = gas_secretion_desc,
                perpetualCalendar.direct = direct,
                perpetualCalendar.direct_desc = direct_desc,
                perpetualCalendar.conflicting_ages = conflicting_ages,
                perpetualCalendar.conflicting_ages_desc = conflicting_ages_desc,
                perpetualCalendar.departure_direction = departure_direction,
                perpetualCalendar.departure_direction_desc_winter = departure_direction_desc_winter,
                perpetualCalendar.departure_direction_desc_west = departure_direction_desc_west,
                perpetualCalendar.departure_direction_desc_male = departure_direction_desc_male,
                perpetualCalendar.departure_direction_desc_north = departure_direction_desc_north,
                perpetualCalendar.good_stars = good_stars,
                perpetualCalendar.good_stars_desc_one = good_stars_desc_one,
                perpetualCalendar.good_stars_desc_two = good_stars_desc_two,
                perpetualCalendar.good_stars_desc_three = good_stars_desc_three,
                perpetualCalendar.good_stars_desc_four = good_stars_desc_four,
                perpetualCalendar.bad_stars = bad_stars,
                perpetualCalendar.bad_stars_desc_one = bad_stars_desc_one,
                perpetualCalendar.bad_stars_desc_two = bad_stars_desc_two,
                perpetualCalendar.bad_stars_desc_three = bad_stars_desc_three,
                perpetualCalendar.bad_stars_desc_four = bad_stars_desc_four,
                perpetualCalendar.bad_stars_desc_five = bad_stars_desc_five,
                perpetualCalendar.twenty_eight_stars = twenty_eight_stars,
                perpetualCalendar.twenty_eight_stars_desc_one = twenty_eight_stars_desc_one,
                perpetualCalendar.twenty_eight_stars_desc_two = twenty_eight_stars_desc_two,
                perpetualCalendar.twenty_eight_stars_desc_three = twenty_eight_stars_desc_three,
                perpetualCalendar.twenty_eight_stars_desc_four = twenty_eight_stars_desc_four,
                perpetualCalendar.twenty_eight_stars_desc_five = twenty_eight_stars_desc_five,
                perpetualCalendar.twenty_eight_stars_desc_six = twenty_eight_stars_desc_six,
                perpetualCalendar.twenty_eight_stars_desc_seven = twenty_eight_stars_desc_seven,
                perpetualCalendar.twenty_eight_stars_desc_eight = twenty_eight_stars_desc_eight,
                perpetualCalendar.twenty_eight_stars_desc_nine = twenty_eight_stars_desc_nine,
                perpetualCalendar.twenty_eight_stars_desc_ten = twenty_eight_stars_desc_ten,

                perpetualCalendar.save((err, newPerpetualCalendar) => {
                    if (err) {
                        dashLogger.error(`Error : ${err},Request : ${req.originalUrl}`);
                        return res.status(400).json({
                            message: err.message
                        })
                    } else {
                        return res.status(200).json(newPerpetualCalendar);
                    }
                });
        }
    })
}

exports.crawlDataPerpetualCalendar = crawlDataPerpetualCalendar;