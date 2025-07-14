import { Fragment } from 'react';

import { Container } from '@/components/container';
import {
  Toolbar,
  ToolbarActions,
  ToolbarDescription,
  ToolbarHeading,
  ToolbarPageTitle
} from '@/partials/toolbar';

import { SupervisionListContent } from '.';
import { useLayout } from '@/providers';
import { Link, useNavigate } from 'react-router-dom';

const SupervisionListPage = () => {
  const { currentLayout } = useLayout();
  const navigate = useNavigate();

  return (
    <Fragment>
      {currentLayout?.name === 'app-layout' && (
        <Container>
          <Toolbar>
            <ToolbarHeading>
              {/* <ToolbarPageTitle /> */}
              <h1 className="text-success font-bold text-1.5xl">Solicitudes de Supervisión</h1>
                <ToolbarDescription>
                  Gestión de solicitudes de Supervisión a Farmacias
                </ToolbarDescription>
            </ToolbarHeading>
            
          </Toolbar>
        </Container>
      )}

      <Container>
        <SupervisionListContent />
      </Container>
    </Fragment>
  );
};

export { SupervisionListPage };
