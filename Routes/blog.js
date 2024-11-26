const { Router } = require('express');
const path = require('path')
const blog = require('../model/blog')
const multer  = require('multer')
const router = Router()

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve(`./model/public`))
    },
    filename: function (req, file, cb) {
      const fileName = `${Date.now()}-${file.originalname}`
      cb(null,fileName )
    }
  })
  const upload = multer({ storage: storage })

router.get('/',(req,res)=>{
    return res.render("Addblog",)
})

router.post('/',upload.single('coverImage'),async(req,res)=>{
  const {title,body} = req.body;
 await blog.create({
    body,
    title,
    createBy: req._id,
    CoverImageUrl: `./model/public${req.file.filename}`
  })
})
module.exports = router