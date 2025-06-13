import { Checkbox, Flex } from "antd";
import type { FilterDropdownProps } from "antd/es/table/interface";

const UserTableFilterDropdown = ({
  selectedKeys,
  setSelectedKeys,
  confirm,
  filters,
}: FilterDropdownProps) => {
  if (filters) {
    return (
      <Flex vertical gap={8} style={{ padding: "5px 12px" }}>
        {filters.map((filter) => {
          const currentKey = String(filter.value);
          return (
            <Checkbox
              key={currentKey}
              style={{ padding: 8 }}
              checked={selectedKeys.includes(currentKey)}
              onChange={(e) => {
                if (e.target.checked) {
                  setSelectedKeys([...selectedKeys, currentKey]);
                } else {
                  setSelectedKeys(
                    selectedKeys.filter((key) => key !== currentKey),
                  );
                }
                confirm();
              }}
            >
              {filter.text}
            </Checkbox>
          );
        })}
      </Flex>
    );
  }

  return null;
};

export default UserTableFilterDropdown;
