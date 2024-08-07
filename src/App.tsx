/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';
/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
/* Theme variables */
import './theme/variables.css';
/* Custom styles */
import './theme/styles.css';

import { IonButton, IonCol, IonPage, IonRouterOutlet, IonRow, setupIonicReact } from '@ionic/react';
import { FC } from 'react';
import { Route } from 'react-router-dom';

setupIonicReact();

const TestPage = () => {
  console.log('test page');

  const bleScanCallback = (scanResult: unknown) => {
    console.log(`BLE scanResult: ${JSON.stringify(scanResult)}`);
  }

  const usbDiscoveredCallback = (portInfo: unknown) => {
    console.log(`USB discovered: ${JSON.stringify(portInfo)}`);
  }

  const usbRemovedCallback = (portInfo: unknown) => {
    console.log(`USB removed: ${JSON.stringify(portInfo)}`);
  }

  return (<IonPage>
      <div>test page</div>
      <IonButton onClick={
        async () => {
          // @ts-ignore
          const result = await window.electron.bluetoothLE({
            type: 'SCAN_ENABLE',
            filter: ['5101', '5102'],
            callback: bleScanCallback
          });
          console.log('--> bluetoothLE result:', result);
        }
      }>GET</IonButton>
      <IonRow>
        <IonCol>
          <IonButton onClick={
            async () => {
              // @ts-ignore
              await window.electron.bluetoothLEScan.enable(['5101', '5102'], bleScanCallback);
            }
          }>BLE START</IonButton>
        </IonCol>
        <IonCol>
          <IonButton onClick={
            async () => {
              // @ts-ignore
              await window.electron.bluetoothLEScan.disable();
            }
          }>BLE STOP</IonButton>
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol>
          <IonButton onClick={
            async () => {
              // @ts-ignore
              await window.electron.usbSerialScan.enable(
                [{usbVendorId: 0x0403, usbProductId: 0x6001}],
                usbDiscoveredCallback,
                usbRemovedCallback
              );
            }
          }>USB START</IonButton>
        </IonCol>
        <IonCol>
          <IonButton onClick={
            async () => {
              // @ts-ignore
              await window.electron.usbSerialScan.disable();
            }
          }>USB STOP</IonButton>
        </IonCol>
      </IonRow>
    </IonPage>
  );
};

const App: FC = () => (
  <IonRouterOutlet>
    <Route exact path="/">
      <TestPage />
    </Route>
  </IonRouterOutlet>
);

export default App;
