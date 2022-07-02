require('dotenv').config()
const firebase = require('../../src/utils/firebase')

exports.handler = async (event) => {
    const {authSession} = JSON.parse(event.body)
    console.log(authSession)
    return {
        statusCode: 200,
        body: JSON.stringify('success')
    }

    // try {
        // const { amount } = JSON.parse(event.body)
        // const paymentIntent = await stripe.paymentIntents.create({
            // amount,
            // currency: 'usd',
            // payment_method_types: ['card']
        // })
        // return {
            // statusCode: 200,
            // body: JSON.stringify({ paymentIntent })
        // }
    // } catch(error) {
        // console.log({ error })
        // return {
            // status: 400,
            // body: JSON.stringify({error})
        // }
    // }
}
