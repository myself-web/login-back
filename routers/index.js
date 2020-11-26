let express = require("express");
let router = express.Router();
let user = require('./user/user')
router.get("/", (req, res) => {
  res.json({
    code: "200",
    text: "欢迎进入9700"
  });
});
// 注册
router.post('/register',user.userData)
// 登录
router.post('/login',user.getuserData)
// 获取用户信息
router.post('/getuserData',user.getData)
module.exports = router;
