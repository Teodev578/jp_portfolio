import { LazyLoadImage, LazyLoadImageProps } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

interface OptimizedImageProps extends Omit<LazyLoadImageProps, 'effect'> {
  src: string;
  alt: string;
  placeholderSrc?: string;
  className?: string;
}

export const OptimizedImage = ({ src, alt, placeholderSrc, className, ...props }: OptimizedImageProps) => {
  return (
    <LazyLoadImage
      alt={alt}
      effect="blur"
      src={src}
      placeholderSrc={placeholderSrc}
      className={className}
      wrapperProps={{
        style: { transitionDelay: "0.2s" },
      }}
      {...props}
    />
  );
};
