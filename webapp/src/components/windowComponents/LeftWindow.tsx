import React from 'react'
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabPanel from '@mui/lab/TabPanel';
import { styled } from '@mui/material/styles';
import { createTheme, Tabs, ThemeProvider } from '@mui/material';
import { GroupsManagerPanel } from 'components/windowComponents/groups/GroupsManagerPanel';
import { FriendManagerPanel } from 'components/windowComponents/friends/FriendManagerPanel';
import { useNavigate, useParams } from 'react-router-dom';
import GroupIcon from '@mui/icons-material/Group';
import MapIcon from '@mui/icons-material/Map';
import { useDispatch } from 'react-redux';
import { addPlaceMarker } from 'utils/redux/action';

const Window = styled(Box)({
    backgroundColor: 'white',
    width: '30vw',
    height: '78.2vh'
})

const MyTabContext = styled(TabContext)({
    color: '#1f4a21',
})

const MyTabs = styled(Tabs)({
    height: '8vh',
})

const theme = createTheme({
    palette: {
        primary: {
            main: '#81c784',
        },
        secondary: {
            main: '#1f4a21',
        },
    }
});

export function LeftWindow() {

    const { mainop } = useParams()

    const navigate = useNavigate()

    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(addPlaceMarker(false))
    }

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        navigate("/home/" + newValue + "/main")
    };

    return (
        <Window>
            <ThemeProvider theme={theme}>
                <MyTabContext value={mainop} theme={theme}>
                    <MyTabs
                        variant="fullWidth"
                        value={mainop}
                        onChange={handleChange}
                        textColor="primary"
                        indicatorColor="primary"
                        aria-label="secondary tabs example"
                    >
                        <Tab data-testid="groupsTab" value="groups" label="Mis mapas" icon={<MapIcon />} iconPosition='start' />
                        <Tab data-testid="friendsTab" value="friends" label="Amigos" onClick={handleClick} icon={<GroupIcon />} iconPosition='start' />
                    </MyTabs>
                    <TabPanel value="groups">
                        <GroupsManagerPanel />

                    </TabPanel>
                    <TabPanel value="friends">
                        <FriendManagerPanel />
                    </TabPanel>
                </MyTabContext>
            </ThemeProvider>
        </Window >
    )
}