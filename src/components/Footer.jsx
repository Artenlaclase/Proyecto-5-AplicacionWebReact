import React from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom"; // Asegúrate de tener react-router-dom instalado

export const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        width: "100%",
        height: "auto",
        backgroundColor: "primary.main",
        paddingTop: "1rem",
        paddingBottom: "1rem",
        mt: "auto",
      }}
    >
      <Container maxWidth="lg">
        <Grid container direction="column" alignItems="center">
          <Grid item xs={12}>
            <Typography color="white" variant="body2" align="center">
              © 2024{' '}
              <Typography 
                component="a" 
                href="https://www.raulrosales.cl" 
                target="_blank" 
                rel="noopener noreferrer"
                sx={{ 
                  color: 'white', 
                  textDecoration: 'underline',
                  '&:hover': {
                    textDecoration: 'none',
                    opacity: 0.8
                  }
                }}
              >
                Raúl Rosales Rebolledo
              </Typography>
              . Proyecto desarrollado como parte del Bootcamp UDD 13.
            </Typography>
          </Grid>
          <Grid item xs={12} sx={{ mt: 1 }}>
            <Typography color="textSecondary" variant="caption">
              {`React | Material UI | React Router | Vite`}
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;



