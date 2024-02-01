import React from 'react';
import { firestore } from '../config/Firebase';
import { collection, onSnapshot, query, where, getDocs, getDoc, doc  } from "firebase/firestore";
import {ChatMenuMessage, ChatMenuMessageLoader} from '../layouts/layout-preview-message';
import { NoConv, NoAvatarList } from '../lib/icon_and_loader';
import { formatTimestamp } from '../lib/script';
import { Each } from '../config/Each';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';

const GetMessagePreview = async ({ task, updateTask}) => {
  try {
    updateTask({
      messages_preview: (
        <div className="flex align-top justify-start items-start mx-auto flex-col">
          {[...Array(5)].map((_, index) => (
            <ChatMenuMessageLoader key={index} />
          ))}
        </div>
      ),
      avatar_carousel_preview:(
        <div className='carousel w-full flex felx-row'>
          {[...Array(5)].map((_, index) => (
            <div key={index} className="skeleton w-16 h-16 rounded-full shrink-0 mr-3 bg-yellow-1"></div>
          ))}
        </div>
      )
    })
    const queryGroups = query(collection(firestore, "groups"), where('users', 'array-contains', task.user_id),where('is_chat','==',task.show_preview_dm));
    const unsubscribe_groups = onSnapshot(queryGroups, async (groupsSnapshot) => {
      if(groupsSnapshot.empty) {
        updateTask({
          messages_preview: (
            <div className="flex align-middle justify-center items-center mx-auto mt-60">
              <NoConv />
            </div>
          )
        })
        return;
      }

      const groups_preview_list = [];

      await Promise.all(groupsSnapshot.docs.map(async (group) => {
        const group_data = group.data();
        const id_other_user = task.user_id === group_data.users[0] ? group_data.users[1] : group_data.users[0];
        const usersRef = doc(firestore, "users", id_other_user);
        const usersSnap =  await getDoc(usersRef);
        const user_data = usersSnap.data();
        const messagesQuery = collection(firestore, 'groups', group.id, 'messages');
        const messagesSnapshot = await getDocs(messagesQuery);
        
        let lastMessageData;
        let messages_not_view = 0;
        
        messagesSnapshot.forEach((message) => {
          const message_data = message.data();
        
          if (!message_data.view_by.includes(task.user_id)) {
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

        if(group_preview.title.toUpperCase().includes(task.conv_preview_filter.toUpperCase())){
          groups_preview_list.push(group_preview);
        }
      }));

      const chatMenuMessages = (
        <Each of={groups_preview_list} render={(item, index) => (
          <ChatMenuMessage group_preview={item} key={index} task={task} updateTask={updateTask} />
        )} />
      );

      const avatarList = (
        <Each of={groups_preview_list} render={(item, index) => (
          <div className="carousel-item" key={index}>
              <Avatar alt="Remy Sharp" src={item.avatar} sx={{width:'64px',height:'64px'}} className='mr-3'>
                {item.title.charAt(0)}
              </Avatar>
          </div>
        )} />
      );

      if(groups_preview_list.length === 0) {
        updateTask({
          avatar_carousel_preview: (
            <div className="flex flex-row justify-center">
             
            </div>
          )
        })
      }
      else{
        updateTask({
          avatar_carousel_preview: (
            <div className='carousel w-full flex felx-row'>
              {avatarList}
            </div>
          ),
        })
      }
      if(groups_preview_list.length === 0) {
        updateTask({
          messages_preview: (
            <div className="flex align-middle justify-center items-center mx-auto">
              <NoConv />
            </div>
          )
        })
      }
      else {
        updateTask({
          messages_preview: (
            <div className="flex align-top justify-start items-start mx-auto flex-col">
              {chatMenuMessages}
            </div>
          )
        })
      }
    });

    return () => unsubscribe_groups();
  } catch (error) {
    console.error('Error fetching messages: ', error);
  }
};



export default GetMessagePreview;

