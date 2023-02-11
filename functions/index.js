// 這個檔案是deploy到 firebase function
// 再從react use function 串接第三方金流
const functions = require("firebase-functions");
exports.createStripeCheckout = functions.https.onCall(async (data, context) => {
  //Stripe init
  //把secret key 儲存到firebase 可以用 firebase functions:config:get 取得
  const stripe = require("stripe")(functions.config().stripe.secret_key);
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    success_url: "http://localhost:3000/success",
    cancel_url: "http://localhost:3000/cancel",
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: "NT",
          unit_amount: 100 * 100,
          product_data: {
            name: "walk dog",
          },
        },
      },
    ],
  });
  return {
    id: session.id,
  };
});

// export const a = firebase.functions().httpsCallable("createStripeCheckout");
