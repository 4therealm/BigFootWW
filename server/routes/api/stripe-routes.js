const router = require("express").Router();  


const stripe = require('stripe')('sk_test_51MoVhMBA56cPFZD0hNFhxqVoxIwOeoHkC8QPRU1yQ1Ms1NdX1jy122Kl8KYoFzsg8deXsJwi6rw8g4gGCWmnzI8S00pU2ekyJh');



app.post('/api/create-payment-intent', async (req, res) => {
  const { amount } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: 'usd',
    });

    res.status(200).send(paymentIntent.client_secret);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
