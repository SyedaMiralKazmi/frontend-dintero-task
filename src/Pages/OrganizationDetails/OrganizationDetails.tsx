import React, { useState, useEffect } from "react";
import { Row, Form } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Spinner from 'react-bootstrap/Spinner';
import Col from "react-bootstrap/Col";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { useParams } from "react-router-dom";
import { OrganizationCard } from "../../Components/OrganizationCard";
import AppLayout from "../../Layout/AppLayout";
import { checkAccountNumber } from "../../quickr";
import { OrganizationAddress } from "../Home/Home";


type OrganizationDetailsProps = {};
type Organization = {
  business_name: string;
  organization_number: string;
  registry_address: OrganizationAddress;
  office_type: string;
};

const OrganizationDetails: React.FC<OrganizationDetailsProps> = () => {
  const [organization, setOrganization] = useState<Organization | undefined>(
    undefined
  );
  const [bankNumber, setBankNumber] = useState<string>("");
  const [isValidNumber, setIsValidNumber] = useState<boolean>(false);
  const [validating, setValidating] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const params = useParams<{ organizationNumber: string }>();
  

  useEffect(() => {
    getOrganization();
  }, []);

  useEffect(() => {
    if (bankNumber.length === 11) {
      checkValidNumber();
    }
  }, [bankNumber]);

  const checkValidNumber = async () => {
    const isValid = await checkAccountNumber(
      params?.organizationNumber || "",
      bankNumber
    );
    setIsValidNumber(isValid);
  };

  const getOrganization = async () => {
    setValidating(true);
    const organizationRes = await fetch(
      `https://test.dintero.com/v1/accounts/P11100000/search/external/organizations/no/${params.organizationNumber}`
    );
    const organizations: { items: Organization[] } =
      await organizationRes.json();
    const headOffice = organizations.items.find(
      (organization) => organization.office_type === "head_office"
    );
    setOrganization(headOffice);
    setValidating(false);
    setLoading(false)
  };

  if (loading) return (
    <AppLayout>
      <Container style={{display:"flex",justifyContent:"center"}}>
      <Spinner animation="border" variant="primary" role="status" />
      </Container>
    </AppLayout>
  )

  return (
    <AppLayout>
      <Container>
        <Row>
          <Col>
            {organization && (
              <OrganizationCard
                title={organization.business_name}
                subtitle={organization.organization_number}
                address={organization.registry_address}
              />
            )}
          </Col>
        </Row>
      </Container>
      <Container className="c3">
        <Row>
          <Col>
            <FloatingLabel controlId="floatingTextarea2" label="">
              <Form.Group controlId="formGridCity">
                <Form.Label>Check bank account ownership</Form.Label>
                <Form.Control
                  required
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  value={bankNumber}
                  onChange={(event) => setBankNumber(event.target.value)}
                />
                {!!bankNumber.length &&
                  (!isValidNumber ? (
                    bankNumber.length < 11 ? (
                      <Form.Text style={{ color: "red" }}>Too short </Form.Text>
                    ) : bankNumber.length > 11 ? (
                      <Form.Text style={{ color: "red" }}>Too Long </Form.Text>
                    ) : undefined
                  ) : undefined)}

                {bankNumber.length === 11 ? (
                  validating ? (
                    <Form.Text>validating </Form.Text>
                  ) : (
                    <Form.Text style={{ color: isValidNumber ? "green" : "red" }}>
                      {isValidNumber ? "Valid number" : "Invalid Number"}{" "}
                    </Form.Text>
                  )
                ) : undefined}
              </Form.Group>
            </FloatingLabel>
          </Col>
        </Row>
      </Container>
    </AppLayout>
  );
};

export default OrganizationDetails;
