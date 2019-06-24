# Ketki
Project for ketki clinic

## Replace database username and password with you local username and password
* You can find it in app.py file

## An sql file is also provided for ease of setup
*  Further release will have one click install

```
# Data sample 
data = {}
data["otp"] = 123123
data["name"] = "First Last"
data["age"] = 24
data["phone"] = '9988776655'
data['date'] = '2019-06-24'
data["time"] = 6

# Requests and response on a local machine
-----------------------------------
requests.post('http://localhost:5000/api/availableSlots',json=data).text

response -> '{\n  "bookedSlots": [], \n  "can_book": true\n}\n'

-----------------------------------
requests.post('http://localhost:5000/api/OTP',json=data).text

response -> '1\n'

-----------------------------------
requests.post('http://localhost:5000/api/book',json=data).text

response -> '{\n  "ErrorType": "OTP-MISMATCH", \n  "status": "ERROR"\n}\n'

-----------------------------------
data["otp"] = 996359
requests.post('http://localhost:5000/api/book',json=data).text

response -> '{\n  "status": "BOOKED"\n}\n'
```
