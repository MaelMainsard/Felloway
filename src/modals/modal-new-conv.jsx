import { AvatarLayout } from '../layouts/layout-avatar';
import React, { useState, useEffect } from 'react';
import { firestore } from '../lib/Firebase';
import { collection, onSnapshot, query, addDoc, serverTimestamp } from 'firebase/firestore';

const ModalNewConv = ({ showModal, closeModal, user_id }) => {
  const [checkedUsers, setCheckedUsers] = useState([]); // Utiliser un objet pour stocker les états des cases à cocher
  const [usersList, setUsersList] = useState([]);
  const [groupName, setGroupName] = useState('');

  useEffect(() => {
    const unsubscribe = onSnapshot(query(collection(firestore, 'users')), (usersSnapshot) => {
      const usersData = usersSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setUsersList(usersData);

      const userToCheck = usersData.find((user) => user.id === user_id);
      if (userToCheck) {
        setCheckedUsers([userToCheck]); // Initialize with the user's data
      }
    });

    return () => unsubscribe();
  }, [user_id]);

  const createNewChat = async (array_users) => {
    const usersMap = {};
    array_users.forEach((user) => {
      usersMap[user.id] = {
        avatar: user.images?.image0 || '',
        name: user.firstName,
        not_view: 0,
      };
    });

    const docRef = await addDoc(collection(firestore, 'groups'), {
      group_img: '',
      group_name: groupName,
      is_chat: array_users.length > 2 ? false : true,
      last_message: '',
      last_message_timestamp: serverTimestamp(),
      users: usersMap,
    });
  };

  const handleCheckboxChange = (user) => {
    setCheckedUsers((prevCheckedUsers) => {
      const userIndex = prevCheckedUsers.findIndex((u) => u.id === user.id);

      if (userIndex !== -1) {
        const updatedCheckedUsers = [...prevCheckedUsers.slice(0, userIndex), ...prevCheckedUsers.slice(userIndex + 1)];
        return updatedCheckedUsers;
      } else {
        const updatedCheckedUsers = [...prevCheckedUsers, user];
        return updatedCheckedUsers;
      }
    });
  };

  const chatMenuMessages = usersList.map((user, index) => (
    user.id !== user_id && (
      <tr key={index}>
        <th>
          <label>
            <input
              type="checkbox"
              className="checkbox"
              checked={checkedUsers.some((u) => u.id === user.id)}
              onChange={() => handleCheckboxChange(user)}
            />
          </label>
        </th>
        <td>
          <div className="flex items-center gap-3">
            <AvatarLayout user_array={user} />
            <div>
              <div className="font-bold">{user.firstName}</div>
              <div className="text-sm opacity-50">United States</div>
            </div>
          </div>
        </td>
      </tr>
    )
  ));

    return (
        <dialog id="my_modal_1" className="modal" open={showModal}>
            <div className="modal-box max-w-sm" onClick={(e) => e.stopPropagation()}>
                <h3 className="font-bold text-lg"></h3>
                <p className="py-4">Press ESC key or click outside to close</p>
                <div className="overflow-x-auto">
                    <table className="table">
                        <tbody>{chatMenuMessages}</tbody>
                    </table>
                </div>
                {checkedUsers.length > 1 &&  checkedUsers.length < 3 ? (
                    <button
                        className="btn w-full"
                        onClick={() => {
                        createNewChat(checkedUsers);
                        closeModal();
                        }}
                    >
                        Créez une nouvelle conversation
                    </button>
                    ) : checkedUsers.length > 2 && (
                        <div className="join">
                        <input
                          className="input input-bordered join-item"
                          placeholder="Nom du groupe"
                          value={groupName}
                          onChange={(e) => setGroupName(e.target.value)}
                        />
                        <button
                          className="btn join-item rounded-l-sm"
                          onClick={() => {
                            createNewChat(checkedUsers);
                            closeModal();
                          }}
                        >
                          Créez le groupe
                        </button>
                      </div>
                    )}
            </div>
            <form method="dialog" className="modal-backdrop">
                <button onClick={closeModal}>close</button>
            </form>
        </dialog>
    );
};

export default ModalNewConv;