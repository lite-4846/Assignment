import { useState } from 'react';

import './App.css'
import Contacts from './components/Contacts'
import StyledInputElement from './components/StyledInputElement';

function App() {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <div>
      {isLogin && <Contacts />}
      <StyledInputElement />
    </div>
  )
}

export default App
