import express from 'express'
import { midelware } from './routers/rutasMidelwares'
import { PORT } from './types'

const app = express()
app.use(express.json())
app.use(midelware)

app.listen(PORT.port, '0.0.0.0', () => {
  console.table({
    url: `http://0.0.0.0:${PORT.port}`
  })
})