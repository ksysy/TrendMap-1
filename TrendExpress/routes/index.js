const express = require('express');
const router = express.Router();
const mysql = require("mysql");   // mysql 모듈 require

// 커넥션 연결
let client = mysql.createConnection({
  user: "root",
  password: "Gachon123!@",
  database: "MYTMAP"
})

module.exports = router;

router.get('', function(req, res, next) {
  client.query("SELECT * FROM users;", function(err, result, fields){
    if(err){
      console.log(err);
      console.log("쿼리문에 오류가 있습니다.");
    }
    else{
      res.render('', {
        results: result
      });
    }
  });
});

router.post('/', function(req, res, next) {
  var body = req.body;

  client.query("INSERT INTO users (uid, content, score) VALUES (?, ?, ?)", [
    body.uid, body.content, body.score
  ], function(){
    res.redirect("/");
  });
});