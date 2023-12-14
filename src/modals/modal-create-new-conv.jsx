import React, { useState } from 'react';
import { firestore } from '../lib/Firebase';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { AvatarLayout } from '../layouts/layout-avatar';

const GetModalNewConv = async (user_id, setModalNewConv) => {
  try {
    const [checkedUsers, setCheckedUsers] = useState([]);

    if (!user_id) {
      setModalNewConv(
        <div className="flex align-middle justify-center items-center mx-auto h-5/6">
          <span className="loading loading-ball loading-lg bg-red_1"></span>
        </div>
      );
      return;
    }

    const q = query(collection(firestore, 'users'));
    const unsubscribe_group = onSnapshot(q, (usersSnapshot) => {
      const users_list = [];

      usersSnapshot.forEach(async (docs) => {
        const user = docs.data();

        users_list.push(user);

        const handleCheckboxChange = (userId) => {
          if (checkedUsers.includes(userId)) {
            setCheckedUsers(checkedUsers.filter((id) => id !== userId));
          } else {
            setCheckedUsers([...checkedUsers, userId]);
          }
        };

        const showCheckedUserIds = () => {
          alert(`Checked User IDs: ${checkedUsers.join(', ')}`);
        };

        const chatMenuMessages = users_list.map((user, index) => (
          <tr key={index}>
            <th>
              <label>
                <input
                  type="checkbox"
                  className="checkbox"
                  checked={checkedUsers.includes(user.user_id)}
                  onChange={() => handleCheckboxChange(user.user_id)}
                />
                {user.user_id}
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
        ));

        setModalNewConv(
          <dialog id="my_modal_1" className="modal">
            <div className="modal-box">
              <div className="overflow-x-auto">
                <table className="table">
                  <tbody>{chatMenuMessages}</tbody>
                </table>
              </div>
              <button onClick={showCheckedUserIds}>Show Checked User IDs</button>
            </div>
          </dialog>
        );
      });
    });

    return () => unsubscribe_group();
  } catch (error) {
    console.error('Error fetching messages: ', error);
  }
};

export default GetModalNewConv