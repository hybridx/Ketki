import { API_URL } from './constants';

export const getAvailableSlots = (date, phone) => {
    let data = new FormData();
    
    data.append('date', date);
    data.append('phone', phone);

    return fetch(`${API_URL}availableSlots`, {
        method: 'POST',
        body: data,
    })
    .then(response => response.json())
    .then(data => data)
    .catch(err => err)
}

export const sendOTPToUser = ({name, date, age, phone, time, gender}) => {
    let data = new FormData();
    
    data.append('name', name);
    data.append('date', date);
    data.append('age', parseInt(age));
    data.append('phone', phone);
    data.append('time', time);
    data.append('gender', gender);

    return fetch(`${API_URL}OTP`, {
        method: 'POST',
        body: data,
    })
    .then(response => response.json())
    .then(data => data)
    .catch(err => err)
}

export const booNewAppointment = ({name, age, date, phone, time, gender, otp}) => {
    let data = new FormData();
    
    data.append('name', name);
    data.append('date', date);
    data.append('phone', phone);
    data.append('age', parseInt(age));
    data.append('time', time);
    data.append('gender', gender);
    data.append('otp', parseInt(otp));

    return fetch(`${API_URL}book`, {
        method: 'POST',
        body: data,
    })
    .then(response => response.json())
    .then(data => data)
    .catch(err => err)
}