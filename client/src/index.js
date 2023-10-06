import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Button, ConfigProvider } from 'antd';
import {Provider} from "react-redux";
import store from "./redux/store"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider
  store={store} >
<ConfigProvider 
theme={{
  components:{
    Button:{
      colorPrimary:"#27445C",
      colorPrimaryHover:"#27445C",
      borderRadius:"2px"

      
    }
  },
  token:{
    borderRadius:"2px",
  }

}}
>
  <App/>
</ConfigProvider>
 </Provider>
);


reportWebVitals();
