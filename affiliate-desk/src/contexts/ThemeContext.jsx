import { createContext, useContext, useState, useMemo } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { createAppTheme } from '../theme';

const ColorModeContext = createContext({ toggleColorMode: () => {} });

export function AppThemeProvider({ children }) {
  const [mode, setMode] = useState('dark');

  const colorMode = useMemo(
    () => ({ toggleColorMode: () => setMode((m) => (m === 'light' ? 'dark' : 'light')), mode }),
    [mode]
  );

  const theme = useMemo(() => createAppTheme(mode), [mode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export const useColorMode = () => useContext(ColorModeContext);
