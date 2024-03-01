import React from 'react'
import { useState } from 'react'

const App = () => {
  const [error , setError] = useState("");
  return (
    <div className='app'>
      <section className='search-section'>
        <p>What do want to know?
        <button className='surprise'>Surprise me</button>
        </p>
        <div className='input-container'>
          <input
           value={""}
           placeholder='When is Christmas...?'
           onChange={""}
          />
          {!error && <button>Ask me</button>}
          {error && <button>Clear</button>}
        </div>
      </section>
    </div>
  )
}

export default App