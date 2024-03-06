import React, { useEffect,useState } from 'react';
import GetMessagePreview from '../fetcher/fetcher-chat-preview';
import { Scrollbars } from 'react-custom-scrollbars';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import GroupIcon from '@mui/icons-material/Group';
import PersonIcon from '@mui/icons-material/Person';

const ChatMenuBody = ({ task, updateTask }) => {

  const [filter, setFilter] = useState(null)


  useEffect(() => {
    GetMessagePreview({task,updateTask});
  }, [task.conv_preview_filter,updateTask]); 

  return (
    <div className='h-full flex flex-col'>
      <div className='bg-green-1 rounded-b-2xl shadow-md p-4'>
        {task.avatar_carousel_preview}
      </div>
      <div className='flex flex-row items-center space-x-2 m-6'>
        <div className="flex flex-row items-center justify-end w-full">
          <input
            className="input rounded-full bg-grey-1 w-full border-none text-xs p-5 pr-10 shadow-md focus-border-none"
            placeholder="Recherche..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
          <SearchIcon onClick={()=>{updateTask({conv_preview_filter: filter})}} className='text-green-1 absolute mr-3 cursor-pointer' />
        </div>
      </div>
      <Scrollbars autoHide>
        <div className={`p-2 space-y-5 mt-5 carousel`}>
          {task.messages_preview}
        </div>
      </Scrollbars>
    </div>
  );
};

export default ChatMenuBody;
