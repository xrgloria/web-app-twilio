# Twilio Send Text App

A simple ReactJS and ExpressJS web app to send and receive SMS messages via Twillio.

## Requirements
- [Node.js](https://nodejs.org/en/download/)
- [MongoDB](https://docs.mongodb.com/manual/installation/)
- [ngrok](https://ngrok.com/download)
- [Twilio](https://www.twilio.com/try-twilio)

## Install
1. clone the repo
2. install [node](https://nodejs.org/en/download/) (if needed)
3. run ```npm install``` inside base of directory 
4. install [monogodb](https://docs.mongodb.com/manual/installation/) (if needed)
5. run MongoDB server with ```mongod``` use sudo if you don't have the proper permisssions or use ```"C:\Program Files\MongoDB\Server\4.0\bin\mongo.exe"``` if on Windows
6. create a database called ```texts``` (if it doesn't already exist) with ```mongo``` and then ```use texts```
7. install/create an account with [ngrok](https://ngrok.com/download) (if needed)
8. run ngrok ```ngrok http 3001``` to expose local express service for receiving texts via Twilio webhook
9. copy either forwarding addresses (show look like this ```https://XXXXXX.ngrok.io```)
10. log into Twilio account and go to your [Twilio phone number(s)](https://www.twilio.com/console/phone-numbers/incoming) under "All Products & Services"
11. click on your number and under "Messaging" add the url you copied appended with "storeTexts" in the field for "A Message Comes In" so it looks like this ```https://XXXXXX.ngrok.io/storeTexts```
12. Don't forget to hit save!
13. at the base of the directory run ```npm run dev``` to run both the react client and express server
14. create .env with twilio keys and phone number and set your environment variables

MAC/LINUX
```
echo "export TWILIO_ACCOUNT_SID='ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'" > .env
echo "export TWILIO_AUTH_TOKEN='your_auth_token'" >> .env
echo "export TWILIO_NUMBER='twilio_phone_number'" >> .env
source ./.env
```
WINDOWS (cmd.exe)
```
set TWILIO_ACCOUNT_SID=ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
set TWILIO_AUTH_TOKEN=your_auth_token
set TWILIO_NUMBER=twilio_phone_number
```
15. Open [http://localhost:3000](http://localhost:3000) to view the app.

## Available Scripts

In the project directory, you can run:

### `npm run dev`

Runs React and Express apps in one line.<br>
Open [http://localhost:3000](http://localhost:3000) to view the React app it in the browser.

Open [http://localhost:3001](http://localhost:3001) to connect to the Express resources.
