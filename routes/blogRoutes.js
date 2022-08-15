// blog routes
let express = require('express');
let router = express.Router()

let blogController = require('../controllers/blogController')
router.get('/', blogController.blog_index)
router.get('/create', blogController.blog_create_get)
//post handler
router.post('/', blogController.blog_create_post)
//request handler
router.get('/:id', blogController.blog_details)
//delete Request
router.delete('/:id', blogController.blog_delete)
module.exports = router