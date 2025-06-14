import { MoreOutlined } from "@ant-design/icons";
import { Button, Dropdown, type MenuProps } from "antd";
import { observer } from "mobx-react-lite";
import { useUserFormModalStore } from "../providers/user-form-modal-store-provider";

const UserTableRecordEditDropdown = observer(() => {
  const userFormModalStore = useUserFormModalStore();

  const items: MenuProps["items"] = [
    {
      key: "edit",
      label: "수정",
    },
    {
      type: "divider",
    },
    {
      key: "delete",
      label: "삭제",
      danger: true,
    },
  ];

  const handleClick: MenuProps["onClick"] = ({ key }) => {
    if (key === "edit") {
      userFormModalStore.openModal();
    } else if (key === "delete") {
      // ToDo: 삭제 로직 구현
    }
  };

  return (
    <Dropdown
      menu={{
        items,
        onClick: handleClick,
        style: {
          width: 185,
        },
      }}
      trigger={["click"]}
    >
      <Button type="text" icon={<MoreOutlined />} />
    </Dropdown>
  );
});

export default UserTableRecordEditDropdown;
