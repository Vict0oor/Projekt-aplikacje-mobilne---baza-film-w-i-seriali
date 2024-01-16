import React from 'react';
import { UserProvider } from './src/UserContext.js';
import StackNav from "./src/navigation/Stack";

const App = () => {
  return (
    <UserProvider>
      <StackNav />
    </UserProvider>
  );
};

export default App;
