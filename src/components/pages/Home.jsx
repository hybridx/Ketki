import React, { Component } from 'react';
import { Form, Icon, Input, Button, DatePicker, TimePicker } from 'antd';

const format = 'HH:mm';

function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}

function bookAppointment(e){
    e.preventDefault();
}

function onChange(e){

}
const WrappedHomeForm = ({ form }) => {
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = form;

    // Only show error after a field is touched.
    const usernameError = isFieldTouched('username') && getFieldError('username');
    const dateError = isFieldTouched('date') && getFieldError('date');
    const timeError = isFieldTouched('time') && getFieldError('time');

    function getDisabledHours(){

    } 

    return (
        <div class="container">
            <Form onSubmit={bookAppointment}>
                <Form.Item validateStatus={usernameError ? 'error' : ''} help={usernameError || ''}>
                    {getFieldDecorator('username', {
                        rules: [{ required: true, message: 'Please input your username!' }],
                    })(
                        <Input
                            placeholder="Username"
                        />,
                    )}
                </Form.Item>
                <Form.Item  validateStatus={dateError ? 'error' : ''} help={dateError || ''}>
                    {getFieldDecorator('date', {
                        rules: [{ required: true, message: 'Please select date!' }],
                    })(
                        <DatePicker onChange={onChange} />
                    )}
                </Form.Item>
                <Form.Item  validateStatus={timeError ? 'error' : ''} help={timeError || ''}>
                    {getFieldDecorator('time', {
                        rules: [{ required: true, message: 'Please select time!' }],
                    })(
                        <TimePicker /* disabledHours={()=> getDisabledHours} */ minuteStep={60} format={format} />
                    )}
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" disabled={hasErrors(getFieldsError())}>
                        Book
          </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

const Home = Form.create({ name: 'user_form' })(WrappedHomeForm);
export default Home;