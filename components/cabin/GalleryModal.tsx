'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'

interface GalleryImage {
    url: string
    alt?: string
    title?: string
}

interface GalleryModalProps {
    images: GalleryImage[]
    initialIndex: number
    isOpen: boolean
    onClose: () => void
    cabinTitle: string
    cabinInfo?: string
}

const THUMBNAILS_PER_PAGE = 10

export default function GalleryModal({
    images,
    initialIndex,
    isOpen,
    onClose,
    cabinTitle,
    cabinInfo
}: GalleryModalProps) {
    const [currentIndex, setCurrentIndex] = useState(initialIndex)
    const [currentPage, setCurrentPage] = useState(1)
    const [isFading, setIsFading] = useState(false)

    const totalPages = Math.ceil(images.length / THUMBNAILS_PER_PAGE)

    // Update current index when initialIndex changes
    useEffect(() => {
        setCurrentIndex(initialIndex)
        // Calculate which page this image is on
        const page = Math.floor(initialIndex / THUMBNAILS_PER_PAGE) + 1
        setCurrentPage(page)
    }, [initialIndex])

    // Handle keyboard navigation
    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        if (!isOpen) return

        switch (e.key) {
            case 'Escape':
                onClose()
                break
            case 'ArrowLeft':
                setCurrentIndex(prev => (prev > 0 ? prev - 1 : images.length - 1))
                break
            case 'ArrowRight':
                setCurrentIndex(prev => (prev < images.length - 1 ? prev + 1 : 0))
                break
        }
    }, [isOpen, images.length, onClose])

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown)
        return () => document.removeEventListener('keydown', handleKeyDown)
    }, [handleKeyDown])

    // Prevent body scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = ''
        }
        return () => {
            document.body.style.overflow = ''
        }
    }, [isOpen])

    // Update page when navigating through images (with fade effect if page changes)
    useEffect(() => {
        const newPage = Math.floor(currentIndex / THUMBNAILS_PER_PAGE) + 1
        if (newPage !== currentPage && !isFading) {
            setIsFading(true)
            setTimeout(() => {
                setCurrentPage(newPage)
            }, 300)
            setTimeout(() => {
                setIsFading(false)
            }, 350)
        }
    }, [currentIndex, currentPage, isFading])

    if (!isOpen) return null

    const currentImage = images[currentIndex]
    const startIndex = (currentPage - 1) * THUMBNAILS_PER_PAGE
    const visibleThumbnails = images.slice(startIndex, startIndex + THUMBNAILS_PER_PAGE)

    const goToPrevious = () => {
        setCurrentIndex(prev => (prev > 0 ? prev - 1 : images.length - 1))
    }

    const goToNext = () => {
        setCurrentIndex(prev => (prev < images.length - 1 ? prev + 1 : 0))
    }

    const goToPage = (page: number) => {
        if (page === currentPage || isFading) return
        setIsFading(true)
        setTimeout(() => {
            setCurrentPage(page)
            // Set selected image to the first image of the new page
            const firstImageIndex = (page - 1) * THUMBNAILS_PER_PAGE
            setCurrentIndex(firstImageIndex)
        }, 300)
        setTimeout(() => {
            setIsFading(false)
        }, 350)
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60"
                onClick={onClose}
            />

            {/* Modal Container */}
            <div
                className="relative w-[95vw] max-w-[960px] bg-cover bg-center rounded-lg"
                style={{ backgroundImage: "url('/images/bg_overlay.jpg')" }}
            >
                {/* Close Button */}
                <Image src="/images/bg_cbox_close2.png"
                    alt="Close"
                    width={37}
                    height={37}
                    className="absolute -top-[20px] -right-[20px] z-10 cursor-pointer"
                    onClick={onClose} />

                <div className="flex h-full p-6 gap-6 ">
                    {/* Left Side - Main Image */}
                    <div className="flex-1 flex flex-col">
                        {/* Main Image Container */}
                        {/* <Image
                            src={currentImage?.url.replace("/sites/default/files/", "/images/styles/gallery_slide/public/") || ''}
                            alt={currentImage?.alt || cabinTitle}
                            width={950}
                            height={633}
                            className='w-full h-auto p-[3px]'
                            style={{ boxShadow: '0 0 10px #333' }}
                            priority
                        /> */}
                        <img 
                            src={currentImage?.url.replace("/sites/default/files/", "/images/styles/gallery_slide/public/") || ''}
                            alt={currentImage?.alt || cabinTitle}
                            className='w-full h-auto p-[3px]'
                        />

                        {/* Caption and Navigation */}
                        <div className="flex items-center justify-between">
                            <span className="text-[#533e27] italic text-lg flex-1 pr-4 mt-[5px] min-h-[55px]">
                                {currentImage?.title || currentImage?.alt || ''}
                            </span>

                            <div className="flex items-center gap-2 text-[#7c2c00]">
                                <button
                                    onClick={goToPrevious}
                                    className="hover:underline"
                                >
                                    previous
                                </button>
                                <span className="text-[#533e27]">|</span>
                                <button
                                    onClick={goToNext}
                                    className="hover:underline"
                                >
                                    next
                                </button>
                            </div>
                        </div>

                        {/* Cabin Info */}
                        <div className="mt-1 flex items-center gap-4">
                            <Image
                                src="/images/logo.png"
                                alt="Cabin Rentals of Georgia"
                                width={150}
                                height={80}
                                className="object-contain"
                            />
                            <div className='flex flex-col'>
                                <h3 className="text-[#533e27] text-2xl font-normal m-0" style={{ fontFamily: 'Georgia, serif' }}>
                                    {cabinTitle}
                                </h3>
                                {cabinInfo && (
                                    <span className="text-[#533e27] text-lg">
                                        {cabinInfo}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Thumbnails Grid */}
                    <div className="w-[225px] flex flex-col">
                        <div className={`flex flex-wrap justify-around gap-3 transition-opacity duration-300 ease-in-out ${isFading ? 'opacity-0' : 'opacity-100'}`}>
                            {visibleThumbnails.map((image, idx) => {
                                const actualIndex = startIndex + idx
                                return (
                                    <button
                                        key={actualIndex}
                                        onClick={() => setCurrentIndex(actualIndex)}
                                        className={`relative w-[45%] aspect-[4/3] overflow-hidden transition-all ${actualIndex === currentIndex
                                            ? 'border-[3px] border-black'
                                            : 'border-[3px] border-transparent hover:opacity-80'
                                            }`}
                                        style={{ boxShadow: '0 0 5px #333' }}
                                    >
                                        <Image
                                            src={image.url.replace("/sites/default/files/", "/images/styles/gallery_thumb/public/") || ''}
                                            alt={image.alt || `Thumbnail ${actualIndex + 1}`}
                                            fill
                                            className="object-cover"
                                            sizes="130px"
                                        />
                                    </button>
                                )
                            })}
                        </div>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="flex items-center justify-center gap-2 mt-4 text-[#7c2c00]">
                                {currentPage > 1 && (
                                    <button
                                        onClick={() => goToPage(currentPage - 1)}
                                        className="hover:text-[#5a2000]"
                                    >
                                        &lt;
                                    </button>
                                )}
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                    <button
                                        key={page}
                                        onClick={() => goToPage(page)}
                                        className={`w-6 h-6 flex items-center justify-center rounded ${page === currentPage
                                            ? 'bg-[#7c2c00] text-white'
                                            : 'hover:bg-[#7c2c00]/20'
                                            }`}
                                    >
                                        {page}
                                    </button>
                                ))}
                                {currentPage < totalPages && (
                                    <button
                                        onClick={() => goToPage(currentPage + 1)}
                                        className="hover:text-[#5a2000]"
                                    >
                                        &gt;
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

