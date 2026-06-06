import * as FileSystem from 'expo-file-system'

export const APP_ROOT_DIR = FileSystem.Paths.document.uri + 'AppData/'

export interface FSInfo {
  exists: boolean;
  isDirectory: boolean;
  uri: string;
  size: number;
  modificationTime: number;
}

export async function readDir(path: string) {
  return new FileSystem.Directory(path).list();
}

export async function getInfo(path: string): Promise<FSInfo> {
  let entry;

  try {
    entry = new FileSystem.Directory(path);
    const info = entry.info();

    return {
      exists: info.exists,
      isDirectory: true,
      uri: info.uri ?? '',
      size: info.size ?? 0,
      modificationTime: info.modificationTime ?? 0,
    };
  } catch {
    const file = new FileSystem.File(path);
    const info = file.info();

    return {
      exists: info.exists,
      isDirectory: false,
      uri: info.uri ?? '',
      size: info.size ?? 0,
      modificationTime: info.modificationTime ?? 0,
    };
  }
}

export async function createFolder(path: string, name: string) {
  return new FileSystem.Directory(path + name).create({intermediates: false});
}

export async function createFile(path: string, name: string, content = '') {
  return new FileSystem.File(path + name + '.txt').write(content);
}

export async function readFile(uri: string) {
  return new FileSystem.File(uri).text();
}

export async function writeFile(uri: string, content: string) {
  return new FileSystem.File(uri).write(content);
}

export async function deleteItem(uri: string, isFolder = false) {
  return !isFolder
    ? new FileSystem.File(uri).delete()
    : new FileSystem.Directory(uri).delete();
}

export async function getStorageStats() {
  const total = FileSystem.Paths.totalDiskSpace;
  const free = FileSystem.Paths.availableDiskSpace;
  return {total, free, used: total - free}
}
