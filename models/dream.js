const mongoose = require('mongoose')

const Dream = mongoose.Schema({
    name: {type: String},
    firstNumber: {type: String},
    secondNumber: {type: String},
    thirdNumber: {type: String},
}, {
    timestamps: true
})

module.exports = mongoose.model('dreams', Dream)