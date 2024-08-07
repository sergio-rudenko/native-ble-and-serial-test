import { WebContents } from 'electron';

import { IPeripheralDriver } from './types';

export abstract class AbstractScanablePeripheralDriver implements IPeripheralDriver {
  private readonly _webContents: WebContents;

  protected _scanEnabled: boolean;

  protected constructor(webContents: WebContents) {
    this._webContents = webContents;
  }

  abstract get filter(): unknown;

  get webContents(): WebContents {
    return this._webContents;
  }

  get isScanEnabled(): boolean {
    return this._scanEnabled;
  }

  abstract scanEnable(filter: unknown): void;

  abstract scanDisable(): void;
}

