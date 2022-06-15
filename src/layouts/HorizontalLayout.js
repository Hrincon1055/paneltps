import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
// MIS COMPONENTES
import Layout from "@layouts/HorizontalLayout";
import navigation from "@src/navigation/horizontal";
// INICIO
const HorizontalLayout = (props) => {
  console.log("HorizontalLayout LINE 8 =>");
  // HOOKS
  // const { userToken } = useSelector((state) => state.auth);
  // const [menuData, setMenuData] = useState([])
  // ** For ServerSide navigation
  // useEffect(() => {}, []);
  // RENDER
  // if (userToken) {
  //   return <Redirect to="/" />;
  // }
  return (
    <Layout menuData={navigation} {...props}>
      {props.children}
    </Layout>
  );
};

export default HorizontalLayout;
