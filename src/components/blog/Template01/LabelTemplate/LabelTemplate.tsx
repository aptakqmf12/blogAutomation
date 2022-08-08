import { FC, StrictMode, useRef, useState } from "react";

import type { ActionType, ProColumns } from "@ant-design/pro-table";
import ProTable from "@ant-design/pro-table";
import Client from "apis";
import { Markup } from "interweave";
import { RowEditableConfig } from "@ant-design/pro-utils";
import axios from "axios";
import jsonDiff from "json-diff";
import { useIntl } from "react-intl";
import { Alert } from "antd";

interface LabelTemplateItem {
  id: string;
  key?: string;
  template: string;
  enTemplate:String;
  used: boolean | string;
  createdAt: Date;
  updatedAt: Date;
}

const client = axios.create({
  withCredentials: true,
  baseURL: `${process.env.REACT_APP_API_PATH}/v1/automation`,
});
const valueEnum = {
  true: { text: "사용중", status: "Success" },
  false: { text: "미사용", status: "Error" },
};

const columns: ProColumns<LabelTemplateItem>[] = [
  {
    dataIndex: "id",
    title: "id",
    width: "10%",
    valueType: "text",
    editable: false,
    sorter: (a, b) => parseInt(a.id) - parseInt(b.id),
  },
  {
    hideInSearch: true,
    dataIndex: "template",
    title: "template",
    search: false,
    render: (content, row, index, action) => {
      return [
        <div
          key={row.id}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Markup content={content?.toString().replaceAll("\\n", "")} />
        </div>,
      ];
    },
    valueType: "textarea",
  },
  {
    hideInSearch: true,
    dataIndex: "enTemplate",
    title: "EN template",
    search: false,
    render: (content, row, index, action) => {
      return [
        <div
          key={row.id}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Markup content={content?.toString().replaceAll("\\n", "")} />
        </div>,
      ];
    },
    valueType: "textarea",
  },
  {
    search: false,
    dataIndex: "createdAt",
    title: "createdAt",
    valueType: "dateTime",
    editable: false,
    width: "10%",
    sorter: (a, b) => a.createdAt.valueOf() - b.createdAt.valueOf(),
  },
  {
    dataIndex: "used",
    title: "Used",
    renderText: (text, record) => record.used.toString(),
    valueType: "select",
    width: "10%",
    valueEnum,
    sorter: (a, b) => (a === b ? 0 : a ? 1 : -1),
  },
  {
    search: false,
    dataIndex: "updatedAt",
    title: "updatedAt",
    valueType: "dateTime",
    editable: false,
    width: "10%",
    sorter: (a, b) => a.createdAt.valueOf() - b.createdAt.valueOf(),
  },
  {
    title: "Options",
    width: 120,
    valueType: "option",
    render: (_, row, index, action) => [
      <a
        key={row.id}
        onClick={() => {
          action?.startEditable(row.id);
        }}
      >
        수정
      </a>,
    ],
  },
];
const LabelTemplate: FC = () => {
  const actionRef = useRef<ActionType>();
  const formRef = useRef();
  const { formatMessage } = useIntl();
  const [deleteError, setDeleteError] = useState<boolean>();
  const showDeleteError = () => {
    return (
      <Alert
        message="Error"
        description="삭제는 지원하지 않습니다."
        type="error"
        onClick={() => setDeleteError(false)}
        closable
        showIcon
      />
    );
  };
  const rowEditableConfig: RowEditableConfig<LabelTemplateItem> = {
    onlyOneLineEditorAlertMessage: formatMessage({
      id: "Components.Blog.LabelTemplate.table.onlyOneLineEditorAlertMessage",
    }),
    deletePopconfirmMessage: formatMessage({
      id: "Components.Blog.LabelTemplate.table.deletePopconfirmMessage",
    }),
    onSave: async (key, record, originRow) => {
      originRow.used = originRow.used.toString();
      const diffData = jsonDiff.diff(originRow, record) || {};
      const updatedValue = Object.entries(diffData).reduce(
        (acc, [key, value]: [key: string, value: any]) => {
          acc[key] = value.__new;
          return acc;
        },
        {} as any
      );
      const data = {
        id: record.id,
        ...updatedValue,
      };
      if (Object.keys(updatedValue).length > 0) {
        await client.put("/labels/template", data);
      }
    },
    onDelete: async (key, row) => {
      setDeleteError(true);
    },
    onCancel: async (key, record, originalRow, _) => {
      return originalRow;
    },
  };
  return (
    <>
      <StrictMode>
        {deleteError && showDeleteError()}
        <ProTable<LabelTemplateItem>
          columns={columns}
          actionRef={actionRef}
          rowKey={"id"}
          formRef={formRef}
          editable={rowEditableConfig}
          debounceTime={1000}
          onDataSourceChange={(d) => console.log("set datasource", d)}
          request={async (params = {}, sort, filter) => {
            const queryParams = new URLSearchParams();
            params.current &&
              queryParams.append("page", params.current.toString());
            params.pageSize &&
              queryParams.append("size", params.pageSize.toString());
            params.id && queryParams.append("id", params.id);
            params.used && queryParams.append("used", params.used);

            const sortParams = Object.entries(sort).map(([key, value]) => {
              const sortParam = [key];
              if (value == "ascend") sortParam.push("asc");
              else sortParam.push("desc");
              return sortParam.join(",");
            });
            sortParams.forEach((param) => queryParams.append("sort", param));

            const axiosParam = {
              params: queryParams,
            };
            try {
              const result = await Client.credentialsInstance.get(
                `${process.env.REACT_APP_API_PATH}/v2/automation/labels/template`,
                axiosParam
              );
              return {
                data: result.data.content,
                total: result.data.totalElements,
                current: result.data.number,
                pageSize: result.data.size,
                success: true,
              };
            } catch (e) {
              console.error(e);
              return {
                success: false,
              };
            }
          }}
        />
      </StrictMode>
    </>
  );
};

export default LabelTemplate;
