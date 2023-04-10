import { createContext } from 'react';

import useLocalStorage from '../hooks/useLocalStorage';

const ThemeContext = createContext({});
export default ThemeContext;

export function ThemeProvider({ children }: any) {
  const [themeDataId, setThemeDataId] = useLocalStorage('themeData', 0);
  
  return (
    <ThemeContext.Provider value={{ themeDataId, setThemeDataId }}>
      {children}
    </ThemeContext.Provider>
  );
}