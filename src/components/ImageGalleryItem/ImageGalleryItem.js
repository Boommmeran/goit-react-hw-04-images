import { useState } from 'react';
import { GalleryItem, GalleryImg } from './ImageGalleryItem.styled';
import Modal from 'react-modal';

const customStyles = {
  content: {
    top: '55%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    maxWidth: '3000px',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement('#root');

export function ImageGalleryItem({ imgUrl, tags, largeImg }) {
  const [modalIsOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(prevState => !prevState)
  }
  
  return (
    <GalleryItem>
      <GalleryImg src={imgUrl} alt={tags} onClick={toggleModal} />
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={toggleModal}
        style={customStyles}
        contentLabel="large image"
      >
        <img src={largeImg} alt={tags} width="700" />
      </Modal>
    </GalleryItem>
  );
};
