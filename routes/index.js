var express = require('express');
var router = express.Router();
const model=require('../model');
const bcrypt=require('bcryptjs');

/* GET home page. */
router.get('/', async function(req, res, next) {
  const user=await model.User.findAll();
  res.render('index', { title: 'Opsilo' , users:user});
});

router.get('/new',function(req,res,next){
  res.render('new');
});

router.get('/:id/edit', async function(req,res,next){
  const user=await model.User.findOne({
    where:{id:req.params.id}
  });
  res.render('edit', {id:user.id, username:user.username, email:user.email});
})

router.post('/', async function(req,res,next){
  const plain=req.body.password;
  const salt=bcrypt.genSaltSync(10);
  const hashPassword=bcrypt.hashSync(plain, salt);
  const user=await model.User.create({
    username:req.body.username,
    email:req.body.email,
    password:hashPassword
  });
  console.log(user);
  res.redirect('/');
});

router.put('/:id', async function(req,res,next){
  const plain=req.body.password;
  const salt=bcrypt.genSaltSync(10);
  const hashPassword=bcrypt.hashSync(plain, salt);
  await model.User.update({
    username:req.body.username,
    email:req.body.email,
    password:hashPassword
  },{where:{id:req.params.id}});
  res.redirect('/');
})

router.delete('/:id', async function(req,res,next){
  await model.User.destroy({
    where:{id:req.params.id}
  });
  res.redirect('/');
})

module.exports = router;
