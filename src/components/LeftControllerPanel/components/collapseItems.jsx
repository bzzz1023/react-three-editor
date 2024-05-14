import { baseModelList, lightList } from "../config";
import { Button, message, Upload } from "antd";

import BaseModelList from "./baseModelList";
import BaseLightList from "./baseLightList";

const UploadModel = ({ onChangeUploadModel }) => {
  const onChangeModel = (info) => {
    const name = info.file.name;
    const url = URL.createObjectURL(info.file);
    onChangeUploadModel({
      name,
      url,
    });
  };
  return (
    <Upload
      beforeUpload={() => {
        return false;
      }}
      onChange={onChangeModel}
    >
      <Button>Click to Upload</Button>
    </Upload>
  );
};

export default ({ onChangeModelList, onChangeUploadModel }) => {
  return [
    {
      key: "1",
      label: "基础模型",
      children: <BaseModelList onChangeModelList={onChangeModelList} />,
    },
    {
      key: "2",
      label: "用户模型",
      children: <UploadModel onChangeUploadModel={onChangeUploadModel} />,
    },
    {
      key: "3",
      label: "灯光",
      children: <BaseLightList onChangeModelList={onChangeModelList} />,
    },
  ];
};
