'use client'

import { Toaster } from 'react-hot-toast'
import { ReactNode } from 'react'

interface ToastProviderProps {
  children: ReactNode
}

export function ToastProvider({ children }: ToastProviderProps) {
  return (
    <>
      <Toaster position="top-center" />
      {children}
    </>
  )
}