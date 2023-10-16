import { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Searchbar } from 'components/Searchbar';
import { ImageGallery } from 'components/ImageGallery';
import { Loader } from 'components/Loader';
import { Button } from 'components/Button';
import { fetchImages } from 'helpers/api';
import { Container, Error } from './App.styled';

export function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [showLoadBtn, setShowLoadBtn] = useState(false);

  useEffect(() => {
    if (!searchQuery) {
      return;
    }
    const fetchData = async () => {
      try {
        const foundImages = await fetchImages(searchQuery, page);

        setImages(prevState => [...prevState, ...foundImages.hits]);
        setShowLoadBtn(true);

        if (foundImages.hits.length < 12) {
          setShowLoadBtn(false);
        }
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [searchQuery, page]);

  const handleSubmit = ({ searchQuery }, { resetForm }) => {
    if (!searchQuery.trim()) {
      return toast.error('Please insert someting to search');
    }
    setSearchQuery(searchQuery);
    setPage(1);
    setImages([]);
    setShowLoadBtn(false);
    resetForm();
  };

  const handleButtonClick = () => {
    setPage(prevState => prevState + 1);
  };

  return (
    <Container>
      <Searchbar onSubmit={handleSubmit} />
      {loading && <Loader />}
      {error && (
        <Error>Oh nooo, something went wront, please reload this page!</Error>
      )}
      {images.length > 0 && <ImageGallery images={images} />}
      {showLoadBtn && <Button onClick={handleButtonClick} />}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#FF0000',
            color: '#fff',
          },
        }}
      />
    </Container>
  );
}
