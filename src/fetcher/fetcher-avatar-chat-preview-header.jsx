import { firestore } from '../config/Firebase';
import { collection, doc, onSnapshot } from 'firebase/firestore';
import { AvatarLayoutModal } from '../layouts/layout-avatar';

const GetUserAvatar = async ({ user_id, setAvatar }) => {

  if (!user_id) {
    setAvatar(<span className="loading loading-ring loading-md"></span>);
    return;
  }

  const userRef = doc(collection(firestore, 'users'), user_id);

  const unsubscribe = onSnapshot(userRef, (docSnapshot) => {
    if (docSnapshot.exists()) {
      const user = docSnapshot.data();
      setAvatar(<AvatarLayoutModal user_array={user} />);
    } else {
      setAvatar(
        <span className='text-grey_2 text-center justify-center w-8 h-8 pt-1 rounded-full font-semibold'>_</span>
      );
    }
  });

  return () => unsubscribe();
};

export default GetUserAvatar;