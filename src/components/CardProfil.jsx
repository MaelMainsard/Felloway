import React, { useState, useEffect } from 'react';
import { getLoggedUser } from '../config/util';
import { app } from '../config/Firebase';
import { getFirestore, collection, addDoc, deleteDoc, query, where, getDocs } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { ImageList, ImageListItem } from '@mui/material';
import { Tooltip, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const CardProfil = () => {
  const db = getFirestore(app);
  const storage = getStorage(app);
  let user = getLoggedUser();

    const [images, setImages] = useState([]);
    const [imageUrl, setImageUrl] = useState('');
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
      // Récupération des images depuis Firestore lors du chargement initial
      const fetchImages = async () => {
        const userImagesRef = collection(db, 'users', user.uid, 'images');
        const snapshot = await getDocs(userImagesRef);
        const imageUrls = snapshot.docs.map((doc) => doc.data().url);
        setImages(imageUrls);
      };

      fetchImages();
    }, [db]);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return; // Vérification si un fichier est sélectionné
  
    const storageRef = ref(storage, `images/${file.name}`);
    setUploading(true);
  
    try {
      await uploadBytes(storageRef, file);
      const imageUrl = await getDownloadURL(storageRef);
  
      // Ajouter l'URL de l'image à Firestore
      const userImagesRef = collection(db, 'users', user.uid, 'images');
      await addDoc(userImagesRef, { url: imageUrl });
  
      setImages([...images, imageUrl]);
      setImageUrl('');
      setUploading(false);
    } catch (error) {
      console.error('Error uploading image:', error);
      setUploading(false);
      // Gérer l'erreur d'upload
    }
  };

  const handleImageDelete = async (index, imageUrlToDelete) => {
    // Supprimer l'image de Firestore et du stockage
    const userImagesRef = collection(db, 'users', user.uid, 'images');
    const q = query(userImagesRef, where('url', '==', imageUrlToDelete));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach(async (doc) => {
      await deleteDoc(doc.ref);
    });

    const storageRef = ref(storage, imageUrlToDelete);
    await deleteObject(storageRef);

    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
  };

  function srcset(image, size, rows = 1, cols = 1) {
    return {
      src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
      srcSet: `${image}?w=${size * cols}&h=${
        size * rows
      }&fit=crop&auto=format&dpr=2 2x`,
    };
  }

  return (
    <div>



  

    </div>

   
  );
};

export default CardProfil;
