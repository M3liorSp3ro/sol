import React from 'react'
import Content from './components/Content/Content';
import Header from './components/Header/Header';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="page-content">
      <ToastContainer />
      <Header />
      <div className='page-content__body'>
        <Content />
      </div>
    </div>
  );
}

export default App;
