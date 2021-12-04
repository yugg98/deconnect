const short = require('../models/techShorts');
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const cloudinary = require("cloudinary");

exports.getShorts = catchAsyncErrors(async (req, res, next) => {
    try {
        // const size = Number(req.query.size);
        // const skip = Number(req.query.page);
        // console.log(size, skip)
        const data = await short.find({});
        res.status(200).json(data);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
})

exports.setShorts = catchAsyncErrors(async (req, res, next) => {
    const { title, author, body, url, link,img,sn,su ,ps} = req.body;
    if(ps!="yug9826@yug"){
        res.status(400);
    }
    let shorts;
    if (req.body.image == null) {

        shorts = await short.create({
            title, author, body, url, link,img,sourceUrl:su,sourceName:sn
         })
    }
    else {
        const myCloud = await cloudinary.v2.uploader.upload(req.body.image, {
            folder: "Post",
            width: 150,
            crop: "scale",
        });
        shorts = await short.create({
            title, author, body, url, link, image: {
                public_id: myCloud.public_id,
                url: myCloud.secure_url,
            }
        })
    }
    await shorts.save();
    res.status(201).json({
        shorts
    })
})
