import React from 'react';
import { firestore } from '../lib/Firebase';
import { collection, onSnapshot,getDocs, query, where  } from "firebase/firestore";
import {ChatMenuMessage} from '../layouts/layout-preview-message';
import { NoConv } from '../lib/icon_and_loader';

const GetMessagePreview = async ({ user_id, setMessages, state_show_message, set_open_chat, set_chat }) => {
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
        const messages_preview = { ...docs.data(), id: docs.id };

        messages_preview_list.push(messages_preview);

        const chatMenuMessages = messages_preview_list.map((item, index) => (
          <ChatMenuMessage message_preview={item} key={index} user_id={user_id} open_chat={set_open_chat} chat={set_chat}/>
        ));

        setMessages(
          <div className="flex align-top justify-start items-start mx-auto flex-col">
            {chatMenuMessages}
          </div>
        );
      });

      if(messages_preview_list.length === 0) {
        setMessages(
          <div className="flex align-middle justify-center items-center mx-auto mt-60">
            <NoConv />
          </div>
        );
      }


    });
    return () => unsubscribe_group();

  } catch (error) {
    console.error('Error fetching messages: ', error);
  }
};

export default GetMessagePreview;