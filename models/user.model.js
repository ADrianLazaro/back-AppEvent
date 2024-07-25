const { model,Schema} = require('mongoose');

const userSchema =  new Schema({
    name: String,
    last_name : String,
    email: String,
    password: String,
    contact_info: {
        phone: Number,
        address: String,
    }
});

module.exports=model('User',userSchema);