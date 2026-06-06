export type RootStackParamList = {
  Explorer: { rootDir: string; currentPath?: string };
  FileView: { uri: string };
  FileEdit: { uri: string };
  Stats: undefined;
};