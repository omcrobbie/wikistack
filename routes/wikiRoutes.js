var router = require('express').Router();
var models = require('../models/models.js');
var Page = models.Page;
var User = models.User;

router.route('/')
  .get (function(req,res, next){
    Page.find()
    .then(function(pages){
      res.render('index', {pages: pages || []});
    }, function(err){
        next(err);
    });
  })
  .post (function(req, res, next){
      // req.body.urlTitle = generateUrl(req.body.title);
      var page = new Page(req.body);
      page.save()
      .then(function(){
        res.redirect(page.route);
        },
          function(err){
          if (err)
            next(err);
        });

  });

router.route('/add')
  .get (function(req, res){
    res.render('addpage');
  });

  router.route('/:urlTitle')
    .get(function(req,res,next){
      Page.findOne({ urlTitle: req.params.urlTitle}).exec()
      .then(function(foundPage){
        res.render('wikipage', foundPage);
      }, function(err){
        next(err);
      });
    });

module.exports = router;
