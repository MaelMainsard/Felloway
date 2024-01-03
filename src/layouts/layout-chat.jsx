import {AvatarLayoutPage} from "../layouts/layout-avatar"
import { firestore } from '../config/Firebase';
import { doc, getDoc   } from "firebase/firestore";
import { useEffect, useState } from 'react';

export const ChatLeft = ({ content, data }) => {

  const [groupPreview,setGroupPreview] = useState({
    avatar: null,
    title: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      const usersRef = doc(firestore, "users", content.sender_id);
      const usersSnap = await getDoc(usersRef);
      const user_data = usersSnap.data();

      const group_preview = {
        avatar: data.group_img ? data.group_img : user_data.avatar,
        title: (user_data.firstName !== undefined || user_data.lastName !== undefined) ? (user_data.firstName + " " + user_data.lastName) : null,
      }
  
      setGroupPreview(group_preview)
    };


    return () => fetchData()
  }, [content,data]); 


  return (
    <div className="chat chat-start mb-3">
      <AvatarLayoutPage message_preview={groupPreview} />
      <div className="chat-header flex flex-row items-center">
        <span className="mr-2">{groupPreview.title}</span>
        <time className="text-xs opacity-50">{formatTimestamp(content.timestamp)}</time>
      </div>
      <div className="chat-bubble bg-white text-font_1">{content.content}</div>
    </div>
  );
};

export const ChatRight = ({ content, data }) => {

  const [groupPreview,setGroupPreview] = useState({
    avatar: null,
    title: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      const usersRef = doc(firestore, "users", content.sender_id);
      const usersSnap = await getDoc(usersRef);
      const user_data = usersSnap.data();

      const group_preview = {
        avatar: data.group_img ? data.group_img : user_data.avatar,
        title: (user_data.firstName !== undefined || user_data.lastName !== undefined) ? (user_data.firstName + " " + user_data.lastName) : null,
      }
  
      setGroupPreview(group_preview)
    };


    return () => fetchData()
  }, [content,data]); 
  
  return (
    <div className="chat chat-end mb-3">
      <AvatarLayoutPage message_preview={groupPreview} />
      <div className="chat-header flex flex-row items-center">
        <span className="mr-2">{groupPreview.title}</span>
        <time className="text-xs opacity-50">{formatTimestamp(content.timestamp)}</time>
      </div>
      <div className="chat-bubble bg-blue-2 text-white">{content.content}</div>
    </div>
  );
};

export const ChatLeftDM = ({chat_content}) => {

  return(
    <div className="chat chat-start mb-3">
        <div className="chat-bubble bg-white text-font_1">{chat_content.content}</div>
        <div className="chat-footer opacity-50">
          <time className="text-xs text-font_1">{formatTimestamp(chat_content.timestamp)}</time>
        </div>
    </div>
  );
};

export const ChatRightDM = ({chat_content}) => {

  return(
    <div className="chat chat-end mb-3">
        <div className="chat-bubble bg-blue-2 text-white">{chat_content.content}</div>
        <div className="chat-footer opacity-50">
          <time className="text-xs text-font_1">{formatTimestamp(chat_content.timestamp)}</time>
        </div>
    </div>
  );
};


function formatTimestamp(timestamp) {
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
    const day = messageDate.getDate();
    const month = messageDate.getMonth() + 1;
    const year = messageDate.getFullYear();
    return `${day}/${month}/${year}`;
  }
}
