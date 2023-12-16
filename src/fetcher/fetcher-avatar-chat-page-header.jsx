import { firestore } from '../lib/Firebase';
import { collection, doc, onSnapshot, getDoc } from 'firebase/firestore';
import { AvatarLayoutPreview } from '../layouts/layout-avatar';

const GetUserAvatar = async ({ user_id, setAvatar, chat_id }) => {

  if (!user_id) {
    setAvatar(<span className="loading loading-ring loading-md"></span>);
    return;
  }

  const groupRef = doc(firestore, "groups", chat_id);
  const groupSnap = await getDoc(groupRef);

  if (groupSnap.exists()) {
    const group_data = groupSnap.data()
    
    setAvatar(<AvatarLayoutPreview message_preview={group_data} user_id={user_id}/>);

  } else {
    console.log("La conversation n'existe pas");
  }


  // const userRef = doc(collection(firestore, 'users'), user_id);

  // const unsubscribe = onSnapshot(userRef, (docSnapshot) => {
  //   if (docSnapshot.exists()) {
  //     const user = docSnapshot.data();
  //     setAvatar(<AvatarLayoutModal user_array={user} />);
  //   } else {
  //     setAvatar(
  //       <span className='text-grey_2 text-center justify-center w-8 h-8 pt-1 rounded-full font-semibold'>_</span>
  //     );
  //   }
  // });

  // return () => unsubscribe();
};

export default GetUserAvatar;