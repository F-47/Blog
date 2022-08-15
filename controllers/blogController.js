let Blog = require('../models/blog')
let moment = require('moment')

let blog_index = (req, res) => {
    Blog.find() //.sort({createdAt:-1})
        .then((result) => {
            let blogs = result
            blogs = blogs.map((blog) => {
                let newBlog = { ...blog._doc, createdFrom: moment.duration(moment().diff(moment(blog.createdAt))).asMinutes() }
                return newBlog;
            })
            res.render('blogs/index', { title: 'All Blogs', blogs })
        })
        .catch((err) => {
            console.log(err)
        })
}

let blog_details = (req, res) => {
    let id = req.params.id;
    Blog.findById(id)
        .then(result => {
            res.render('blogs/details',{ blog: result , title:'Blog Details'})
        })
        .catch(err => {
            res.status(404).render('404',{title:'404'})
        })
}

let blog_create_get = (req, res) => {
    res.render('blogs/create',{title:"Create a new blog"})
}

let blog_create_post = (req, res) => {
    let blog = new Blog(req.body)
    blog.save()
        .then((result) => {
            res.redirect('/blogs')
        })
        .catch(err => {
            console.log(err)
        })
}

let blog_delete = (req, res) => {
    let id = req.params.id;
    Blog.findByIdAndDelete(id)
        .then((result) => {
            res.json({redirect:'/blogs'})
        })
        .catch(err => {
            console.log(err)
        })
}

module.exports = {
    blog_index,
    blog_details,
    blog_create_get,
    blog_create_post,blog_delete
}