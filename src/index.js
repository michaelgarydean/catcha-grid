import React from 'react'
import ReactDOM from 'react-dom'
import App from './app'
import {LoadingProvider} from "./LoadingContext";

ReactDOM.render(
          <LoadingProvider><App />
          </LoadingProvider>, document.getElementById('app'))
