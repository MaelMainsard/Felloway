import {AvatarLayoutPage} from "./layout-avatar"
import {formatTimestamp} from '../lib/script'


export const ChatLeft = ({ chat_content }) => {

  return (
    <div className="chat chat-start mb-3">
      <AvatarLayoutPage message_preview={chat_content} />
      <div className="chat-header flex flex-row items-center">
        <span className="mr-2 opacity-80">{chat_content.sender_name}</span>
      </div>
      <div className="chat-bubble bg-white text-font-1">{chat_content.content}</div>
      <div className="chat-footer">
        <time className="text-xs opacity-50">{formatTimestamp(chat_content.timestamp)}</time>
      </div>
    </div>
  );
};

export const ChatRight = ({ chat_content }) => {

  return (
    <div className="chat chat-end mb-3">
      <AvatarLayoutPage message_preview={chat_content} />
      <div className="chat-header flex flex-row items-center">
        <span className="mr-2 opacity-80">{chat_content.sender_name}</span>
      </div>
      <div className="chat-bubble bg-blue-2 text-white">{chat_content.content}</div>
      <div className="chat-footer">
        <time className="text-xs opacity-50">{formatTimestamp(chat_content.timestamp)}</time>
      </div>
    </div>
  );
};

export const ChatLeftDM = ({chat_content}) => {

  return(
    <div className="chat chat-start mb-3">
        <div className="chat-bubble bg-white text-font-1">{chat_content.content}</div>
        <div className="chat-footer opacity-50">
          <time className="text-xs text-font_1">{formatTimestamp(chat_content.timestamp)}</time>
        </div>
    </div>
  );
};

export const ChatRightDM = ({chat_content}) => {

  return(
    <div className="chat chat-end mb-3">
        <div className="chat-bubble bg-blue-2 text-white">{chat_content.content}</div>
        <div className="chat-footer opacity-50">
          <time className="text-xs text-font_1">{formatTimestamp(chat_content.timestamp)}</time>
        </div>
    </div>
  );
};



