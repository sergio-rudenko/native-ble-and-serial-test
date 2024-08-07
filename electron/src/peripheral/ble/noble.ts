import { WebContents, IpcMainEvent } from 'electron';
import noble, { Peripheral } from '@abandonware/noble';

import { AbstractScanablePeripheralDriver } from '../index';
import { IScanablePeripheralDriver } from '../types';
import { TNobleScanFilter } from './types';


export class NoblePeripheral extends AbstractScanablePeripheralDriver implements IScanablePeripheralDriver {
  private _peripherals: Record<Peripheral['id'], Peripheral> = {};

  private _filter: TNobleScanFilter;

  constructor(webContents: WebContents, filter?: TNobleScanFilter) {
    super(webContents);

    noble.on('stateChange', this.$nobleOnStateChange.bind(this));
    noble.on('discover', this.$nobleOnDiscover.bind(this));

    this._filter = filter || [];
    this._scanEnabled = false;

    if (filter !== undefined) {
      this.scanEnable(filter);
    }
  }

  $nobleOnStateChange(state: string) {
    this.webContents.send('bluetooth-le:state', state);
    if ((state === 'poweredOn') && this._scanEnabled) {
      this.scanEnable(this.filter);
    }
    if ((state === 'poweredOff') && this._scanEnabled) {
      this.scanDisable();
    }
  }

  $nobleOnDiscover = (peripheral: Peripheral) => {
    this._peripherals[peripheral.id] = peripheral;
    const { id, address, advertisement, rssi } = peripheral;
    // console.debug('$nobleOnDiscover:', JSON.stringify(advertisement), rssi);
    if (advertisement.serviceUuids.length) {
      this._filter.forEach((serviceUuid: string) => {
        if (advertisement.serviceUuids.includes(serviceUuid)) {
          const scanResult = {
            device: {
              deviceId: id,
              name: advertisement.localName,
              uuids: advertisement.serviceUuids,
            },
            address,
            rssi,
            txPower: advertisement.txPowerLevel,
            serviceData: advertisement.serviceData,
            manufacturerData: advertisement.manufacturerData,
          };
          console.debug('$nobleOnDiscover:', JSON.stringify(scanResult));
          this.webContents.send('bluetooth-le:scan-result', scanResult);
        }
      });
    }
  };

  /* Properties ----------------------------------------------------------- */
  get filter(): TNobleScanFilter {
    return this._filter;
  }

  /* Interface ------------------------------------------------------------ */
  scanEnable(filter: TNobleScanFilter) {
    this._filter = filter;
    noble.startScanningAsync([], true).then(() => {
      this._scanEnabled = true;
      console.debug(`noble: scan started (filter: ${JSON.stringify(this.filter)})`);
    });
  }

  scanDisable() {
    noble.stopScanningAsync().then(() => {
      this._peripherals = {};
      this._scanEnabled = false;
      console.debug('noble: scan stopped');
    });
  }

  /* Handlers ------------------------------------------------------------- */
  bleScanEnableHandler(event: IpcMainEvent, filter: string[]) {
    this.scanEnable(filter);
  }

  bleScanDisableHandler(event: IpcMainEvent) {
    this.scanDisable();
  }

  command(event: IpcMainEvent, param: unknown) {
    console.debug('command:', param);
  }
}
