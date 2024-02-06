import React, { useReducer, useEffect } from 'react';
import ChatMenuHeader from '../components/chat-preview-header';
import ChatMenuBody from '../components/chat-preview-body';
import ChatPageHeader from '../components/chat-page-header';
import ChatPageFooter from '../components/chat-page-footer'
import ChatPageBody from '../components/chat-page-body';
import GetModalNewConv from '../modals/modal-new-conv';
import { getLoggedUser } from "../config/util";
import { NoConv } from '../lib/icon_and_loader';
import NavBar from "../components/BottomNavBar";

const ChatMenu = () => {
  const [task, updateTask] = useReducer((prev, next) => ({
    ...prev, ...next
  }),
   {
     user_id: getLoggedUser().uid,
     messages_preview: null,
     conv_preview_filter: '',
     window_width: window.innerWidth,
     open_chat_page: false,
     chat_id: '',
     avatar_preview : null,
     show_modal_new_conv: false,
     messages_body: null,
     avatar_carousel_preview: null,
     add_pic: '',
     avatar_chat_info: null,
     messages_input_footer: null,
     upload : false,
   }
  );

  useEffect(() => {
    const handleResize = () => {
      updateTask({
        window_width : window.innerWidth
      })
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [task.window_width]);

  return (
    <div className='h-screen flex flex-col justify-between'>
      <div className="flex flex-row w-screen h-screen">
        {((!task.open_chat_page && task.window_width < 640) || task.window_width > 640) && (
          <div
            className={` bg-white sm:max-w-sm w-full flex flex-col justify-between`}
          >
            <ChatMenuHeader task={task} updateTask={updateTask}/>
            <ChatMenuBody task={task} updateTask={updateTask}/>
          </div>
        )}
        {((task.open_chat_page && task.window_width < 640) || (task.chat_id && task.window_width > 640)) && (
          <div className={` bg-grey-1 w-full flex flex-col justify-between`}>
            <ChatPageHeader task={task} updateTask={updateTask}/>
            <ChatPageBody task={task} updateTask={updateTask} />
            <ChatPageFooter task={task} updateTask={updateTask} />
          </div>
        )}
        {task.window_width > 640 && !task.chat_id && (
          <div className="flex flex-col mx-auto mt-64">
            <NoConv />
          </div>
        )}
      </div>
      <NavBar/>
      <GetModalNewConv task={task} updateTask={updateTask} />
    </div>
  );
  
};

export default ChatMenu;