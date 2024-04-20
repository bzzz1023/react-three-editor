{/* <div className="item-box">
            <div className="item-title">旋转</div>
            <Checkbox
              checked={rotateAnimation.enableRotate}
              onChange={(e) => {
                onChangeCamera(
                  "rotateAnimation.enableRotate",
                  e.target.checked
                );
                onChangeModelProperty(
                  "rotateAnimation.enableRotate",
                  e.target.checked
                );
              }}
            />
          </div>
          {rotateAnimation && rotateAnimation.enableRotate && (
            <>
              <div className="item-box">
                <div className="item-title">自身旋转</div>
                <Checkbox
                  checked={rotateAnimation.enableRotateSelf}
                  onChange={(e) => {
                    onChangeCamera(
                      "rotateAnimation.enableRotateSelf",
                      e.target.checked
                    );
                    onChangeModelProperty(
                      "rotateAnimation.enableRotateSelf",
                      e.target.checked
                    );
                  }}
                />
              </div>
              <div className="item-box">
                <div className="item-title">旋转半径</div>
                <InputNumber
                  precision={2}
                  className="content-item"
                  size="small"
                  step={0.01}
                  value={rotateAnimation.rotateRadius}
                  onChange={(e) => {
                    onChangeModelPropertyState(
                      "rotateAnimation.rotateRadius",
                      e
                    );
                    onChangeModelProperty("rotateAnimation.rotateRadius", e);
                  }}
                />
              </div>
              <div className="item-box">
                <div className="item-title">旋转方向</div>
                <Radio.Group
                  onChange={(e) => {
                    onChangeModelPropertyState(
                      "rotateAnimation.rotateClockwise",
                      e.target.value
                    );
                    onChangeModelProperty(
                      "rotateAnimation.rotateClockwise",
                      e.target.value
                    );
                  }}
                  value={rotateAnimation.rotateClockwise}
                >
                  <Radio value={-1}>顺时针</Radio>
                  <Radio value={1}>逆时针</Radio>
                </Radio.Group>
              </div>
              <div className="item-box">
                <div className="item-title">旋转速率</div>
                <InputNumber
                  precision={2}
                  className="content-item"
                  size="small"
                  step={0.01}
                  value={rotateAnimation.rotateSpeed}
                  onChange={(e) => {
                    onChangeModelPropertyState(
                      "rotateAnimation.rotateSpeed",
                      e
                    );
                    onChangeModelProperty("rotateAnimation.rotateSpeed", e);
                  }}
                />
              </div>
              <div className="item-box">
                <div className="item-title">旋转中心</div>
                <div className="content-box-two">
                  <InputNumber
                    precision={3}
                    className="content-item"
                    prefix="x"
                    size="small"
                    step={0.01}
                    value={rotateAnimation.rotatePivot.x}
                    onChange={(e) => {
                      onChangeModelPropertyState(
                        "rotateAnimation.rotatePivot.x",
                        e
                      );
                      onChangeModelProperty("rotateAnimation.rotatePivot.x", e);
                    }}
                  />
                  <InputNumber
                    precision={3}
                    disabled
                    className="content-item"
                    prefix="y"
                    size="small"
                    step={0.01}
                    value={rotateAnimation.rotatePivot.y}
                    onChange={(e) => {
                      // onChangeModelPropertyState("rotateAnimation.rotatePivot.y", e);
                      // onChangeModelProperty("rotateAnimation.rotatePivot.y", e);
                    }}
                  />
                  <InputNumber
                    precision={3}
                    className="content-item"
                    prefix="z"
                    size="small"
                    step={0.01}
                    value={rotateAnimation.rotatePivot.z}
                    onChange={(e) => {
                      onChangeModelPropertyState(
                        "rotateAnimation.rotatePivot.z",
                        e
                      );
                      onChangeModelProperty("rotateAnimation.rotatePivot.z", e);
                    }}
                  />
                </div>
              </div>
            </>
          )} */}