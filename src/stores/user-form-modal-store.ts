import { makeAutoObservable } from "mobx";

export default class UserFormModalStore {
  private _isOpen: boolean;

  constructor() {
    this._isOpen = false;
    makeAutoObservable(this);
  }

  get isOpen() {
    return this._isOpen;
  }

  openModal() {
    this._isOpen = true;
  }

  closeModal() {
    this._isOpen = false;
  }
}
