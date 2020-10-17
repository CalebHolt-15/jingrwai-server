import express from "express"
import cors from "cors"
import {json, urlencoded} from "body-parser"
import morgan from "morgan"

const app = express()

app.use(cors())
app.use(json())
app.use(urlencoded({ extended: true }))
app.use(morgan('dev'))

app.get('/',(req, res) => {
    res.send('hello')
})

export const start = () => {
    app.listen(8081, () => {
        console.log('server started on port 3001')
    })
}