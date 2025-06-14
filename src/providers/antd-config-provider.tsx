import { ConfigProvider } from "antd";
import type { PropsWithChildren } from "react";

const AntdConfigProvider = ({ children }: PropsWithChildren) => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#4A7CFE",
        },
        components: {
          Typography: {
            titleMarginTop: 0,
            titleMarginBottom: 0,
          },
          Form: {
            labelColor: "#00000073",
            itemMarginBottom: 20,
          },
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
};

export default AntdConfigProvider;
