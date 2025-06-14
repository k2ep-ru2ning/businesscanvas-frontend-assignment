import style from "./user-table-header.module.css";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Flex, Typography } from "antd";

const UserTableHeader = () => {
  return (
    <Flex
      justify="space-between"
      align="center"
      className={style.userTableHeader}
    >
      <Typography.Title level={5}>회원 목록</Typography.Title>
      <Button type="primary" icon={<PlusOutlined />}>
        추가
      </Button>
    </Flex>
  );
};

export default UserTableHeader;
