import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Menu from './components/Menu';
import Content from './components/Content';

import './App.css';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  return (
    <div className='App'>
      <ToastContainer
        position="top-center"
        autoClose={1500}
        hideProgressBar={false}
        closeOnClick={true}
        pauseOnHover={true}
        draggable={true}
        progress={undefined}
        theme="dark"
        progressStyle={{ backgroundColor: '#ffb327' }}
        style={{
          width: 'auto',
          textAlign: 'center',
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      />
      <BrowserRouter basename='/react_vite_games'>
        <Menu />
        <Content />
      </BrowserRouter>
    </div>
  );
}
