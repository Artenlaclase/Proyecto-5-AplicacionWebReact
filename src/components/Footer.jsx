import React from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom"; // Asegúrate de tener react-router-dom instalado

export const Footer = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "auto",
        backgroundColor: "primary.main",
        paddingTop: "1rem",
        paddingBottom: "1rem",
        position: "absolute",
        bottom: 0,
      }}
    >
      <Container maxWidth="lg">
        <Grid container direction="column" alignItems="center">
          <Grid item xs={12}>
            <Typography 
              component={Link} 
              to="/about" 
              color="white" 
              variant="h6" // Cambiado a h6 para tamaño más pequeño
              sx={{ textDecoration: "none" }}
            >
              Raúl Rosales
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography color="textSecondary" variant="body2"> {/* Cambiado a body2 para tamaño más pequeño */}
              {`${new Date().getFullYear()} | React | Material UI | React Router`}
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;



