import React from 'react';
import { firestore } from '../config/Firebase';
import { collection, onSnapshot, query, doc, getDoc, orderBy   } from "firebase/firestore";

import { ChatLeft, ChatRight, ChatLeftDM, ChatRightDM } from '../layouts/layout-chat';
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
        const messages_preview = docs.data();
        test = true

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
            if (isUserMessage) {
              return !group_data.is_chat ?
                <ChatRight chat_content={item} key={index}/> :
                <ChatRightDM chat_content={item} key={index} />;
            } else {
              return !group_data.is_chat ?
                <ChatLeft chat_content={item} key={index} /> :
                <ChatLeftDM chat_content={item} key={index} />;
            }
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
