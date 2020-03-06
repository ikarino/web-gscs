import { WebGscsRecord } from "./slices/slice.interface";

const storageName = "LocalSCSRecords";

export type LocalStorageType = { [key: string]: WebGscsRecord };

/**
 * localStorageをRecordの辞書として読み込む。
 */
export const loadLocalStorage = (): LocalStorageType => {
  const storage = localStorage.getItem(storageName);
  let records: LocalStorageType = {};
  if (storage !== null) {
    records = JSON.parse(storage) as LocalStorageType;
  }
  return records;
};

const saveToLocalStorage = (records: LocalStorageType) => {
  localStorage.setItem(storageName, JSON.stringify(records));
};

export const saveRecordToLocalStorage = (record: WebGscsRecord): boolean => {
  let records = loadLocalStorage();
  try {
    const key = new Date().getTime();
    records[key] = record;

    saveToLocalStorage(records);
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const deleteFromLocalStorage = (recordKey: string): boolean => {
  let records = loadLocalStorage();
  if (records[recordKey]) {
    delete records[recordKey];
    saveToLocalStorage(records);
    return true;
  }
  return false;
};
