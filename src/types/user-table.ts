export type UserTableCell = string | boolean;

export type UserTableRecord = { id: string } & Record<string, UserTableCell>;

export type UserTableField =
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
