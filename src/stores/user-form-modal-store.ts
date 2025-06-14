import { makeAutoObservable } from "mobx";
import type { UserTableRecord } from "../types/user-table";

type Mode =
  | {
      type: "create";
    }
  | {
      type: "edit";
      record: UserTableRecord;
    }
  | {
      type: "closed";
    };

export default class UserFormModalStore {
  private _mode: Mode;

  constructor() {
    this._mode = { type: "closed" };
    makeAutoObservable(this);
  }

  get mode() {
    return this._mode;
  }

  openModalToCreate() {
    this._mode = { type: "create" };
  }

  openModalToEdit(record: UserTableRecord) {
    this._mode = { type: "edit", record };
  }

  closeModal() {
    this._mode = { type: "closed" };
  }
}
