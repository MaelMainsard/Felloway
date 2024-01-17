import { AvatarLayoutPreview } from "./layout-avatar";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import { firestore } from '../config/Firebase';
import { doc, deleteDoc, collection, query, getDoc, getDocs, updateDoc  } from "firebase/firestore";
import { getLoggedUser } from "../config/util";


export const ChatMenuMessage = ({group_preview, open_chat, chat}) => {

   let user_id = getLoggedUser().uid;

    return (
      <div className='flex flex-row align-middle items-center justify-start bg-grey-1 rounded-xl p-3 mb-2 w-full cursor-pointer'>
        <AvatarLayoutPreview group_preview={group_preview} />
        <div className="w-full justify-center align-middle flex flex-col mb-1 mr-1"  onClick={() => { open_chat(true); chat(''); chat(group_preview.id); updateViewMessage(group_preview.id,user_id)}}>
          <div className=" justify-between flex flex-row items-start">
            <span className='text-font-1 line-clamp-1 font-bold text-base w-8/12'>{group_preview.title}</span>
            <span className='text-font-2 line-clamp-1 text-xs'>{group_preview.timestamp}</span>
          </div>
          <div className="justify-between flex flex-row items-end">
            <span className={`text-font-2 line-clamp-1 text-xs w-9/12 ${group_preview.notification !== 0 ? 'font-bold text-font-1' : ''}`}>{group_preview.message}</span>
            {group_preview.notification !== 0 && (
              <span className='bg-red-1 w-5 h-5 rounded-full align-middle justify-center items-center flex text-white text-xs font-bold'>
                {group_preview.notification}
              </span>
            )}
          </div>
        </div>
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button">
            <MoreVertIcon className="text-font-1"/>
          </div>
          <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow rounded-box w-fit bg-grey-1">
            <li>
              <div className="join" onClick={async () => {await deleteDoc(doc(firestore, "groups", group_preview.id)); chat(null);}}>
                  <span className="join-item">
                     Supprimer
                  </span>
                  <DeleteIcon className="join-item text-red-1"/>
              </div>
            </li>
          </ul>
        </div>
      </div>
    );
};

async function updateViewMessage(chat_id, user_id) {
  const q = query(collection(firestore, "groups", chat_id, "messages"));

  const querySnapshot = await getDocs(q);

  // Utilisez Promise.all pour attendre la résolution de toutes les mises à jour
  await Promise.all(
    querySnapshot.docs.map(async (doc) => {
      const docRef = doc.ref; // Obtenez la référence du document

      // Utilisez getDoc pour obtenir une version mise à jour du document
      const docSnapshot = await getDoc(docRef);
      const doc_data = docSnapshot.data();

      if (!doc_data.view_by.includes(user_id)) {
        doc_data.view_by.push(user_id);

        // Mettez à jour le document en utilisant la référence du document
        await updateDoc(docRef, {
          view_by: doc_data.view_by,
        });
      }
    })
  );
}