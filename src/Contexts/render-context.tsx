import { createContext } from 'react';

import useLocalStorage from '../hooks/useLocalStorage';

const RenderContext = createContext({});

export function RenderProvider({ children }: any) {
  const [renderData, setRender] = useLocalStorage('themeData', {});
  
  return (
    <RenderContext.Provider value={{ renderData, setRender }}>
      {children}
    </RenderContext.Provider>
  );
}

export default RenderContext;