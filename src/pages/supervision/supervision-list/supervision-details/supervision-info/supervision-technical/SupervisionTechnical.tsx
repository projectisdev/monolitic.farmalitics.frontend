import React from 'react';
import { Button } from '@mui/material';

const SupervisionTechnical: React.FC = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 40 }}>
            <h2>Formulario de Supervisión Técnica</h2>
            <p>
            Haz clic en el siguiente botón para acceder al formulario y registrar una nueva supervisión técnica.
            </p>
            <Button variant="contained" color="primary">
            Añadir
            </Button>
        </div>
    );
};

export default SupervisionTechnical;