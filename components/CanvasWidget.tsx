import { FC, PropsWithChildren } from "react";

const DemoCanvasWidget: FC<PropsWithChildren<{}>> = (props) => {
    const { children } = props;
    return <>{children}</>;
};

export default DemoCanvasWidget;
