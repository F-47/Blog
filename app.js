let express = require('express');
let mongoose = require('mongoose')

let blogRoutes = require('./routes/blogRoutes')

let app = express();

//create mongodb
let dbURI = 'mongodb+srv://fares:Abomadawy12@nodetuts.jnwjcua.mongodb.net/node-tuts?retryWrites=true&w=majority'
mongoose.connect(dbURI)
    .then((result) => app.listen(3000))
    .catch((err)=>console.log(err))

//register view engine
app.set('view engine', 'ejs')// app.set('views','views2') // to change directory 

//middleware and static files
app.use(express.static('public')) // we can access any file in the public folder
app.use(express.urlencoded({extended:true})) // so we can access the data coming from the input value
// app.use(morgan('dev'))

app.get('/', (req, res) => {
    // res.send('<p> Home Page</p>')
    // res.render('./views/index.html',{root:__dirname})
    // const blogs = [
        //     {title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur'},
        //     {title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur'},
        //     {title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur'},
        // ];
        // res.render('index',{title:"Home",blogs})
        
        res.redirect('/blogs') //redirecting the '/' directory to '/blogs' directory
    })
    
app.get('/about', (req, res) => {
    // res.send('<p> About Page</p>')
    // res.sendFile('./views/about.html',{root:__dirname})
    res.render('about',{title:"About"})
})

//blog Routes
app.use('/blogs',blogRoutes)

//404 page
app.use((req,res) => {
    // res.status(404).sendFile('./views/404.html',{root:__dirname})
    res.status(404).render('404',{title:"404"})
})