import { Modal } from "antd";
import { observer } from "mobx-react-lite";
import { useUserFormModalStore } from "../providers/user-form-modal-store-provider";

const UserFormModal = observer(() => {
  const userFormModalStore = useUserFormModalStore();

  const handleOk = () => {
    userFormModalStore.closeModal();
  };

  const handleCancel = () => {
    userFormModalStore.closeModal();
  };

  return (
    <Modal
      title="회원 추가"
      open={userFormModalStore.isOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      okText="추가"
      cancelText="취소"
    >
      <p>회원 추가 삭제 폼</p>
    </Modal>
  );
});

export default UserFormModal;
