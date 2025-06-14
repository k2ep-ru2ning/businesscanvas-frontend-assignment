import { MoreOutlined } from "@ant-design/icons";
import { Button, Dropdown, type MenuProps } from "antd";
import { observer } from "mobx-react-lite";
import { useUserFormModalStore } from "../providers/user-form-modal-store-provider";
import type { UserTableRecord } from "../stores/user-table-store";
import { useUserTableStore } from "../providers/user-table-store-provider";

type Props = {
  userTableRecord: UserTableRecord;
};

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

const UserTableRecordEditDropdown = observer(({ userTableRecord }: Props) => {
  const userTableStore = useUserTableStore();

  const userFormModalStore = useUserFormModalStore();

  const handleClick: MenuProps["onClick"] = ({ key }) => {
    if (key === "edit") {
      userFormModalStore.openModal();
    } else if (key === "delete") {
      userTableStore.deleteRecord(userTableRecord.id);
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
