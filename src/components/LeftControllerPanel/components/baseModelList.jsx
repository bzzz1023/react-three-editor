import { baseModelList } from "../config";

const BaseModelList = ({ onChangeModelList }) => {
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
            <img
              className="model-bg"
              src={item.imageUrl}
              alt=""
            />
            <div className="model-name">{item.label}</div>
          </div>
        );
      })}
    </div>
  );
};

export default BaseModelList;
