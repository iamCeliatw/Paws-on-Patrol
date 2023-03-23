// 這個檔案是deploy到 firebase function
// 再從react use function 串接第三方金流
const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
exports.createStripeCheckout = functions.https.onCall(async (data, context) => {
  //Stripe init
  //把secret key 儲存到firebase 可以用 firebase functions:config:get 取得

  const stripe = require("stripe")(functions.config().stripe.secret_key);
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    success_url: "https://paws-on-patrol.firebaseapp.com/success",
    cancel_url: "https://paws-on-patrol.firebaseapp.com/cancel",
    metadata: {
      userid: data.userid,
      memberid: data.memberid,
    },
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: "USD",
          unit_amount: data.unitAmount * 100,
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
//接收stripe webhook請求
exports.stripeWebhook = functions.https.onRequest(async (req, res) => {
  const stripe = require("stripe")(functions.config().stripe.secret_key);
  let event;
  try {
    const whSec = functions.config().stripe.payments_webhook_secret;
    event = stripe.webhooks.constructEvent(
      req.rawBody,
      req.headers["stripe-signature"],
      whSec
    );
  } catch (err) {
    console.log(err, "webhook signature vertification failed");
    return res.sendStatus(400);
  }
  const dataObject = event.data.object;
  const userId = dataObject.metadata.userid;
  const documentRef = admin.firestore().collection("invitation").doc(userId);
  // 獲取文檔數據
  const documentSnapshot = await documentRef.get();
  const documentId = documentSnapshot.data().documentId;
  // 獲取文檔ID
  documentRef
    .update({
      status: "paid",
    })
    .then(() => {
      console.log("Document successfully updated!");
    })
    .catch((error) => {
      console.error("Error updating document: ", error);
    });
  const inviteRef = admin
    .firestore()
    .collection("inviteHistory")
    .doc(documentId);
  inviteRef
    .update({
      paymentStatus: "paid",
    })
    .then(() => {
      console.log("Document successfully updated!");
    })
    .catch((error) => {
      console.error("Error updating document: ", error);
    });

  const clientRef = admin
    .firestore()
    .collection("clientHistory")
    .doc(documentId);
  clientRef
    .update({
      paymentStatus: "paid",
    })
    .then(() => {
      console.log("Document successfully updated!");
    })
    .catch((error) => {
      console.error("Error updating document: ", error);
    });
  return res.sendStatus(200);
});
