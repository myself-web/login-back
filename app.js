let express = require("express");
let path = require("path");
let cors = require('cors')
let router = require("./routers/index");
let app = express();
let bodyParser = require("body-parser");



app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
// 设置静态资源
app.use(express.static(path.resolve("./public")));
app.use(router);



app.listen(1999, () => {
  console.log("http://localhost:1999");
});
