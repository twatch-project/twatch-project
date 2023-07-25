import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { host } from '../constant'
import { useAuth } from '../providers/AuthProvider'

export default function NewPost() {
  const [fileCompany, setFileCompany] = useState<any>()
  const [fileContents, setFileContents] = useState<any>()
  // const [file2, setFile2] = useState<any>()
  const [companyName, setCompanyName] = useState<string>('')
  const [companyRegistration, setCompanyRegistration] = useState<string>('')
  const [address, setAdress] = useState<string>('')
  const [subDistrict, setSubDistric] = useState<string>('')
  const [distric, setDistric] = useState<string>('')
  const [province, setProvice] = useState<string>('')
  const [contact, setContact] = useState<string>('')
  // const [postCode, setPostCode] = useState<number>(10000)
  // const [tag, setTag] = useState<string>('')
  const { token } = useAuth()

  const navigate = useNavigate()

  const submit = async (event: any) => {
    event.preventDefault()

    const formData = new FormData()
    formData.append('company', fileCompany)
    formData.append('content', fileContents)
    // formData.append('image', file2)
    formData.append('companyName', companyName)
    formData.append('companyRegistration', companyRegistration)
    formData.append('address', address)
    formData.append('sub_district', subDistrict)
    formData.append('district', distric)
    formData.append('province', province)
    // formData.append('postCode', postCode)
    formData.append('contact', contact)
    // formData.append('tag', tag)
    console.log('hello')
    await axios.post(`${host}/company`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    })
    navigate('/')
  }

  const fileCompanySelected = (event: any) => {
    const file = event.target.files[0]
    setFileCompany(file)
  }

  const fileContentsSelected = (event: any) => {
    const file = event.target.files[0]
    setFileContents(file)
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <form onSubmit={submit} style={{ width: 650 }} className="flex flex-col space-y-5 px-5 py-14">
        <input onChange={fileCompanySelected} type="file" accept="company/*"></input>
        <input onChange={fileContentsSelected} type="file" accept="content/*" multiple></input>
        <input
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          type="text"
          placeholder="Caption"
        ></input>
        <input
          value={companyRegistration}
          onChange={(e) => setCompanyRegistration(e.target.value)}
          type="text"
          placeholder="Caption"
        ></input>
        <input value={address} onChange={(e) => setAdress(e.target.value)} type="text" placeholder="Caption"></input>
        <input
          value={subDistrict}
          onChange={(e) => setSubDistric(e.target.value)}
          type="text"
          placeholder="Caption"
        ></input>
        <input value={distric} onChange={(e) => setDistric(e.target.value)} type="text" placeholder="Caption"></input>
        <input value={province} onChange={(e) => setProvice(e.target.value)} type="text" placeholder="Caption"></input>
        {/* <input type="number" value={postCode} onChange={(e) => setPostCode(e.target.value)}></input> */}
        <input value={contact} onChange={(e) => setContact(e.target.value)} type="text" placeholder="Caption"></input>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}
