let http = require('http');
let fs = require('fs');
let url = require('url');

var testFolder = './data';

let app = http.createServer(function(request,response){
    let _url = request.url;
    let queryData = url.parse(_url,true).query;
    let pathName = url.parse(_url,true).pathname;
    let title = queryData.id;

    if(pathName==='/'){
      if(title===undefined){
        title = 'Welcome';
        console.log('data====undi?')
      }

      fs.readdir(testFolder, function(error, filelist){
        let list = '';
        filelist.forEach(file => {
          list = list + `<li><a href="/?id=${file}">${file}</a></li>`;
        });
        response.writeHead(200);
        fs.readFile(`data/${title}`,'utf8', (err, data) => {
          //if (err) throw err;
          let template = `<!doctype html>
          <html>
          <head>
            <title>${title}</title>
            <meta charset="utf-8">
          </head>
          <body>
            <h1><a href="/">WEB</a></h1>
            <ol>
              ${list}
            </ol>
            <h2>${title}</h2>
            <p>
            ${data}
            </p>
          </body>
          </html>
          `;
          response.end(template);
          //response.end(fs.readFileSync(__dirname + _url));
        });

      })
    }else{
      response.writeHead(404);
      response.end('Not Found');
    }
 
  

});
app.listen(3000);