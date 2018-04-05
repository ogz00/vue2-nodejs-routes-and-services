/**
 * Created by oguzhankaracullu on 02/04/2018.
 */

var express = require('express');
var router = express.Router();
var Post = require("../models/post");

/* GET users listing. */
router.get('/', (req, res) => {
    Post.find({}, 'title description', function (error, posts) {
        if (error) {
            console.error(error);
        }
        res.send({
            posts: posts
        })
    }).sort({_id: -1})
})

router.post('/', (req, res, next) => {
    var title = req.body.title;
    var description = req.body.description;
    var new_post = new Post({
        title: title,
        description: description
    })

    new_post.save(function (error) {
        if (error) {
            console.log(error)
        }
        res.send({
            success: true,
            message: 'Post saved successfully!'
        })
    })
})

router.get('/:id', (req, res) => {
    Post.findById(req.params.id, 'title description', function (error, post) {
        if (error) { console.error(error); }
        res.send(post)
    })
})

// Update a post
router.put('/:id', (req, res) => {
    Post.findById(req.params.id, 'title description', function (error, post) {
        if (error) { console.error(error); }

        post.title = req.body.title
        post.description = req.body.description
        post.save(function (error) {
            if (error) {
                console.log(error)
            }
            res.send({
                success: true
            })
        })
    })
})

// Delete a post
router.delete('/:id', (req, res) => {
    var db = req.db;
    Post.remove({
        _id: req.params.id
    }, function(err, post){
        if (err)
            res.send(err)
        res.send({
            success: true
        })
    })
})

module.exports = router;

