const express = require('express')
const app = express()
const port = 3000


app.use(express.static('../app/dist/app'));

app.get('/', (req, res) => res.send(200));


app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))