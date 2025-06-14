import {
  createContext,
  useContext,
  useRef,
  type PropsWithChildren,
} from "react";
import UserTableStore from "../stores/user-table-store";

const UserTableStoreContext = createContext<UserTableStore | null>(null);

export const UserTableStoreProvider = ({ children }: PropsWithChildren) => {
  const storeRef = useRef<UserTableStore | null>(null);

  const getStore = () => {
    if (storeRef.current !== null) {
      return storeRef.current;
    }
    return (storeRef.current = new UserTableStore());
  };

  return (
    <UserTableStoreContext.Provider value={getStore()}>
      {children}
    </UserTableStoreContext.Provider>
  );
};

export const useUserTableStore = () => {
  const userTableStore = useContext(UserTableStoreContext);

  if (userTableStore === null) {
    throw new Error(
      "UserTableStoreProvider에서 useUserTableStore hook을 사용해야 합니다.",
    );
  }

  return userTableStore;
};
