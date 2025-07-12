import { Fragment } from 'react';

import { Container } from '@/components/container';
import {
  Toolbar,
  ToolbarActions,
  ToolbarDescription,
  ToolbarHeading,
  ToolbarPageTitle
} from '@/partials/toolbar';

import { useLayout } from '@/providers';
import { Link, useNavigate } from 'react-router-dom';
import { SupervisionDetailContent } from './SupervisionDetailContent';

const SupervisionDetailPage = () => {
  const { currentLayout } = useLayout();
  const navigate = useNavigate();

  return (
    <Fragment>
      {currentLayout?.name === 'app-layout' && (
        <Container>
          <Toolbar>
            <ToolbarHeading>
                <button
                type="button"
                className="mr-4 text-sm text-gray-500 hover:text-primary"
                onClick={() => navigate(-1)}
                >
                ← Volver a la lista
                </button>
            </ToolbarHeading>
            
          </Toolbar>
        </Container>

        
      )}
      <Container>
        <SupervisionDetailContent />
      </Container>
    </Fragment>
  );
};

export { SupervisionDetailPage };