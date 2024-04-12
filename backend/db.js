const mongoose = require('mongoose')
const db  = async() => {await mongoose.connect('mongodb+srv://yashdangijaora:Js4e1pkU2E9v3zAN@cluster0.el66e3l.mongodb.net/Paytm');};
const dataBase = db();
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    firstname: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    lastname: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    }
});

const User = mongoose.model('User' , userSchema);
const accountSchema = new mongoose.Schema({
     userId : [{type : mongoose.Schema.Types.ObjectId , ref : "User" , required : true}],
     balance : {type :  Number , required : true}
})

const Accounts = mongoose.model('Accounts', accountSchema)
module.exports = {
    User, Accounts, dataBase
};