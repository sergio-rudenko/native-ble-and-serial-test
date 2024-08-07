import { IonApp } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { createRoot } from 'react-dom/client';

import packageJson from '../package.json';
import App from './App';

console.debug(`Version: ${packageJson.version}`);

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <IonApp>
    <IonReactRouter>
      <App />
    </IonReactRouter>
  </IonApp>,
);
