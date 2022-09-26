const express = require('express');
const router = express.Router();
const Stripe = require('stripe')
require('dotenv').config()
const stripe = Stripe(process.env.STRIPE_KEY)
const Order = require('../../models/order')



router.post('/create-checkout-session', async (req, res) => {

  console.log(req.body)

  const customer = await stripe.customers.create({
    metadata: {
      userId: req.body.userId
    }
  })

  const line_items = req.body.cartItems.map(product => {

    return {
      price_data: {
        currency: 'cad',
        product_data: {
          name: product.name,
          description: product.desc,
          images: [product.img],
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
    payment_method_types: ['card'],
    shipping_address_collection: {
      allowed_countries: ['CA'],
    },
    shipping_options: [
      {
        shipping_rate_data: {
          type: 'fixed_amount',
          fixed_amount: {
            amount: 0,
            currency: 'cad',
          },
          display_name: 'Free shipping',
          // Delivers between 5-7 business days
          delivery_estimate: {
            minimum: {
              unit: 'business_day',
              value: 5,
            },
            maximum: {
              unit: 'business_day',
              value: 7,
            },
          }
        }
      },
      {
        shipping_rate_data: {
          type: 'fixed_amount',
          fixed_amount: {
            amount: 1500,
            currency: 'cad',
          },
          display_name: 'Next day air',
          // Delivers in exactly 1 business day
          delivery_estimate: {
            minimum: {
              unit: 'business_day',
              value: 1,
            },
            maximum: {
              unit: 'business_day',
              value: 1,
            },
          }
        }
      },
    ],
    customer: customer._id,
    line_items,
    phone_number_collection: {
      enabled: true,
    },
    mode: 'payment',
    success_url: `${process.env.CLIENT_URL}/checkout-success`,
    cancel_url: `${process.env.CLIENT_URL}/cart`,
  });

  res.json({ url: session.url });
});




const createOrder = async (customer, data, lineItems) => {

  const newOrder = new Order({
    userId: customer.metadata.userId,
    customerId: data.customer,
    paymentId: data.payment_intnet,
    products: lineItems.data,
    subtotal: data.amount_subtotal,
    total: data.amount_total,
    shipping: data.customer_details,
    payment_status: data.payment_status
  })

  try {
    const saveOrder = await newOrder.save()
    console.log("Processed Order", saveOrder)

    // can setup eamil once the order is done to customer

  } catch (error) {
    console.log(error.message)
  }
}


// This is your Stripe CLI webhook secret for testing your endpoint locally.
let endpointSecret

endpointSecret = "whsec_65e8f8b578a932eca74d3fdc345c353fd2f6b3f618006a739c2fd47c5c3ca13f";


router.post('/webhook', express.raw({ type: 'application/json' }), (req, response) => {
  const sig = req.headers['stripe-signature'];

  let data
  let eventType

  if (endpointSecret) {
    let event;

    try {
      event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
      console.log("Successfully")
    } catch (err) {
      console.log(err.message)
      response.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }

    data = event.data.object
    eventType = event.type
  } else {
    data = req.body.data.object
    eventType = req.body.type
  }
  // Handle the event
  if (eventType === "checkout.session.completed") {
    stripe.customers.retrieve(data.customer).then(
      (customer) => {
        stripe.checkout.sessioins.listLineItems(
          data.id, {},
          function (error, lineItems) {
            console.log("LineItem", lineItems)
            createOrder(customer, data, lineItems)
          }
        )

      }
    )
      .catch(error => console.log(error.message))
  }

  // Return a 200 response to acknowledge receipt of the event
  response.send().end();
});


module.exports = router