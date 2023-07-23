import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { host } from '../constant'

export default function NewPost() {
  const [file, setFile] = useState<any>()
  const [caption, setCaption] = useState('')

  const navigate = useNavigate()

  const submit = async (event: any) => {
    event.preventDefault()

    const formData = new FormData()
    formData.append('image', file)
    formData.append('caption', caption)
    console.log(file, caption)
    await axios.post(`${host}/posts`, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
    console.log('Hello formData')
    navigate('/')
  }

  const fileSelected = (event: any) => {
    const file = event.target.files[0]
    setFile(file)
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <form onSubmit={submit} style={{ width: 650 }} className="flex flex-col space-y-5 px-5 py-14">
        <input onChange={fileSelected} type="file" accept="image/*"></input>
        <input value={caption} onChange={(e) => setCaption(e.target.value)} type="text" placeholder="Caption"></input>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}
