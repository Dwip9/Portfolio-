import React, { useState } from 'react';
import { User, Image as ImageIcon } from 'lucide-react';

interface SkeletonImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  containerClassName?: string;
  fallbackIcon?: React.ReactNode;
  showIconOnEmpty?: boolean;
}

export const SkeletonImage: React.FC<SkeletonImageProps> = ({
  src,
  alt = 'Image',
  className = '',
  containerClassName = '',
  fallbackIcon,
  showIconOnEmpty = false,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const hasSrc = Boolean(src && src.trim() !== '');

  return (
    <div className={`relative overflow-hidden bg-slate-900/90 ${containerClassName}`}>
      {/* Skeleton Shimmer Wave Effect while loading or if no image is uploaded yet */}
      {(!isLoaded || !hasSrc || hasError) && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-slate-900 border border-slate-800/80">
          {/* Skeleton Pulse Background */}
          <div className="absolute inset-0 bg-slate-800/60 animate-pulse" />
          
          {/* Animated Shimmer Wave across container */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-400/15 to-transparent -translate-x-full animate-shimmer-wave" />

          {/* Optional subtle placeholder icon if no src present */}
          {!hasSrc && showIconOnEmpty && (
            <div className="flex flex-col items-center justify-center p-4 text-slate-600 gap-1 z-20">
              {fallbackIcon || <User className="w-8 h-8 stroke-[1.5] text-slate-600/70" />}
            </div>
          )}
        </div>
      )}

      {/* Actual Image Element (only renders when src is present) */}
      {hasSrc && !hasError && (
        <img
          src={src}
          alt={alt}
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          className={`transition-opacity duration-700 ease-in-out ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          } ${className}`}
          {...props}
        />
      )}
    </div>
  );
};

