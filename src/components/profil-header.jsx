import React, { useState, useEffect } from 'react';
import { Avatar, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import PersonIcon from '@mui/icons-material/Person';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getFirestore, doc, updateDoc, getDoc } from 'firebase/firestore';
import { app } from '../config/Firebase';
import { getLoggedUser } from '../config/util';
import PageHeader from './page-header';

const ProfilHeader = () => {
  const db = getFirestore(app);
  const storage = getStorage(app);
  const user = getLoggedUser();

  const [userinfos, setUserinfos] = useState({
    image: '',
    age: '',
    location: '',
    preference: '',
    firstName: '',
    lastName: '',
    description: ''
  });

  const [editMode, setEditMode] = useState(false); // État pour suivre le mode d'édition

  const [formData, setFormData] = useState({
    age: '',
    location: '',
    preference: '',
    description: '',
    firstName: '',
    lastName: ''
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userDocRef = doc(db, 'users', user.uid);
        const userDocSnapshot = await getDoc(userDocRef);

        if (userDocSnapshot.exists()) {
          const userData = userDocSnapshot.data();
          const { firstName, lastName, avatar, age, location, description } = userData;
          setUserinfos({
            firstName: firstName,
            lastName: lastName,
            image: avatar,
            age: age,
            location: location,
            description: description
          });
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [db, user.uid]);

  // Fonction pour gérer l'upload de l'image
  const handleImageUpload = async (e) => {
    // Logique d'upload de l'image ici
  };

  // Fonction pour activer le mode d'édition
  const handleEditClick = () => {
    setEditMode(true);
  };

  // Fonction pour désactiver le mode d'édition
  const handleCancelEdit = () => {
    setEditMode(false);
  };

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userDocRef = doc(db, 'users', user.uid);
      await updateDoc(userDocRef, {
        age: formData.age,
        location: formData.location,
        preference: formData.preference,
        description: formData.description
      });
      setEditMode(false);
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  return (
    <>
      <PageHeader />
      <div className={'bg-yellow-1 rounded-b-2xl shadow-md p-1'} style={{ display: 'flex', justifyContent: 'space-between'}}>
        {!editMode && (
          <>
          <div className='p-3' style={{ display: 'flex', alignItems: 'center' }}>
          {userinfos.image ? (
            <Avatar alt="User Avatar" src={userinfos.image} sx={{ width: '100px', height: '100px', borderRadius: '50%' }} />
          ) : (
            <Avatar alt="User Avatar" sx={{ width: '100px', height: '100px', margin: 'auto', backgroundColor: '#FFFFFF', border: '1px solid #CCCCCC' }}>
              <PersonIcon style={{ width: '70%', height: '70%', margin: '15%' }} />
            </Avatar>
          )}
          <div style={{ marginLeft: '20px' }}>
            {/* Affichage des informations utilisateur */}
            <p className="text-white font-bree font-bold">{userinfos.firstName} {userinfos.lastName}</p>
            <p className="text-white font-bree ">{userinfos.age} ans</p>
            <p className="text-white font-bree">{userinfos.location}</p>
            <p className="text-white text-xs mt-1 font-montserrat font-light italic">"{userinfos.description}"</p>
            {/* Ajoutez d'autres informations de profil selon vos besoins */}
          </div>
                    
        </div>
        <IconButton style={{ alignSelf: 'flex-start' }} onClick={handleEditClick}>
          <EditIcon className='text-white' />
        </IconButton>  
        </>
        )}
               
        {editMode && (
          <>
         <div className='p-3 text-center' style={{ width: '100%', height: '100%', display: 'flex', flexDirection:'column', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ width: '100px', height: '100px' }}>
            {userinfos.image ? (
              <Avatar alt="User Avatar" src={userinfos.image} sx={{ width: '100%', height: '100%', borderRadius: '50%' }} />
            ) : (
              <Avatar alt="User Avatar" sx={{ width: '100%', height: '100%', backgroundColor: '#FFFFFF', border: '1px solid #CCCCCC' }}>
                <PersonIcon style={{ width: '70%', height: '70%', margin: '15%' }} />
              </Avatar>
            )}
          </div>

          <form onSubmit={handleSubmit}>
              <div className='p-3'>
                <div className='mb-3'>
                  <label htmlFor="age" className='text-white'>Age:</label>
                  <input type="text" id="age" name="age" value={formData.age} onChange={handleChange} />
                </div>
                <div className='mb-3'>
                  <label htmlFor="location" className='text-white'>Location:</label>
                  <input type="text" id="location" name="location" value={formData.location} onChange={handleChange} />
                </div>
                <div className='mb-3'>
                  <label htmlFor="preference" className='text-white'>Preference:</label>
                  <input type="text" id="preference" name="preference" value={formData.preference} onChange={handleChange} />
                </div>
                <div className='mb-3'>
                  <label htmlFor="description" className='text-white'>Description:</label>
                  <input type="text" id="description" name="description" value={formData.description} onChange={handleChange} />
                </div>
                <div>
                  <button type="submit">Submit</button>
                  <button type="button" onClick={handleCancelEdit}>Cancel</button>
                </div>
              </div>
            </form>
          
          <IconButton style={{ alignSelf: 'flex-start' }} onClick={handleCancelEdit}>
            <EditIcon className='text-white' />
          </IconButton>
        </div>

         
        </> 
         
        )}

      </div>
    </>
  );
};

export default ProfilHeader;
