const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.set('port', process.env.PORT || '3000')

app.listen(app.get('port'), () => {
  console.log(`server running on port ${app.get('port')}`)
})
