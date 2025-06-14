import { Button, Checkbox, DatePicker, Flex, Form, Input, Select } from "antd";
import dayjs from "dayjs";
import { observer } from "mobx-react-lite";
import { useUserTableStore } from "../providers/user-table-store-provider";
import { useEffect, useState } from "react";
import { useUserFormModalStore } from "../providers/user-form-modal-store-provider";
import type { UserTableRecord } from "../types/user-table";

const UserForm = observer(() => {
  const userTableStore = useUserTableStore();

  const userFormModalStore = useUserFormModalStore();

  const [form] = Form.useForm();

  const [submittable, setSubmittable] = useState(false);

  const formValues = Form.useWatch([], form);

  useEffect(() => {
    form
      .validateFields({ validateOnly: true })
      .then(() => setSubmittable(true))
      .catch(() => setSubmittable(false));
  }, [form, formValues]);

  const initialValues =
    userFormModalStore.mode.type === "edit" // 수정 버튼에 의해 모달이 열린 경우
      ? userFormModalStore.mode.record // 전달 받은 값으로 폼 초깃값 설정
      : Object.fromEntries(
          // 그외의 경우, 필드의 타입에 따라 빈문자열 혹은 false 같은 값으로 초기값 설정
          userTableStore.fields.map((field) => {
            const key = field.name;
            const value = field.type === "checkbox" ? false : "";
            return [key, value];
          }),
        );

  return (
    <Form
      form={form}
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
      onFinish={(data: Omit<UserTableRecord, "id">) => {
        // 현재 추가 모드인지 수정 모드인지에 따라 다른 처리
        if (userFormModalStore.mode.type === "create") {
          userTableStore.addRecord(data);
        } else if (userFormModalStore.mode.type === "edit") {
          userTableStore.editRecord(userFormModalStore.mode.record.id, data);
        }
        userFormModalStore.closeModal();
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
        <Button
          onClick={() => {
            userFormModalStore.closeModal();
          }}
        >
          취소
        </Button>
        <Button type="primary" htmlType="submit" disabled={!submittable}>
          추가
        </Button>
      </Flex>
    </Form>
  );
});

export default UserForm;
