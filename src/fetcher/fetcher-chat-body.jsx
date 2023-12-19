import React from 'react';
import { firestore } from '../lib/Firebase';
import { collection, onSnapshot, query, doc, getDoc, orderBy   } from "firebase/firestore";

import { ChatLeft, ChatRight } from '../layouts/layout-chat';
import { NoConv } from '../lib/icon_and_loader';

const GetMessagePage = async ({ user_id, setMessages, chat_id}) => {
  try {
    if (!chat_id) {
      setMessages(
        <div className="flex align-middle justify-center items-center mx-auto h-5/6">
          <span className="loading loading-ball loading-lg bg-red_1"></span>
        </div>
      );
      return;
    }

    const docGroups = doc(firestore, "groups", chat_id);
    const snapGroups = await getDoc(docGroups);
    const group_params = snapGroups.data()

    const q = query(collection(firestore, 'groups',chat_id, 'messages'), orderBy('timestamp'));
    const unsubscribe_group = onSnapshot(q, (groupSnapshot) => {
      const messages_preview_list = [];

      groupSnapshot.forEach(async (docs) => {
        const messages_preview = docs.data();

        messages_preview_list.push(messages_preview);

        const chatMenuMessages = messages_preview_list.map((item, index) => (
          item.sender_id === user_id ? (
            <ChatRight chat_content={item} chat_params={group_params} key={index} />
          ) : (
            <ChatLeft chat_content={item} chat_params={group_params} key={index} />
          )
        ));

        setMessages(
          <>
            {chatMenuMessages}
          </>
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

export default GetMessagePage;