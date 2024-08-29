# Recipe Board: Share Your Dishes 🍽️
Recipe Board is a serverless web application that allows users to share photos of their dishes via SMS. The photos are displayed on a single-page application (SPA) built with Vue.js and Vue Silentbox, creating an engaging gallery experience.

## Technologies Used
- Frontend: Vue.js, Vue Silentbox, HTML, CSS
- Backend: Twilio Functions

## How It Works

1. **User Interaction**: Users send photos via SMS to a specified Twilio number.
2. **Twilio Function**: The serverless function (`process-sms.js`) processes incoming messages, retrieves media, and stores the image data.
3. **Frontend Display**: The Vue.js application fetches image data from the Twilio Function and displays it in a gallery format.

## Setup and Deployment

### 1. Frontend Deployment

- Host the contents of the `/frontend` folder on a static site service like Vercel, Netlify, or GitHub Pages.

### 2. Backend Deployment

- Deploy the `process-sms.js` function using Twilio Functions:
  - Go to Twilio Console > Functions & Assets > Services.
  - Create a new service and add the `process-sms.js` function.
  - Set environment variables in Twilio for `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, and `TWILIO_NUMBER`.
  - Deploy and copy the function URL.

### 3. Connect Twilio Number

- Link your Twilio phone number to the deployed function:
  - Go to Twilio Console > Phone Numbers > Active Numbers.
  - Set the Messaging webhook URL to your Twilio Function URL.

### 4. Update Frontend API URL

- In `index.html`, update the fetch URL to your Twilio Function URL:
  
  ```javascript
  const response = await fetch("https://your-function-url.twil.io/process-sms");


