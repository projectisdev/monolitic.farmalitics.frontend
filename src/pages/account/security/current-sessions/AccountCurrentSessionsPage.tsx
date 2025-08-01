import { Fragment } from 'react';
import { Link } from 'react-router-dom';

import { Container } from '@/components/container';
import {
  Toolbar,
  ToolbarActions,
  ToolbarDescription,
  ToolbarHeading,
  ToolbarPageTitle
} from '@/partials/toolbar';
import { PageNavbar } from '@/pages/account';

import { AccountCurrentSessionsContent } from '.';
import { useLayout } from '@/providers';

const AccountCurrentSessionsPage = () => {
  const { currentLayout } = useLayout();

  return (
    <Fragment>
      <PageNavbar />

      {currentLayout?.name === 'app-layout' && (
        <Container>
          <Toolbar>
            <ToolbarHeading>
              <ToolbarPageTitle />
              <ToolbarDescription>Authorized Devices for Report Access</ToolbarDescription>
            </ToolbarHeading>
            <ToolbarActions>
              <Link to="/account/security/security-log" className="btn btn-sm btn-light">
                Activity Log
              </Link>
            </ToolbarActions>
          </Toolbar>
        </Container>
      )}

      <Container>
        <AccountCurrentSessionsContent />
      </Container>
    </Fragment>
  );
};

export { AccountCurrentSessionsPage };
