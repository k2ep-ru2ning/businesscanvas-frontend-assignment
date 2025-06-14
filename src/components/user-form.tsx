import { Button, Checkbox, DatePicker, Form, Input, Select } from "antd";
import dayjs from "dayjs";

type Field =
  | {
      type: "text" | "textarea" | "date" | "checkbox";
      label: string;
      name: string;
      required: boolean;
    }
  | {
      type: "select";
      label: string;
      name: string;
      required: boolean;
      options: string[];
    };

const fields: Field[] = [
  {
    type: "text",
    label: "이름",
    name: "name",
    required: true,
  },
  {
    type: "text",
    label: "주소",
    name: "address",
    required: false,
  },
  {
    type: "textarea",
    label: "메모",
    name: "memo",
    required: false,
  },
  {
    type: "date",
    label: "가입일",
    name: "joinedAt",
    required: true,
  },
  {
    type: "select",
    label: "직업",
    name: "job",
    required: false,
    options: ["개발자", "PO", "디자이너"],
  },
  {
    type: "checkbox",
    label: "이메일 수신 동의",
    name: "isEmailSubscribed",
    required: false,
  },
];

const UserForm = () => {
  // field 타입에 맞게 초기값 계산
  const initialValues = Object.fromEntries(
    fields.map((field) => {
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
      name="userForm"
      style={{ maxWidth: 520 }}
      layout="vertical"
      autoComplete="off"
      initialValues={initialValues}
      onFinish={(value) => {
        console.log(value);
      }}
    >
      {/* field 타입에 맞는 input을 rendering */}
      {fields.map((field) => {
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

          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const _neverFieldType: never = field.type;
          throw new Error("unexpected field.type");
        }
      })}
      <Button type="primary" htmlType="submit">
        추가
      </Button>
    </Form>
  );
};

export default UserForm;
