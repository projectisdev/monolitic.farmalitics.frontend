import { ChangeEvent, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { useAuthContext } from '@/auth';
import { useLanguage } from '@/i18n';
import { toAbsoluteUrl } from '@/utils';

import { useSettings } from '@/providers/SettingsProvider';
import { DefaultTooltip, KeenIcon } from '@/components';
import {
  MenuItem,
  MenuLink,
  MenuSub,
  MenuTitle,
  MenuSeparator,
  MenuArrow,
  MenuIcon
} from '@/components/menu';

interface IDropdownUserProps {
  menuItemRef: any;
}

const DropdownUser = ({ menuItemRef }: IDropdownUserProps) => {
  const { settings, storeSettings } = useSettings();
  const { logout } = useAuthContext();
  const { isRTL } = useLanguage();



  const buildHeader = () => {
    return (
      <div className="flex items-center justify-between px-5 py-1.5 gap-1.5">
        <div className="flex items-center gap-2">
          <img
            className="size-9 rounded-full border-2 border-success"
            src={toAbsoluteUrl('/media/avatars/300-2.png')}
            alt=""
          />
          <div className="flex flex-col gap-1.5">
            <Link
              to="/account/hoteme/get-stard"
              className="text-sm text-gray-800 hover:text-primary font-semibold leading-none"
            >
              Cody Fisher
            </Link>
            <a
              href="mailto:c.fisher@gmail.com"
              className="text-xs text-gray-600 hover:text-primary font-medium leading-none"
            >
              c.fisher@gmail.com
            </a>
          </div>
        </div>
      </div>
    );
  };

  const buildMenu = () => {
    return (
      <Fragment>
        <MenuSeparator />
        <div className="flex flex-col">
         
          <MenuItem>
            <MenuLink path="/account/home/user-profile">
              <MenuIcon>
                <KeenIcon icon="profile-circle" />
              </MenuIcon>
              <MenuTitle>
                Mi Perfil
              </MenuTitle>
            </MenuLink>
          </MenuItem>

          {/* Configuración */}
          <MenuItem
            toggle="dropdown"
            trigger="hover"
            dropdownProps={{
              placement: isRTL() ? 'left-start' : 'right-start',
              modifiers: [
                {
                  name: 'offset',
                  options: {
                    offset: isRTL() ? [50, 0] : [-50, 0] // [skid, distance]
                  }
                }
              ]
            }}
          >

            <MenuLink>
              <MenuIcon>
                <KeenIcon icon="setting-2" />
              </MenuIcon>
              <MenuTitle>
               Configuración
              </MenuTitle>
              <MenuArrow>
                <KeenIcon icon="right" className="text-3xs rtl:transform rtl:rotate-180" />
              </MenuArrow>
            </MenuLink>

            {/* Sub-Menú Configuración */}

            <MenuSub className="menu-default light:border-gray-300 w-[200px]] md:w-[220px]">
              
              <MenuItem>
                <MenuLink path="/account/home/user-profile">
                  <MenuIcon>
                    <KeenIcon icon="user-edit" />
                  </MenuIcon>
                  <MenuTitle>
                   Editar Perfil
                  </MenuTitle>
                </MenuLink>
              </MenuItem>
              
              <MenuItem>
                <MenuLink path="/account/members/teams">
                  <MenuIcon>
                    <KeenIcon icon="setting" />
                  </MenuIcon>
                    <MenuTitle>
                    Miembros y Roles
                    </MenuTitle>
                </MenuLink>
              </MenuItem>
            </MenuSub>
          </MenuItem>
          <MenuSeparator />
        </div>
      </Fragment>
    );
  };

  const buildFooter = () => {
    return (
     

        <div className="menu-item px-4 py-1.5">
          <a onClick={logout} className="btn btn-sm btn-light justify-center">
            Cerrar Sesión
          </a>
        </div>
    );
  };

  return (
    <MenuSub
      className="menu-default light:border-gray-300 w-[200px] md:w-[250px]"
      rootClassName="p-0"
    >
      {buildHeader()}
      {buildMenu()}
      {buildFooter()}
    </MenuSub>
  );
};

export { DropdownUser };
