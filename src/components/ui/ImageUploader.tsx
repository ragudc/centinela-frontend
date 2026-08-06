'use client'

import { CldUploadWidget } from 'next-cloudinary'

interface ImageUploaderProps {
  onUpload: (url: string) => void
}

export function ImageUploader({ onUpload }: ImageUploaderProps) {
  return (
    <CldUploadWidget
      uploadPreset="centinela_preset"
      onSuccess={(result) => {
        if (result.info && typeof result.info === 'object' && 'secure_url' in result.info) {
          const url = result.info.secure_url as string
          onUpload(url)
        }
      }}
    >
      {({ open }) => (
        <button onClick={() => open()}>Subir imagen</button>
      )}
    </CldUploadWidget>
  )
}
