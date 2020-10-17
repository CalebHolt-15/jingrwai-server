import express from "express"
import cors from "cors"
import {json, urlencoded} from "body-parser"
import morgan from "morgan"
import {connect} from "./utils/db";
import {config} from "./config/config";

const app = express()

app.use(cors())
app.use(json())
app.use(urlencoded({ extended: true }))
app.use(morgan('dev'))

app.get('/',(req, res) => {
    res.send('hello')
})

app.post('/',(req, res) => {
    res.send(req.body)
})

export const start = async () => {
    try {
        await connect()
        app.listen(config.port, () => {
            console.log(`REST API on http://localhost:${config.port}`)
        })
    } catch (e) {
        console.error(e)
    }
}