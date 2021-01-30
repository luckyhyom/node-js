// 객체에 함수를 넣는다. => 클래스의 함수
// 파일을 불러온다. require.. = import
// 사실상 class를 import할때 class도 class파일이니까

let template = {
    HTML:function(title, list, body, control){
        return `
        <!doctype html>
        <html>
        <head>
          <title>WEB1 - ${title}</title>
          <meta charset="utf-8">
        </head>
        <body>
          <h1><a href="/">WEB</a></h1>
          ${list}
          ${control}
          ${body}
        </body>
        </html>
        `;
      },
      list:function (filelist){
        var list = '<ul>';
        var i = 0;
        while(i < filelist.length){
          list = list + `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
          i = i + 1;
        }
        list = list+'</ul>';
        return list;
      }
}

module.exports = template;