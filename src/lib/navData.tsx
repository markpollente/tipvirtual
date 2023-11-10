import HomeIcon from '@mui/icons-material/Home';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import ModelTrainingRoundedIcon from '@mui/icons-material/ModelTrainingRounded';
import SettingsIcon from '@mui/icons-material/Settings';
 
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
        icon: <ModelTrainingRoundedIcon/>,
        text: "Progress",
        link: "Progress"
    },
]