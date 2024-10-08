import React from 'react';

export const themes = {
  light: {
    foreground: '#000000',
    background: '#eeeeee',
    gridClass: 'light-grid',
  },
  dark: {
    foreground: '#ffffff',
    background: '#222222',
    gridClass: 'dark-grid',
  },
};

export const ThemeContext = React.createContext(themes.light);