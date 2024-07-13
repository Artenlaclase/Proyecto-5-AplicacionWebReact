import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import profileImage from '../assets/raul-rosales.png';



export default function CardData() {
  return (
    <Card sx={{ maxWidth: 345, }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image= {profileImage}
          alt="Raul Rosales"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Presentación
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Raúl Rosales
            Desarrollador
            Github
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Correo
        </Button>
      </CardActions>
    </Card>
  );
}
