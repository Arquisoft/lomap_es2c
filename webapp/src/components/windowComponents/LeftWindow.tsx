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

    const [value, setValue] = React.useState('1');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    return (
        <Window>
            <ThemeProvider theme={theme}>
                <MyTabContext value={value} theme={theme}>
                    <Tabs
                        variant="fullWidth"
                        value={value}
                        onChange={handleChange}
                        textColor="primary"
                        indicatorColor="primary"
                        aria-label="secondary tabs example"
                    >
                        <Tab value="1" label="My maps" />
                        <Tab value="2" label="My friends" />
                    </Tabs>
                    <TabPanel value="1">
                        <MapsManagerPanel />
                    </TabPanel>
                    <TabPanel value="2">
                        <FriendManagerPanel />
                    </TabPanel>
                </MyTabContext>
            </ThemeProvider>
        </Window >
    )
}
