import React, { useEffect, useState } from 'react';
import '../App.css';

function Todos() {

  const getLocalStorage = () => {
    let list = localStorage.getItem("lists")

    if(list) {
      return JSON.parse(localStorage.getItem("lists"));
    }
    else {
      return [];
    }
  }

  const [inputItems, setInputItems] = useState('');
  const [items, setItems] = useState(getLocalStorage());

  const addItems = () => {
    if (!inputItems) {
      return;
    }
    else {
      setItems([...items, inputItems]);
      setInputItems('')
    }

  }

  const deleteItems = (id) => {
    const updateItems = items.filter((data, inx) => {
      return inx !== id
    })
    setItems(updateItems);
    // (updateItems) ? "delete.mp3": setItems(updateItems);
  }

  const rmvAll = () => {
    setItems([])
  }

  useEffect (
    () => {
      localStorage.setItem('lists', JSON.stringify(items))
    }, [items]
  )

  return (
    <>
      <div className="container">
        <h2 className='textColor'>Todos List</h2>
        <div>
          <input
            type="text"
            placeholder='Enter items'
            value={inputItems}
            onChange={(e) => setInputItems(e.target.value)}
            required
            className="inputField"
          />
        </div>
        {
          items.map((value, i) => {
            return (
              <div key={i}>
                <span>{value}</span>
                <button onClick={ ()=> deleteItems(i) }>Delete</button>
              </div>
            );
          })
        }

        <div className='control'>

          <button onClick={addItems}>Add</button>
          <button onClick={rmvAll}>Remove All</button>

        </div>
      </div>
    </>
  );
}

export default Todos;
