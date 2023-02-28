const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express()
const port = 3000;
const accountSid = "AC458871f2d887751a8fdf877ccd93f470";
const authToken = "e44eb32e87f83946e9ebdc27ee51305e";
const twilioPhoneNumber = "+12763859941";
const client = require('twilio')(accountSid, authToken);

app.use(cors());

// app.use(express.json());
app.use(bodyParser.json());


app.post('/v1/sendsms', (req, res) => {
  const body = req.body;
  if(!body.phone ||!body.message) {
    ErrorHandler(res, 400, 'Bad Request', 'phone and message are required');
  } else {
    client.messages
      .create({
        body: body.message,
        from: twilioPhoneNumber,
        to: body.phone
      })
      .then((message) => {
        console.log(message.sid)
      })
      .catch((error) => {
        console.error(error.code, error.message)
        res.status(500).send(error.message);
       });
  }
  res.json(req.body);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});


function ErrorHandler(res, reason, message, code) {
  console.log("Error: " + reason);
  res.status(code || 500).json({ "error": message });
}
