import React from 'react';
import { firestore } from '../config/Firebase';
import { collection, onSnapshot, query, where, getDocs, getDoc, doc  } from "firebase/firestore";
import {ChatMenuMessage} from '../layouts/layout-preview-message';
import { NoConv } from '../lib/icon_and_loader';
import { getLoggedUser } from "../config/util";
import { formatTimestamp } from '../lib/script';

const GetMessagePreview = async ({ setMessages, state_show_message, set_open_chat, set_chat }) => {
  try {

    let user_id = getLoggedUser().uid;

    const queryGroups = query(collection(firestore, "groups"), where('users', 'array-contains', user_id),where('is_chat','==',state_show_message));
    const unsubscribe_groups = onSnapshot(queryGroups, async (groupsSnapshot) => {
      if(groupsSnapshot.empty) {
        setMessages(
          <div className="flex align-middle justify-center items-center mx-auto mt-60">
            <NoConv />
          </div>
        );
        return;
      }

      const groups_preview_list = [];

      await Promise.all(groupsSnapshot.docs.map(async (group) => {
        const group_data = group.data();
        const id_other_user = user_id === group_data.users[0] ? group_data.users[1] : group_data.users[0];
        const usersRef = doc(firestore, "users", id_other_user);
        const usersSnap =  await getDoc(usersRef);
        const user_data = usersSnap.data();
        const messagesQuery = collection(firestore, 'groups', group.id, 'messages');
        const messagesSnapshot = await getDocs(messagesQuery);
        
        let lastMessageData;
        let messages_not_view = 0;
        
        messagesSnapshot.forEach((message) => {
          const message_data = message.data();
        
          if (!message_data.view_by.includes(user_id)) {
            messages_not_view++;
          }
        
          if (!lastMessageData || message_data.timestamp > lastMessageData.timestamp) {
            lastMessageData = message_data;
          }
        });

        let group_preview = {
          id: group.id,
          avatar: !group_data.is_chat ? group_data.group_img : user_data.avatar || null,
          title:  !group_data.is_chat ? group_data.group_name : (user_data.firstName !== undefined || user_data.lastName !== undefined) ? (user_data.firstName + " " + user_data.lastName) : null,
          message: lastMessageData && lastMessageData.content || null,
          timestamp: formatTimestamp(lastMessageData && lastMessageData.timestamp || null),
          notification: messages_not_view,
          online : user_data.online,
          is_chat: group_data.is_chat
        }
        
        groups_preview_list.push(group_preview);
      }));

      const chatMenuMessages = groups_preview_list.map((item, index) => (
        <ChatMenuMessage group_preview={item} key={index} open_chat={set_open_chat} chat={set_chat} user_id={user_id} />
      ));

      setMessages(
        <div className="flex align-top justify-start items-start mx-auto flex-col">
          {chatMenuMessages}
        </div>
      );
    });

    return () => unsubscribe_groups();
  } catch (error) {
    console.error('Error fetching messages: ', error);
  }
};



export default GetMessagePreview;

