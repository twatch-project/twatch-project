import { useEffect, useState } from 'react'
import { CompanyHook } from '../types/company.hook'
import { CompanyDto } from '../types/dto'
import { host } from '../constant'

const useCompany = (companyId: number): CompanyHook => {
  const [data, setData] = useState<CompanyDto | null>(null)
  const [error, setError] = useState<null | unknown>(null)
  const [loading, setLoading] = useState<boolean>(false)
  //   const [startName, setStartName] = useState<string>('')

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const res = await fetch(`${host}/company/${companyId}`)
        const data = await res.json()

        setData(data)
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  return {
    data,
    status: {
      error,
      loading,
      ready: error == null && !loading && data != null,
    },
  }
}

export default useCompany