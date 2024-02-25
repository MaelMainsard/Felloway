import { firestore } from '../config/Firebase.js';
import { collection, addDoc } from "firebase/firestore"; 
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
        });
      }
}

createFakeConv()