import { useEffect, useState } from 'react'
import { AmphureDTO } from '../types/ProviceList.hook'
import { thaiAmphure } from '../constant'

const FetchAmphure = () => {
  const [Amphure, setAmphure] = useState<AmphureDTO[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `${thaiAmphure}`
        const response = await fetch(url)
        if (!response.ok) {
          throw new Error('Failed to fetch data')
        }
        const data: AmphureDTO[] = await response.json()
        setAmphure(data)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])

  return { Amphure }
}

export default FetchAmphure
