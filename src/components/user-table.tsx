import { Checkbox, Table, type TableColumnsType } from "antd";
import UserTableFilterDropdown from "./user-table-filter-dropdown";
import UserTableRecordEditDropdown from "./user-table-record-edit-dropdown";

type User = {
  id: string;
  name: string;
  address: string;
  memo: string;
  joinedAt: string;
  job: string;
  isEmailSubscribed: boolean;
};

const data: User[] = [
  {
    id: "1",
    name: "John Doe",
    address: "서울 강남구",
    memo: "외국인",
    joinedAt: "2024-10-02",
    job: "개발자",
    isEmailSubscribed: true,
  },
  {
    id: "2",
    name: "Foo Bar",
    address: "서울 서초구",
    memo: "한국인",
    joinedAt: "2024-10-01",
    job: "PO",
    isEmailSubscribed: false,
  },
  // {
  //   id: "3",
  //   name: "Third",
  //   address: "서울 성동구",
  //   memo: "한국인",
  //   joinedAt: "2024-10-05",
  //   job: "디자이너",
  //   isEmailSubscribed: false,
  // },
];

const columns: TableColumnsType<User> = [
  {
    title: "이름",
    dataIndex: "name",
    width: 120,
    onFilter: (value, record) => record.name === value,
    filters: [...new Set(data.map((user) => user.name))].map((name) => ({
      value: name,
      text: name,
    })),
    filterDropdown: (props) => {
      return <UserTableFilterDropdown {...props} />;
    },
  },
  {
    title: "주소",
    dataIndex: "address",
    width: 249,
    onFilter: (value, record) => record.address === value,
    filters: [...new Set(data.map((user) => user.address))].map((address) => ({
      value: address,
      text: address,
    })),
    filterDropdown: (props) => {
      return <UserTableFilterDropdown {...props} />;
    },
  },
  {
    title: "메모",
    dataIndex: "memo",
    width: 249,
    onFilter: (value, record) => record.memo === value,
    filters: [...new Set(data.map((user) => user.memo))].map((memo) => ({
      value: memo,
      text: memo,
    })),
    filterDropdown: (props) => {
      return <UserTableFilterDropdown {...props} />;
    },
  },
  {
    title: "가입일",
    dataIndex: "joinedAt",
    width: 200,
    onFilter: (value, record) => record.joinedAt === value,
    filters: [...new Set(data.map((user) => user.joinedAt))].map(
      (joinedAt) => ({
        value: joinedAt,
        text: joinedAt,
      }),
    ),
    filterDropdown: (props) => {
      return <UserTableFilterDropdown {...props} />;
    },
  },
  {
    title: "직업",
    dataIndex: "job",
    width: 249,
    onFilter: (value, record) => record.job === value,
    filters: [...new Set(data.map((user) => user.job))].map((job) => ({
      value: job,
      text: job,
    })),
    filterDropdown: (props) => {
      return <UserTableFilterDropdown {...props} />;
    },
  },
  {
    title: "이메일 수신 동의",
    dataIndex: "isEmailSubscribed",
    width: 150,
    render: (value) => <Checkbox checked={value} />,
    onFilter: (value, record) => record.isEmailSubscribed === value,
    filters: [...new Set(data.map((user) => user.isEmailSubscribed))].map(
      (isEmailSubscribed) => ({
        value: isEmailSubscribed,
        text: isEmailSubscribed ? "선택됨" : "선택 안함",
      }),
    ),
    filterDropdown: (props) => {
      return <UserTableFilterDropdown {...props} />;
    },
  },
  {
    title: "",
    key: "recordEdit",
    width: 38,
    render: () => <UserTableRecordEditDropdown />,
  },
];

const UserTable = () => {
  return (
    <Table<User>
      rowSelection={{}}
      rowKey={(record) => record.id}
      size="middle"
      columns={columns}
      dataSource={data}
      pagination={false}
    />
  );
};

export default UserTable;
