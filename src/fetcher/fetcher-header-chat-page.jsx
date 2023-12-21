import { firestore } from '../lib/Firebase';
import { doc, getDoc, collection, onSnapshot, getDocs } from 'firebase/firestore';
import { AvatarLayoutPreview } from '../layouts/layout-avatar';

const GetUserInfo = async ({ setInfo, chat_id, user_id }) => {

  if (!user_id) {
    setInfo(<span className="loading loading-ring loading-md"></span>);
    return;
  }

  const groupRef = doc(firestore, "groups", chat_id);
  const groupSnap = await getDoc(groupRef);

  const group_data = groupSnap.data();
  const id_other_user = user_id === group_data.users[0] ? group_data.users[1] : group_data.users[0];
  const usersRef = doc(firestore, "users", id_other_user);
  const usersSnap = await getDoc(usersRef);
  const user_data = usersSnap.data();
  const messagesQuery = collection(firestore, 'groups', groupSnap.id, 'messages');
  const messagesSnapshot = await getDocs(messagesQuery);

  let lastMessageData;
  let messages_not_view = 0;

  messagesSnapshot.forEach((message) => {
    const message_data = message.data();

    if (!message_data.view_by.includes(user_id)) {
      messages_not_view++;
    }

    if (!lastMessageData || message_data.timestamp > lastMessageData.timestamp) {
      lastMessageData = message_data;
    }
  });

  let group_preview = {
    avatar: !group_data.is_chat ? group_data.group_img : user_data.avatar || null,
    title: !group_data.is_chat ? group_data.group_name : (user_data.firstName !== undefined || user_data.lastName !== undefined) ? (user_data.firstName + " " + user_data.lastName) : null,
  }

  setInfo(
    <div className='flex flex-row items-center'>
      <AvatarLayoutPreview group_preview={group_preview}/>
      <span className='text-font_1 line-clamp-1 font-bold text-base'>{group_preview.title || '?'}</span>
    </div>
  );

};

export default GetUserInfo;