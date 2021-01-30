let http = require('http');
let fs = require('fs');
let url = require('url');
var qs = require('querystring');
let path = require('path');
var sanitizeHtml = require('sanitize-html');

const { log } = require('console');

var testFolder = './data';
function templateHTML(title,list,body) {
  return `<!doctype html>
          <html>
          <head>
            <title>${title}</title>
            <meta charset="utf-8">
          </head>
          <body>
            <h1><a href="/">WEB</a></h1>
           ${list}
           <a href="/create">create<a/>
           ${body}
          </body>
          </html>
          `;
}

function templateList(fileList) {
  let list = '';
  fileList.forEach(file => {
          list = list + `<li><a href="/?id=${file}">${file}</a></li>`;
        });
  return list;
}

let app = http.createServer(function(request,response){
    let _url = request.url;
    let queryData = url.parse(_url,true).query;
    let pathName = url.parse(_url,true).pathname;
    let title = queryData.id;

    if(pathName==='/'){
      if(title===undefined){
        title = 'Welcome';
      }

      console.log('asdasd')

      fs.readdir(testFolder, function(error, filelist){
        let list = templateList(filelist);
        response.writeHead(200);
        fs.readFile(`data/${title}`,'utf8', (err, data) => {
          //if (err) throw err;

          var title = queryData.id;
          var sanitizedTitle = sanitizeHtml(title);
          var sanitizedDescription = sanitizeHtml(data, {
            allowedTags:['h1']
          });

          let template = templateHTML(sanitizedTitle,list,`<h2>${sanitizedTitle}</h2>${sanitizedDescription}`);
          response.end(template);
        });
      })
    }else if(pathName==='/create'){
      title = 'Create';
      let title2 = path.parse(title);

      fs.readdir(testFolder, function(error, filelist){
        let list = templateList(filelist);
        response.writeHead(200);
        fs.readFile(`data/${title}`,'utf8', (err, data) => {
          //if (err) throw err;
          let template = templateHTML(title,list,
            `  <form action="http://localhost:3000/process_create" method="post">
            <p><input type="text" name="title" placeholder="title"></p>
            <p>
              <textarea name="description" placeholder="description"></textarea>
            </p>
            <p>
              <input type="submit">
            </p>
          </form>
          `);
          response.end(template);
        });
      })
    }else if(pathName==='/process_create'){
      console.log('test : '+title);
      let body ='';
      request.on('data',(data)=>{
        body = body + data;
      })

      request.on('end',(err)=>{
        // 이 안에서는 어째서 전역변수가 안받아지는가..
        let post = qs.parse(body);
        let title = post.title;
        let desc = post.description;
        fs.writeFile(`data/${title}`,desc,'utf8',(err)=>{
          response.writeHead(302,{Location:`/?id=${title}`});
          response.end();
        });
      })

    }
    else{
      response.writeHead(404);
      response.end('Not Found');
    }
 
  

});
app.listen(3000);