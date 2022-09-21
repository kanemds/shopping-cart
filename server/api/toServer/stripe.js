const express = require('express');
const router = express.Router();
const Stripe = require('stripe')
require('dotenv').config()
const stripe = Stripe(process.env.STRIPE_KEY)
const { Blob } = require('buffer')


router.post('/create-checkout-session', async (req, res) => {

  const line_items = req.body.cartItems.map(product => {
    // console.log(product)
    // const blob = new Blob([Int8Array.from(product.img.data.data)], { type: product.img.contentType })
    // const image = window.URL.createObjectURL(blob);
    // console.log(image)
    return {
      price_data: {
        currency: 'cad',
        product_data: {
          name: product.name,
          description: product.desc,
          metadata: {
            id: product._id
          }
        },
        unit_amount: product.price * 100,
      },
      quantity: product.cartQuantity
    }
  })

  const session = await stripe.checkout.sessions.create({
    line_items,
    mode: 'payment',
    success_url: `${process.env.CLIENT_URL}/checkout-success`,
    cancel_url: `${process.env.CLIENT_URL}/cart`,
  });

  res.json({ url: session.url });
});

module.exports = router