import React from 'react'
import { useNavigate } from 'react-router-dom'

import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { FormEvent } from 'react'
export default function CompanyProfile() {
  const [companyName, setCompanyName] = useState('')
  const [companyRegistration, setCompanyRegistration] = useState('')
  const [body, setBody] = useState('')
  const [imageContent, setImageContent] = useState('')
  const [province, setProvince] = useState('')
  const [address, setAddress] = useState('')
  const [sub_district, setSub_district] = useState('')
  const [district, setDistrict] = useState('')
  const [contract, setContract] = useState('')
  const [tag, setTag] = useState('')
  const [isSubmitting, setSubmitting] = useState(false)
  // const { CompanyProfile } = useAuth()
  const navigate = useNavigate()

  const handlerSubmit = async (event: FormEvent<HTMLUnknownElement>) => {
    event.preventDefault

    if (isSubmitting) {
      return setSubmitting(true)
    }

    try {
      if (!companyName) {
        return alert(`You don't have Company Name`)
      }
      // await CompanyProfile(
      //   companyName,
      //   companyRegistration,
      //   body,
      //   imageContent,
      //   province,
      //   address,
      //   sub_district,
      //   district,
      //   contract,
      //   tag,
      // )

      toast.success(`Successful Create CompanyProfile.`)

      navigate('/Home')
    } catch (err) {
      console.error(err)
      toast.error(`Unsuccessful Create Company Profile`)
    } finally {
      setSubmitting(false)
    }
  }
  return (
    <>
      <section className="flex justify-center">
        <form
          onSubmit={handlerSubmit}
          className="flex w-[600px] border-[0.5px]  flex-col items-center justify-center  rounded-md p-10 gap-y-[10px] m-[15px] "
        >
          <h1 className="font-bold ">COMPANY PROFILE</h1>
          <div className="imgBx bg-slate-400  w-[100px] h-[100px] rounded-full overflow-hidden">
            <img className=" w-full h-full rounded-full truncate" src="" alt="" />
          </div>
          <div className="upload ">
            <input
              type="file"
              className="m-[15px] w-[120px] bg-blue text-white p-[5px] rounded-[5px] text-sm"
              placeholder="Upload file"
            />
          </div>
          <div className="input">
            <label className="flex flex-col text-black my-1 font-bold">COMPANY NAME</label>
            <input
              type="text"
              value={companyName}
              className="w-[305px] h-[38px] border-solid border-blue border-2 rounded-md px-[5px]"
              onChange={(e) => setCompanyName(e.target.value)}
              required
            />
          </div>
          <div className="input">
            <label className=" flex flex-col text-black my-1 font-bold">COMPANY REGISTRATION NUMBER</label>
            <input
              type="text"
              value={companyRegistration}
              className="w-[305px] h-[38px] border-solid border-blue border-2 rounded-md px-[5px]"
              onChange={(e) => setCompanyRegistration(e.target.value)}
              required
            />
          </div>
          <div className="input">
            <label className=" flex flex-col text-black my-1 font-bold">BODY</label>
            <input
              type="text"
              value={body}
              className="w-[305px] h-[38px] border-solid border-blue border-2 rounded-md px-[5px]"
              onChange={(e) => setBody(e.target.value)}
              required
            />
          </div>
          <div className="input">
            <label className=" flex flex-col text-black my-1 font-bold">IMAGE</label>
            <input
              type="file"
              value={imageContent}
              className="w-[305px] h-[38px] border-solid border-blue border-2 rounded-md px-[5px]"
              onChange={(e) => setImageContent(e.target.value)}
              required
            />
          </div>
          <div className="input">
            <label className=" flex flex-col text-black my-1 font-bold">PROVINCE</label>
            <input
              type="text"
              value={province}
              className="w-[305px] h-[38px] border-solid border-blue border-2 rounded-md px-[5px]"
              onChange={(e) => setProvince(e.target.value)}
              required
            />
          </div>
          <div className="input">
            <label className=" flex flex-col text-black my-1 font-bold">DISTRICT</label>
            <input
              type="text"
              value={address}
              className="w-[305px] h-[38px] border-solid border-blue border-2 rounded-md px-[5px]"
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>
          <div className="input">
            <label className=" flex flex-col text-black my-1 font-bold">SUB-DISTRICT</label>
            <input
              type="text"
              value={sub_district}
              className="w-[305px] h-[38px] border-solid border-blue border-2 rounded-md px-[5px]"
              onChange={(e) => setSub_district(e.target.value)}
              required
            />
          </div>
          <div className="input">
            <label className=" flex flex-col text-black my-1 font-bold">ADDRESS</label>
            <input
              type="text"
              value={district}
              className="w-[305px] h-[38px] border-solid border-blue border-2 rounded-md px-[5px]"
              onChange={(e) => setDistrict(e.target.value)}
              required
            />
          </div>
          <div className="input">
            <label className=" flex flex-col text-black my-1 font-bold">CONTRACT</label>
            <input
              type="text"
              value={contract}
              className="w-[305px] h-[38px] border-solid border-blue border-2 rounded-md px-[5px]"
              onChange={(e) => setContract(e.target.value)}
              required
            />
          </div>
          <div className="input">
            <label className=" flex flex-col text-black my-1 font-bold">TAG</label>
            <input
              type="text"
              value={tag}
              className="w-[305px] h-[38px] border-solid border-blue border-2 rounded-md px-[5px]"
              onChange={(e) => setTag(e.target.value)}
              required
            />
          </div>

          <button className="my-[10px] p-[10px] bg-blue rounded text-white">CONFIRM</button>
        </form>
      </section>
    </>
  )
}
