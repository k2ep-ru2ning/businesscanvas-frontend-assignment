import { Checkbox, Table, type TableColumnsType } from "antd";
import UserTableFilterDropdown from "./user-table-filter-dropdown";
import UserTableRecordEditDropdown from "./user-table-record-edit-dropdown";
import { observer } from "mobx-react-lite";
import type { UserTableRecord } from "../types/user-table";
import { useUserTableStore } from "../providers/user-table-store-provider";
import type { ColumnType } from "antd/es/table";

const UserTable = observer(() => {
  const userTableStore = useUserTableStore();

  const columns: TableColumnsType<UserTableRecord> = [
    ...userTableStore.fields.map((field) => {
      const column: ColumnType<UserTableRecord> = {
        title: field.label,
        dataIndex: field.name,
        onFilter: (value, record) => record[field.name] === value,
        filters: userTableStore
          .getFilterValuesOfField(field.name)
          .map((value) =>
            field.type === "checkbox"
              ? {
                  value,
                  text: value ? "선택됨" : "선택 안함",
                }
              : {
                  value,
                  text: value,
                },
          ),
        filterDropdown: (props) => {
          return <UserTableFilterDropdown {...props} />;
        },
      };

      if (field.type === "checkbox") {
        column["render"] = (value) => <Checkbox checked={value} />;
      }

      if (["address", "memo", "job"].includes(field.name)) {
        column["width"] = 249;
      } else if (field.name === "name") {
        column["width"] = 120;
      } else if (field.name === "joinedAt") {
        column["width"] = 200;
      } else if (field.name === "isEmailSubscribed") {
        column["width"] = 150;
      }

      return column;
    }),
    {
      title: "",
      key: "recordEdit",
      width: 38,
      render: (_, record) => (
        <UserTableRecordEditDropdown userTableRecord={record} />
      ),
    },
  ];

  return (
    <Table<UserTableRecord>
      rowSelection={{}}
      rowKey={(record) => record.id}
      size="middle"
      columns={columns}
      dataSource={userTableStore.records}
      pagination={false}
    />
  );
});

export default UserTable;
