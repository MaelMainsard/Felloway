import react, {useState} from 'react';
import { useTheme } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Slider from '@mui/material/Slider';

export const DestinationPage = () => {
    const theme = useTheme();
    const [selectedIndexes, setSelectedIndexes] = useState([]);
    const [budget, setBudget] = useState(500);

    const handleContinentChange = (event) => {
        setContinent(event.target.value);
    };

    const handleMoodClick = (index) => {
        const indexExists = selectedIndexes.includes(index);

        const newIndexes = indexExists
            ? selectedIndexes.filter((selectedIndex) => selectedIndex !== index)
            : [...selectedIndexes, index];

        setSelectedIndexes(newIndexes);
    };

    const continentArray = [
        "Afrique",
        "Amérique du Nord",
        "Amérique du Sud",
        "Antarctique",
        "Asie",
        "Europe",
        "Océanie"
    ]
    

    const moodArray = [
        {
            name: "Musée",
            image: "https://cdn.sortiraparis.com/images/80/103941/973572-visuels-musee-du-louvre.jpg"
        },
        {
            name: "Sports",
            image: "https://radiomontblanc.fr/photos/articles/vignettes/faire-pratiquer-escalade-sport-decouvrir-montagne_28151.jpg",
        },
        {
            name: "Hôtels",
            image: "https://static.leonardo-hotels.com/image/leonardohotelbucharestcitycenter_room_comfortdouble2_2022_4000x2600_7e18f254bc75491965d36cc312e8111f_2048x1331_desktop_2.webp"
        },
        {
            name: "Chill",
            image: "https://images.pexels.com/photos/91224/pexels-photo-91224.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
        },
        {
            name: "Soirées",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Wikipedia_space_ibiza%2803%29.jpg/640px-Wikipedia_space_ibiza%2803%29.jpg"
        },
        {
            name: "Road Trip",
            image: "https://www.wikicampers.fr/blog/wp-content/uploads/2018/01/roadtrip-%C3%A0-faire-dans-sa-vie.jpg"
        }
    ];


    const [continent, setContinent] = useState(continentArray[0]);



    return(
        <div className="h-full flex flex-col items-center overflow-x-hidden overflow-y-auto px-6">
            <span className=" font-bold text-2xl" style={{ color: theme.palette.primary.main}}>Destinations</span>

            <FormControl fullWidth>
                <Select
                    IconComponent = {() => (
                        <KeyboardArrowDownIcon sx={{fontSize: 50, color: theme.palette.primary.main}} />
                    )}
                    value={continent}
                    onChange={handleContinentChange}
                    sx={{ 
                        background: theme.palette.InputText,
                        borderRadius: 10,
                        color: theme.palette.text.dropdown
                    }}
                    className='shadow-md px-4 my-6'
                >
                    {continentArray.map((name, index) => (
                         <MenuItem key={index} sx={{background: theme.palette.InputText}} value={name}>{name}</MenuItem>
                    ))}
                </Select>

                <Select
                    IconComponent = {() => (
                        <KeyboardArrowDownIcon sx={{fontSize: 50, color: theme.palette.primary.main}} />
                    )}
                    value={continent}
                    onChange={handleContinentChange}
                    sx={{ 
                        background: theme.palette.InputText,
                        borderRadius: 10,
                        color: theme.palette.text.dropdown
                    }}
                    className='shadow-md px-4'
                >
                    {continentArray.map((name, index) => (
                         <MenuItem key={index} sx={{background: theme.palette.InputText}} value={name}>{name}</MenuItem>
                    ))}
                </Select>

                <div className='flex flex-wrap text-center space-x-2 space-y-4 my-6 justify-center'>
                    <div className='flex items-center space-x-2 mt-4'>
                        <span>Du</span>
                        <div style={{backgroundColor: theme.palette.InputText}}>
                            <span className=' shadow-md px-6 py-2 rounded-full' style={{color:theme.palette.text.dropdown}}>jj/mm/aaaa</span>
                        </div>
                    </div>
                    <div className='flex items-center space-x-2'>
                        <span>au</span>
                        <div style={{backgroundColor: theme.palette.InputText}}>
                            <span className=' shadow-md px-6 py-2 rounded-full' style={{color:theme.palette.text.dropdown}}>jj/mm/aaaa</span>
                        </div>
                    </div>
                </div>
            </FormControl>

            <span className=" font-bold text-xl my-8" style={{ color: theme.palette.primary.main}}>Mood du voyage</span>
            <div className='flex flex-wrap gap-6 w-full justify-center'>
                {moodArray.map((mood, index) => (
                    <div key={index} onClick={() => handleMoodClick(index)} 
                    className={`w-36 h-36 shadow-md rounded-xl relative flex justify-center items-center ${
                        selectedIndexes.includes(index) ? 'opacity-30' : ''
                    }`}>
                        <span className='absolute font-extrabold text-2xl' style={{ color: theme.palette.background.default}} >{mood.name}</span>
                        <img src={mood.image} className='object-cover h-full w-full rounded-xl' />
                    </div>
                ))}
            </div>

            <span className=" font-bold text-xl my-12 text-center" style={{ color: theme.palette.primary.main}}>Comment voyez-vous l'organisation de votre voyage</span>
            
            <div className='flex w-full justify-between px-6'>
                <div className='w-4 h-4 rounded-full mt-3.5' style={{ backgroundColor: theme.palette.primary.main}}></div>
                <Slider onChange={(event)=>setBudget(event.target.value)} min={0} max={1000} valueLabelDisplay="on" defaultValue={budget} track={false} sx={{'& .MuiSlider-thumb': {color:  theme.palette.chatBubble.left}}} />
                <div className='w-4 h-4 rounded-full mt-3.5' style={{ backgroundColor: theme.palette.primary.main}}></div>
            </div>
            <div className='flex w-full justify-between'>
                <span style={{ color: theme.palette.primary.main}}>Spontanée</span>
                <span style={{ color: theme.palette.primary.main}}>Organisée</span>
            </div>

            <span className=" font-bold text-xl my-6 text-center" style={{ color: theme.palette.primary.main}}>Prix</span>

            <div className='flex w-full justify-between mb-8'>
                <span className={`${budget < 300 ? 'font-bold' : ''}`}>0€ - 300€</span>
                <span className={`${budget > 300 && budget < 1000 ? 'font-bold' : ''}`}>300€ - 1000€</span>
                <span className={`${budget == 1000 ? 'font-bold' : ''}`}>+1000€</span>
            </div>
            
        </div>
    );
}