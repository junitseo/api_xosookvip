const dreamModel = require('../models/dream')
const request = require('request')
const cheerio = require('cheerio')

class Dream {
    async getDream(req, res){
        try {
            const result = await dreamModel.find()
            if(result){
                return res.status(200).json(result)
            }
            return res.status(200).json({message: 'Not have data'})
        } catch (error) {
            console.log(error)
            return res.status(500).json({message: 'Server error'})
        }
    }


    async crawlDream(req, res){
        let plus = 2;
        const url = 'https://xoso88.tv/so-mo'
        request(url, async (error, response, html) => {
            if (!error) {
                const $ = cheerio.load(html, { decodeEntities: false });
                const table = $('.trsearch')
                for (let i = 0; i <= 1000; i++){
                    const thisRow = table.find('tr').eq(i + 2)
                    const name = thisRow.find('td').eq(1).find('a').text()
                    const number = thisRow.find('td').eq(2).text().split(' - ')
                    let firstNumber = ''
                    let secondNumber = ''
                    let thirdNumber = ''
                    firstNumber = number[0]
                    if(number[1]){
                        secondNumber = number[1]
                    }
                    if(number[2]){
                        thirdNumber = number[2]
                    }
                    try {
                        const result = await dreamModel.create({
                            name: name,
                            firstNumber: firstNumber,
                            secondNumber: secondNumber,
                            thirdNumber: thirdNumber,
                        })
                    } catch (error) {
                        console.log(error)
                    }
                }
            }
        })
    }
}

module.exports = new Dream()