import express from 'express'
const app = express()
const port = process.env.PORT || 4000
app.get('/system/health', (req, res) => res.sendStatus(200))
app.post('/webhook', (req, res) => res.sendStatus(200))
console.log('running on port ', port)
app.listen(port)
