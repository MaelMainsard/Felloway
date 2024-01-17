import React from 'react';
import { firestore } from '../config/Firebase';
import { collection, onSnapshot, query, doc, getDoc, orderBy   } from "firebase/firestore";

import { ChatLayout } from '../layouts/layout-chat';
import { NoConv } from '../lib/icon_and_loader';
import { getLoggedUser } from "../config/util";

const GetMessagePage = async ({ setMessages, chat_id}) => {

  try {
    let user_id = getLoggedUser().uid;
    
    const docGroups = doc(firestore, "groups", chat_id);
    const snapGroups = await getDoc(docGroups);
    const group_data = snapGroups.data();

    const q = query(collection(firestore, 'groups', chat_id, 'messages'), orderBy('timestamp'));
    const unsubscribe_group = onSnapshot(q, (groupSnapshot) => {
      const messages_preview_list = [];
      let test = false

      groupSnapshot.forEach(async(docs) => {
        let messages_preview = docs.data();
        test = true

        messages_preview = {
          ...messages_preview, // Utilisation de spread operator pour inclure les propriétés existantes
          is_chat: group_data.is_chat
        };

        messages_preview_list.push(messages_preview);

        if (messages_preview_list.length === 0) {
          setMessages(
            <div className="flex align-middle justify-center items-center mx-auto mt-60">
              <NoConv />
            </div>
          );
          return;
        }

        const chatMenuMessages = messages_preview_list
          .map((item, index) => {
            const isUserMessage = item.sender_id === user_id;
            return <ChatLayout chat_content={item} right={isUserMessage} key={index}/>
          });
      
        setMessages(
          <>
            {chatMenuMessages}
          </>
        );


      });

      if(!test){
        setMessages('')
      }
    });
    return () => unsubscribe_group();

  } catch (error) {
    console.error('Error fetching messages: ', error);
  }
};

export default GetMessagePage;
