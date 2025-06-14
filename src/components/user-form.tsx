import { Button, Checkbox, DatePicker, Flex, Form, Input, Select } from "antd";
import dayjs from "dayjs";
import { observer } from "mobx-react-lite";
import { useUserTableStore } from "../providers/user-table-store-provider";

const UserForm = observer(() => {
  const userTableStore = useUserTableStore();

  // field 타입에 맞게 초기값 계산
  const initialValues = Object.fromEntries(
    userTableStore.fields.map((field) => {
      const key = field.name;
      const value = field.type === "checkbox" ? false : "";
      return [key, value];
    }),
  );

  return (
    <Form
      requiredMark={(label, { required }) => (
        <>
          {label}
          {required ? (
            <span style={{ color: "#FF4D4F", marginLeft: 4 }}>*</span>
          ) : null}
        </>
      )}
      style={{ maxWidth: 520 }}
      layout="vertical"
      autoComplete="off"
      initialValues={initialValues}
      onFinish={(value) => {
        console.log(value);
      }}
    >
      <div style={{ padding: "10px 24px 20px" }}>
        {/* field 타입에 맞는 input을 rendering */}
        {userTableStore.fields.map((field) => {
          if (field.type === "text") {
            return (
              <Form.Item
                key={field.name}
                label={field.label}
                name={field.name}
                rules={[
                  {
                    required: field.required,
                    message: `${field.label}은 필수입니다.`,
                  },
                  {
                    max: 20,
                    message: "글자수 20을 초과할 수 없습니다.",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            );
          } else if (field.type === "textarea") {
            return (
              <Form.Item
                key={field.name}
                label={field.label}
                name={field.name}
                rules={[
                  {
                    required: field.required,
                    message: `${field.label}은 필수입니다.`,
                  },
                  {
                    max: 50,
                    message: "글자수 50을 초과할 수 없습니다.",
                  },
                ]}
              >
                <Input.TextArea />
              </Form.Item>
            );
          } else if (field.type === "date") {
            return (
              <Form.Item
                key={field.name}
                label={field.label}
                name={field.name}
                rules={[
                  {
                    required: field.required,
                    message: `${field.label}은 필수입니다.`,
                  },
                ]}
                getValueFromEvent={(e) => e?.format("YYYY-MM-DD")}
                getValueProps={(e: string) => ({
                  value: e ? dayjs(e) : "",
                })}
              >
                <DatePicker />
              </Form.Item>
            );
          } else if (field.type === "select") {
            return (
              <Form.Item
                key={field.name}
                label={field.label}
                name={field.name}
                rules={[
                  {
                    required: field.required,
                    message: `${field.label}은 필수입니다.`,
                  },
                ]}
                style={{
                  maxWidth: 360,
                }}
              >
                <Select>
                  {field.options.map((option) => (
                    <Select.Option key={option} value={option}>
                      {option}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            );
          } else if (field.type === "checkbox") {
            return (
              <Form.Item
                key={field.name}
                label={field.label}
                name={field.name}
                valuePropName="checked"
                rules={[
                  {
                    // checkbox가 required라는 것은, 값이 true여야 한다는 의미
                    // 텍스트를 저장하는 다른 필드와는 의미가 약간 다르다.
                    validator: (_, checked) => {
                      if (!field.required) return Promise.resolve();
                      if (checked) return Promise.resolve();
                      return Promise.reject(
                        new Error(`${field.label}은 필수입니다.`),
                      );
                    },
                  },
                ]}
              >
                <Checkbox />
              </Form.Item>
            );
          } else {
            // exhaustiveness checking
            const _neverFieldType: never = field.type;
            throw new Error(`unexpected field.type: ${_neverFieldType}`);
          }
        })}
      </div>
      <Flex justify="flex-end" gap={8} style={{ padding: "12px 16px" }}>
        <Button>취소</Button>
        <Button type="primary" htmlType="submit">
          추가
        </Button>
      </Flex>
    </Form>
  );
});

export default UserForm;
