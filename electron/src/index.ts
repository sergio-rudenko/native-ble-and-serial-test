import type { CapacitorElectronConfig } from '@capacitor-community/electron';
import { getCapacitorElectronConfig, setupElectronDeepLinking } from '@capacitor-community/electron';
import { ipcMain, IpcMainEvent, MenuItemConstructorOptions } from 'electron';
import { app, MenuItem } from 'electron';
import electronIsDev from 'electron-is-dev';
import unhandled from 'electron-unhandled';

import { ElectronCapacitorApp, setupContentSecurityPolicy, setupReloadWatcher } from './setup';
// import { SerialPort } from 'serialport';
import { NoblePeripheral } from './peripheral/ble/noble';
// import { Serial } from './peripheral/usb/serial';

// Graceful handling of unhandled errors.
unhandled();

// Define our menu templates (these are optional)
const trayMenuTemplate: (MenuItemConstructorOptions | MenuItem)[] = [new MenuItem({ label: 'Quit App', role: 'quit' })];
const appMenuBarMenuTemplate: (MenuItemConstructorOptions | MenuItem)[] = [
  { role: process.platform === 'darwin' ? 'appMenu' : 'fileMenu' },
  { role: 'viewMenu' },
];

// Get Config options from capacitor.config
const capacitorFileConfig: CapacitorElectronConfig = getCapacitorElectronConfig();

// Initialize our app. You can pass menu templates into the app here.
// const myCapacitorApp = new ElectronCapacitorApp(capacitorFileConfig);
const myCapacitorApp = new ElectronCapacitorApp(capacitorFileConfig, trayMenuTemplate, appMenuBarMenuTemplate);

let nobleInstance: NoblePeripheral;
// let serialInstance: Serial;

// If deeplinking is enabled then we will set it up here.
if (capacitorFileConfig.electron?.deepLinkingEnabled) {
  setupElectronDeepLinking(myCapacitorApp, {
    customProtocol: capacitorFileConfig.electron.deepLinkingCustomProtocol ?? 'mycapacitorapp',
  });
}

// If we are in Dev mode, use the file watcher components.
if (electronIsDev) {
  setupReloadWatcher(myCapacitorApp);
}

// Run Application
(async () => {
  // Wait for electron app to be ready.
  app.commandLine.appendSwitch('enable-experimental-web-platform-features');

  await app.whenReady();
  // Security - Set Content-Security-Policy based on whether or not we are in dev mode.
  setupContentSecurityPolicy(myCapacitorApp.getCustomURLScheme());
  // Initialize our app, build windows, and load content.
  await myCapacitorApp.init();

  configureMainWindow(myCapacitorApp);

  /* ------------------------------------------------------------------------- */
  const { webContents } = myCapacitorApp.getMainWindow();

  /* BLE interface */
  console.log('--> creating Noble instance');
  nobleInstance = new NoblePeripheral(webContents);
  ipcMain.on('bluetooth-le:scan-enable', nobleInstance.bleScanEnableHandler.bind(nobleInstance));
  ipcMain.on('bluetooth-le:scan-disable', nobleInstance.bleScanDisableHandler.bind(nobleInstance));
  ipcMain.on('bluetooth-le:command', nobleInstance.command.bind(nobleInstance));

  /* [USB] Serial interface */
  // console.log('--> creating Serial instance');
  // serialInstance = new Serial(webContents);
  // ipcMain.on('usb-serial:scan-enable', serialInstance.serialScanEnableHandler.bind(serialInstance));
  // ipcMain.on('usb-serial:scan-disable', serialInstance.serialScanDisableHandler.bind(serialInstance));

})();

// Handle when all of our windows are close (platforms have their own expectations).
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// When the dock icon is clicked.
app.on('activate', async () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (myCapacitorApp.getMainWindow().isDestroyed()) {
    await myCapacitorApp.init();
  }
});




/* ------------------------------------------------------------------------- */

let selectedPortId: null | string = null;

ipcMain.on('select-port', (_, portId: string) => {
  selectedPortId = portId;
});

// const getComPortList = async (event: IpcMainEvent, filter: string[]): Promise<string> => {
//   const l = await SerialPort.list();
//   const result = `requested ports:: ${JSON.stringify(l)}...`;
//   return Promise.resolve(result);
// };
// ipcMain.handle('serial-port:get-serial-port-list', getComPortList);


// Place all ipc or other electron api calls and custom functionality under this line
const configureMainWindow = (myCapacitorApp: ElectronCapacitorApp): void => {
  const mainWindow = myCapacitorApp.getMainWindow();

  mainWindow.webContents.session.on('select-serial-port', async (event, portList, webContents, callback) => {
    webContents.send('port', { portList: portList });

    event.preventDefault();

    if (selectedPortId !== null && portList.length > 0) {
      const selectedPort = portList.find((port) => port.portId === selectedPortId);

      if (selectedPort) {
        callback(selectedPort.portId);
      }
    }
  });

  mainWindow.webContents.session.setPermissionCheckHandler(
    (
      webContents,
      permission,
      requestingOrigin,
      details,
    ) => {
      // TODO: Проверять права адекватно https://www.electronjs.org/ru/docs/latest/tutorial/devices#web-serial-api
      console.log('details', details);
      return true;
    },
  );

  mainWindow.webContents.session.setDevicePermissionHandler(
    (details) => {
      // TODO: Проверять права адекватно https://www.electronjs.org/ru/docs/latest/tutorial/devices#web-serial-api
      console.log('details', details);
      return true;
    },
  );
};

