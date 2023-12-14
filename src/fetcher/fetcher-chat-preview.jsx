import React from 'react';
import { firestore } from '../lib/Firebase';
import { collection, onSnapshot,getDocs, query, where  } from "firebase/firestore";
import {ChatMenuMessage} from '../layouts/layout-preview-message';

const GetMessagePreviewDM = async ({ user_id, setMessages, state_show_message }) => {
  try {
    if (!user_id) {
      setMessages(
        <div className="flex align-middle justify-center items-center mx-auto h-5/6">
          <span className="loading loading-ball loading-lg bg-red_1"></span>
        </div>
      );
      return;
    }

    const q = query(collection(firestore, 'groups'), where(`users.${user_id}`, '!=', null),where('is_chat','==',state_show_message));
    const unsubscribe_group = onSnapshot(q, (groupSnapshot) => {
      const messages_preview_list = [];

      groupSnapshot.forEach(async (docs) => {
        const messages_preview = docs.data();

        const id = user_id === Object.keys(messages_preview.users)[0] ? Object.keys(messages_preview.users)[1] : Object.keys(messages_preview.users)[0];

        messages_preview_list.push({
          img_src: messages_preview.group_img ? messages_preview.group_img : messages_preview.users[id].avatar,
          chat_name:  messages_preview.group_name ? messages_preview.group_name : messages_preview.users[id].name,
          last_chat_hour: formatTimestamp(messages_preview.last_message_timestamp),
          last_chat_message: messages_preview.last_message,
          chat_number: messages_preview.users[user_id].not_view,
        });

        const chatMenuMessages = messages_preview_list.map((item, index) => (
          <ChatMenuMessage
            key={index}
            img_src={item.img_src}
            chat_name={item.chat_name}
            last_chat_hour={item.last_chat_hour}
            last_chat_message={item.last_chat_message}
            chat_number={item.chat_number}
          />
        ));

        setMessages(
          <div className="flex align-top justify-start items-start mx-auto flex-col">
            {chatMenuMessages}
          </div>
        );
      });
    });
    return () => unsubscribe_group();

  } catch (error) {
    console.error('Error fetching messages: ', error);
  }
};
function formatTimestamp(timestamp) {
  if (!timestamp) {
    return 'N/A';
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

export default GetMessagePreviewDM;