require('dotenv').config()
const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI

mongoose
    .connect(url)

    .then(() => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connecting to MongoDB:', error.message)
    })

const personSchema = new mongoose.Schema({
    name: { type: String, required: true, minLength: 3 },
    number: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                // Regular expression that matches the phone number format
                return /^\d{2,3}-\d{8,}$/.test(v)
            },
            message: (props) => `${props.value} is not a valid phone number!`,
        },
    },
    id: String,
})

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    },
})

module.exports = mongoose.model('Person', personSchema)
