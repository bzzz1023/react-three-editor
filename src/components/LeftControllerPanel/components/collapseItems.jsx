import { baseModelList, lightList } from "../config";
import { Button, message, Upload } from "antd";

const BaseModel = ({ onChangeModelList }) => {
  return (
    <div className="base-model-container">
      {baseModelList.map((item, index) => {
        return (
          <div
            key={index}
            className="base-model-item-container"
            onClick={() => {
              onChangeModelList(item);
            }}
          >
            {item.label}
          </div>
        );
      })}
    </div>
  );
};

const BaseLight = ({ onChangeModelList }) => {
  return (
    <div className="base-light-container">
      {lightList.map((item, index) => {
        return (
          <div
            key={index}
            className="base-light-item-container "
            onClick={() => {
              onChangeModelList(item);
            }}
          >
            {item.label}
          </div>
        );
      })}
    </div>
  );
};

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
      children: <BaseModel onChangeModelList={onChangeModelList} />,
    },
    {
      key: "2",
      label: "用户模型",
      children: <UploadModel onChangeUploadModel={onChangeUploadModel} />,
    },
    {
      key: "3",
      label: "灯光",
      children: <BaseLight onChangeModelList={onChangeModelList}></BaseLight>,
    },
  ];
};
