import React, {  useState, useEffect } from 'react';
import { Form, Steps, Input, message, Button, DatePicker , TimePicker, Select, Modal, Row, Col, Icon, Carousel } from 'antd';
import { getAvailableSlots, booNewAppointment, sendOTPToUser } from '../api';
import moment from 'moment';

const { confirm } = Modal; 

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
            md: { span: 24 },
        },
    };
    
    const WrappedReusableForm = ({ form }) => {
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
        const [timePickerstate, setTimePickerstate] = useState(false);
        const [ disabledHours, setDisabledHours ] = useState([]);
        const [ isInApiCall, setIsInApiCall ] = useState(false);        
        
        let userData = {
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
        </React.Fragment>
        )

        const doneJsx = (
            <div class="content-box">
            <h2>Hello, </h2>
            <h2> {name}! </h2>
            <br />
            <h2> your appointment is now confirmed.</h2>
            <h3>Date: {date} time: {time}:00 Hrs</h3>
            <br />
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


          useEffect(()=> {
            getAvailableSlots(userData)
            .then(data => { setDisabledHours(data.bookedSlots) })
          }, [date]);

        function handleReset(){
            confirm({
                title: 'Do you Want to reset fields?',
                content: '',
                onOk() {
                    form.resetFields();
                    setShowModal(false);
                    setShowModal(false);
                    setName('');
                    setMobileNumber('');
                    setAgeNumber('');
                    setGender('');
                    setDate('');
                    setTime('');
                    setCurrentStep(0);
                    userData = {};
                },
                onCancel() {
                  
                },
              });
          };

        function bookAppointment(e){
            e.preventDefault();
            if(isFormValid()) {
                setIsInApiCall(true);
                sendOTPToUser(userData)
                .then(data => {
                    setIsInApiCall(false);
                    setShowModal(true);
                    form.resetFields();
                });
            } else {
                message.error('Please fill all the fields');
            }
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
            setTime(timeString.substr(0,2));
            setTimePickerstate(false);
        }
        
        function onDateChange(dateObj, dateString){
            setDate(dateString);
        }
    
        function onGenderChange(selectedGender){
            setGender(selectedGender);
        }

        function onOTPChange(e){
            setOTP(e.target.value);
        }
        // function handleOk(e){
        //     if(OTP) {
        //         message.success('Booking done successfully !');
        //         setShowModal(false);
        //         setName('');
        //         setMobileNumber('');
        //         setAgeNumber('');
        //         setGender('');
        //         setDate('');
        //         setTime('');
        //     } else {
        //         message.error('Please enter correct information !');
        //     }
        // };

        function handleCancel(e){
            setShowModal(false);
            form.resetFields();
            setShowModal(false);
            setName('');
            setMobileNumber('');
            setAgeNumber('');
            setGender('');
            setDate('');
            setTime('');
            userData = {};
            message.error('Booking canceled!');
        };

        function goForward() {
            if( currentStep === 0) {
                setIsInApiCall(true);
                booNewAppointment(userData)
                    .then(data => {
                        if (data.status === 'OK') {
                            setCurrentStep(1);
                            form.resetFields();
                            setIsInApiCall(false);
                        } else if(data.status === 'ERROR') {
                            setIsInApiCall(false);
                        message.error('Invalid OTP, Please try again!');
                        }

                    }); 
            }
        }
        function goBackward() {
            setCurrentStep(currentStep - 1);
          }

        function isFormValid() {
            return (name && mobileNumber && gender && date && time) && !(Object.entries(userData).length === 0 && userData.constructor === Object);
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
            <Form {...formItemLayout} onSubmit={bookAppointment} className="signUpForm">
                <Row>
                    <Col md={24}>
                <Form.Item validateStatus={usernameError ? 'error' : ''} help={usernameError || ''}>
                    {getFieldDecorator('username', {
                        rules: [{ required: true, message: 'Please input your username!' }],
                    })(
                        <Input
                            placeholder="Enter your full name .."
                            size="large" 
                            className={'inputClass'}
                            onChange={onNameChange}
                            setFieldsValue={name}
                        />,
                    )}
                </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                <Col md={12}>
                <Form.Item validateStatus={phoneError ? 'error' : ''} help={phoneError || ''}>
                    {getFieldDecorator('phone', {
                        rules: [{ required: true, message: 'Phone no. should be 10 digit!', min: 10, max: 10 }],
                        })(<Input type="number" size="large" placeholder="Enter phone number" onChange={onPhoneChange} addonBefore={datePrefixSelector} 
                        className={'inputClass'} valsetFieldsValue={mobileNumber} />)}
                </Form.Item>
                </Col>
                <Col md={8} >
                <Form.Item validateStatus={genderError ? 'error' : ''} help={genderError || ''}>
                    {getFieldDecorator('gender', {
                        rules: [{ required: true, message: 'Please select Gender!' }],
                    })(
                        <Select
                            classNam
                            className={'widthInputStyle'}
                            placeholder="Gender"
                            onChange={onGenderChange}
                            size="large" 
                            setFieldsValue={gender}
                            style={{ width: '100%'}}
                        >
                            <Option value="m">Male</Option>
                            <Option value="f">Female</Option>
                            <Option value="o">Other</Option>
                        </Select>
                    )}
                </Form.Item>
                </Col>
                <Col md={4}>
                    <Form.Item validateStatus={ageError ? 'error' : ''} help={ageError || ''}>
                        {getFieldDecorator('age', {
                            rules: [{ required: true, message: 'Please Enter age!', max: 2, min: 1 }],
                        })(
                            <Input type="number" className={'widthInputStyle'} size="large" placeholder="Age" onChange={onAgeChange} setFieldsValue={age} style={{ width: '100%'}}/>
                        )}
                    </Form.Item>
                    </Col>
                    </Row>
                <Row gutter={16}>
                    <Col md={12}>
                <Form.Item validateStatus={dateError ? 'error' : ''} help={dateError || ''}>
                    {getFieldDecorator('date', {
                        rules: [{ required: true, message: 'Please select date!' }],
                    })(
                        <DatePicker
                         onChange={onDateChange}
                        size="large"
                        className={'widthInputStyle'}
                        disabledDate={(current) => (
                            current && current > moment(new Date()).add(15, 'd') || current.valueOf() < moment().subtract(1, 'd')
                          )}
                          setFieldsValue={date}
                        style={{ width: '100%'}}
                        />
                    )}
                </Form.Item>
                    </Col>
                    <Col md={12}>
                <Form.Item validateStatus={timeError ? 'error' : ''} help={timeError || ''}>
                    {getFieldDecorator('time', {
                        rules: [{ required: true, message: 'Please select time!' }],
                    })(
                        <TimePicker open={timePickerstate} 
                        onOpenChange={() => setTimePickerstate(true)}
                        className='timePicker' onChange={onTimeChange} minuteStep={60} size="large" format={format} style={{ width: '100%'}} disabledHours={() => disabledHours} setFieldsValue={time} disabled={!date}
                     />
                    )}
                </Form.Item>
                </Col></Row>
                <Row gutter={16}>
                    <Col md={12} sm={6}>
                    <Form.Item>
                    <Button onClick={handleReset} type="normal" size="large" style={{ width: '100%'}}>
                        RESET
                      </Button>
                        </Form.Item>
            </Col>
            <Col md={12} sm={6}>
                <Form.Item>
                    <Button onClick={
                        isFormValid() && !hasErrors(getFieldsError())
                        }
                    type="primary" size="large"  htmlType="submit" style={{ width: '100%', border: 0, backgroundColor: '#60b718'}} disabled={hasErrors(getFieldsError()) || isInApiCall}>
                    Book Appointment
          </Button>
                </Form.Item>
                </Col>
                </Row>
            </Form>
                <Modal
                    width={700}
                    title="Confirmation"
                    visible={visible}
                    onCancel={handleCancel}
                    maskClosable={false}
                    footer={[
                        <Button key="back" onClick={handleCancel}>
                          Close
                        </Button>,
                      ]}
                    >
                    <Steps current={currentStep}>
                        {steps.map(item => (
                            <Step key={item.title} title={item.title} icon={currentStep === 0 && <Icon type="loading" />}/>
                        ))}
                    </Steps>
                        <div className="steps-content">{steps[currentStep].content}</div>
                        <div className="steps-action">
                    {currentStep < steps.length - 1 && (
                        <Button type="primary" onClick={goForward} disabled={ !OTP || isInApiCall}>
                        {currentStep === 0 ? 'Check OTP' : 'Next' }
                        </Button>
                    )}
                    {currentStep === steps.length - 1 && (
                        <Button style={{ border: 0, backgroundColor: '#60b718'}} type="primary" onClick={() => {
                            message.success('Booking done successfully !');
                            form.resetFields();
                            userData = {};
                            setShowModal(false);
                            }}>
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

const ReusableForm = Form.create({ name: 'user_form' })(WrappedReusableForm);
export default ReusableForm;
