import pymysql
import math
import random


class Models():
	"""docstring for Models"""
	def __init__(self, host,user,passwd,dbName):
		self.db = pymysql.connect(host,user,passwd,dbName)
		self.cursor = self.db.cursor()

	def checkSlotsForDate(self, date):
		sql = "SELECT booking_time,COUNT(*) FROM booking WHERE booking_date = '{}' GROUP BY booking_time".format(date)
		bookedSlots = []
		self.cursor.execute(sql)
		slotsData = self.cursor.fetchall()
		for slot in slotsData:
			if slot[1] > 1:
				bookedSlots.append(slot[0])
		self.db.commit()
		if len(bookedSlots) > 0 : return bookedSlots
		else : return None


	def generateOTP(self, phone):
		try:
			sql = "INSERT INTO Contact_OTP (phone, OTP) VALUES('{}', {}) ON DUPLICATE KEY UPDATE OTP = {}".format(phone,int(generateRandom()),int(generateRandom()))
			data = self.cursor.execute(sql)
			print(phone,generateRandom(),sql,data)
			self.db.commit()
			return data
		except Exception as e:
			print(e)





def generateRandom():
	digits = "0123456789"
	OTP = ""
	for i in range(6): 
		OTP += digits[math.floor(random.random() * 10)]
	return OTP