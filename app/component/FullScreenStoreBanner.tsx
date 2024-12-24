import React from "react";

interface FullScreenBannerProps {
  title: string;
  subtitle: string;
  backgroundImageUrl: string;
}

const FullScreenStoreBanner: React.FC<FullScreenBannerProps> = ({
  title,
  subtitle,
  backgroundImageUrl,
}) => {
  return (
    <div className="px-4 sm:px-6 md:px-8 lg:px-12">
      <div
        className="relative w-full h-[300px] sm:h-[310px] overflow-hidden bg-cover bg-center rounded-xl"
        style={{ backgroundImage: `url('${backgroundImageUrl}')` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 rounded-xl" />
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-white">
          <h1 className="mb-4 text-3xl sm:text-4xl md:text-6xl font-bold text-center">
            {title}
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-center">
            {subtitle}
          </p>
        </div>
      </div>
    </div>
  );
};

export default FullScreenStoreBanner;
