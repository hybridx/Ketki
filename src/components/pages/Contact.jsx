import React, { useState } from "react";
import { Typography, Row, Col, Form, Input, Button, Modal } from "antd";
import { Call, Doctor, Timing, ClinicAddress } from "../ContactSubcomponents";
import Header from "../Header";
import Footer from "../Footer";
import { sendMessage } from "../../api";

const { Title } = Typography;
const { TextArea } = Input;

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
    md: { span: 24 }
  }
};

const WrappedContactForm = ({ form }) => {
  const {
    getFieldDecorator,
    getFieldsError,
    getFieldError,
    isFieldTouched
  } = form;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [messege, setMessege] = useState("");
  const [visible, setVisible] = useState(false);

  // Only show error after a field is touched.
  const usernameError = isFieldTouched("username") && getFieldError("username");
  const emailError = isFieldTouched("email") && getFieldError("email");
  const messegeError = isFieldTouched("messege") && getFieldError("messege");

  function doContact(e) {
    e.preventDefault();
  }

  function onEmailChange(e) {
    setEmail(e.target.value);
  }

  function onNameChange(e) {
    setName(e.target.value);
  }

  function onMessegeChange(e) {
    setMessege(e.target.value);
  }

  function isFormValid() {
    return name && email && messege;
  }

  function handleOk(e) {
    setVisible(false);
  }

  function handleCancel(e) {
    setVisible(false);
  }
  function sendDoctorMessage() {
    sendMessage(name, email, messege).then(data => {
      if (data.status === "OK") {
        setVisible(true);
        form.resetFields();
      } else {
        setVisible(false);
      }
    });
  }
  return (
    <div>
      <Header />
      <Row gutter={16} className="rc-container-contact">
        <Col md={12} sm={24} className="contact-left-pane">
          <p class="primary-text"> Contact</p>
          <Doctor />
          {/* <Title level={2} style={{ color: "#007FFF" }}>
            Dr. Annu Saikh{" "}
          </Title>
          <p level={4} style={{ color: "#007FFF" }}>
            Ladies Ano-Rectal Consultant{" "}
          </p>
          <p level={4} style={{ color: "#007FFF" }}>
            {" "}
            B.A.M.S. RGHS (Banglore),
          </p> */}

          <ClinicAddress />
          <Timing />
          <Call />
          <Title level={3} style={{ color: "#007FFF" }}>
            Email{" "}
          </Title>
          <p level={4} style={{ color: "#007FFF" }}>
            info@pilesinjection.in
          </p>
        </Col>
        <Col md={12} sm={24}>
          <Form
            {...formItemLayout}
            onSubmit={doContact}
            className="contactForm"
          >
          <Title className="contactFormLeftPane" level={4} style={{ color: "#007FFF" }}>
            Send Message{" "}
          </Title>
            <Col md={24} sm={24} className="contactFormLeftPane">
              <Col md={12} sm={12}>
                <Form.Item
                  validateStatus={usernameError ? "error" : ""}
                  help={usernameError || ""}
                >
                  {getFieldDecorator("username", {
                    rules: [
                      { required: true, message: "Please input your name!" }
                    ]
                  })(
                    <Input
                      placeholder="Full name .."
                      size="large"
                      className={"inputClass"}
                      onChange={onNameChange}
                      value={name}
                    />
                  )}
                </Form.Item>
              </Col>
              <Col md={12} sm={12}>
                <Form.Item
                  validateStatus={emailError ? "error" : ""}
                  help={emailError || ""}
                >
                  {getFieldDecorator("email", {
                    rules: [
                      {
                        required: true,
                        message: "Please enter valid mail ID!"
                      },
                      {
                        type: "email",
                        message: "The input is not valid E-mail!"
                      }
                    ]
                  })(
                    <Input
                      size="large"
                      type="email"
                      placeholder="Enter Email ID"
                      onChange={onEmailChange}
                      className={"inputClass"}
                      value={email}
                    />
                  )}
                </Form.Item>
              </Col>
              <Col md={24} sm={24}>
                <Form.Item
                  validateStatus={messegeError ? "error" : ""}
                  help={messegeError || ""}
                >
                  {getFieldDecorator("message", {
                    rules: [
                      { required: true, message: "Please Enter Message!" }
                    ]
                  })(
                    <TextArea
                      rows={4}
                      className={"widthInputStyle"}
                      size="large"
                      placeholder="Type something. . ."
                      onChange={onMessegeChange}
                      value={messege}
                    />
                  )}
                </Form.Item>
              </Col>
              <Col md={24} sm={6}>
                <Form.Item>
                  <Button
                    onClick={isFormValid && sendDoctorMessage}
                    type="primary"
                    size="large"
                    htmlType="submit"
                    style={{
                      width: "100%",
                      border: 0,
                      backgroundColor: "#60b718"
                    }}
                    disabled={hasErrors(getFieldsError())}
                  >
                    Send
                  </Button>
                </Form.Item>
              </Col>
              <Col md={24} sm={24} style={{ height: "100%" }}>
                <iframe
                  title="gmap-ketki-clinic"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3783.65555865655!2d73.9418979950822!3d18.49925479384525!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c20456ec2805%3A0x24ecf0770eba5ed4!2sKetki+Piles+Injection+Clinic!5e0!3m2!1sen!2sin!4v1561900992959!5m2!1sen!2sin"
                  frameborder="0"
                  style={{ border: 0 }}
                  className={"embed-google-map"}
                  allowfullscreen
                />
              </Col>
            </Col>
            <Col md={12} sm={24} className="contactFormRightPane" />
          </Form>
        </Col>
      </Row>
      <Row>
        <Col md={24} sm={24}>
          <Footer />
        </Col>
      </Row>
      <Modal
        title="Message"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        Message Sent Successfully !
      </Modal>
    </div>
  );
};

const Contact = Form.create({ name: "contact_form" })(WrappedContactForm);

export default Contact;
