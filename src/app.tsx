import UserTablePage from "./pages/user-table-page";
import AntdConfigProvider from "./providers/antd-config-provider";

const App = () => {
  return (
    <AntdConfigProvider>
      <UserTablePage />
    </AntdConfigProvider>
  );
};

export default App;
