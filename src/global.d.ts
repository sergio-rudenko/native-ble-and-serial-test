type ShowOpenFilePickerType = {
  description: string,
  accept: Record<string, string[]>,
}

type ShowOpenFilePickerOptions = {
  excludeAcceptAllOption?: boolean,
  id?: string | number,
  startIn?: string | 'desktop' | 'documents' | 'downloads' | 'music' | 'pictures' | 'videos',
  multiple?: boolean,
  types?: ShowOpenFilePickerType[],
}

type ShowSaveFilePickerOptions = {
  excludeAcceptAllOption?: boolean,
  id?: string | number,
  startIn?: string | 'desktop' | 'documents' | 'downloads' | 'music' | 'pictures' | 'videos',
  suggestedName?: string,
  multiple?: boolean,
  types?: ShowOpenFilePickerType[],
}

declare global {
  interface Window {
    /**
     * https://developer.mozilla.org/en-US/docs/Web/API/Window/showOpenFilePicker
     * @param options
     */
    showOpenFilePicker: (options?: ShowOpenFilePickerOptions) => Promice<FileSystemFileHandle[]>;
    showSaveFilePicker: (options?: ShowSaveFilePickerOptions) => Promise<FileSystemFileHandle>;
  }
}

export {};
