import HomeIcon from '@mui/icons-material/Home';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import ModelTrainingRoundedIcon from '@mui/icons-material/ModelTrainingRounded';
import RoomPreferencesIcon from '@mui/icons-material/RoomPreferences';
 
export const navData = [
    {
        id: 0,
        icon: <HomeIcon/>,
        text: "Home",
        link: "/"
    },
    {
        id: 1,
        icon: <InfoRoundedIcon/>,
        text: "About",
        link: "about"
    },
    {
        id: 2,
        icon: <RoomPreferencesIcon/>,
        text: "Facilities",
        link: "facilities"
    },
    {
        id: 3,
        icon: <ModelTrainingRoundedIcon/>,
        text: "Apply Now",
        link: "https://admission.tip.edu.ph/web/"
    },
]