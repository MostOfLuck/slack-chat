import ReactDOM from 'react-dom/client';
import init from './init';
import './App.scss';
import './index.css';

const app = async () => {
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(await init());
};

app();
