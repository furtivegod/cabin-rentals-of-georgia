'use client'

import { useState } from 'react'
import Image from 'next/image'
import GalleryModal from './GalleryModal'

interface GalleryImage {
  url: string
  alt?: string
  title?: string
}

interface CabinGalleryProps {
  images: GalleryImage[]
  cabinTitle: string
  cabinInfo?: string
}

export default function CabinGallery({ images, cabinTitle, cabinInfo }: CabinGalleryProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(0)

  const openModal = (index: number) => {
    setSelectedIndex(index)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  return (
    <>
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4 text-[#7c2c00]">Photos (click for larger image)</h2>
        <div className="flex flex-wrap justify-center gap-4">
          {images.map((image: GalleryImage, index: number) => (
            <div key={index} className="flex flex-col w-auto">
              <button
                onClick={() => openModal(index)}
                className="relative w-[275px] h-[180px] max-[1010px]:w-[200px] max-[1010px]:h-[130px] max-[767px]:w-full max-[767px]:max-w-[420px] max-[767px]:h-auto overflow-hidden text-left"
                style={{ boxShadow: '0 0 10px #333' }}
              >
                <Image
                  src={image.url.replace("/sites/default/files/", "/images/styles/cabin_photo_listing/public/") || ''}
                  alt={image.alt || cabinTitle}
                  fill
                  className="object-cover cursor-pointer max-[767px]:!static max-[767px]:!w-full max-[767px]:!h-auto p-[3px]"
                />
              </button>
              <h4 className="mt-[3px] text-[#b7714b] text-[16px] w-[275px] max-[1010px]:w-[200px] max-[767px]:w-full max-[767px]:max-w-[420px]">
                {image.title}
              </h4>
            </div>
          ))}
        </div>
      </div>

      <GalleryModal
        images={images}
        initialIndex={selectedIndex}
        isOpen={isModalOpen}
        onClose={closeModal}
        cabinTitle={cabinTitle}
        cabinInfo={cabinInfo}
      />
    </>
  )
}

