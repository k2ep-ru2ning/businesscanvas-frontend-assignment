import {
  createContext,
  useContext,
  useRef,
  type PropsWithChildren,
} from "react";
import UserFormModalStore from "../stores/user-form-modal-store";

const UserFormModalStoreContext = createContext<UserFormModalStore | null>(
  null,
);

export const UserFormModalStoreProvider = ({ children }: PropsWithChildren) => {
  const storeRef = useRef<UserFormModalStore | null>(null);

  const getStore = () => {
    if (storeRef.current !== null) {
      return storeRef.current;
    }
    return (storeRef.current = new UserFormModalStore());
  };

  return (
    <UserFormModalStoreContext.Provider value={getStore()}>
      {children}
    </UserFormModalStoreContext.Provider>
  );
};

export const useUserFormModalStore = () => {
  const userFormModalStore = useContext(UserFormModalStoreContext);

  if (userFormModalStore === null) {
    throw new Error(
      "UserFormModalStoreProvider에서 useUserFormModalStore hook을 사용해야 합니다.",
    );
  }

  return userFormModalStore;
};
