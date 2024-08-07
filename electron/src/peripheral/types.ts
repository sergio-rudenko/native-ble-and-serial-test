export interface IPeripheralDriver {
  get webContents(): Electron.WebContents;
}

export interface IScanablePeripheralDriver extends IPeripheralDriver {
  get filter(): unknown;

  get isScanEnabled(): boolean;

  scanEnable(filter: unknown): void;

  scanDisable(): void;
}
