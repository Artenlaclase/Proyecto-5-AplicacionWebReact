import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { GitHub, LinkedIn, Email } from '@mui/icons-material';
import profileImage from '../assets/img/Raul_rosales.jpg';
import { Box } from '@mui/system';

export default function CardData() {
  return (
    <Box 
      display="flex" 
      justifyContent="center" 
      alignItems="center" 
      height="100vh"
    >
      <Card sx={{ maxWidth: 345 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image={profileImage}
            alt="Raul Rosales"
            sx={{ objectFit: 'cover' }}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Presentación
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Raúl Rosales
              <br />
              Desarrollador
              <br />
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button 
            size="small" 
            color="primary" 
            startIcon={<Email />} 
            onClick={() => window.location.href = 'mailto:raulandresrosales@outlook.es'}
          >
            Correo
          </Button>
          <Button 
            size="small" 
            color="primary" 
            startIcon={<GitHub />} 
            href="https://github.com/Artenlaclase" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            Github
          </Button>
          <Button 
            size="small" 
            color="primary" 
            startIcon={<LinkedIn />} 
            href="https://www.linkedin.com/in/raulrosalesrebolledo" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            LinkedIn
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
}
