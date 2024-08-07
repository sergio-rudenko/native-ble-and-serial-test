export type TServiceUuid = string;

export type TNobleScanFilter = TServiceUuid[];

export enum TNobleCommandType {
  SCAN_ENABLE = 'SCAN_ENABLE',
  SCAN_DISABLE = 'SCAN_DISABLE',
  CONNECT = 'CONNECT',
  DISCONNECT = 'DISCONNECT',
}

export type TNobleCommandScanEnable = {
  type: TNobleCommandType.SCAN_ENABLE;
  filter?: TNobleScanFilter;
  callback: (scanResult: unknown) => void;
};

export type TNobleCommandScanDisable = {
  type: TNobleCommandType.SCAN_DISABLE;
  callback?: (scanResult: unknown) => void;
};

export type TNobleCommand =
  TNobleCommandScanEnable |
  TNobleCommandScanDisable;
