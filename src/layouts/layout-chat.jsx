import {AvatarLayoutPage} from "./layout-avatar"
import {formatTimestamp} from '../lib/script'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import DeleteIcon from '@mui/icons-material/Delete';
import { firestore } from '../config/Firebase';
import { doc, deleteDoc } from "firebase/firestore";
import CheckIcon from '@mui/icons-material/Check';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import Avatar from '@mui/material/Avatar';

export const ChatLayout = ({ chat_content, right }) => {


  async function deleteChat(){
    await deleteDoc(doc(firestore, `groups/${chat_content.group_id}/messages/${chat_content.message_id}`));
  }

  return (
    <>
      {chat_content.content_img !== undefined && (
        <ChatImg chat_content={chat_content} right={right} />
      )}
      {chat_content.content !== '' && chat_content.content_img == undefined &&(
        <ChatText chat_content={chat_content} right={right} />
      )}
    </>
  )

};

export const ChatText = ({ chat_content, right }) => {

  return (
    <div className={`chat ${right ? 'chat-end' : 'chat-start'}`}>
      {!chat_content.is_chat && (
        <div className="chat-start chat-image">
        <Avatar alt="avatar" src={chat_content.sender_img} sx={{ width: '40px', height: '40px' }} className='mr-3'>
          {chat_content.sender_name.charAt(0)}
        </Avatar>
      </div>
      )}
      <div className=" chat-header">
        {!chat_content.is_chat && (
          <span className="mr-2 opacity-80 text-xs">{chat_content.sender_name}</span>
        )}
      </div>
      <div className={`chat-bubble ${right ? 'bg-yellow-1' : 'bg-green-1'} text-white`}>
        {chat_content.content}
      </div>
      <div className="chat-footer">
        {right && (
          chat_content.view_by.length > 1 ?
          <DoneAllIcon style={{ fontSize: '15px' }} className="text-blue-2 opacity-50" /> :
          <CheckIcon style={{ fontSize: '15px' }} className="opacity-50" />
        )}
        <time className=" text-xs opacity-50 ml-1">{formatTimestamp(chat_content.timestamp)}</time>
      </div>
    </div>
  )
};

export const ChatImg = ({ chat_content, right }) => {
  
  const imgs = chat_content.content_img.split("[s]")

  return (
    <div className={`chat ${right ? 'chat-end' : 'chat-start'}`}>
      {!chat_content.is_chat && (
        <div className="chat-start chat-image">
        <Avatar alt="avatar" src={chat_content.sender_img} sx={{ width: '40px', height: '40px' }} className='mr-3'>
          {chat_content.sender_name.charAt(0)}
        </Avatar>
      </div>
      )}
      <div className=" chat-header">
        {!chat_content.is_chat && (
          <span className="mr-2 opacity-80 text-xs">{chat_content.sender_name}</span>
        )}
      </div>
      <div className={`chat-bubble ${right ? 'bg-yellow-1' : 'bg-green-1'} text-white`}>
        {chat_content.content}
        {imgs.length > 1 ?
          <>
            <ViewBoxMutlipleImg img={imgs} />
            <button class="text-sm font-medium inline-flex items-center hover:underline">
              <svg class="w-3 h-3 me-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 18">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 1v11m0 0 4-4m-4 4L4 8m11 4v3a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-3" />
              </svg>
              Save all</button>
          </>
          :
          <ViewBoxImg img={imgs} />
        }
      </div>
      <div className="chat-footer">
        {right && (
          chat_content.view_by.length > 1 ?
          <DoneAllIcon style={{ fontSize: '15px' }} className="text-blue-2 opacity-50" /> :
          <CheckIcon style={{ fontSize: '15px' }} className="opacity-50" />
        )}
        <time className=" text-xs opacity-50 ml-1">{formatTimestamp(chat_content.timestamp)}</time>
      </div>
    </div>
  )
};

export const ViewBoxImg = ({ img }) => {

  return (
    <div class="group relative my-2.5 max-w-80">
      <div class="absolute w-full h-full bg-grey-5/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center">
        <button data-tooltip-target="download-image" class="inline-flex items-center justify-center rounded-full h-10 w-10 bg-white/30 hover:bg-white/50 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50">
          <svg class="w-5 h-5 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 18">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 1v11m0 0 4-4m-4 4L4 8m11 4v3a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-3" />
          </svg>
        </button>
        <div id="download-image" role="tooltip" class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
          Download image
          <div class="tooltip-arrow" data-popper-arrow></div>
        </div>
      </div>
      <img src={img} class="rounded-lg w-full mb-1 bg-white" style={{width:'305px'}}/>
    </div>)
}

export const ViewBoxMutlipleImg = ({img}) => {

  return(
    <div class="grid gap-4 grid-cols-2 my-2.5 max-w-80" >
      <div class="group relative">
        <div class="absolute w-36 h-36 bg-grey-5/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center">
          <button data-tooltip-target="download-image-1" class="inline-flex items-center justify-center rounded-full h-8 w-8 bg-white/30 hover:bg-white/50 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50">
            <svg class="w-4 h-4 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 18">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 1v11m0 0 4-4m-4 4L4 8m11 4v3a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-3" />
            </svg>
          </button>
          <div id="download-image-1" role="tooltip" class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
            Download image
            <div class="tooltip-arrow" data-popper-arrow></div>
          </div>
        </div>
        <img src={img[0]} class="rounded-lg bg-white object-cover" style={{width:'144px',height:'144px'}} />
      </div>
      <div class="group relative">
        <div class="absolute w-36 h-36 bg-grey-5/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center">
          <button data-tooltip-target="download-image-2" class="inline-flex items-center justify-center rounded-full h-8 w-8 bg-white/30 hover:bg-white/50 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50">
            <svg class="w-4 h-4 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 18">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 1v11m0 0 4-4m-4 4L4 8m11 4v3a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-3" />
            </svg>
          </button>
          <div id="download-image-2" role="tooltip" class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
            Download image
            <div class="tooltip-arrow" data-popper-arrow></div>
          </div>
        </div>
        <img src={img[1]} class="rounded-lg bg-white object-cover" style={{width:'144px',height:'144px'}} />
      </div>
      <div class="group relative">
        <div class="absolute w-36 h-36 bg-grey-5/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center">
          <button data-tooltip-target="download-image-3" class="inline-flex items-center justify-center rounded-full h-8 w-8 bg-white/30 hover:bg-white/50 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50">
            <svg class="w-4 h-4 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 18">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 1v11m0 0 4-4m-4 4L4 8m11 4v3a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-3" />
            </svg>
          </button>
          <div id="download-image-3" role="tooltip" class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
            Download image
            <div class="tooltip-arrow" data-popper-arrow></div>
          </div>
        </div>
        <img src={img[2]} class="rounded-lg bg-white object-cover" style={{width:'144px',height:'144px'}}  />
      </div>
      <div class="group relative">
        <button class="absolute w-36 h-36 bg-grey-5/90 hover:bg-gray-900/50 transition-all duration-300 rounded-lg flex items-center justify-center">
          <span class="text-xl font-medium text-white">+{img.length-3}</span>
          <div id="download-image" role="tooltip" class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
            Download image
            <div class="tooltip-arrow" data-popper-arrow></div>
          </div>
        </button>
        <img src={img[0]} class="rounded-lg bg-white object-cover" style={{width:'144px',height:'144px'}} />
      </div>
    </div>
  )
}