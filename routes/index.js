var express = require('express');
var router = express.Router();
const model=require('../model');

/* GET home page. */
router.get('/', async function(req, res, next) {
  const user=await model.User.findAll();
  res.render('index', { title: 'Opsilo' , users:user});
});

router.get('/new',function(req,res,next){
  res.render('new');
});

router.post('/create', async function(req,res,next){
  const user=await model.User.create({
    username:req.body.username,
    email:req.body.email,
    password:req.body.password
  });
  console.log(user);
  res.redirect('/');
});

module.exports = router;
