import { firestore } from '../config/Firebase';
import { collection, doc, getDoc, query, orderBy, limit, getDocs } from "firebase/firestore";
import { LoaderNoAvatarDM, LoaderMesssagePreview } from "../components/Loader";

export const GetUserAvatar = async ({ user }) => {
  try {
    if (!user || !user.uid) {
      // Gérer le cas où user ou user.uid est null ou undefined
      return (
        <div style={{padding:'0'}}>
          <LoaderMesssagePreview/>
        </div>
      );
    }

    const docRef = doc(collection(firestore, "users"), user.uid);
    const docSnapshot = await getDoc(docRef);

    if (docSnapshot.exists()) {
      // Document exists, retrieve data
      const avatar = docSnapshot.data().images.image0;
      
      if (avatar !== '') {
        return (
          <img src={avatar} alt="Avatar" style={{ width: '100%' }} />
        );
      } else {
        return (
          <LoaderNoAvatarDM />
        );
      }
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const getMessagePreview = async (setLastMessage,setLastTime, setAvatar, setTitle, setLoading, showMessage, message, user) => {
  try {
    // Récupérez les données du dernier message
    await getMessageData(message,setLastMessage,setLastTime);

    // Vérifiez si showMessage est true, puis récupérez l'avatar et le titre
    if (showMessage) {
      await getAvatarDM(setAvatar, message,user);
      await getTitleDM(setTitle, message, user);
    } else {
      // Si showMessage est false, utilisez les données du message directement
      setAvatar(message.data.avatar);
      setTitle(message.data.name);
    }
    setLoading(false)
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const getAvatarDM = async (setAvatar, message, user) => {
  try {
    const UserUid = message.data.users.find(str => str !== user.uid) || '';
    const docRef = doc(collection(firestore, "users"), UserUid);
    const docSnapshot = await getDoc(docRef);

    if (docSnapshot.exists()) {
      // Document exists, retrieve data
      const data = docSnapshot.data();
      setAvatar(data.images.image0);
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const getTitleDM = async (setTitle, message, user) => {
  try {
    const UserUid = message.data.users.find(str => str !== user.uid) || '';
    const docRef = doc(collection(firestore, "users"), UserUid);
    const docSnapshot = await getDoc(docRef);

    if (docSnapshot.exists()) {
      // Document exists, retrieve data
      const data = docSnapshot.data();
      setTitle(data.firstname + ' ' + data.lastname);
    }

  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const getMessageData = async (message, setLastMessage, setLastTime) => {
  const groupDocRef = doc(firestore, 'groups', message.id);
  const messagesCollection = collection(groupDocRef, 'messages');

  // Créez une requête pour récupérer les messages triés par timestamp de manière décroissante et limitez à un seul document
  const q = query(messagesCollection, orderBy('timestamp', 'desc'), limit(1));

  try {
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      // Récupérez le premier (et unique) document de la liste triée
      const lastMessage = querySnapshot.docs[0].data();
      setLastMessage(lastMessage.content)


      const firestoreTimestamp = lastMessage.timestamp;
      const timestamp = firestoreTimestamp.seconds * 1000 + Math.floor(firestoreTimestamp.nanoseconds / 1e6);
      setLastTime(formatTimestamp(timestamp))
    }

  } catch (error) {
    console.error('Erreur lors de la récupération du dernier message :', error);
    throw error;
  }
};

function formatTimestamp(timestamp) {
  const messageDate = new Date(timestamp);

  const currentDate = new Date();

  const isToday =
    messageDate.getDate() === currentDate.getDate() &&
    messageDate.getMonth() === currentDate.getMonth() &&
    messageDate.getFullYear() === currentDate.getFullYear();


  if (isToday) {
    // Si c'est aujourd'hui, retournez l'heure et les minutes
    const hours = messageDate.getHours();
    const minutes = String(messageDate.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  } else {
    // Sinon, retournez la date au format jour/mois/année
    const day = messageDate.getDate();
    const month = messageDate.getMonth() + 1;
    const year = messageDate.getFullYear();
    return `${day}/${month}/${year}`;
  }
}