import { firestore } from '../lib/Firebase';
import { doc, getDoc, collection, onSnapshot  } from 'firebase/firestore';
import { AvatarLayoutPreview } from '../layouts/layout-avatar';

const GetUserInfo = async ({ user_id, setInfo, chat_id }) => {

  if (!user_id) {
    setInfo(<span className="loading loading-ring loading-md"></span>);
    return;
  }

  const groupRef = doc(firestore, "groups", chat_id);
  const groupSnap = await getDoc(groupRef);

  if (groupSnap.exists()) {
    const group_data = groupSnap.data()

    const other_user = user_id === Object.keys(group_data.users)[0] ? Object.keys(group_data.users)[1] : Object.keys(group_data.users)[0];

    if(!group_data.is_chat){
      setInfo(
        <div className='flex flex-row items-center'>
          <AvatarLayoutPreview message_preview={group_data} user_id={user_id}/>
          <span className='text-font_1 line-clamp-1 font-bold text-base'>{group_data.group_name || '?'}</span>
        </div>
      );
    }
    else{
      const userRef = doc(collection(firestore, 'users'), other_user);

      const unsubscribe = onSnapshot(userRef, (docSnapshot) => {
        const user = docSnapshot.data();
        let state = ''

        if(user.is_online){
          state = 'En ligne'
        }
        else{
          state = 'Hors ligne'
        }

        setInfo(
          <div className='flex flex-row items-center'>
            <AvatarLayoutPreview message_preview={group_data} user_id={user_id}/>
            <div className='flex flex-col'>
              <span className='text-font_1 line-clamp-1 font-bold text-base'>{group_data.users[other_user].name || '?'}</span>
              <span>{state}</span>
            </div>
          </div>
        );

      });
    
      return () => unsubscribe();
    }

  } else {
    console.log("La conversation n'existe pas");
  }
};

export default GetUserInfo;