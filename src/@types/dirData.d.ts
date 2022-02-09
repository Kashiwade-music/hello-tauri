declare module DirData {
  export interface DataList {
    isDir: boolean;
    name: string;
  }

  export interface RootObject {
    currentDir: string;
    dataList: DataList[];
    err: boolean;
  }
}
