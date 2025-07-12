import { Fragment } from 'react';

import { Container } from '@/components/container';
import {
  Toolbar,
  ToolbarActions,
  ToolbarDescription,
  ToolbarHeading,
  ToolbarPageTitle
} from '@/partials/toolbar';

import { PharmacyListContent } from '.';
import { useLayout } from '@/providers';
import { Link, useNavigate } from 'react-router-dom';

const PharmacyListPage = () => {
  const { currentLayout } = useLayout();
  const navigate = useNavigate();

  return (
    <Fragment>
      {currentLayout?.name === 'app-layout' && (
        <Container>
          <Toolbar>
            <ToolbarHeading>
              {/* <ToolbarPageTitle /> */}
              <h1 className="text-success font-bold text-1.5xl">Farmacias</h1>
              <ToolbarDescription>
                Permite visualizar, registrar y controlar los datos de las farmacias
              </ToolbarDescription>
            </ToolbarHeading>
            
          </Toolbar>
        </Container>
      )}

      <Container>
        <PharmacyListContent />
      </Container>
    </Fragment>
  );
};

export { PharmacyListPage };
