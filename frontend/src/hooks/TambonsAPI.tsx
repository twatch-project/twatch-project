import { useEffect, useState } from 'react'
import { TambonDTO } from '../types/ProviceList.hook'
import { Apitambons } from '../constant'

const FetchTambon = () => {
  const [tambons, setTambons] = useState<TambonDTO[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `${Apitambons}`
        const response = await fetch(url)
        if (!response.ok) {
          throw new Error('Failed to fetch data')
        }
        const data: TambonDTO[] = await response.json()
        setTambons(data)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])

  return { tambons }
}

export default FetchTambon
