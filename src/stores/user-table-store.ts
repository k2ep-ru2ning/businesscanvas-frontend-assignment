import { makeAutoObservable } from "mobx";
import { nanoid } from "nanoid";
import type { UserTableField, UserTableRecord } from "../types/user-table";

const initialRecords: UserTableRecord[] = [
  {
    id: nanoid(),
    name: "John Doe",
    address: "서울 강남구",
    memo: "외국인",
    joinedAt: "2024-10-02",
    job: "개발자",
    isEmailSubscribed: true,
  },
  {
    id: nanoid(),
    name: "Foo Bar",
    address: "서울 서초구",
    memo: "한국인",
    joinedAt: "2024-10-01",
    job: "PO",
    isEmailSubscribed: false,
  },
];

const initialFields: UserTableField[] = [
  {
    type: "text",
    label: "이름",
    name: "name",
    required: true,
  },
  {
    type: "text",
    label: "주소",
    name: "address",
    required: false,
  },
  {
    type: "textarea",
    label: "메모",
    name: "memo",
    required: false,
  },
  {
    type: "date",
    label: "가입일",
    name: "joinedAt",
    required: true,
  },
  {
    type: "select",
    label: "직업",
    name: "job",
    required: false,
    options: ["개발자", "PO", "디자이너"],
  },
  {
    type: "checkbox",
    label: "이메일 수신 동의",
    name: "isEmailSubscribed",
    required: false,
  },
];

export default class UserTableStore {
  private _records: UserTableRecord[];
  private _fields: UserTableField[];

  constructor() {
    this._records = initialRecords;
    this._fields = initialFields;
    makeAutoObservable(this);
  }

  get records() {
    return this._records;
  }

  get fields() {
    return this._fields;
  }

  // 1. 각 record에서 fieldName에 해당하는 값 추출
  // 2. 중복 제거
  // 3. 값의 타입이 string인데 trim해서 빈문자열이면 제거
  getFilterValuesOfField(fieldName: UserTableField["name"]) {
    return [...new Set(this.records.map((record) => record[fieldName]))].filter(
      (value) => typeof value === "boolean" || value.trim().length > 0,
    );
  }

  addRecord(data: Omit<UserTableRecord, "id">) {
    this._records.push({ id: nanoid(), ...data });
  }

  editRecord(id: UserTableRecord["id"], data: Omit<UserTableRecord, "id">) {
    this._records = this._records.map((record) =>
      record.id === id ? { ...record, ...data } : record,
    );
  }

  deleteRecord(id: UserTableRecord["id"]) {
    this._records = this._records.filter((record) => record.id !== id);
  }
}
