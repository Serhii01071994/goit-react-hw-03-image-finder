import { Component } from 'react';
import { StyledAppContainer } from './App.styled';
import { fetchPhoto } from 'servises/api';

import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { LoadMoreButton } from './LoadMoreButton/LoadMoreButton';
import Notiflix from 'notiflix';
import Modal from './Modal/Modal';

export class App extends Component {
  state = {
    query: '',
    items: [],
    page: 1,
    total: 0,
    error: null,
    isLoading: false,
    modal: {
      isOpen: false,
      data: null,
    },
    selectedImage: null,
  };

  fetchAllPhotos = async () => {
    try {
      this.setState({ isLoading: true });
      const photo = await fetchPhoto(this.state.query, this.state.page);

      if (photo.hits.length === 0) {
        Notiflix.Notify.info('Изображение не найдено.');
      } else {
        this.setState({ items: photo.hits, total: photo.total });
        Notiflix.Notify.success('Изображение успешно найдено.');
      }
    } catch (error) {
      Notiflix.Notify.failure('Произошла ошибка при поиске изображения.');
      this.setstate({ error: error.message });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  loadMoreImages = async () => {
    const { query, page, items, total } = this.state;
    const nextPage = page + 1;

    if (items.length >= total) {
      Notiflix.Notify.info('Больше изображений не найдено.');
      return;
    }

    try {
      const photo = await fetchPhoto(query, nextPage);

      if (photo.hits.length === 0) {
        Notiflix.Notify.info('Больше изображений не найдено.');
      } else {
        this.setState(prevState => ({
          items: [...prevState.items, ...photo.hits],
          page: nextPage,
        }));
        Notiflix.Notify.success('Изображения успешно загружены.');
      }
    } catch (error) {
      Notiflix.Notify.failure('Произошла ошибка при загрузке изображений.');
      this.setState({ error: error.message });
    }
  };

  handleSearch = query => {
    if (query.trim() === '') {
      Notiflix.Notify.warning('Введите поисковый запрос.');
      return;
    }

    this.setState({ query, page: 1, items: [], error: null }, () => {
      this.fetchAllPhotos();
    });
  };

  checkLastItems = () => {
    const { items, total } = this.state;
    return items.length === total;
  };

  onOpenModal = modalData => {
    this.setState({
      modal: {
        isOpen: true,
        data: modalData,
      },
      selectedImage: modalData,
    });
  };

  onCloseModal = () => {
    this.setState({
      modal: {
        isOpen: false,
        data: null,
      },
      selectedImage: null,
    });
  };

  render() {
    const showPhotos =
      Array.isArray(this.state.items) && this.state.items.length;
    const { items, selectedImage, isLoading, error } = this.state;
    const isLastItems = this.checkLastItems();
    return (
      <StyledAppContainer>
        <Searchbar handleSearch={this.handleSearch} />
        {isLoading && (
          <div>
            <p>Loading..</p>
          </div>
        )}
        {showPhotos && (
          <div>
            <ImageGallery items={items} onOpenModal={this.onOpenModal} />
            <LoadMoreButton
              onLoadMore={this.loadMoreImages}
              isLastItems={isLastItems}
            />
          </div>
        )}
        {error && <p>{error}</p>}
        <Modal selectedImage={selectedImage} onCloseModal={this.onCloseModal} />
      </StyledAppContainer>
    );
  }
}
