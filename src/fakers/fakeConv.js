import { firestore } from '../config/Firebase.js';
import { collection, addDoc,serverTimestamp,updateDoc,doc } from "firebase/firestore"; 
import { faker } from '@faker-js/faker';

async function createFakeConv() {
    const user_ids = [
        'VdSPnhA2yPXMPIgDjXNCk3j2WNA3',
        'YwzYcOljHphBbnwa1NHcbnqqAgt1',
        'qWLYAgsS77e8N7dXcUuunkppBMA3'
    ]

    for (let i = 0; i < 60; i++) {
        await addDoc(collection(firestore, 'groups'), {
          group_img: faker.image.avatar(),
          group_name: faker.company.name(),
          is_chat: false,
          users: user_ids,
          updated_at: serverTimestamp(),
        });
      }
}

async function createFakeDiscution() {

  const user_ids = [
    'VdSPnhA2yPXMPIgDjXNCk3j2WNA3',
    'YwzYcOljHphBbnwa1NHcbnqqAgt1',
    'qWLYAgsS77e8N7dXcUuunkppBMA3'
  ]

  for (let i = 0; i < 60; i++) {
    const randomIndex = Math.floor(Math.random() * user_ids.length);
    const randomUserId = user_ids[randomIndex];

    await addDoc(collection(firestore, "groups","Fg2P43uYky37DkBeweBW","messages"), {
      content: faker.lorem.sentence(),
      sender_id: randomUserId,
      timestamp: serverTimestamp(),
      view_by: [randomUserId]
    });

    await updateDoc(doc(firestore, "groups","Fg2P43uYky37DkBeweBW"), {
      updated_at: serverTimestamp(),
    });
  }


}

createFakeDiscution()