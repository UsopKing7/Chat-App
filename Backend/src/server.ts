import express from 'express'

const app = express()

app.get('/', (_req, res) => {
  res.send('<h1>Hello world</>')
})

const PORT = process.env.PORT ?? 3333

app.listen(PORT, () => {
  console.table({
    url: `http://0.0.0.0:${PORT}`
  })
})