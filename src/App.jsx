import { useState } from 'react'
import MyApp from './MyApp'
import MyApp2 from './MyApp2'
import './App.css'

function App() {
  const [currentApp, setCurrentApp] = useState('app1');

  return (
    <>
      <div style={{ position: 'fixed', top: 10, right: 10, zIndex: 1000 }}>
        <button onClick={() => setCurrentApp(currentApp === 'app1' ? 'app2' : 'app1')}>
          Switch to {currentApp === 'app1' ? 'App 2' : 'App 1'}
        </button>
      </div>
      {currentApp === 'app1' ? <MyApp /> : <MyApp2 />}
    </>
  )
}

export default App
