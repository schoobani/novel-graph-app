import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from "react-router-dom"; 
import "./style.css"
import '../node_modules/react-grid-layout/css/styles.css'
import '../node_modules/react-resizable/css/styles.css'

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);