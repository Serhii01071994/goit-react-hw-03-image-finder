import React, { Component } from 'react';

export default class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = event => {
    if (event.code === 'Escape') {
      this.props.onCloseModal();
    }
  };

  handleOverlayClick = event => {
    if (event.target === event.currentTarget) {
      this.props.onCloseModal();
    }
  };

  render() {
    const { selectedImage } = this.props;

    if (!selectedImage) return null;

    const { tags, largeImageURL } = selectedImage;

    return (
      <div className="Overlay " onClick={this.handleOverlayClick}>
        <div className="Modal">
          <button onClick={this.props.onCloseModal}></button>
          <img
            src={largeImageURL}
            alt={tags}
            loading="lazy"
            className="largeImg"
          />
        </div>
      </div>
    );
  }
}
