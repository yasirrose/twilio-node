const http = require('http');
const express = require('express');
const MessagingResponse = require('twilio').twiml.MessagingResponse;

var twilio = require('twilio');
const app = express();

app.get('/', (req, res) => { 
  res.send('hello world');
});

app.post('/sms', (req, res) => {
  const twiml = new MessagingResponse();
  console.log('body ------------------------------------------', req.body);
  const message = req.body;
  twiml.message('The Robots are coming! Head for the hills!');

  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twiml.toString());
});

app.get('/send', (req, res) => { 
  const accountSid = '';
  const authToken = '';
  var client = new twilio(accountSid, authToken);
  console.log('twillo object is', client.messages);
  debugger
  client.messages.create({
          from: 'whatsapp:+14155238886',
          body: 'Hello there!',
          to: 'whatsapp:+923408736313'
        }).then(message => {
            console.log('response', message.sid);
        });
    res.send('message send.');
});

app.listen(3000, () => {
  console.log('Express application running on localhost:3000');
});


