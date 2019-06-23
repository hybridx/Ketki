# Ketki
Project for ketki clinic


```
>>> requests.post('http://localhost:5000/api/availableSlots',json=data).text
'{\n  "bookedSlots": [], \n  "can_book": true\n}\n'
>>> requests.post('http://localhost:5000/api/OTP',json=data).text
'1\n'
>>> requests.post('http://localhost:5000/api/book',json=data).text
'{\n  "ErrorType": "OTP-MISMATCH", \n  "status": "ERROR"\n}\n'
>>> data["otp"] = 996359
>>> requests.post('http://localhost:5000/api/book',json=data).text
'{\n  "status": "BOOKED"\n}\n'
>>> 
```