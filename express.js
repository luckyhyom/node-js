const express = require('express')
const app = express()
const port = 3000

var http = require('http');
var url = require('url');
var qs = require('querystring');
var template = require('./lib/template.js');
var path = require('path');
var sanitizeHtml = require('sanitize-html');
var fs = require('fs');

// 결국 밑의 라우터들도 모두 middleware
// use(function.. -> get('*',function..
app. get('*',function(req,res,next) {
  fs.readdir('./data', function(error, filelist){
    req.list = filelist;

    // next는 작성될 코드.. 즉 여기서 작성된 함수 안에
    // 앞으로 작성될 코드(next)를 집어넣겠다는 뜻이다.
    next();
  });
})


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

// 라우트방법, path별로 get,post별로 어떻게 응답하는가가 중요하다.
// 1. route 2. middleware (타인이만든 도구 third-party middleware)

// 라우팅 , express를 사용해서 경로설정 코드가 매우 간결해짐
// (if문으로 구현했던 url모듈을 사용한 코드 필요없어짐. app.get()으로 끝)

// writeHead,end 대신 send로 통일.
// http 모듈을 이용해 createServer를 사용하지 않아도 된다.
// --> request와 response를 각각 구현 할 수 있다.

// 쿼리스트링 대신,path를 통해 파라미터를 전달받는방식. /page/:pageId.. -> {pageId:VALUE}
// page/Example -> {pageId:Example}
// BEFORE) /page/?id=... page/?id=exam..

//path.parse(queryData.id).base; -> path.parse(req.params.pageId).base;

// redirection 구현코드 => res.redirect('/');
// 이전 코드
// response.writeHead(302, {Location: `/?id=${title}`});
// response.end();



// 2. middleware

// var bodyParser = require('body-parser');
// app.use(bodyParser.urlencoded({ extended: false }));
// app.post('/create_process',(req, res) {var post = request.body; ... };
// 이전 코드 
//      var body = '';
//      request.on('data', function(data){
//          body = body + data;
//      });
//      request.on('end', function(){
//      var post = qs.parse(body);

// 결국 밑의 라우터들도 모두 middleware
// use(function.. -> get('*',function..
app. get('*',function(req,res,next) {
  fs.readdir('./data', function(error, filelist){
    req.list = filelist;

    // next는 작성될 코드.. 즉 여기서 작성된 함수 안에
    // 앞으로 작성될 코드(next)를 집어넣겠다는 뜻이다.
    next();
  });
})