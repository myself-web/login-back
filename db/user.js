let mongoose = require("mongoose");
let { db_url } = require("./config");

mongoose.connect(db_url, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});
let userSchema = new mongoose.Schema({
    "username": String,
    "password": String,
    "photourl": String,
})

let User = mongoose.model("user", userSchema);
// 将表导出
module.exports = {
    User
}