import UserTableHeader from "../components/user-table-header";
import UserTable from "../components/user-table";
import { UserFormModalStoreProvider } from "../providers/user-form-modal-store-provider";
import UserFormModal from "../components/user-form-modal";
import { UserTableStoreProvider } from "../providers/user-table-store-provider";

const UserTablePage = () => {
  return (
    <UserTableStoreProvider>
      <UserFormModalStoreProvider>
        <div>
          <UserTableHeader />
          <UserTable />
        </div>
        <UserFormModal />
      </UserFormModalStoreProvider>
    </UserTableStoreProvider>
  );
};

export default UserTablePage;
