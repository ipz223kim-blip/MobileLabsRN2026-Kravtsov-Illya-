import * as FileSystem from 'expo-file-system'

export interface FSInfo {
  exists: boolean;
  isDirectory: boolean;
  uri: string;
  size: number;
  modificationTime: number;
}

export async function readDir(path: string) {
  return FileSystem.readDirectoryAsync(path)
}

export async function getInfo(path: string): Promise<FSInfo> {
  const info = await FileSystem.getInfoAsync(path, {size: true, md5: false});

  // @ts-ignore
  const size = info.size ?? 0;
  // @ts-ignore
  const modificationTime: number = info.modificationTime;

  return {
    exists: info.exists,
    isDirectory: info.isDirectory,
    uri: info.uri,
    size,
    modificationTime,
  };
}

export async function createFolder(path: string, name: string) {
  return FileSystem.makeDirectoryAsync(path + name, {intermediates: false})
}

export async function createFile(path: string, name: string, content = '') {
  const fileUri = path + name + '.txt'
  return FileSystem.writeAsStringAsync(fileUri, content, {encoding: FileSystem.EncodingType.UTF8})
}

export async function readFile(uri: string) {
  return FileSystem.readAsStringAsync(uri, {encoding: FileSystem.EncodingType.UTF8})
}

export async function writeFile(uri: string, content: string) {
  return FileSystem.writeAsStringAsync(uri, content, {encoding: FileSystem.EncodingType.UTF8})
}

export async function deleteItem(uri: string, isFolder = false) {
  return FileSystem.deleteAsync(uri, {idempotent: true})
}

export async function getStorageStats() {
  const total = await FileSystem.getTotalDiskCapacityAsync()
  const free = await FileSystem.getFreeDiskStorageAsync()
  return {total, free, used: total - free}
}
