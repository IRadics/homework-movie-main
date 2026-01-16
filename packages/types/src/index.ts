export interface ApiResponse<T> {
  data: T
  message?: string
  success: boolean
}

export interface Cinema {
  id: string
  name: string
  city: string
}
