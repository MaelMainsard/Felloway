import React, { useEffect, useRef } from 'react';
import GetMessagePage from '../fetcher/fetcher-chat-body';
import ModalAddPicture from '../modals/modal-add-picture';
import Box from '@mui/material/Box';

const ChatPageBody = ({ task, updateTask}) => {
  

  useEffect(() => {
      GetMessagePage({ task, updateTask });
  }, [task.chat_id, task.user_id]);

  return (
    !task.add_pic ? (
      <div className='flex flex-col align-top justify-start items-stretch h-fit p-3'>
          {task.messages_body}
      </div>
    ) : (
      <ModalAddPicture task={task} updateTask={updateTask}/>
    )
  );
};

export default ChatPageBody;
