import React from 'react'
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabPanel from '@mui/lab/TabPanel';
import { styled } from '@mui/material/styles';
import { createTheme, Tabs, ThemeProvider } from '@mui/material';
import { MapsManagerPanel } from './MapsManagerPanel';
import { FriendManagerPanel } from './FriendManagerPanel';
import { showError } from '../../utils/fieldsValidation';
import { Navigate, useNavigate, useParams } from 'react-router-dom';

const Window = styled(Box)({
    backgroundColor: 'white',
    minWidth: '25vw',
})

const MyTabContext = styled(TabContext)({
    color: '#1f4a21'
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

    const [value, setValue] = React.useState(mainop);

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        navigate("/home/" + newValue + "/main")
        setValue(newValue);
    };

    return (
        <Window>
            <ThemeProvider theme={theme}>
                <MyTabContext value={mainop} theme={theme}>
                    <Tabs
                        variant="fullWidth"
                        value={value}
                        onChange={handleChange}
                        textColor="primary"
                        indicatorColor="primary"
                        aria-label="secondary tabs example"
                    >
                        <Tab value="groups" label="My maps" />
                        <Tab value="friends" label="My friends" />
                    </Tabs>
                    <TabPanel value="groups">
                        <MapsManagerPanel />
                    </TabPanel>
                    <TabPanel value="friends">
                        <FriendManagerPanel />
                    </TabPanel>
                </MyTabContext>
            </ThemeProvider>
        </Window >
    )
}
