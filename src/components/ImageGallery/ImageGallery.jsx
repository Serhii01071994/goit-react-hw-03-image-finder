import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

export const ImageGallery = ({ items, onOpenModal }) => {
  return (
    <div>
      <ul className="gallery">
        {items.map(item => (
          <ImageGalleryItem
            key={item.id}
            item={item}
            onOpenModal={onOpenModal}
          />
        ))}
      </ul>
    </div>
  );
};
