import type { UserTableRecord } from "../types/user-table";

const key = "userTableRecords";

export function loadUserRecords(): UserTableRecord[] {
  const data = localStorage.getItem(key);
  if (data === null) {
    return [];
  }
  return JSON.parse(data);
}

export function saveUserRecords(userRecords: UserTableRecord[]) {
  localStorage.setItem(key, JSON.stringify(userRecords));
}
