import {AvatarLayoutPage} from "../layouts/layout-avatar"

export const ChatLeft = ({chat_content,chat_params}) => {
  return(
    <div className="chat chat-start mb-3">
        <AvatarLayoutPage user_id={chat_content.sender_id} message_preview={chat_params}/>
        <div className="chat-header flex flex-row items-center">
          <span className='mr-2'>{chat_params.title}</span>
          <time className="text-xs opacity-50">{formatTimestamp(chat_content.timestamp)}</time>
        </div>
        <div className="chat-bubble bg-white text-font_1">{chat_content.content}</div>
    </div>
  );
};

export const ChatRight = ({chat_content,chat_params}) => {

  return(
    <div className="chat chat-end mb-3">
        <AvatarLayoutPage user_id={chat_content.sender_id} message_preview={chat_params}/>
        <div className="chat-header flex flex-row items-center">
          <span className='mr-2'>{chat_params.title}</span>
          <time className="text-xs opacity-50">{formatTimestamp(chat_content.timestamp)}</time>
        </div>
        <div className="chat-bubble bg-blue-2 text-white">{chat_content.content}</div>
    </div>
  );
};

export const ChatLeftDM = ({chat_content}) => {

  return(
    <div className="chat chat-start mb-3">
        <div className="chat-bubble bg-white text-font_1">{chat_content.content}</div>
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


function formatTimestamp(timestamp) {
  if (!timestamp) {
    return 'N/A';
  }

  const { seconds, nanoseconds } = timestamp;

  // Convertir les secondes en millisecondes et ajouter les nanosecondes converties en millisecondes
  const timestampInMilliseconds = seconds * 1000 + nanoseconds / 1e6;

  const messageDate = new Date(timestampInMilliseconds);
  const currentDate = new Date();

  const isToday =
    messageDate.getDate() === currentDate.getDate() &&
    messageDate.getMonth() === currentDate.getMonth() &&
    messageDate.getFullYear() === currentDate.getFullYear();

  if (isToday) {
    // Si c'est aujourd'hui, retournez l'heure et les minutes
    const hours = messageDate.getHours();
    const minutes = String(messageDate.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  } else {
    // Sinon, retournez la date au format jour/mois/année
    const day = messageDate.getDate();
    const month = messageDate.getMonth() + 1;
    const year = messageDate.getFullYear();
    return `${day}/${month}/${year}`;
  }
}
