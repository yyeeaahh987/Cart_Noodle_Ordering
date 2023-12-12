//const braintree = require("braintree");
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const cashController = require("express").Router();

cashController.post('/create-payment-intent', async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: req.body.amount,
      currency: 'usd',
    });
    return res.status(201).json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});

/*
const gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    merchantId: "stq9kgfv23cj4bgx",
    publicKey: "94wvgmnwc8hc9hnp",
    privateKey: "f278f6a82c54a1569d7e13efc783970a"
});

cashController.get("/client_token", (req, res) => {
    gateway.clientToken.generate({}, (err, response) => {
      if (err) throw err;
      res.send({ clientToken: response.clientToken });
      return;
    });
});

cashController.post("/checkout", (req, res) => {
    const nonceFromTheClient = req.body.payment_method_nonce;
    
    gateway.transaction.sale({
        amount: req.body.amount,
        paymentMethodNonce: nonceFromTheClient,
        deviceData: deviceDataFromTheClient,
        options: {
          submitForSettlement: true
        }
      }, (err, result) => {
        return res.status(200).json(result);
    });
});
*/

module.exports = cashController;