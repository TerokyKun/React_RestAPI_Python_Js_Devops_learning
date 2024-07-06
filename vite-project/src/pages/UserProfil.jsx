<<<<<<< HEAD
import React from "react";
import classes from "./UserProfil.module.scss";
import data from '../../public/dataBaseArtForTest.json';
import { useSelector } from "react-redux";  
import { selectIsAuth } from "../redux/slises/auth";

const UserProfil = () => {
    const isAuth = useSelector(selectIsAuth);
  return (

<>
   
  <div className={classes.gallery}>
      {data.map((item) => (
        <img className={classes.art} key={item.id} src={item.image} alt={`Image ${item.id}`} />
      ))}
    </div>
  
   
  

</>
  );
};




export default UserProfil;
=======
import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { selectIsAuth, selectToken } from "../redux/slises/auth";
import Burgermenu from "../components/UI/Burgermenu/Burgermenu";
import LazyLoad from 'react-lazyload';
import axios from 'axios';
import classes from "./UserProfil.module.scss";

const UserProfil = () => {
    const isAuth = useSelector(selectIsAuth);
    const token = useSelector(selectToken) || document.cookie.split('; ').find(row => row.startsWith('access_token=')).split('=')[1];
    const [imageData, setImageData] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null); // Объект, содержащий путь к изображению и данные изображения
    const [isDeleting, setIsDeleting] = useState(false);
    const modalRef = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://127.0.0.1:4000/imgdata', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const result = await response.json();
                console.log('Fetched data:', result); // Добавлено для вывода данных в консоль
                const sortedImageData = result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); // Сортируем imageData по убыванию createdAt
                setImageData(sortedImageData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [token]);

    const handleImageClick = (index) => {
        const selectedImageData = imageData[index];
        const parsedImageData = JSON.parse(selectedImageData.imageData); // Парсим JSON строку изображения
        setSelectedImage({ ...selectedImageData, ...parsedImageData }); // Сохраняем путь к изображению и данные изображения в selectedImage
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setSelectedImage(null);
    };

    const handleClickOutsideModal = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            closeModal();
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutsideModal);
        return () => {
            document.removeEventListener("mousedown", handleClickOutsideModal);
        };
    }, []);

    const handleDeleteClick = () => {
        if (window.confirm("Вы уверены, что хотите безвозвратно удалить изображение?")) {
            deleteImage();
        }
    };

    const deleteImage = async () => {
        setIsDeleting(true);
        try {
            await axios.delete('http://127.0.0.1:4000/deleteImg', { data: { imageName: selectedImage.imageName }, headers: { Authorization: `Bearer ${token}` } });
            alert("Изображение успешно удалено.");
            closeModal();
            setImageData(imageData.filter(img => img.imageName !== selectedImage.imageName));
        } catch (error) {
            console.error('Ошибка при удалении изображения:', error);
            alert("Не удалось удалить изображение.");
        } finally {
            setIsDeleting(false);
        }
    };


    return (
        <>
            <Burgermenu />
            <div className={classes.gallery}>
                {imageData.map((item, index) => {
                    const parsedImageData = JSON.parse(item.imageData); // Парсим JSON строку изображения
                    return (
                        <LazyLoad key={index} height={200} offset={100} once>
                            <div className={classes.imageCard} onClick={() => handleImageClick(index)}>
                                <img
                                    className={classes.art}
                                    src={`http://127.0.0.1:4000${item.imagePath}`}
                                    alt={`Image ${item.imageName}`}
                                />
                            </div>
                        </LazyLoad>
                    );
                })}
            </div>

            {modalOpen && selectedImage && (
                <div className={classes.modal}>
                    <div className={classes.modalContent} ref={modalRef}>
                        <div className={classes.imageDetails}>
                        <img
                            className={classes.modalImage}
                            src={`http://127.0.0.1:4000${selectedImage.imagePath}`}
                            alt={`Image ${selectedImage.imageName}`}
                        />
                            <p>Prompt: {selectedImage.prompt}</p>
                            <p>Negative Prompt: {selectedImage.negative_prompt}</p>
                            <p>Width: {selectedImage.width}</p>
                            <p>Height: {selectedImage.height}</p>
                            <p>Seed: {selectedImage.seed}</p>
                            <p>Steps: {selectedImage.steps}</p>
                            <p>CFG Scale: {selectedImage.cfg_scale}</p>
                            {/* Добавьте другие данные изображений здесь, если они есть */}
                        </div>
                        <button
                            className={classes.deleteButton}
                            onClick={handleDeleteClick}
                            disabled={isDeleting}
                        >
                            {isDeleting ? 'Удаление...' : 'Удалить'}
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default UserProfil;
>>>>>>> 1117adf (хранение изображений локально на серверном приложении, адаптив, интерфейс галлереи, фикс багов с токенами)
