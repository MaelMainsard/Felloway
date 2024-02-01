import React, { useState,useRef } from 'react';
import { getLoggedUser } from "../config/util";
import {ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { firestore,storage } from '../config/Firebase';
import { collection, addDoc, serverTimestamp, updateDoc, doc, getDoc } from "firebase/firestore"; 
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';

export function formatTimestamp(timestamp) {
    if (!timestamp) {
      return '';
    }
  
    const { seconds, nanoseconds } = timestamp;
  
    // Convertir les secondes en millisecondes et ajouter les nanosecondes converties en millisecondes
    const timestampInMilliseconds = seconds * 1000 + nanoseconds / 1e6;
  
    const messageDate = new Date(timestampInMilliseconds);
    const currentDate = new Date();
  
    const isToday =
      messageDate.getDate() === currentDate.getDate() &&
      messageDate.getMonth() === currentDate.getMonth() &&
      messageDate.getFullYear() === currentDate.getFullYear();
  
    if (isToday) {
      // Si c'est aujourd'hui, retournez l'heure et les minutes
      const hours = messageDate.getHours();
      const minutes = String(messageDate.getMinutes()).padStart(2, '0');
      return `${hours}:${minutes}`;
    } else {
      // Sinon, retournez la date au format jour/mois/année
      const day = messageDate.getDate() < 10 ? '0'+messageDate.getDate() : messageDate.getDate()
      let month = messageDate.getMonth() + 1
      month = month < 10 ? '0'+month : month
      const year = messageDate.getFullYear();
      return `${day}/${month}/${year}`;
    }
}

export async function newMessage(chat_id, content) {
  let user_id = getLoggedUser().uid;
  const usersRef = doc(firestore, "users", user_id);
  const usersSnap = await getDoc(usersRef);
  const user_data = usersSnap.data();

  await addDoc(collection(firestore, "groups", chat_id, "messages"), {
    content: content,
    sender_id: user_id,
    sender_name: user_data.firstName + " " + user_data.lastName,
    sender_img: user_data.avatar,
    timestamp: serverTimestamp(),
    view_by: [user_id],
  });

  await updateDoc(doc(firestore, "groups", chat_id), {
    last_message: content,
    last_message_timestamp: serverTimestamp(),
  });
}

async function newPicture(chat_id, url, text) {

  let user_id = getLoggedUser().uid;
  const usersRef = doc(firestore, "users", user_id);
  const usersSnap = await getDoc(usersRef);
  const user_data = usersSnap.data();

  await addDoc(collection(firestore, "groups", chat_id, "messages"), {
    content: text,
    content_img: url,
    sender_id: user_id,
    sender_name: user_data.firstName + " " + user_data.lastName,
    sender_img: user_data.avatar,
    timestamp: serverTimestamp(),
    view_by: [user_id],
  });

  await updateDoc(doc(firestore, "groups", chat_id), {
    last_message: text,
    last_message_timestamp: serverTimestamp(),
  });
}


export async function uploadPicture(chat_id,set_add_pic, url,text){

  var timestamp = Date.now();
  const storageRef = ref(storage, `images/${timestamp}`);
  const uploadTask = uploadBytesResumable(storageRef, url);
  
  // Set up the event listener only once
  uploadTask.on(
    'state_changed',
    (snapshot) => {
      // Handle upload progress here if needed
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    },
    (error) => {
      // Handle errors during upload here
      console.error("Upload error:", error);
    },
    async () => {
      // This is called on successful completion of the upload
      const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
      console.log(`L'image a été téléversée avec succès. URL : ${downloadURL}`);
      await newPicture(chat_id, downloadURL, text);
      set_add_pic('');
    }
  );
}

