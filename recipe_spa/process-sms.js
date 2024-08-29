// process-sms.js
exports.handler = async function (context, event, callback) {
  const client = context.getTwilioClient();
  const gallery = [];
  const twiml = new Twilio.twiml.MessagingResponse();

  try {
    // Log the incoming message
    console.log(`Incoming message from ${event.From}: ${event.Body}`);

    // Fetch messages sent to the Twilio number
    const messages = await client.messages.list({ to: context.TWILIO_NUMBER });
    for (const message of messages) {
      const mediaList = await message.media.list();
      for (const media of mediaList) {
        gallery.push({
          src: `https://api.twilio.com${media.uri.replace('.json', '')}`,
          description: message.body || 'Delicious dish submitted by a user',
          alt: 'Recipe photo',
          thumbnailWidth: '200px',
        });
      }
    }

    // Send an automated response to the sender
    twiml.message("Thanks for your submission! 📸");

    // Set CORS headers for frontend access
    const response = new Twilio.Response();
    response.appendHeader('Access-Control-Allow-Origin', '*');
    response.appendHeader('Content-Type', 'application/json');
    response.setBody(gallery);

    // Return both the TwiML response and the gallery
    return callback(null, response);

  } catch (error) {
    console.error('Error processing message:', error);
    twiml.message("Sorry, there was an error processing your submission.");
    return callback(null, twiml);
  }
};
