import React from 'react'
import Content from './components/Content/Content';
import Header from './components/Header/Header';

function App() {
  return (
    <div className="page-content">
      <Header />
      <div className='page-content__body'>
        <Content />
      </div>
    </div>
  );
}

export default App;
