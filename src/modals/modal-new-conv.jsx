import CircularProgress from '@mui/material/CircularProgress';
import React, { useState, useEffect } from 'react';
import { firestore } from '../config/Firebase';
import { collection, onSnapshot, query, addDoc } from 'firebase/firestore';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import LoadingButton from '@mui/lab/LoadingButton';
import Modal from '@mui/material/Modal';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';


const ModalNewConv = ({ task, updateTask}) => {
  const [usersList, setUsersList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState([]);
  const [error, setError] = useState(false);
  const [groupName, setGroupName] = useState(null)
  const [disableInput, setDisableInput] = useState(false);
  const [jsonCurentUsers, setJsonCurentUsers] = useState(null)

  const loadingAsyncron = task.show_modal_new_conv && usersList.length === 0;

  const handleClose = () => {
    updateTask({show_modal_new_conv:false});
    setSelected([])
  };

  const handleChange = e => {
    setGroupName(e.target.value)
  }

  useEffect(() => {
    const unsubscribe = onSnapshot(query(collection(firestore, 'users')), (usersSnapshot) => {
      const usersData = usersSnapshot.docs.map((doc) => ({
        name: doc.data().firstName + ' ' + doc.data().lastName,
        avatar: doc.data().avatar,
        online: doc.data().online,
        id: doc.id
      }));

      setUsersList(usersData);

      const userToCheck = usersData.find((user) => user.id === task.user_id);

      if (userToCheck) {
        setJsonCurentUsers([userToCheck]);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [task.user_id, loading]);
  

  const createNewChat = async () => {

    if(selected.length > 2 && groupName === null) {
      setError(true)
    }
    else{
      setError(false)
      setDisableInput(true)
      setLoading(true)

      const usersIds = [];
      selected.forEach((user) => {
        usersIds.push(user.id)
      });

      const response = await addDoc(collection(firestore, 'groups'), {
        group_img: '',
        group_name: selected.length > 2 ? groupName : '',
        is_chat: selected.length > 2 ? false : true,
        users: usersIds
      });


      setDisableInput(false)
      setLoading(false)
      setSelected([])

      updateTask({chat_id:response.id,open_chat_page:true,show_modal_new_conv:false})

   }
    
  };


    return (
      <Modal
        open={task.show_modal_new_conv}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div class="flex items-center justify-center h-screen">
          <Box className='bg-white rounded-xl p-5 w-96 h-fit space-y-3 ml-3 mr-3'>
            <Autocomplete
              multiple
              disabled={disableInput}
              limitTags={2}
              onChange={(event,value) => setSelected([...jsonCurentUsers, ...value])}
              id="multiple-limit-tags"
              options={usersList}
              loading={loadingAsyncron}
              noOptionsText='Aucun utilisateur trouvé'
              getOptionLabel={(option) => option.name}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Choisissez le/les utilisateur"
                  placeholder="Tappez le nom de l'utilisateur"
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <React.Fragment>
                        {loadingAsyncron ? <CircularProgress color="inherit" size={20} /> : null}
                        {params.InputProps.endAdornment}
                      </React.Fragment>
                    ),
                  }}
                 
                />
              )}
              renderOption={(props, option) => (
                (option.id !== task.user_id) && (
                  <li {...props}>
                      <Badge color={option.online ? 'success': 'string'} overlap="circular" badgeContent=" " variant="dot" className='mr-3'>
                        <Avatar alt="Remy Sharp" src={option.avatar}>
                          {option.name.charAt(0)}
                        </Avatar>
                      </Badge>
                    {option.name}
                  </li>
                )
              )}

              className='w-full'
            />
            {selected.length > 2 && (
              <TextField disabled={disableInput} onChange={handleChange} error={error} required helperText="Veuillez renseignez un nom de groupe" label="Nom du groupe" variant="outlined" className='w-full' />
            )}
            <LoadingButton
              size="small"
              onClick={createNewChat}
              className='w-full h-10'
              loading={loading}
              loadingPosition="end"
              variant="contained"
            >
              <span>Créer la discution</span>
            </LoadingButton>
            <Button className='w-full h-10 border-red-1' onClick={handleClose} variant="outlined">Annuler</Button>
            
          </Box>
        </div>
      </Modal>
    );
};

export default ModalNewConv;