import {AvatarLayoutPage} from "./layout-avatar"
import {formatTimestamp} from '../lib/script'


export const ChatLayout = ({ chat_content, right }) => {

  return (
    <div className={`chat ${right ? 'chat-end' : 'chat-start'} mb-3`}>
      {!chat_content.is_chat && (
        <AvatarLayoutPage message_preview={chat_content} />
      )}

      <div className={`chat-header flex flex-col ${right ? 'items-end' : 'items-start'}`}>
        {!chat_content.is_chat && (
          <span className="mr-2 opacity-80">{chat_content.sender_name}</span>
        )}
        {chat_content.content_img && chat_content.content && (
          <img src={chat_content.content_img} alt="Image" className="rounded-xl w-96 mb-1" />
        )}
      </div>

      <div className="chat-bubble bg-blue-2 text-white cursor-pointer">
        {chat_content.content ? (
          <span>{chat_content.content}</span>
        ) : (
          <img src={chat_content.content_img} alt="Image" className="rounded-xl w-96 mb-1" />
        )}
      </div>

      <div className="chat-footer">
        <time className="text-xs opacity-50">{formatTimestamp(chat_content.timestamp)}</time>
      </div>
    </div>
  );
};