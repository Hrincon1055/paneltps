/* eslint-disable comma-dangle */
/* eslint-disable semi */
import { useState } from "react";
import { useSkin } from "@hooks/useSkin";
import { Link, useHistory } from "react-router-dom";

import InputPasswordToggle from "@components/input-password-toggle";
import {
  Row,
  Col,
  CardTitle,
  CardText,
  Form,
  Label,
  Input,
  Button,
  FormFeedback,
  Spinner,
} from "reactstrap";
import { toast } from "react-toastify";
import "@styles/react/pages/page-authentication.scss";
// MIS COMPONENTES
import { useAuthentication } from "@hooks/useAuthentication";
import { useSelector } from "react-redux";
import { PATHS_API } from "../utils/constants";
import { axiosApi } from "../libs/axiosApi";
import logo from "@src/assets/images/logo/logo_2_tps.png";

// INICIO
const LoginCover = () => {
  // HOOKS
  const history = useHistory();
  const { skin } = useSkin();
  const { setHandleLogin } = useAuthentication();
  const store = useSelector((state) => state.auth);
  // STATE
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ user: false, password: false });
  const [isLoading, setIsLoading] = useState(false);
  // CONSTANTES
  const illustration = skin === "dark" ? "login_dark.svg" : "login_light.svg",
    source = require(`@src/assets/images/pages/${illustration}`).default;
  // FUNCIONES
  const login = (e) => {
    e.preventDefault();
    if (user.trim().length <= 0) {
      setErrors((preErrors) => ({ ...preErrors, user: true }));
      return;
    }
    if (password.trim().length <= 0) {
      setErrors((preErrors) => ({ ...preErrors, password: true }));
      return;
    }
    setErrors({});
    setIsLoading(true);
    axiosApi
      .post(PATHS_API.user, { user, password })
      .then((response) => {
        if (response.status == 200) {
          setHandleLogin(response.data.token);
          history.push("/");
        }
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
        toast.error("Ha ocurrido un error");
      });
  };
  // RENDER
  return (
    <div className="auth-wrapper auth-cover">
      <Row className="auth-inner m-0">
        <Link className="brand-logo" to="/" onClick={(e) => e.preventDefault()}>
          <img src={logo} alt="logo" />
          {/* <h2 className="brand-text text-primary ms-1">Visualizador E11</h2> */}
        </Link>
        <Col className="d-none d-lg-flex align-items-center p-5" lg="8" sm="12">
          <div className="w-100 d-lg-flex align-items-center justify-content-center px-5">
            <img className="img-fluid" src={source} alt="Login Cover" />
          </div>
        </Col>
        <Col
          className="d-flex align-items-center auth-bg px-2 p-lg-5"
          lg="4"
          sm="12"
        >
          <Col className="px-xl-2 mx-auto" sm="8" md="6" lg="12">
            <CardTitle tag="h2" className="fw-bold mb-1">
              Bienvenido al panel E11 ! 👋
            </CardTitle>
            <CardText className="mb-2">
              Por favor, ingrese sus credenciales.
            </CardText>
            <Form className="auth-login-form mt-2" onSubmit={(e) => login(e)}>
              <div className="mb-1">
                <Label className="form-label" for="login-email">
                  usuario
                </Label>
                <Input
                  type="text"
                  id="user"
                  name="user"
                  autoFocus
                  invalid={errors.user}
                  onChange={(e) => setUser(e.target.value)}
                />
                <FormFeedback>El usuario es obligatorio</FormFeedback>
              </div>
              <div className="mb-1">
                <div className="d-flex justify-content-between">
                  <Label className="form-label" for="login-password">
                    contraseña
                  </Label>
                </div>
                <InputPasswordToggle
                  className="input-group-merge "
                  id="password"
                  name="password"
                  invalid={errors.password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <FormFeedback>El password es obligatorio</FormFeedback>
              </div>
              <Button color="primary" type="submit" block>
                {isLoading ? <Spinner size="sm" /> : "Ingresar"}
              </Button>
            </Form>
          </Col>
        </Col>
      </Row>
    </div>
  );
};

export default LoginCover;
