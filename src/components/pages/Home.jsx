import React, {  useState } from 'react';
import { Form, Steps, Input, message, Button, DatePicker, TimePicker, Select, Modal, Row, Col, Icon } from 'antd';
import ReCAPTCHA from "react-google-recaptcha";
import { getAvailableSlots, sendOTPToUser, booNewAppointment } from '../../api';
import moment from 'moment';

const TEST_SITE_KEY = "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI";
const { Option } = Select;
const { Step } = Steps;
const format = 'HH';
const endDate  = moment().date(1).add((moment().date() > 14 ? 1 : 0), "months").add(14,"days");



    function hasErrors(fieldsError) {
        return Object.keys(fieldsError).some(field => fieldsError[field]);
    }

    const handleClose = () => (true);

    const formItemLayout = {
        labelCol: {
            xs: { span: 24 },
            sm: { span: 8 },
        },
        wrapperCol: {
            xs: { span: 24 },
            sm: { span: 16 },
            md: { span: 24 },
        },
    };
    
    const WrappedHomeForm = ({ form }) => {
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = form;
        const [visible, setShowModal ] = useState(false);
        const [name, setName ] = useState('');
        const [mobileNumber, setMobileNumber ] = useState('');
        const [age, setAgeNumber ] = useState('');
        const [gender, setGender ] = useState('m');
        const [date, setDate ] = useState('');
        const [time, setTime ] = useState('');
        const [currentStep, setCurrentStep] = useState(0);
        const [OTP, setOTP] = useState('');
        const [captchaValue, setCaptchaValue] = useState();
        const [setExpired] = useState('false');
        const [ disabledHours, setDisabledHours ] = useState([]);
        const _reCaptchaRef = React.createRef();
    
        const userData = {
            otp: OTP,
            name: name,
            age: age,
            phone: mobileNumber,
            date: date,
            time: time,
            gender: gender
        }
        // Only show error after a field is touched.
        const usernameError = isFieldTouched('username') && getFieldError('username');
        const dateError = isFieldTouched('date') && getFieldError('date');
        const timeError = isFieldTouched('time') && getFieldError('time');
        const phoneError = isFieldTouched('phone') && getFieldError('phone');
        const genderError = isFieldTouched('gender') && getFieldError('gender');
        const ageError = isFieldTouched('age') && getFieldError('age');
        

        let OtpJsx = (
            <React.Fragment>
            <div class="content-box">
            <Input type="number" size="large" placeholder="Enter OTP" onChange={onOTPChange} 
            className={'inputClass'}
            required />
            </div>
                <div class="content-box">
                <ReCAPTCHA
                    style={{ display: "inline-block" }}
                    theme="light"
                    ref={_reCaptchaRef}
                    sitekey={TEST_SITE_KEY}
                    onChange={handleCaptchaChange}
                />
            </div>
        </React.Fragment>
        )

        const doneJsx = (
            <div class="content-box">
            <h2>Hello {name}! your appointment is now confirmed.</h2>
            <h3>Date: {date} time: {time}</h3>
            <h3>Thank You</h3>
            </div>
        )

        const steps = [
            {
              title: 'Enter OTP',
              content: OtpJsx,
            },
            {
                title: 'Done',
                content: doneJsx,
              },
          ];

        function handleCaptchaChange(value){
        console.log("Captcha value:", value);
        setCaptchaValue(value);
        // if value is null recaptcha expired
        if (value === null) setExpired({ expired: "true" });
        };

        function bookAppointment(e){
            e.preventDefault();
            sendOTPToUser(userData)
                .then(data => console.log(data));
            console.log(name, mobileNumber, gender, date, time, disabledHours, OTP);
        }
        
        function onPhoneChange(e){
            setMobileNumber(e.target.value);
        }
        function onAgeChange(e){
            setAgeNumber(e.target.value);
        }

        function onNameChange(e){
            setName(e.target.value);
        }
        
        function onTimeChange(timeObj, timeString){
            // setTime(timeString);
            setTime(timeString.substr(0,2));
        }
        
        function onDateChange(dateObj, dateString){
            setDate(dateString);
            getAvailableSlots(userData)
                .then(data => { setDisabledHours(data.bookedSlots) })
        }
    
        function onGenderChange(selectedGender){
            setGender(selectedGender);
        }

        function onOTPChange(e){
            setOTP(e.target.value);
        }

        function showModal(params) {
            setShowModal(true);
        }

        function handleOk(e){
            if(OTP && captchaValue) {
                message.success('Booking done successfully !');
                setShowModal(false);
                setName('');
                setMobileNumber('');
                setAgeNumber('');
                setGender('');
                setDate('');
                setTime('');
                setCurrentStep(0);
            } else {
                message.error('Please enter correct information !');
            }
        };

        function handleCancel(e){
            setShowModal(false);
        };

        function goForward() {
            if( currentStep === 0 && captchaValue && OTP) {
                booNewAppointment(userData)
                    .then(data => {
                        if (data.status === 'OK') {
                            setCurrentStep(currentStep + 1);
                        } else {
                        message.error('Please enter correct OTP!');
                        }

                    });
            } else if(!OTP) {
                message.error('Please enter OTP!');
                
            } else if(!captchaValue) {
                message.error('Please check captcha!');
            }
        }
        function disabledDate(current) {
            console.log(current);
            return current && current < moment;
        }
        function goBackward() {
            setCurrentStep(currentStep - 1);
          }

        function isFormValid() {
            return name && mobileNumber && gender && date && time;
        }
        const datePrefixSelector = getFieldDecorator('prefix', {
            initialValue: '91',
        })(
            <Select style={{ width: 70 }}>
          <Option value="91">+91</Option>
        </Select>,
      );
      
      return (
          <React.Fragment>
          <Row>
              <Col sm={24} md={12}>
            <Form {...formItemLayout} onSubmit={bookAppointment} className="signUpForm">
                <Form.Item validateStatus={usernameError ? 'error' : ''} help={usernameError || ''}>
                    {getFieldDecorator('username', {
                        rules: [{ required: true, message: 'Please input your username!' }],
                    })(
                        <Input
                            placeholder="Enter your full name .."
                            size="large" 
                            className={'inputClass'}
                            onChange={onNameChange}
                            value={name}
                        />,
                    )}
                </Form.Item>
                <Form.Item validateStatus={phoneError ? 'error' : ''} help={phoneError || ''}>
                    {getFieldDecorator('phone', {
                        rules: [{ required: true, message: 'Phone no. should be 10 digit!', min: 10, max: 10 }],
                        })(<Input type="number" size="large" placeholder="Enter phone number" onChange={onPhoneChange} addonBefore={datePrefixSelector} 
                        className={'inputClass'} value={mobileNumber} />)}
                </Form.Item>
                    <Form.Item validateStatus={ageError ? 'error' : ''} help={ageError || ''}>
                        {getFieldDecorator('age', {
                            rules: [{ required: true, message: 'Please Enter age!', max: 2, min: 1 }],
                        })(
                            <Input type="number" className={'widthInputStyle'} size="large" placeholder="Enter age" onChange={onAgeChange} value={age} />
                        )}
                    </Form.Item>
                <Form.Item validateStatus={genderError ? 'error' : ''} help={genderError || ''}>
                    {getFieldDecorator('gender', {
                        rules: [{ required: true, message: 'Please select Gender!' }],
                    })(
                        <Select
                            classNam
                            className={'widthInputStyle'}
                            placeholder="Select gender"
                            onChange={onGenderChange}
                            size="large" 
                            value={gender}
                        >
                            <Option value="m">Male</Option>
                            <Option value="f">Female</Option>
                            <Option value="o">Other</Option>
                        </Select>
                    )}
                </Form.Item>
                <Form.Item validateStatus={dateError ? 'error' : ''} help={dateError || ''}>
                    {getFieldDecorator('date', {
                        rules: [{ required: true, message: 'Please select date!' }],
                    })(
                        <DatePicker
                         onChange={onDateChange}
                        size="large"
                        className={'widthInputStyle'}
                        disabledDate={disabledDate}
                        value={date}
                        // disabledDate={d => !d || d.isBefore(15)}
                        />
                    )}
                </Form.Item>
                <Form.Item validateStatus={timeError ? 'error' : ''} help={timeError || ''}>
                    {getFieldDecorator('time', {
                        rules: [{ required: true, message: 'Please select time!' }],
                    })(
                        <TimePicker onChange={onTimeChange} use12Hours size="large" format={format} disabledHours={() => disabledHours} value={time}
                     />
                    )}
                </Form.Item>

                <Form.Item>
                    <Button onClick={isFormValid() && showModal} type="primary" size="large"  htmlType="submit" disabled={ !isFormValid() || hasErrors(getFieldsError())}>
                        Book Appointment
          </Button>
                </Form.Item>
            </Form>
            </Col>
            </Row>
                <Modal
                    width={700}
                    title="Confirmation"
                    visible={visible}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    >
                    <Steps current={currentStep}>
                        {steps.map(item => (
                            <Step key={item.title} title={item.title} icon={currentStep === 0 && <Icon type="loading" />}/>
                        ))}
                    </Steps>
                        <div className="steps-content">{steps[currentStep].content}</div>
                        <div className="steps-action">
                    {currentStep < steps.length - 1 && (
                        <Button type="primary" onClick={goForward}>
                        {currentStep === 0 ? 'Check OTP' : 'Next' }
                        </Button>
                    )}
                    {currentStep === steps.length - 1 && (
                        <Button type="primary" onClick={() => message.success('Booking done successfully !')}>
                        Done
                        </Button>
                    )}
                    {currentStep > 2 && (
                        <Button style={{ marginLeft: 8 }} onClick={goBackward}>
                        Previous
                        </Button>
                    )}
                    </div>
                    </Modal>
        </React.Fragment>
    )
}

const Home = Form.create({ name: 'user_form' })(WrappedHomeForm);
export default Home;