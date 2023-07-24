import { useEffect, useState } from 'react'
import { ProviceDTO } from '../types/ProviceList.hook'
import { thaiProvinceData } from '../constant'

const FetchProivce = () => {
  const [provinces, setProvinces] = useState<ProviceDTO[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `${thaiProvinceData}`
        const response = await fetch(url)
        if (!response.ok) {
          throw new Error('Failed to fetch data')
        }
        const data: ProviceDTO[] = await response.json()
        setProvinces(data)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])

  return { provinces }
}

export default FetchProivce
