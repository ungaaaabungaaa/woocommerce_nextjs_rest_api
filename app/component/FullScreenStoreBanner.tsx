import React from 'react'


interface FullScreenBannerProps {
  title: string
  subtitle: string

}

const FullScreenStoreBanner: React.FC<FullScreenBannerProps> = ({
  title,
  subtitle,
 
}) => {
  return (
    <div className="relative w-full h-[300px] sm:h-[310px]  overflow-hidden">
      
      <div className="absolute inset-0 bg-black bg-opacity-50" />
      <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-white">
        <h1 className="mb-4 text-3xl sm:text-4xl md:text-6xl font-bold text-center">{title}</h1>
        <p className="text-lg sm:text-xl md:text-2xl text-center">{subtitle}</p>
      </div>
    </div>
  )
}

export default FullScreenStoreBanner

