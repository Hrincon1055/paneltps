import { useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
// MIS COMPONENTES
import Layout from "@layouts/VerticalLayout";
import navigation from "@src/navigation/vertical";

// INICIO
const VerticalLayout = (props) => {
  const { userToken } = useSelector((state) => state.auth);
  // console.log("VerticalLayout LINE 12 =>", store);
  // useEffect(() => {}, [store.userToken]);
  // RENDER
  if (!userToken) {
    return <Redirect to="/login" />;
  }
  return (
    <Layout menuData={navigation} {...props}>
      {props.children}
    </Layout>
  );
};

export default VerticalLayout;
