import multer from 'multer'
import express from 'express'
import fs from 'fs'
import util from 'util'
import { getFileStream, uploadFile } from './auth/s3'
import cors from "cors";

async function main() {
  
const unlinkFile = util.promisify(fs.unlink)
const upload = multer({ dest: 'uploads/' })

const app = express()
app.use(cors())

app.get('/images/:key', (req, res) => {
  console.log(req.params)
  const key = req.params.key
  const readStream = getFileStream(key)

  readStream.pipe(res)
})

app.post('/images', upload.single('image'), async (req:any, res) => {
  const file = req.file
  console.log(file)

  // apply filter
  // resize 

  const result = await uploadFile(file)
  await unlinkFile(file.path)
  console.log("result", result)
  const description = req.body.description
  console.log("description", description)
  res.send({imagePath: `/images/${result.Key}`})
})

app.listen(8080, () => console.log("listening on port 8080"))
}

main()