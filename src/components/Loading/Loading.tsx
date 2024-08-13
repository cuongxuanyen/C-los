import { Spin } from "antd";
import React, { useImperativeHandle, useState } from "react";
import { LoadingOutlined } from "@ant-design/icons";

interface GlobalLoadingAction {
  show: (text?: string) => void;
  hide: () => void;
}

const globalLoadingRef = React.createRef<GlobalLoadingAction>();

const GlobalLoadingComponent = React.forwardRef<GlobalLoadingAction>(
  function GlobalLoadingComponent(_props, ref) {
    const [isShowLoading, setIsShowLoading] = useState<boolean>(false);
    const [textLoading, setTextLoading] = useState<string>("");

    useImperativeHandle(ref, () => ({
      show: (text) => {
        setIsShowLoading(true);
        setTextLoading(text ? text : "Loading...");
      },
      hide: () => setIsShowLoading(false),
    }));

    return (
      <Spin
        style={{ zIndex: 9998 }}
        spinning={isShowLoading}
        size="large"
        fullscreen
        tip={textLoading}
        indicator={<LoadingOutlined style={{ color: "#00CED1" }} spin />}
      />
    );
  }
);

const Loading = () => <GlobalLoadingComponent ref={globalLoadingRef} />;

export default Loading;

export const loading: GlobalLoadingAction = {
  show: (text) => globalLoadingRef.current?.show(text),
  hide: () => globalLoadingRef.current?.hide(),
};
