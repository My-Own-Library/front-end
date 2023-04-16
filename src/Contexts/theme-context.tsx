import { createContext } from 'react';

import useLocalStorage from '../hooks/useLocalStorage';

const ThemeContext = createContext({});

export function ThemeProvider({ children }: any) {
  const [themeDataId, setThemeDataId] = useLocalStorage('themeData', {});
  
  return (
    <ThemeContext.Provider value={{ themeDataId, setThemeDataId }}>
      {children}
    </ThemeContext.Provider>
  );
}

export default ThemeContext;