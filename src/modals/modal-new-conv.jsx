import { AvatarLayoutModal } from '../layouts/layout-avatar';
import React, { useState, useEffect } from 'react';
import { firestore } from '../config/Firebase';
import { collection, onSnapshot, query, addDoc, serverTimestamp } from 'firebase/firestore';

const ModalNewConv = ({ showModal, closeModal, user_id, show_conv, set_open_chat, set_chat}) => {
  const [checkedUsers, setCheckedUsers] = useState([]); // Utiliser un objet pour stocker les états des cases à cocher
  const [usersList, setUsersList] = useState([]);
  const [groupName, setGroupName] = useState('');
  const [searchUser, setSearchUser] = useState('');

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

  const createNewChat = async (array_users, closeModal) => {

    if(array_users.length > 2 && groupName === '') {
      return;
    }

    const usersMap = [];
    array_users.forEach((user) => {
      usersMap.push(user.id)
    });
    if(array_users.length > 2){
      show_conv(false)
    }
    else{
      show_conv(true)
    }
    closeModal()

    const response = await addDoc(collection(firestore, 'groups'), {
      group_img: '',
      group_name: array_users.length > 2 ? groupName : '',
      is_chat: array_users.length > 2 ? false : true,
      users: usersMap,
    });

    set_chat(response.id)
    set_open_chat(true)
  };

  const handleBadgeClick = (user) => {
    handleCheckboxChange(user);
  };

  const selectedUsersBadge = (
    <div className='overflow-x-auto flex space-x-1 mb-2 overflow-y-hidden'>
      {checkedUsers.length > 1 &&
        checkedUsers.slice(1).map((user) => (
          <div className="badge badge-neutral mr-1 cursor-pointer" key={user.id} style={{ whiteSpace: 'nowrap' }}>
            <span onClick={() => handleBadgeClick(user)}>
              {user.firstName}
            </span>
          </div>
        ))}
    </div>
  );

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
    user.id !== user_id && user.firstName.toUpperCase().includes(searchUser.toUpperCase()) && (
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
            <AvatarLayoutModal user_array={user} />
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
                <input
                  onChange={(e) => setSearchUser(e.target.value)}
                  type="text"
                  placeholder="Recherchez un utilisateur"
                  className="input input-bordered w-full max-w-xs"
                />
                <div className="overflow-x-auto">
                    <table className="table">
                        <tbody>{chatMenuMessages}</tbody>
                    </table>
                </div>
                {selectedUsersBadge}
                {checkedUsers.length > 1 &&  checkedUsers.length < 3 ? (
                    <button
                        className="btn w-full"
                        onClick={() => {
                        createNewChat(checkedUsers, closeModal);
                        }}
                    >
                        Créez une nouvelle conversation
                    </button>
                    ) : checkedUsers.length > 2 && (
                      <div className="join flex flex-col md:flex-row lg:flex-row">
                      <input
                        className="input input-bordered rounded-sm md:rounded-r-sm join-item w-full md:w-1/2 lg:w-2/3"
                        placeholder="Nom du groupe"
                        value={groupName}
                        onChange={(e) => setGroupName(e.target.value)}
                      />
                      <button
                        className="btn join-item rounded-sm md:rounded-l-sm w-full md:w-1/2 lg:w-1/3"
                        onClick={() => {
                          createNewChat(checkedUsers, closeModal);
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