const { default: mongoose } = require("mongoose");
const bcrypt = require("bcrypt");


let userSchema = new mongoose.Schema({
    username: String,
    password: String,
    salt: String,
    email: String,
    phone: String,
    role: String, //admin, editor, student...
    status:Boolean,
    createdBy: String,
    createdDate: Date,
    updateBy: String,
    updatedDate: Date

});
//trước khi save thì chạy callback
userSchema.pre('seve', async function (next) {
    //mã hóa mật khẩu
    try {
        let salt = Math.random();
        let encodedPassword = await bcrypt.hash(this.password, salt);
        this.password = encodedPassword;
        this.salt = salt;
        next();
    } catch (error) {
        console.log(error);
        
    }
    
});
const User = mongoose.model('User', userSchema);
module.exports = User;