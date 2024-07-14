import React from 'react';
import { Alert, Box, Button } from "@mui/material";

export default function ErrorMessage({ message, handleRetry }) {
    return (
        <Alert severity="error" sx={{ my: 2 }}>
            Error: {message}
            {handleRetry && (
                <Box sx={{ mt: 2 }}>
                    <Button variant="outlined" onClick={handleRetry}>
                        Reintentar
                    </Button>
                </Box>
            )}
        </Alert>
    );
}
