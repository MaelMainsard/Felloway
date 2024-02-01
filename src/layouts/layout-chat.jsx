import {AvatarLayoutPage} from "./layout-avatar"
import {formatTimestamp} from '../lib/script'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import DeleteIcon from '@mui/icons-material/Delete';
import { firestore } from '../config/Firebase';
import { doc, deleteDoc } from "firebase/firestore";

export const ChatLayout = ({ chat_content, right }) => {


  async function deleteChat(){
    await deleteDoc(doc(firestore, `groups/${chat_content.group_id}/messages/${chat_content.message_id}`));
  }


  return (
    <div className={`chat ${right ? 'chat-end' : 'chat-start'} mb-3`}>
      {!chat_content.is_chat && (
        <AvatarLayoutPage message_preview={chat_content} />
      )}

      <div className={`chat-header flex flex-col ${right ? 'items-end' : 'items-start'}`}>
        {!chat_content.is_chat && (
          <span className="mr-2 opacity-80">{chat_content.sender_name}</span>
        )}
      </div>

      <div className={`chat-bubble ${right ? 'bg-yellow-1' : 'bg-green-1'} group text-white cursor-pointer whitespace-pre-line break-words `}>

        {chat_content.content}
        {chat_content.content_img && (
            <div className="group relative my-2.5">
              <div className="absolute w-full h-full bg-gray-900 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center">
                <button data-tooltip-target="download-image" className="inline-flex items-center justify-center rounded-full h-10 w-10 bg-white/30 hover:bg-white/50 focus:outline-none dark:text-white">
                  <a href={chat_content.content_img} download={chat_content.content_img} target="blank">
                    <svg className="w-5 h-5 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 18">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 1v11m0 0 4-4m-4 4L4 8m11 4v3a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-3" />
                    </svg>
                  </a>
                </button>
              </div>
              <img src={chat_content.content_img} alt="Image" className="rounded-xl w-96 mb-1" />
            </div>
        )}
        
      </div>

      <div className="chat-footer">
        <time className="text-xs opacity-50">{formatTimestamp(chat_content.timestamp)}</time>
        <div className={`dropdown dropdown-bottom dropdown-hover`}>
          <KeyboardArrowDownIcon tabIndex={0} role="button" className="text-grey-4"/>
          <ul tabIndex={0} className="dropdown-content z-[1] opacity-0 focus:opacity-100 menu p-2 shadow bg-white text-grey-3 rounded-box w-fit ">
            <li>
              {right && (
                <a onClick={() => deleteChat()}>
                  <DeleteIcon className="text-red-1" />
                </a>
              )}
            </li>
          </ul>
        </div>
       
      </div>
    </div>
  );
};