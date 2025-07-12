import { type ILayoutConfig } from '@/providers';

// Defining the applayout layout configuration using the ILayoutConfig type
const appLayoutConfig: ILayoutConfig = {
  // Setting the layout name to 'app-layout'
  name: 'app-layout',

  // Defining configuration options for the layout
  options: {
    // Sidebar configuration
    sidebar: {
      theme: 'light', // Sidebar theme set to light
      fixed: true, // Sidebar is fixed in position
      collapse: false // Sidebar is not collapsed by default
    },

    // Header configuration
    header: {
      fixed: true // Header is fixed in position
    }
  }
};

export { appLayoutConfig };
