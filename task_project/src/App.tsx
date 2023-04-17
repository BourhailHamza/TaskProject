import { useState } from 'react';
import './assets/css/App.css';
import LeftSide from './components/LeftSide';
import RightSide from './components/RightSide';

function App() {

  const [userId, setUserId] = useState("");
  const [clicked, setClicked] = useState(false);
  const [userName, setUserName] = useState("");

  return (
    <div className="App">
      <LeftSide setUserId={ setUserId } setClicked={ setClicked } setUserName={ setUserName } />
      <RightSide userId={ userId } clicked={ clicked } setClicked={ setClicked } userName={ userName } />
    </div>
  );
}

export default App;
