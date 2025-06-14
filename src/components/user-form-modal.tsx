import { Modal } from "antd";
import { observer } from "mobx-react-lite";
import { useUserFormModalStore } from "../providers/user-form-modal-store-provider";
import UserForm from "./user-form";

const UserFormModal = observer(() => {
  const userFormModalStore = useUserFormModalStore();

  const handleCancel = () => {
    userFormModalStore.closeModal();
  };

  return (
    <Modal
      styles={{
        content: {
          padding: 0,
        },
        header: {
          fontSize: 14,
          lineHeight: 22,
          padding: "12px 16px",
          margin: 0,
        },
      }}
      title="회원 추가"
      open={userFormModalStore.isOpen}
      onCancel={handleCancel}
      footer={null}
      destroyOnHidden // modal이 닫힐 때 UserForm 컴포넌트 unmount 하기 위함
    >
      <UserForm onClickButton={handleCancel} />
    </Modal>
  );
});

export default UserFormModal;
