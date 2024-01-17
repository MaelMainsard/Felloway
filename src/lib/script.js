export function formatTimestamp(timestamp) {
    if (!timestamp) {
      return '...';
    }
  
    const { seconds, nanoseconds } = timestamp;
  
    // Convertir les secondes en millisecondes et ajouter les nanosecondes converties en millisecondes
    const timestampInMilliseconds = seconds * 1000 + nanoseconds / 1e6;
  
    const messageDate = new Date(timestampInMilliseconds);
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
      const day = messageDate.getDate() < 10 ? '0'+messageDate.getDate() : messageDate.getDate()
      let month = messageDate.getMonth() + 1
      month = month < 10 ? '0'+month : month
      const year = messageDate.getFullYear();
      return `${day}/${month}/${year}`;
    }
  }