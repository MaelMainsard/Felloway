import * as React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';

import HouseIcon from '@mui/icons-material/House';
import ForumIcon from '@mui/icons-material/Forum';
import PersonIcon from '@mui/icons-material/Person';

import Divider from '@mui/material/Divider';

export default function LabelBottomNavigation() {
  const navigate = useNavigate();
  const location = useLocation();

  // Déterminez la valeur initiale en fonction du chemin de l'URL actuel
  const initialValue = (() => {
    switch (location.pathname) {
      case '/home':
        return 'home';
      case '/chat':
        return 'chat';
      case '/profil':
        return 'profil';
      case '/settings':
        return 'profil';
      default:
        return 'home'; // Valeur par défaut
    }
  })();

  const [value, setValue] = React.useState(initialValue);

  const handleChange = (event, newValue) => {
    setValue(newValue);

    switch (newValue) {
      case 'home':
        navigate("/home", { replace: true });
        break;
      case 'chat':
        navigate("/chat", { replace: true });
        break;
      case 'profil':
        navigate("/profil", { replace: true });
        break;
      default:
        break;
    }
  };

  return (
    <div style={{width: '100%'}}>
      <Divider/>
      <BottomNavigation sx={{ width: '100%'  ,justifyContent: 'space-around'}} value={value} onChange={handleChange}>
      <BottomNavigationAction
        label="Home"
        value="home"
        icon={<HouseIcon />}
      />
      <BottomNavigationAction
        label="Chat"
        value="chat"
        icon={<ForumIcon />}
      />
      <BottomNavigationAction
        label="Profil"
        value="profil"
        icon={<PersonIcon />}
      />
    </BottomNavigation>
    </div>
  );
}