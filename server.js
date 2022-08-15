let http = require('http')
let fs = require("fs")
let _ = require("lodash")

let server = http.createServer((req,res) => {
    // console.log("request was made")
    // console.log(req)
    // console.log(req.url,req.method)
    // console.log(res)

    //testing lodash
    // let num = _.random(0, 20)
    // console.log(num)

    // let greet = _.once(() => {
    //     console.log("hello ")
    // })

    // greet(); //will only printed once
    // greet();

    //set header content type
    res.setHeader('content_type', 'text/plain')

    // res.write('<p>Hello man</p>')
    // res.write('<p>Hello again man</p>')

    
    //send an html file instead
    let path = "./views/"
    switch (req.url) {
        case '/':
            path += "index.html";
            res.statusCode = 200
            break;
        case '/about':
            path += "about.html";
            res.statusCode = 200
            break;
        case '/about-us': //redirection if they type about-us instead of about
            res.statusCode = 301;
            res.setHeader("location", "/about")
            res.end()
            break;
        default:
            path += "404.html"
            res.statusCode = 404
            break;
    }

    fs.readFile(path, (err, data) => {
        if (err) {
            console.log(err)
            res.end()
        } else {
            // res.write(data)
            res.end(data) //or do just this
        }
    })
})

server.listen(3000,'localhost',() => {
    console.log("listening for requests on port 3000")
})