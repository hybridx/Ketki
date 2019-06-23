import pymysql
import math
import random


class Models():
	"""docstring for Models"""
	def __init__(self, host,user,passwd,dbName):
		self.db = pymysql.connect(host,user,passwd,dbName)
		self.cursor = self.db.cursor()

	def checkSlotsForDate(self, date, phone):
		sql = "SELECT booking_time,COUNT(*) FROM booking WHERE booking_date = '{}' GROUP BY booking_time".format(date)
		data = {"bookedSlots":[],"can_book":False}

		data["can_book"] = self.checkUserBooking(phone,date)

		self.cursor.execute(sql)
		slotsData = self.cursor.fetchall()

		for slot in slotsData:
			if slot[1] > 1:
				data["bookedSlots"].append(slot[0])
		
		self.db.commit()

		return data


	def generateOTP(self, phone):
		try:
			OTP = generateRandom()
			sql = "INSERT INTO Contact_OTP (phone, OTP) VALUES('{}', {}) ON DUPLICATE KEY UPDATE OTP = {}".format(phone,int(OTP),int(OTP))
			data = self.cursor.execute(sql)

			self.db.commit()
			return data
		except Exception as e:
			print("Generate OTP -> ", e)
			return False

	def bookAppointment(self, OTP, name, gender, age, phone, date, time):
		try:
			data = {}
			data["status"] = "ERROR"
			if self.checkOTP(OTP, phone):
				if self.insertData(name, gender, age, phone, date, time):
					data["status"] = "BOOKED"
			else:
				data["ErrorType"] = "OTP-MISMATCH"
			return data
		except Exception as e:
			print("Book Appointment ->", e)
			data = {"status": "ERROR", "ErrorType":"Exception"}
			return data

	def checkOTP(self,OTP, phone):
		try:
			status = False
			sql = "SELECT * FROM Contact_OTP WHERE phone='{}' and OTP={}".format(phone, int(OTP))
			self.cursor.execute(sql)
			results = self.cursor.fetchall()
			self.db.commit()
			if results:
				return True
			else:
				return False
		except Exception as e:
			print("Check OTP", e)
			return False

	def checkUserBooking(self, phone, date):
		try:
			data = {}
			sql = "SELECT phone,COUNT(*) FROM booking WHERE booking_date='{}' GROUP BY phone".format(date)

			self.cursor.execute(sql)
			data = dict(self.cursor.fetchall())
			self.db.commit()

			if phone in data:
				if data[phone] > 1:
					return False
			return True
		except Exception as e:
			print("Check User Booking ->", e)
			return False

	def insertData(self, name, gender, age, phone, date, time):
		try:
			sql = "INSERT INTO booking (name, phone, gender, age, booking_date, booking_time) VALUES ('{}', '{}', '{}', '{}', '{}', '{}')".format(name, phone, gender, age, date, time)

			self.cursor.execute(sql)
			self.db.commit()

			return True
		except Exception as e:
			print("Insert Data", e)
			return False

def generateRandom():
	digits = "0123456789"
	OTP = ""
	for i in range(6): 
		OTP += digits[math.floor(random.random() * 10)]
	return OTP