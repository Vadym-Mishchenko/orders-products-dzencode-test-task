import { useState, useEffect, useRef } from 'react';
import './CardAvatar.css';

interface IProps {
  src: string;
  alt?: string;
  width: string;
}

export const CardAvatar = ({ src, alt = 'Product image', width }: IProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div className="card-avatar" style={{ width }} ref={ref}>
      {isVisible ? (
        <img src={src} alt={alt} className="card-avatar__img" />
      ) : (
        <div className="card-avatar__placeholder" />
      )}
    </div>
  );
};
