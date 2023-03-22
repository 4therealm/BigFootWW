const stripe = require('stripe')('sk_test_51MoVhMBA56cPFZD0hNFhxqVoxIwOeoHkC8QPRU1yQ1Ms1NdX1jy122Kl8KYoFzsg8deXsJwi6rw8g4gGCWmnzI8S00pU2ekyJh');

stripe.products.create({
  name: 'Starter Subscription',
  description: '$12/Month subscription',
}).then(product => {
  stripe.prices.create({
    unit_amount: 1200,
    currency: 'usd',
    recurring: {
      interval: 'month',
    },
    product: product.id,
  }).then(price => {
    console.log('Success! Here is your starter subscription product id: ' + product.id);
    console.log('Success! Here is your premium subscription price id: ' + price.id);
  });
});