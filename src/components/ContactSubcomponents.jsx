import React, { Fragment } from "react";
import { Typography, Switch } from "antd";
const { Title } = Typography;

export const Call = () => (
  <Fragment>
    <Title level={3} style={{ color: "#007FFF" }}>
      Call{" "}
    </Title>
    <p level={4} style={{ color: "#007FFF" }}>
      +91 9763192222
    </p>
  </Fragment>
);

export const Doctor = () => (
  <Fragment>
    <Title level={3} style={{ color: "#007FFF" }}>
      Dr. Shivshankar B. Biradar{" "}
    </Title>
    <p level={4} style={{ color: "#007FFF" }}>
      Ano-Rectal Consultant{" "}
    </p>
    <p level={4} style={{ color: "#007FFF" }}>
      {" "}
      B.A.M.S. MUHS (Nashik),
    </p>
    <p level={4} style={{ color: "#007FFF" }}>
      {" "}
      Reg No. I-49639-A
    </p>
    <Title level={3} style={{ color: "#007FFF" }}>
      Dr. Annu Saikh{" "}
    </Title>
    <p level={4} style={{ color: "#007FFF" }}>
      Ladies Ano-Rectal Consultant{" "}
    </p>
    <p level={4} style={{ color: "#007FFF" }}>
      {" "}
      B.A.M.S. RGHS (Banglore),
  </p>
  </Fragment>
);

export const Branches = () => (
  <Fragment>
    <Title level={3} style={{ color: "#007FFF" }}>
      Branches & Working Days{" "}
    </Title>
    <p level={4} style={{ color: "#007FFF" }}>
      {" "}
      <b>Pune: </b> <p level={4} style={{ color: "#007FFF" }}>
        Sunday, Monday, Tuesday
      </p>
    </p>
    <p level={4} style={{ color: "#007FFF" }}>
      {" "}
      <b> Latur: </b> <p level={4} style={{ color: "#007FFF" }}>
        Thursday
      </p>
    </p>
    <p level={4} style={{ color: "#007FFF" }}>
      {" "}
      <b> Nanded: </b> <p level={4} style={{ color: "#007FFF" }}>
        Friday, Saturday
      </p>
    </p>
  </Fragment>
);

export const ClinicAddress = () => (
  <Fragment>
    <Title level={3} style={{ color: "#007FFF" }}>
      Clinic Address{" "}
    </Title>
    <p level={4} style={{ color: "#007FFF" }}>
      Flat # 21, 2nd Floor Tulsi Appartment,
    </p>
    <p level={4} style={{ color: "#007FFF" }}>
      {" "}
      Above kalyan janta Sahkari bank,
    </p>
    <p level={4} style={{ color: "#007FFF" }}>
      {" "}
      Pune - Solapur Highway,
    </p>
    <p level={4} style={{ color: "#007FFF" }}>
      {" "}
      Gadital Hadapsar,
    </p>
    <p level={4} style={{ color: "#007FFF" }}>
      {" "}
      Pune 411028,
    </p>
    <p level={4} style={{ color: "#007FFF" }}>
      {" "}
      Maharashtra India{" "}
    </p>
  </Fragment>
);

export const Timing = () => (
  <Fragment>
    <Title level={3} style={{ color: "#007FFF" }}>
      Working Hours{" "}
    </Title>
    <p level={4} style={{ color: "#007FFF" }}>
      11 AM to 7 PM{" "}
      <span>
        <Switch
          checkedChildren="Open"
          unCheckedChildren="Closed"
          checked={new Date().getHours() > 10 && new Date().getHours() < 20}
        />
      </span>
    </p>
  </Fragment>
);
