import { IpcRendererEvent } from 'electron';
import { TNobleCommand, TNobleCommandType } from './peripheral/ble/types';

require('./rt/electron-rt');
//////////////////////////////
// User Defined Preload scripts below
console.log('User Preload!');

const { ipcRenderer } = require('electron');

// @ts-ignore
window.electron = {
  getSerialPortList: (filter: string[]) => ipcRenderer.invoke('serial-port:get-serial-port-list', filter),
  bluetoothLEScan: {
    enable: (filter: string[], callback: (scanResult: unknown) => void) => {
      ipcRenderer.send('bluetooth-le:scan-enable', filter);
      ipcRenderer.on('bluetooth-le:scan-result', (event: IpcRendererEvent, scanResult) => callback(scanResult));
    },
    disable: () => {
      ipcRenderer.send('bluetooth-le:scan-disable', []);
      ipcRenderer.removeAllListeners('bluetooth-le:scan-result');
    },
  },

  bluetoothLE: (command: TNobleCommand): Promise<unknown> => {
    let result = null;

    switch (command.type) {
      case TNobleCommandType.SCAN_ENABLE:
        ipcRenderer.on('bluetooth-le:scan-result', (event: IpcRendererEvent, scanResult) => command.callback(scanResult));
        ipcRenderer.send('bluetooth-le:scan-enable', command.filter);
        result = true;
        break;

      default:
        console.error('unprocessed command', command);
    }
    // ipcRenderer.invoke('bluetooth-le:command', command)
    return Promise.resolve(result);
  },


  usbSerialScan: {
    enable: (
      filter: { usbVendorId: number, usbProductId: number }[],
      onDiscovered: (portInfo: unknown) => void,
      onRemoved: (portInfo: unknown) => void,
    ) => {
      ipcRenderer.send('usb-serial:scan-enable', filter);
      ipcRenderer.on('usb-serial:discovered', (event: IpcRendererEvent, portInfo: unknown) => onDiscovered(portInfo));
      ipcRenderer.on('usb-serial:removed', (event: IpcRendererEvent, portInfo: unknown) => onRemoved(portInfo));
    },
    disable: () => {
      ipcRenderer.send('usb-serial:scan-disable', []);
      ipcRenderer.removeAllListeners('usb-serial:discovered');
      ipcRenderer.removeAllListeners('usb-serial:removed');
    },
  },

};
