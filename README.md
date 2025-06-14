# 비즈니스캔버스 프론트엔드 개발자 채용 과제

- 지원자: 김종민
- 기한: `2025.06.12 09:00` ~ `2025.06.15 09:00`, 3일간

## 개발 환경

- Node.js: `v22.13.0`
- npm: `v11.4.1`

## 개발 서버 실행 방법

1. `npm install` 으로 패키지 설치
2. `npm run dev` 개발 서버 실행. `3000`번 포트에서 실행

## 기술 스택

- 필수 기술: `React`, `TypeScript`, `AntD`
- 선택 기술
  - `MobX`: 상태 관리를 위해 사용
  - `Vite`: 빌드 도구
  - `nanoid`: 유니크한 식별자 생성을 위해 사용
  - `eslint`, `prettier`, `lint-staged`: 일관성 있게 코드를 작성하기 위해 사용

## 저장 방식 변경

`.env` 파일의 `VITE_STORAGE` 값을 `in-memory` 또는 `local-storage`로 설정하면 됩니다.

## 커스텀 필드 기능을 고려한 확장성 있는 설계

```ts
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
```

먼저, 요구사항에 맞게, 테이블의 컬럼(필드)을 표현하는 `UserTableField` 타입을 선언했습니다.

```ts
export default class UserTableStore {
  // ...
  private _fields: UserTableField[];

  constructor() {
    // ...
    this._fields = initialFields;
    makeAutoObservable(this);
  }

  get fields() {
    return this._fields;
  }

  // ...
}
```

`UserTableStore` MobX Store에서 필드를 상태로 관리했습니다.

추후 사용자에 의해 커스텀 필드가 추가되면, `observable`한 `this._fields` 상태만 업데이트하면 됩니다.

Table의 column과 Form의 input을 `UserTableStore`의 `fields`를 참조해서 rendering 하도록 만들었기 때문에, 커스텀 필드가 추가되면 테이블의 컬럼이 추가되고 폼에서는 새로운 input이 표시됩니다.

```ts
// type User = {
//   id: string;
//   name: string;
//   address: string;
//   memo: string;
//   joinedAt: string;More actions
//   job: string;
//   isEmailSubscribed: boolean;
// };

export type UserTableCell = string | boolean;

export type UserTableRecord = { id: string } & Record<string, UserTableCell>;
```

테이블의 컬럼이 추후 사용자에 의해 커스텀하게 추가될 수 있기 때문에, 레코드의 타입을 `User` 타입처럼 고정된 프로퍼티를 가지는 형태로 정의하기 힘들 것 같아, TypeScript의 `Record` 타입을 활용해 `UserTableRecord` 타입을 정의했습니다.

커스텀 필드의 추가로 `UserTableRecord`가 커버해야 할 프로퍼티가 늘어나도 타입 관련 문제가 발생하지 않습니다.

마찬가지로, `UserTableStore` MobX Store에서 레코드를 상태로 관리했습니다.

## 레코드 상태를 로컬 스토리지와 동기화하기

- `MobX`가 제공하는 `autorun`을 활용하면, observable 한 상태가 변경되었을 때, 로컬 스토리지에 값을 쓰는 것과 같은 사이드 이펙트를 실행할 수 있습니다.
- `autorun`을 활용해서 `UserTableStore`의 `records` `getter` 값이 변경되면 로컬 스토리지에 레코드값들을 write 했습니다.
