import { Container, Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Home as HomeIcon, Error } from '@mui/icons-material';

export const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '80vh',
          textAlign: 'center',
        }}
      >
        <Box
          sx={{
            background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
            borderRadius: '50%',
            width: 200,
            height: 200,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mb: 4,
            boxShadow: 3,
          }}
        >
          <Error sx={{ fontSize: 120, color: 'white' }} />
        </Box>

        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: '4rem', md: '6rem' },
            fontWeight: 'bold',
            background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            mb: 2,
          }}
        >
          404
        </Typography>

        <Typography variant="h4" gutterBottom fontWeight="bold" color="text.primary">
          Página no encontrada
        </Typography>

        <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: 500 }}>
          Lo sentimos, la página que estás buscando no existe o ha sido movida. 
          Puedes volver a la página principal para continuar navegando.
        </Typography>

        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center' }}>
          <Button
            variant="contained"
            size="large"
            startIcon={<HomeIcon />}
            onClick={() => navigate('/')}
            sx={{
              background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
              '&:hover': {
                background: 'linear-gradient(135deg, #1d4ed8 0%, #1e40af 100%)',
              },
            }}
          >
            Volver al Inicio
          </Button>
        </Box>

        <Box sx={{ mt: 6 }}>
          <Typography variant="caption" color="text.secondary">
            ¿Necesitas ayuda? Visita la sección{' '}
            <Typography
              component="span"
              variant="caption"
              sx={{
                color: 'primary.main',
                cursor: 'pointer',
                textDecoration: 'underline',
                '&:hover': { opacity: 0.8 },
              }}
              onClick={() => navigate('/about')}
            >
              Acerca de
            </Typography>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};
