import { AvatarLayoutPreview } from "../layouts/layout-avatar";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import { firestore } from '../lib/Firebase';
import { doc, deleteDoc } from "firebase/firestore";

export const ChatMenuMessage = ({group_preview, open_chat, chat}) => {

    return (
      <div className='flex flex-row align-middle items-center justify-start bg-grey_1 rounded-xl p-3 mb-2 w-full cursor-pointer' onClick={() => { open_chat(true); chat(group_preview.id); }}>
        <AvatarLayoutPreview group_preview={group_preview} />
        <div className="w-full justify-center align-middle flex flex-col mb-1 mr-1">
          <div className=" justify-between flex flex-row items-start">
            <span className='text-font_1 line-clamp-1 font-bold text-base w-8/12'>{group_preview.title}</span>
            <span className='text-font_2 line-clamp-1 text-xs'>{group_preview.timestamp}</span>
          </div>
          <div className="justify-between flex flex-row items-end">
            <span className={`text-font_2 line-clamp-1 text-xs w-9/12 ${group_preview.notification !== 0 ? 'font-bold text-font_1' : ''}`}>{group_preview.message}</span>
            {group_preview.notification !== 0 && (
              <span className='bg-red_1 w-5 h-5 rounded-full align-middle justify-center items-center flex text-white text-xs font-bold'>
                {group_preview.notification}
              </span>
            )}
          </div>
        </div>
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button">
            <MoreVertIcon/>
          </div>
          <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-fit">
            <li>
              <div className="join" onClick={async () => {await deleteDoc(doc(firestore, "groups", group_preview.id)); chat(null);}}>
                  <span className="join-item">
                     Supprimer
                  </span>
                  <DeleteIcon className="join-item"/>
              </div>
            </li>
          </ul>
        </div>
      </div>
    );
  };