import React, { useState } from 'react'
import './App.css'
import NewLoginForm from './components/NewLoginForm';
import firebase from 'firebase/app';
import config from './firebase/config'
import 'firebase/auth';
import Content from './components/Content'

firebase.initializeApp(config);

const App = () => {
  const [Login, setLogin] = useState(false);
    return (
      <div>
      <div className="white">
        {Login === false ? <NewLoginForm setLogin={setLogin} /> : null}
      </div>
      {Login && <Content />}
    </div>
    )
}
export default App;
