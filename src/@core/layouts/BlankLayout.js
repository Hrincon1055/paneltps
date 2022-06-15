import { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
// ** Custom Hooks
import { useSkin } from "@hooks/useSkin";

// ** Third Party Components
import classnames from "classnames";

const BlankLayout = ({ children }) => {
  // HOOKS
  const { skin } = useSkin();
  const { userToken } = useSelector((state) => state.auth);
  // STATE
  const [isMounted, setIsMounted] = useState(false);
  // EFFECT
  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);
  // RENDER
  if (userToken) {
    return <Redirect to="/" />;
  }
  if (!isMounted) {
    return null;
  }

  return (
    <div
      className={classnames("blank-page", {
        "dark-layout": skin === "dark",
      })}
    >
      <div className="app-content content">
        <div className="content-wrapper">
          <div className="content-body">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default BlankLayout;
