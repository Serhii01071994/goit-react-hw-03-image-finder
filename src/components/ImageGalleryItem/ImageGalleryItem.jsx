import { Component } from 'react';

export class ImageGalleryItem extends Component {
  handleImgToken = () => {
    const { item, onOpenModal } = this.props;
    onOpenModal(item);
  };
  render() {
    const { tags, webformatURL } = this.props.item;
    return (
      <li onClick={this.handleImgToken} className="ImageGalleryItem">
        <img className="ImageGalleryItem-image" src={webformatURL} alt={tags} />
      </li>
    );
  }
}
