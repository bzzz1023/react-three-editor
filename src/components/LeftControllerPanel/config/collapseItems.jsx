const baseModelList = [
  {
    label: "火",
    config: {
      modelType: 2,
      modelKey: "fire",
      userData: {
        modelType: 2,
        modelName: "火焰",
        color: "green",
        scale: 8,
      },
    },
  },
  {
    label: "海洋",
    config: {
      modelType: 2,
      modelKey: "ocean",
      userData: {
        modelType: 2,
        modelName: "海洋",
      },
    },
  },
  {
    label: "树木",
    config: {
      modelType: 2,
      modelKey: "tree",
      userData: {
        modelType: 2,
        modelName: "树木",
        // scale: { x: 0.1, y: 0.1, z: 0.1 },
      },
    },
  },
  {
    label: "方体",
    config: {
      modelType: 2,
      modelKey: "cube",
      userData: {
        modelType: 2,
        modelName: "方体",
      },
    },
  },
];

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

export default ({ onChangeModelList }) => {
  return [
    {
      key: "1",
      label: "基础模型",
      children: <BaseModel onChangeModelList={onChangeModelList} />,
    },
    {
      key: "2",
      label: "用户模型",
      children: <p>222</p>,
    },
    {
      key: "3",
      label: "灯光",
      children: <p>333</p>,
    },
  ];
};
