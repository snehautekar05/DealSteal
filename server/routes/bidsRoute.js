const router = require('express').Router();
const Bid = require('../models/bidModel');
const authMiddleware = require("../middlewares/authMiddleware");


//place a new bid
router.post('/place-new-bid', authMiddleware,async (req, res) => {
    try {
        const newBid = new Bid(req.body);
        await newBid.save();
        res.send({
            success: true,
            message: "Bid placed successfully"
        });
    } catch (error) {
        res.send({
            success: false,
            message: error.message
        })
    }
})

//get all bids
router.get('/get-all-bids', authMiddleware, async (req, res) => {
    try {
        const { product, seller,buyer} = req.body
        let filters = {};
        if (product) {
            filters.product = product;
        }
        if (seller) {
            filters.seller = seller;
        }
        if (buyer){
            filters.buyer=buyer;
        }
        const bids = await Bid.find(filters)
            .populate('product')
            .populate('buyer')
            .populate('seller')
            .sort({createdAt:-1});
        res.send({
            success: true,
            data: bids
        });
    } catch (error) {
        res.send({
            success: false,
            message: error.message
        })
    }
})

//update the bid
//  router.put("/edit-bid/:id", authMiddleware, async (req, res) => {
//    try {
//         const updatedBid= await Bid.findByIdAndUpdate(req.params.id, req.body);
//         res.send({
//             success: true,
//              message: "Bid updated successfully",
//                 data:updatedBid,
//        });
//     } catch (error) {
//          res.send({
//              success: false,
//              message: error.message,
//         });    }
// });

// router.put("/edit-bid/:id", authMiddleware, async (req, res) => {
//     try {
//       const updatedBid = await Bid.findByIdAndUpdate(req.params.id, req.body, { new: true });
//       // Use { new: true } to get the updated document
  
//       if (updatedBid) {
//         res.send({
//           success: true,
//           message: "Bid updated successfully",
//           data: updatedBid, // Return the updated bid data
//         });
//       } else {
//         res.status(404).send({
//           success: false,
//           message: "Bid not found or not updated",
//         });
//       }
//     } catch (error) {
//       res.send({
//         success: false,
//         message: error.message,
//       });
//     }
//   });
  


module.exports=router;