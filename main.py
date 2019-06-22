from flask import Flask,request,render_template,jsonify
from flask_restful import Resource,Api

import json

from models import Models

models = Models("localhost","admin","root","ketki")

checkSlotsForDate = models.checkSlotsForDate
generateOTP = models.generateOTP


app = Flask(__name__)
api = Api(app)


@app.route('/')
def index():
	return 'models.HelloWorld()'

class CheckSlots(Resource):
	"""returns None if all slots are available else returns booked slots"""
	def post(self):
		data = json.loads(str(request.get_data(), "utf-8"))
		data = checkSlotsForDate(data["date"])
		return jsonify(data)

	def get(self):
		return jsonify("{status: ok}")

class UserOTP(Resource):
	"""Check if contact is already available in the table and update or add
	   OTP accordingly to the contact_otp table"""
	def post(self):
		# data = {"status":"ok","OTP":34589}
		data = json.loads(str(request.get_data(), "utf-8"))
		data = generateOTP(data["phone"])
		return jsonify(data)

class Book(Resource):
	"""Match OTP -> check if user already has booked for the same day : update
	   if already booked else insert data -> return status"""
	def get(self):
		data = None
		return jsonify(data)
		


api.add_resource(CheckSlots,'/api/availableSlots')		
api.add_resource(UserOTP,'/api/OTP')
api.add_resource(Book,'/api/book')



if __name__ == '__main__':
	app.run(host='0.0.0.0', debug=True)

