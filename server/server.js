const express=require("express");
const cors = require("cors");
const router = express.Router(); 
// const {RAZORPAY_ID_KEY, RAZORPAY_SECRET_KEY}= process.env;

const app=express();

// Enable CORS for all routes
app.use(cors());
app.use(express.json());
require('dotenv').config();
const dbConfig=require('./config/dbConfig');
const port=process.env.PORT || 5000;

const path = require('path')
const shortid = require('shortid')
const Razorpay = require('razorpay')

const bodyParser = require('body-parser')

app.use(cors())
app.use(bodyParser.json())

const razorpay = new Razorpay({
	key_id:'rzp_test_O3KnXv1wIAIRm2',
	key_secret: 'GX6QaXTYlfCtCmFkXLVlJauA'
})

app.post('/verification', (req, res) => {
	// do a validation
	const secret = 'GX6QaXTYlfCtCmFkXLVlJauA'

	console.log(req.body)

	const crypto = require('crypto')

	const shasum = crypto.createHmac('sha256', secret)
	shasum.update(JSON.stringify(req.body))
	const digest = shasum.digest('hex')

	console.log(digest, req.headers['x-razorpay-signature'])

	if (digest === req.headers['x-razorpay-signature']) {
		console.log('request is legit')
		// process it
		require('fs').writeFileSync('payment1.json', JSON.stringify(req.body, null, 4))
	} else {
		// pass it
	}
	res.json({ status: 'ok' })
})

app.post('/payment/createOrder', async (req, res) => {
	const payment_capture = 1
	const totalAmount = req.body.prod_cost
    const currency = 'INR'

	const options = {
		amount: totalAmount*100,
		currency,
		receipt: shortid.generate(),
		payment_capture
	}

	try {
		const response = await razorpay.orders.create(options)
		console.log(response)
		res.json({
			id: response.id,
			currency: response.currency,
			amount: response.amount
		})
	} catch (error) {
		console.log(error)
	}
})

 

const usersRoute=require("./routes/userRoute");
const productsRoute=require("./routes/productsRoute");
const bidsRoute=require('./routes/bidsRoute')
const notificationsRoute=require('./routes/notificationsRoute')
// const stripe=require('./routes/stripe')
app.use('/api/users',usersRoute);
app.use('/api/products',productsRoute);
app.use('/api/bids',bidsRoute);
app.use('/api/notifications',notificationsRoute);
app.use('/api/razorpay', router);

// app.use('/api/stripe',stripe);
app.listen(port,()=>console.log(`Node/Express Server is started on port ${port}`));
