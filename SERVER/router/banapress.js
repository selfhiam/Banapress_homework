import express from 'express'
import * as Controller from '../controller/information.js'

const router = express.Router()

router.get('/', Controller.datainformation)

export default router