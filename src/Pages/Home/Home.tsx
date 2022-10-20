import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  FloatingLabel,
  Form,
  InputGroup,
  Row,
} from "react-bootstrap";
import { Search } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import { OrganizationCard } from "../../Components/OrganizationCard";
import AppLayout from "../../Layout/AppLayout";
import "./style.css";
type HomeProps = {};

export type OrganizationAddress = {
  address_line: string;
  address_line_2: string;
  postal_code: string;
  postal_place: string;
  country: string;
};

export type Organization = {
  response_from: string;
  organization_number: string;
  organization_type: string;
  business_name: string;
  website_url: string;
  business_address: OrganizationAddress;
};

const Home: React.FC<HomeProps> = () => {
  const [organizationName, setOrganizationName] = useState<string>("");
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [showCount, setShowCount] = useState<number>(5);

  useEffect(() => {
    if (organizationName) getOrganizations();
    if (!organizationName.length) setOrganizations([]);
  }, [organizationName]);

  const getOrganizations = async () => {
    const organizationsRes: any = await fetch(
      `/dintero-api/companies/?name=${organizationName}`
    );
    const organizations = await organizationsRes.json();
    if (organizations.length < 5) setShowCount(organizations.length);
    else setShowCount(5);

    setOrganizations(organizations);
  };

  const navigate = useNavigate();
  return (
    <React.Fragment>
      <AppLayout>
        <Container>
          <Row>
            <Col sm={12}>
              <FloatingLabel controlId="floatingTextarea2" label="">
                <Form.Group>
                  <Form.Label>Search for company</Form.Label>
                  <InputGroup className="mb-3">
                    <Form.Control
                      required
                      type="search"
                      placeholder="Search by company name"
                      aria-label="Search by company name"
                      value={organizationName}
                      onChange={(event) =>
                        setOrganizationName(event.target.value)
                      }
                    />
                    <InputGroup.Text id="basic-addon2">
                      <Search color="royalblue" size={26} />
                    </InputGroup.Text>
                  </InputGroup>

                  <Form.Text className="helpertext1">
                    Find your company{" "}
                  </Form.Text>
                </Form.Group>
              </FloatingLabel>
            </Col>
          </Row>
        </Container>
        {organizations.length > 0 && (
          <Container>
            <Row>
              <Col sm={12}>
                <Form.Text
                  className="helpertext2"
                  muted
                >{`Showing results ${showCount} of  ${organizations.length}`}</Form.Text>

                {organizations.slice(0, showCount).map((organization, idx) => {
                  return (
                    <Container
                      key={`${organization.organization_number}-${idx}`}
                      id="organization-card-container"
                    >
                      <OrganizationCard
                        title={organization.business_name}
                        subtitle={organization.organization_number}
                        address={organization.business_address}
                        action={() =>
                          navigate(
                            `/details/${organization.organization_number}`
                          )
                        }
                      />
                    </Container>
                  );
                })}
              </Col>
            </Row>
            {showCount < organizations.length && (
              <p
                className="show-more"
                onClick={() => {
                  if (showCount + 5 <= organizations.length)
                    setShowCount(showCount + 5);
                  else setShowCount(organizations.length);
                }}
              >
                Show More
              </p>
            )}
            {showCount >= organizations.length && showCount > 5 && (
              <p className="show-more" onClick={() => setShowCount(5)}>
                Show Less
              </p>
            )}
          </Container>
        )}
      </AppLayout>
    </React.Fragment>
  );
};

export default Home;
