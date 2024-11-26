const express = require('express');
const UserRouter = require('./Routes/user');
const UserBlog = require('./Routes/blog');
const mongoose = require('mongoose');
const path = require('path');
const blog = require('./model/blog')
const app = express();
const PORT = 5000;

mongoose.connect('mongodb://localhost:27017/blogify').then(() => console.log("Connected to MongoDB"));
app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.resolve("./model/public/")))

app.get('/', async(req, res) => {
  const allblog = await blog.find({})
  return res.render('home',{
    blog: allblog
  });
});

app.use('/user', UserRouter);
app.use('/blog',UserBlog)

app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
