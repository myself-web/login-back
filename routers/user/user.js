let { User } = require("../../db/user.js");
// jwt持久化登录
let jwt = require("jsonwebtoken");
// 获取用户信息
exports.getData = (req,res) => {
    let {token} = req.body
    jwt.verify(token,'xixin',function(err,decode){
        console.log('decode',decode)
        if(err){
            res.json({
                code:201,
                message:"登录时间过期，请重新登录"
            })
        }else{
            User.findOne({username:decode.username},(err,ret) => {
                if(err){
                    return console.log('获取失败')
                }
                if(ret){
                    res.json({
                        code:200,
                        data:{
                            username:ret.username,
                            password:ret.password,
                            photourl:ret.photourl,
                            token: jwt.sign(
                                {
                                  username: ret.username
                                },
                                "xixin",
                                {
                                  expiresIn: "10h"
                                }
                              )
                        },
                        
                    })
                }else{
                    res.json({
                        code:202,
                        message:"获取用户信息失败"
                    })
                }
            })
        }
    })
}
// 注册
exports.userData = (req,res) =>{
    let {username,password} = req.body
    User.findOne({username},
        (err, ret) => {
          if (err) {
            console.log("查询失败！");

            return;
          }
          if (ret) {
            return res.json({
              code: 201,
              message: "我是大傻子！"
            });
          }
          let user = new User({
            username: username,
            password: password,
            photourl:"https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1078861629,3747050294&fm=26&gp=0.jpg"
          });
          user.save(function(err, ret) {
            if (err) {
              console.log("注册失败！");
              return;
            }
            res.json({
              code: 200,
              message: "注册成功！"
            });
          });
        }
      );
}
// 登录
exports.getuserData = (req,res) => {
    const {username,password} = req.body
    User.findOne({username},(err,ret) => {
        if (err) {
            return console.log("登录失败！");
        }
        if(ret){
            const {username} = ret
            if(ret.password === password){
                User.update((err,ret) => {
                    console.log('ret',ret)
                    if(ret.n == 0){
                        return res.json({
                            code:200,
                            data:{
                                token:jwt.sign({username:username},'xixin',{expiresIn:"10h"})
                            },
                            message:"登录成功"
                        })
                    }
                })
            }else{
                res.json({
                    code:201,
                    message:"密码不正确"
                })
            }
        }
        
    })
}