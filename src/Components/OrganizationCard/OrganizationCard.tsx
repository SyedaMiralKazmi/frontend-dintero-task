import React from "react";
import { Button, Card, Container, Col, Row } from "react-bootstrap";
import { ArrowRightShort } from "react-bootstrap-icons";
import { OrganizationAddress } from "../../Pages/Home/Home";
import "./style.css";

type OrganizationCardProps = {
  title: string;
  subtitle: string;
  address?: OrganizationAddress;
  action?: React.MouseEventHandler<HTMLButtonElement>;
};

const OrganizationCard: React.FC<OrganizationCardProps> = (props) => {
  return (
    <Card>
      <Card.Body>
        <Row>
          <Col sm={8}>
            <Container>
              <Card.Title>{props.title}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                {"Org no."} {props.subtitle}
              </Card.Subtitle>
              {props.address && (
                <Container style={{ padding: 0, marginBottom: 20 }}>
                  <Card.Text className="addresstext">
                    {props.address.address_line}
                  </Card.Text>
                  {props.address.address_line_2 && (
                    <Card.Text className="addresstext">
                      {props.address.address_line_2}
                    </Card.Text>
                  )}
                  <Card.Text className="addresstext">
                    {props.address.postal_code} {props.address.postal_place}
                  </Card.Text>
                  <Card.Text className="addresstext">
                    {props.address.country}
                  </Card.Text>
                </Container>
              )}
            </Container>
          </Col>
          <Col
            sm={4}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {props.action && (
              <Button variant="primary" onClick={props.action}>
                Select
                <ArrowRightShort />
              </Button>
            )}
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default OrganizationCard;
