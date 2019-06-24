import React, { Component, useState } from 'react';
import { Form, Icon, Steps, Input, message, InputNumber, Button, DatePicker, TimePicker, Select, Modal } from 'antd';
import ReCAPTCHA from "react-google-recaptcha";

const TEST_SITE_KEY = "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI";
const DELAY = 1500;
const { Option } = Select;
const { Step } = Steps;
const format = 'HH:mm';


    function hasErrors(fieldsError) {
        return Object.keys(fieldsError).some(field => fieldsError[field]);
    }

    const formItemLayout = {
        labelCol: {
            xs: { span: 24 },
            sm: { span: 8 },
        },
        wrapperCol: {
            xs: { span: 24 },
            sm: { span: 16 },
        },
    };
    
    const WrappedHomeForm = ({ form }) => {
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = form;
        const [visible, setShowModal ] = useState(false);
        const [name, setName ] = useState('');
        const [mobileNumber, setMobileNumber ] = useState('');
        const [gender, setGender ] = useState('male');
        const [date, setDate ] = useState('');
        const [time, setTime ] = useState('');
        const [currentStep, setCurrentStep] = useState(0);
        const [OTP, setOTP] = useState('');
        const [captchaValue, setCaptchaValue] = useState();
        const [expired, setExpired] = useState('false');

        const _reCaptchaRef = React.createRef();
        
        // Only show error after a field is touched.
        const usernameError = isFieldTouched('username') && getFieldError('username');
        const dateError = isFieldTouched('date') && getFieldError('date');
        const timeError = isFieldTouched('time') && getFieldError('time');
        const phoneError = isFieldTouched('phone') && getFieldError('phone');
        const genderError = isFieldTouched('gender') && getFieldError('gender');
        
        const OtpJsx = (
            <div class="content-box">
            {getFieldDecorator('OTP', {
                rules: [{ required: true, message: 'Please input OTP!', len: 6 }],
                })(<Input type="number" size="large" placeholder="Enter OTP" onChange={onOTPChange} style={{ width: '50%' }} />)}
            </div>
        )

        const doneJsx = (
            <div class="content-box">
            <h2>Your appointment is now confirmed.</h2>
            <h3>Thank You</h3>
            </div>
        )


        const CaptchaJsx = (
            <div class="content-box">
                <ReCAPTCHA
                    style={{ display: "inline-block" }}
                    theme="light"
                    ref={_reCaptchaRef}
                    sitekey={TEST_SITE_KEY}
                    onChange={handleCaptchaChange}
                />
            </div>
        )

        const steps = [
            {
              title: 'Enter Otp',
              content: OtpJsx,
            },
            {
              title: 'Enter Captcha',
              content: CaptchaJsx,
            },
            {
                title: 'Done',
                content: doneJsx,
              },
          ];

        function handleCaptchaChange(value){
        console.log("Captcha value:", value);
        setCaptchaValue({ value });
        // if value is null recaptcha expired
        if (value === null) setExpired({ expired: "true" });
        };

        function bookAppointment(e){
            e.preventDefault();
            console.log(name, mobileNumber, gender, date, time);
        }
        
        function onPhoneChange(e){
            setMobileNumber(e.target.value);
        }

        function onNameChange(e){
            setName(e.target.value);
        }
        
        function onTimeChange(timeObj, timeString){
            setTime(timeString);
        }
        
        function onDateChange(dateObj, dateString){
            setDate(dateString)
        }
    
        function onGenderChange(selectedGender){
            setGender(selectedGender);
        }
        function getDisabledHours(){
            
        } 
        function onOTPChange(e){
            setOTP(e.target.value);
        }

        function showModal(params) {
            setShowModal(true);
        }

        function handleOk(e){
            setShowModal(false);
        };

        function handleCancel(e){
            setShowModal(false);
        };

        function next() {
            // let currentStep = currentStep + 1;
            setCurrentStep(currentStep + 1);
          }
        
        function prev() {
            // let currentStep = currentStep - 1;
            setCurrentStep(currentStep - 1);
          }

        const datePrefixSelector = getFieldDecorator('prefix', {
            initialValue: '91',
        })(
            <Select style={{ width: 70 }}>
          <Option value="91">+91</Option>
        </Select>,
      );
      
      return (
          <div class="container">
            <Form {...formItemLayout} onSubmit={bookAppointment} className="signUpForm">
                <Form.Item validateStatus={usernameError ? 'error' : ''} help={usernameError || ''}>
                    {getFieldDecorator('username', {
                        rules: [{ required: true, message: 'Please input your username!' }],
                    })(
                        <Input
                            placeholder="Enter your full name .."
                            size="large" 
                            style={{ width: '50%' }}
                            onChange={onNameChange}
                        />,
                    )}
                </Form.Item>
                <Form.Item validateStatus={phoneError ? 'error' : ''} help={phoneError || ''}>
                    {getFieldDecorator('phone', {
                        rules: [{ required: true, message: 'Please input your phone number!', len: 10 }],
                        })(<Input type="number" size="large" placeholder="Enter phone number" onChange={onPhoneChange} addonBefore={datePrefixSelector} style={{ width: '50%' }} />)}
                </Form.Item>
                <Form.Item validateStatus={genderError ? 'error' : ''} help={genderError || ''}>
                    {getFieldDecorator('gender', {
                        rules: [{ required: true, message: 'Please select Gender!' }],
                    })(
                        <Select
                            style={{ width: 225 }}
                            placeholder="Select gender"
                            onChange={onGenderChange}
                            size="large" 
                        >
                            <Option value="male">Male</Option>
                            <Option value="female">Female</Option>
                            <Option value="other">Other</Option>
                        </Select>
                    )}
                </Form.Item>
                <Form.Item validateStatus={dateError ? 'error' : ''} help={dateError || ''}>
                    {getFieldDecorator('date', {
                        rules: [{ required: true, message: 'Please select date!' }],
                    })(
                        <DatePicker onChange={onDateChange} size="large" />
                    )}
                </Form.Item>
                <Form.Item validateStatus={timeError ? 'error' : ''} help={timeError || ''}>
                    {getFieldDecorator('time', {
                        rules: [{ required: true, message: 'Please select time!' }],
                    })(
                        <TimePicker onChange={onTimeChange} size="large" format={format}  />
                    )}
                </Form.Item>

                <Form.Item>
                    <Button onClick={showModal} type="primary" size="large"  htmlType="submit" disabled={hasErrors(getFieldsError())}>
                        Book Appointment
          </Button>
                </Form.Item>
            </Form>
                <Modal
                    width={700}
                    title="Confirmation"
                    visible={visible}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    >
                    <Steps current={currentStep}>
                        {steps.map(item => (
                            <Step key={item.title} title={item.title} />
                        ))}
                    </Steps>
                        <div className="steps-content">{steps[currentStep].content}</div>
                        <div className="steps-action">
                    {currentStep < steps.length - 1 && (
                        <Button type="primary" onClick={() => next()}>
                        {currentStep === 0 ? 'Check OTP' : 'Next' }
                        </Button>
                    )}
                    {currentStep === steps.length - 1 && (
                        <Button type="primary" onClick={() => message.success('Processing complete!')}>
                        Done
                        </Button>
                    )}
                    {currentStep > 0 && (
                        <Button style={{ marginLeft: 8 }} onClick={() => prev()}>
                        Previous
                        </Button>
                    )}
                    </div>
                    </Modal>
        </div>
    )
}

const Home = Form.create({ name: 'user_form' })(WrappedHomeForm);
export default Home;