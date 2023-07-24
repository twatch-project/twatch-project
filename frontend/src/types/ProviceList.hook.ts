export interface ProviceDTO {
  id: number
  name_th: string
  name_en: string
}

export interface AmphureDTO {
  id: number
  name_th: string
  name_en: string
  province_id: number
}

export interface TambonDTO {
  id: number
  name_th: string
  name_en: string
  amphure_id: number
}
