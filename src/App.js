import logo from './logo.svg';
import './App.css';
import { useState, useEffect, useCallback } from 'react';

function App() {

    const [myData, setMyData] = useState('')

  function inputHandler(event){
    setMyData(event.target.value);
    
  }

  async function sendDataHandler(event){
      event.preventDefault();

      const my_object={
        my_key:myData
      }
      console.log(my_object)

      console.log(myData);
      const res = await fetch('https://testowa-3a831-default-rtdb.firebaseio.com/testowa.json',
      {
        method: 'POST',
        body: JSON.stringify(myData),
        headers:{
          'Content-Type': 'application.json'
        }
        
      }) ;
       const data = await res.json() ;
       console.log(data) ;
       setMyData('')
  }

  const getDataHandler = useCallback(async() => {
    const res = await fetch("https://testowa-3a831-default-rtdb.firebaseio.com/testowa.json")
    const data = await res.json()

    const loadedData = []

    for(const key in data){
      loadedData.push({
        moj: data[key].my_key
      })
    }
    console.log(data)
    console.log(loadedData)
  }
  )


  useEffect(()=>{
    getDataHandler()
  }, [getDataHandler])

  return (
    <div className="App">
      
      <form onSubmit={sendDataHandler}>
        <input type="text"
               onChange={inputHandler}
               value={myData}
        />
        <button type="submit"> Prześlij dane do bazy </button>
      </form>
      <button onClick={getDataHandler}>Pobierz dane</button>
    </div>
  );
}

export default App;
