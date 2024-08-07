// import { WebContents, IpcMainEvent } from 'electron';
// import { SerialPort } from 'serialport';
// import { PortInfo } from '@serialport/bindings-interface';
//
// import { AbstractScanablePeripheralDriver } from '../index';
// import { IScanablePeripheralDriver } from '../types';
//
// export class Serial extends AbstractScanablePeripheralDriver implements IScanablePeripheralDriver {
//   private _ports: Record<PortInfo['path'], PortInfo> = {};
//
//   private _filter: { usbVendorId: number, usbProductId: number }[];
//
//   private _interval: NodeJS.Timeout | null = null;
//
//   constructor(webContents: WebContents, filter?: { usbVendorId: number, usbProductId: number }[]) {
//     super(webContents);
//
//     this._filter = filter || [];
//     this._scanEnabled = false;
//
//     if (filter !== undefined) {
//       this.scanEnable(filter);
//     }
//   }
//
//   private async $periodicUsbSerialList() {
//     if (this.isScanEnabled) {
//       const portList = await SerialPort.list();
//       const ports: Record<string, PortInfo> = {};
//       portList.forEach((portInfo) => {
//         ports[portInfo.path] = portInfo;
//         if (!(portInfo.path in this._ports)) {
//           this._ports[portInfo.path] = portInfo;
//           this.webContents.send('usb-serial:discovered', portInfo);
//         }
//       });
//       Object.values(this._ports).forEach((portInfo) => {
//         if (!(portInfo.path in ports)) {
//           delete this._ports[portInfo.path];
//           this.webContents.send('usb-serial:removed', portInfo);
//         }
//       });
//     }
//   }
//
//   /* Properties ----------------------------------------------------------- */
//   get filter(): { usbVendorId: number, usbProductId: number }[] {
//     return this._filter;
//   }
//
//   /* Interface ------------------------------------------------------------ */
//   scanEnable(filter: { usbVendorId: number, usbProductId: number }[]) {
//     this._filter = filter;
//     if (this._interval !== null) clearInterval(this._interval);
//     this._interval = setInterval(this.$periodicUsbSerialList.bind(this), 1000);
//     this._scanEnabled = true;
//     console.debug(`serial: scan started (filter: ${JSON.stringify(this.filter)})`);
//   }
//
//   scanDisable() {
//     this._ports = {};
//     this._scanEnabled = false;
//     if (this._interval !== null) clearInterval(this._interval);
//     console.debug('serial: scan stopped');
//   }
//
//   /* Handlers ------------------------------------------------------------- */
//   serialScanEnableHandler(event: IpcMainEvent, filter: { usbVendorId: number, usbProductId: number }[]) {
//     this.scanEnable(filter);
//   }
//
//   serialScanDisableHandler(event: IpcMainEvent) {
//     this.scanDisable();
//   }
//
// }
