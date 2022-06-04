/* eslint-disable comma-dangle */
/* eslint-disable semi */

import {
  Card,
  CardBody,
  CardGroup,
  CardHeader,
  CardText,
  CardTitle,
  Col,
  Row,
} from "reactstrap";
const carsInfo = Array(50);
// INICIO
const Actas = () => {
  console.log("Actas LINE 16 =>", carsInfo);
  // RENDER
  return (
    <>
      <Row>
        <Col>
          <Card>
            <CardHeader>
              <CardTitle>Create Awesome</CardTitle>
            </CardHeader>
            <CardBody>
              <CardText>This is your second page.</CardText>
              <CardText>
                Chocolate sesame snaps pie carrot cake pastry pie lollipop
                muffin. Carrot cake dragée chupa chups jujubes. Macaroon
                liquorice cookie wafer tart marzipan bonbon. Gingerbread jelly-o
                dragée chocolate.
              </CardText>
            </CardBody>
          </Card>
        </Col>
        <Col>
          <Card>
            <CardHeader>
              <CardTitle>Create Awesome</CardTitle>
            </CardHeader>
            <CardBody>
              <CardText>This is your second page.</CardText>
              <CardText>
                Chocolate sesame snaps pie carrot cake pastry pie lollipop
                muffin. Carrot cake dragée chupa chups jujubes. Macaroon
                liquorice cookie wafer tart marzipan bonbon. Gingerbread jelly-o
                dragée chocolate.
              </CardText>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Row>
        {[...Array(151)].map((id) => (
          <Col sm="4">
            <Card>
              <CardHeader>
                <CardTitle>Create Awesome{id}</CardTitle>
              </CardHeader>
              <CardBody>
                <CardText>This is your second page.</CardText>
                <CardText>
                  Chocolate sesame snaps pie carrot cake pastry pie lollipop
                  muffin. Carrot cake dragée chupa chups jujubes. Macaroon
                  liquorice cookie wafer tart marzipan bonbon. Gingerbread
                  jelly-o dragée chocolate.
                </CardText>
              </CardBody>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Actas;
