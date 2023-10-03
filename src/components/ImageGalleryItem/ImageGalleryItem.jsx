import { Component } from 'react';

export class ImageGalleryItem extends Component {
  handleImgToken = () => {
    const { item, onOpenModal } = this.props;
    onOpenModal(item);
  };
  render() {
    const { tags, webformatURL } = this.props.item;
    return (
      <li>
        <img src={webformatURL} alt={tags} />
      </li>
    );
  }
}
