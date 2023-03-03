import * as React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Paper from './Paper';
import logo from '../logo.png';

export default function SesionForm(props: React.HTMLAttributes<HTMLDivElement>) {
  const { children } = props;

  return (
    <Box
      sx={{
        display: 'flex',
      }}
    >
      <Container maxWidth="sm">
        <Box sx={{ mt: "2em", mb: "2em" }}>
          <Paper
            background="light"
            sx={{ py: { xs: "4em", md: "4em" }, px: { xs: "3em", md: "3em" } }}
          >
            <img src={logo} alt="Logo LoMap"/>
            {children}
          </Paper>
        </Box>
      </Container>
    </Box>
  );
}