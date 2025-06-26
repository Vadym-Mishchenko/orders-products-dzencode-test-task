import './CardAvatar.css';

interface Iprops {
  src: string;
  alt?: string;
  width: string;
}

export const CardAvatar = ({ src, alt = 'Product image', width }: Iprops) => {
  return (
    <div className="card-avatar" style={{ width }}>
      <img src={src} alt={alt} className="card-avatar__img" />
    </div>
  );
};
