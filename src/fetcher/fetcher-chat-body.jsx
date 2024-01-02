import React, {useEffect,useRef} from 'react';
import { firestore } from '../lib/Firebase';
import { collection, onSnapshot, query, doc, getDoc, orderBy   } from "firebase/firestore";

import { ChatLeft, ChatRight, ChatLeftDM, ChatRightDM } from '../layouts/layout-chat';
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
    const group_data = snapGroups.data();
    let have_messages = false

    const q = query(collection(firestore, 'groups', chat_id, 'messages'), orderBy('timestamp'));
    const unsubscribe_group = onSnapshot(q, (groupSnapshot) => {
      const messages_preview_list = [];

      groupSnapshot.forEach(async (docs) => {
        const messages_preview = docs.data();
        have_messages = true

        const usersRef = doc(firestore, "users", messages_preview.sender_id);
        const usersSnap = await getDoc(usersRef);
        const user_data = usersSnap.data();

        let group_preview = {
          avatar: group_data.group_img ? group_data.group_img : user_data.avatar,
          title: (user_data.firstName !== undefined || user_data.lastName !== undefined) ? (user_data.firstName + " " + user_data.lastName) : null,
        }

        messages_preview_list.push(messages_preview);

        const chatMenuMessages = messages_preview_list
          // .slice()
          // .sort((a, b) => a.timestamp - b.timestamp)
          .map((item, index) => (
            item.sender_id === user_id ? (
              !group_data.is_chat ?
                <ChatRight chat_content={item} chat_params={group_preview} key={index} /> :
                <ChatRightDM chat_content={item} key={index} />
            ) : (
              !group_data.is_chat ?
                <ChatLeft chat_content={item} chat_params={group_preview} key={index} /> :
                <ChatLeftDM chat_content={item} key={index} />
            )
          ));


        if (messages_preview_list.length === 0 && have_messages) {
          setMessages(
            <div className="flex align-middle justify-center items-center mx-auto mt-60">
              <NoConv />
            </div>
          );
        }

        setMessages(
          <>
           {chatMenuMessages}
          </>
        );

      });


    });
    return () => unsubscribe_group();

  } catch (error) {
    console.error('Error fetching messages: ', error);
  }
};

export default GetMessagePage;
