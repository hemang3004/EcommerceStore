const braintree = require("braintree");

const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: "g48prgwdy3b3gwx9",
  publicKey: "3w8nbrk4bzgq2k7b",
  privateKey: "9703bc289d7883af727bf0946b4bef73"
});

exports.getToken=(req,res)=>{
    gateway.clientToken.generate({}, (err, response) => {
        // pass clientToken to your front-end
        if(err){
            res.status(500).send(err)
        }
        res.send(response)
        // const clientToken = response.clientToken
      });
}



exports.processPayment=(req,res)=>{
    let nonceFromTheClient=req.body.paymentMethodNonce
    let amountFromTheClient=req.body.amount
    gateway.transaction.sale({
        amount: amountFromTheClient,
        
        options: {
          submitForSettlement: true
        }
      }, (err, result) => {
        if(err){
            res.status(500).send(error)
        }
        else{
            res.send(result)
        }
      });
}