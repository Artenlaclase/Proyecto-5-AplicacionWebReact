import { Container, Grid, Card, CardContent, Typography, Box, Chip, Avatar, Divider, List, ListItem, ListItemIcon, ListItemText, Paper } from '@mui/material';
import { Code, School, Work, EmojiObjects, CloudQueue, Speed, Security, GitHub, LinkedIn } from '@mui/icons-material';
import profileImage from '../assets/img/raulRosalesR.webp';

export const About = () => {
  const skills = [
    { name: 'React', level: 'Avanzado', icon: '⚛️' },
    { name: 'JavaScript', level: 'Avanzado', icon: '📜' },
    { name: 'Material-UI', level: 'Intermedio', icon: '🎨' },
    { name: 'Node.js', level: 'Intermedio', icon: '🟢' },
    { name: 'Git', level: 'Intermedio', icon: '📦' },
    { name: 'API REST', level: 'Avanzado', icon: '🔌' }
  ];

  const achievements = [
    'Aplicación web de clima con React y múltiples APIs',
    'Integración de mapas interactivos con Leaflet',
    'Sistema de calidad del aire (AQI)',
    'Información marina y de mareas',
    'Pronóstico meteorológico de 3 días'
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header con foto de perfil */}
      <Box 
        sx={{ 
          textAlign: 'center', 
          mb: 6,
          background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
          borderRadius: 4,
          p: 4,
          color: 'white'
        }}
      >
        <Avatar
          src={profileImage}
          alt="Raúl Rosales"
          sx={{ 
            width: 150, 
            height: 150, 
            margin: '0 auto 20px',
            border: '5px solid white',
            boxShadow: 3
          }}
        />
        <Typography variant="h3" fontWeight="bold" gutterBottom>
          Raúl Rosales Rebolledo
        </Typography>
        <Typography variant="h5" sx={{ opacity: 0.9, mb: 2 }}>
          Desarrollador Full Stack
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Chip 
            icon={<GitHub />} 
            label="GitHub" 
            component="a"
            href="https://github.com/Artenlaclase" 
            target="_blank"
            clickable
            sx={{ backgroundColor: 'rgba(255,255,255,0.2)', color: 'white', '&:hover': { backgroundColor: 'rgba(255,255,255,0.3)' } }}
          />
          <Chip 
            icon={<LinkedIn />} 
            label="LinkedIn" 
            component="a"
            href="https://www.linkedin.com/in/raulrosalesrebolledo" 
            target="_blank"
            clickable
            sx={{ backgroundColor: 'rgba(255,255,255,0.2)', color: 'white', '&:hover': { backgroundColor: 'rgba(255,255,255,0.3)' } }}
          />
        </Box>
      </Box>

      <Grid container spacing={4}>
        {/* Sobre mí */}
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box display="flex" alignItems="center" gap={1} mb={2}>
                <EmojiObjects color="primary" sx={{ fontSize: 32 }} />
                <Typography variant="h5" fontWeight="bold">
                  Sobre Mí
                </Typography>
              </Box>
              <Divider sx={{ mb: 2 }} />
              <Typography variant="body1" paragraph>
                Desarrollador apasionado por crear aplicaciones web modernas y funcionales. 
                Estudiante del Bootcamp UDD 13, enfocado en aprender y aplicar las mejores 
                prácticas de desarrollo.
              </Typography>
              <Typography variant="body1" paragraph>
                Este proyecto de aplicación meteorológica demuestra mis habilidades en:
              </Typography>
              <List dense>
                <ListItem>
                  <ListItemIcon>
                    <CloudQueue color="primary" />
                  </ListItemIcon>
                  <ListItemText primary="Integración de APIs externas" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Speed color="primary" />
                  </ListItemIcon>
                  <ListItemText primary="Optimización de rendimiento" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Security color="primary" />
                  </ListItemIcon>
                  <ListItemText primary="Manejo seguro de datos" />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Formación */}
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box display="flex" alignItems="center" gap={1} mb={2}>
                <School color="primary" sx={{ fontSize: 32 }} />
                <Typography variant="h5" fontWeight="bold">
                  Formación
                </Typography>
              </Box>
              <Divider sx={{ mb: 2 }} />
              <Box mb={3}>
                <Typography variant="h6" fontWeight="bold" color="primary">
                  Bootcamp UDD 13
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Desarrollo Full Stack
                </Typography>
                <Typography variant="body1" paragraph>
                  Programa intensivo enfocado en tecnologías modernas como React, Node.js, 
                  bases de datos, y desarrollo de aplicaciones escalables.
                </Typography>
              </Box>
              <Box>
                <Typography variant="h6" fontWeight="bold" mb={1}>
                  Tecnologías Aprendidas
                </Typography>
                <Box display="flex" gap={1} flexWrap="wrap">
                  <Chip label="React" size="small" color="primary" />
                  <Chip label="Vite" size="small" color="primary" />
                  <Chip label="Material-UI" size="small" color="primary" />
                  <Chip label="JavaScript ES6+" size="small" color="secondary" />
                  <Chip label="APIs REST" size="small" color="secondary" />
                  <Chip label="Git & GitHub" size="small" color="secondary" />
                  <Chip label="React Router" size="small" />
                  <Chip label="Hooks" size="small" />
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Habilidades */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" gap={1} mb={2}>
                <Code color="primary" sx={{ fontSize: 32 }} />
                <Typography variant="h5" fontWeight="bold">
                  Habilidades Técnicas
                </Typography>
              </Box>
              <Divider sx={{ mb: 3 }} />
              <Grid container spacing={2}>
                {skills.map((skill, index) => (
                  <Grid item xs={12} sm={6} md={4} key={index}>
                    <Paper 
                      elevation={2} 
                      sx={{ 
                        p: 2, 
                        textAlign: 'center',
                        transition: 'transform 0.2s',
                        '&:hover': {
                          transform: 'scale(1.05)',
                          boxShadow: 4
                        }
                      }}
                    >
                      <Typography variant="h4" mb={1}>
                        {skill.icon}
                      </Typography>
                      <Typography variant="h6" fontWeight="bold">
                        {skill.name}
                      </Typography>
                      <Chip 
                        label={skill.level} 
                        size="small" 
                        color={skill.level === 'Avanzado' ? 'success' : 'info'}
                        sx={{ mt: 1 }}
                      />
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Logros del Proyecto */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" gap={1} mb={2}>
                <Work color="primary" sx={{ fontSize: 32 }} />
                <Typography variant="h5" fontWeight="bold">
                  Características del Proyecto
                </Typography>
              </Box>
              <Divider sx={{ mb: 3 }} />
              <Grid container spacing={2}>
                {achievements.map((achievement, index) => (
                  <Grid item xs={12} sm={6} key={index}>
                    <Box 
                      sx={{ 
                        p: 2, 
                        borderLeft: '4px solid',
                        borderColor: 'primary.main',
                        backgroundColor: 'rgba(102, 126, 234, 0.05)',
                        borderRadius: 1
                      }}
                    >
                      <Typography variant="body1">
                        ✅ {achievement}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

    </Container>
  );
}
4

