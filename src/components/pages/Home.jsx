import React, { Component } from 'react';
import { Form, Icon, Input, Button, DatePicker, TimePicker, Select } from 'antd';
const { Option } = Select;

const format = 'HH:mm';


function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}

    function bookAppointment(e){
        e.preventDefault();
    }

    function onTimeChange(time, timeString){
        console.log(time, timeString);
    }
    function onDateChange(date, dateString){
        console.log(date, dateString);
    }

    function onGenderChange(gender){
        console.log(gender);
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

    // Only show error after a field is touched.
    const usernameError = isFieldTouched('username') && getFieldError('username');
    const dateError = isFieldTouched('date') && getFieldError('date');
    const timeError = isFieldTouched('time') && getFieldError('time');
    const phoneError = isFieldTouched('phone') && getFieldError('phone');
    const genderError = isFieldTouched('gender') && getFieldError('gender');


    function getDisabledHours(){

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
                        />,
                    )}
                </Form.Item>
                <Form.Item validateStatus={phoneError ? 'error' : ''} help={phoneError || ''}>
                    {getFieldDecorator('phone', {
                        rules: [{ required: true, message: 'Please input your phone number!' }],
                        })(<Input size="large" placeholder="Enter phone number" addonBefore={datePrefixSelector} style={{ width: '50%' }} />)}
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
                    <Button type="primary" size="large"  htmlType="submit" disabled={hasErrors(getFieldsError())}>
                        Book Appointment
          </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

const Home = Form.create({ name: 'user_form' })(WrappedHomeForm);
export default Home;