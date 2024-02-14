import React, { useEffect, useRef } from 'react';
import GetMessagePage from '../fetcher/fetcher-chat-body';
import { Scrollbars } from 'react-custom-scrollbars';
import ModalAddPicture from '../modals/modal-add-picture';

const ChatPageBody = ({ task, updateTask}) => {
  
  const scrollbarsRef = useRef(null);

  useEffect(() => {
      GetMessagePage({ task, updateTask });
  }, [task.chat_id, task.user_id]);

  useEffect(() => {
    scrollbarsRef.current.scrollToBottom();
  }, [task.messages_body]);

  return (
    !task.add_pic ? (
      <Scrollbars autoHide ref={scrollbarsRef}>
        <div className="flex flex-col align-top justify-start items-stretch h-fit p-3">
          {task.messages_body}
        </div>
      </Scrollbars>
    ) : (
      <ModalAddPicture task={task} updateTask={updateTask}/>
    )
  );
};

export default ChatPageBody;
