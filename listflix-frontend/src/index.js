import React from 'react';
import ReactDOM from 'react-dom';
import { BaseProvider } from 'baseui';
import { LightTheme } from 'baseui';
import { Provider } from 'styletron-react'; // Исправленный импорт
import { Client as Styletron } from 'styletron-engine-atomic';

// Ваш основной компонент
import App from './App';

const engine = new Styletron();

ReactDOM.render(
  <Provider value={engine}>
    <BaseProvider theme={LightTheme}>
      <App />
    </BaseProvider>
  </Provider>,
  document.getElementById('root')
);
