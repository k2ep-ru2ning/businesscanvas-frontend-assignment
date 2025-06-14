import UserTableHeader from "../components/user-table-header";
import UserTable from "../components/user-table";
import { UserFormModalStoreProvider } from "../providers/user-form-modal-store-provider";
import UserFormModal from "../components/user-form-modal";

const UserTablePage = () => {
  return (
    <UserFormModalStoreProvider>
      <div>
        <UserTableHeader />
        <UserTable />
      </div>
      <UserFormModal />
    </UserFormModalStoreProvider>
  );
};

export default UserTablePage;
