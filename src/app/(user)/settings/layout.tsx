import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const SettingsLayout = ({ children }: Props) => {
  return <div>{children}</div>;
};

export default SettingsLayout;
