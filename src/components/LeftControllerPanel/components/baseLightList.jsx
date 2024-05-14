import { lightList } from "../config";

const BaseLightList = ({ onChangeModelList }) => {
  return (
    <div className="base-light-container">
      {lightList.map((item, index) => {
        return (
          <div
            key={index}
            className="base-light-item-container"
            onClick={() => {
              onChangeModelList(item);
            }}
          >
            <img className="light-bg" src={item.imageUrl} alt="" />
            <div className="light-name">{item.label}</div>
          </div>
        );
      })}
    </div>
  );
};

export default BaseLightList;
