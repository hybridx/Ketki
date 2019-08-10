<?php

class CronHandler
{
    public $host = 'localhost';
    public $dbname = 'ketkiclinic_ketki';
    public $user = 'ketkiclinic_ketki';
    public $pass = '#cybzilla.com';

    public function getCon()
    {
        try {
            $con = new \PDO("mysql:host=$this->host;dbname=$this->dbname", $this->user, $this->pass);
            $con->setAttribute(\PDO::ATTR_ERRMODE, \PDO::ERRMODE_EXCEPTION);
            return $con;
        } catch (\PDOException $e) {
            echo $e->getMessage();
        }
    }
    
    public function sendSMS($phone, $sentence)
    {
        $url = "http://reseller9.vibgyortel.in/sendsms.jsp?user=mukeshpatel&password=aruhat&mobiles=$phone&sms=$sentence";
        $status = file_get_contents($url);
        return $status;
    }
    
    public function tomorrowsBooking()
    {
        ///usr/local/bin/php -q /home/ketkiclinic/public_html/cron_handler_ketki.php
        //http://reseller9.vibgyortel.in/sendsms.jsp?user=mukeshpatel&password=aruhat&mobiles=9923069194&sms=Here+is+my+first+line%0aHere+is+my+second+line
        try {
            $dbcon = self::getCon();
            $stmt = $dbcon->query(
                "SELECT * FROM booking WHERE booking_date = (DATE_ADD(CURRENT_DATE,INTERVAL 1 DAY))"
                );
            return $stmt->fetchAll(\PDO::FETCH_ASSOC);
        } catch (\Error $e) {
            return $e->getMessage();
        } catch (\Exception $e) {
            return $e->getMessage();
        }
    }
    
    public function buildSentence()
    {
        $results = json_decode(json_encode(self::tomorrowsBooking()));
        // var_dump($results);
        $string = "Here%20are%20tomorrows%20bookings:-%0a";
        foreach ($results as $row) {
          $string .= "Name:%20". str_replace(" ","%20",$row->name) . "%0a";
          $string .= "Age:%20" . (string)$row->age . "%0a";
          $string .= "Gender:%20" . $row->gender . "%0a";
          $string .= "Date:%20" . $row->booking_date . "%0a";
          $string .= "Time:%20" . $row->booking_time . ":00%20" . "%0a";
          $string .= "-------------------------" . "%0a";
        }
        // echo $string;
        return $string;
    }
    
    public function sendTomorrowsBookingDetails($phone)
    {
        $sentence = self::buildSentence();
        return self::sendSMS($phone, $sentence);
    }
}

$sendSMS = new CronHandler();
var_dump($sendSMS->sendTomorrowsBookingDetails("9763192222"));

?>