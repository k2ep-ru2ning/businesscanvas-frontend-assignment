import { PlusOutlined } from "@ant-design/icons";
import { Button, Flex, Typography } from "antd";
import { observer } from "mobx-react-lite";
import { useUserFormModalStore } from "../providers/user-form-modal-store-provider";

const UserTableHeader = observer(() => {
  const userFormModalStore = useUserFormModalStore();

  const handleClickAddButton = () => {
    userFormModalStore.openModalToCreate();
  };

  return (
    <Flex
      justify="space-between"
      align="center"
      style={{
        height: 48,
        padding: "0 14px",
      }}
    >
      <Typography.Title level={5}>회원 목록</Typography.Title>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={handleClickAddButton}
      >
        추가
      </Button>
    </Flex>
  );
});

export default UserTableHeader;
