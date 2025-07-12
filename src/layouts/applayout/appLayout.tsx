import useBodyClasses from '@/hooks/useBodyClasses';
import { AppLayoutProvider, Main } from '.';

const AppLayout = () => {
  // Using the useBodyClasses hook to set background styles for light and dark modes
  useBodyClasses(`
    [--tw-page-bg:#fefefe]
    [--tw-page-bg-dark:var(--tw-coal-500)]
    applayout
    sidebar-fixed 
    header-fixed 
    bg-[--tw-page-bg]
    dark:bg-[--tw-page-bg-dark]
  `);

  return (
    <AppLayoutProvider>
      <Main />
    </AppLayoutProvider>
  );
};

export { AppLayout };
