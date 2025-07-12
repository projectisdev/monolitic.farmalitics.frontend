import { Fragment } from 'react';

import { Container } from '@/components/container';
import {
  Toolbar,
  ToolbarActions,
  ToolbarDescription,
  ToolbarHeading,
} from '@/partials/toolbar';

import { SupervisionListContent } from '.';
import { useLayout } from '@/providers';
import { useNavigate } from 'react-router-dom';

const SupervisionListPage = () => {
  const { currentLayout } = useLayout();
  const navigate = useNavigate();

  return (
    <Fragment>
      {currentLayout?.name === 'app-layout' && (
        <Container>
          <Toolbar>
            <ToolbarHeading>
            
              <h1 className="text-success font-bold text-1.5xl">Supervisión</h1>
                <ToolbarDescription>
                  Administra y monitorea las supervisiones de farmacias
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
