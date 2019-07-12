<?php
/**
 * PHP version 7.2
 *
 * @category Header
 * @package  App
 * @author   hybridX <hybridx18@gmail.com>
 * @license  https://hybridX.cybzilla.com hybridx
 * @link     http://php.dv
 */
namespace App\models;

use App\includes\DbConnection;
/**
 * PHP version 7.2
 *
 * @category Header
 * @package  App
 * @author   hybridX <hybridx18@gmail.com>
 * @license  https://hybridX.cybzilla.com hybridx
 * @link     http://php.dv
 */

class UserModel
{
    /**
     * Constructor with connection object initalized
     */
    public function __construct()
    {
        try {
            $this->dbcon = new DbConnection;
            $this->dbcon = $this->dbcon->getCon();
            #$this->validator = new Validator;
            #$this->mailer = new PHPMailer(true);
        } catch (\Error $error) {
            echo $error->getMessage();
        }
    }

    // Ketki Files -------------------------------------------

    public function checkSlotsForDate($date)
    {
        try {
            $stmt = $this->dbcon->prepare(
                "SELECT booking_time,COUNT(*) as COUNT FROM booking WHERE booking_date = '$date' GROUP BY booking_time"
            );
            $stmt->execute();
            $stmt = $stmt->fetchAll(\PDO::FETCH_ASSOC);
            return $stmt;
        } catch (\Error $e) {
            return $e->getMessage();
        } catch (\Exception $e) {
            return $e->getMessage();
        }

    }


    public function generateOTP($phone)
    {

        try {
            $otp = generateRandom(6);
            $stmt = $this->dbcon->prepare(
                "INSERT INTO Contact_OTP (phone, OTP) VALUES('$phone', $otp) ON DUPLICATE KEY UPDATE OTP = $otp"
            );
            $sentence = 'Your%20verification%20code%20for%20Ketki%20Clinic%20appointment%20booking%20is%20:%20' . "$otp";
            $data = self::sendSMS($phone, $sentence);
            return $stmt->execute();
        } catch (\Error $e) {
            return $e->getMessage();
        } catch (\Exception $e) {
            return $e->getMessage();
        }


    }


    public function bookAppointment($name, $gender, $age, $phone, $date, $time)
    {

        try {
            $stmt = $this->dbcon->prepare(
                "INSERT INTO booking (name, phone, gender, age, booking_date, booking_time) VALUES ('$name', '$phone', '$gender', $age, '$date', $time)"
            );
            $result = $stmt->execute();
            if ($result) {
                $sentence = 'Your%20appointment%20has%20been%20scheduled%20for%20'. $date . '%20@time:%20' . $time . ':00%20.Thank-you%20-Ketki%20Clinic';
                $data = self::sendSMS($phone, $sentence);
            }
            return $result;
        } catch (\Error $e) {
            return $e->getMessage();
        } catch (\Exception $e) {
            return $e->getMessage();
        }
        
    }
    
    public function sendSMS($phone, $sentence)
    {
        $url = "http://reseller9.vibgyortel.in/sendsms.jsp?user=mukeshpatel&password=aruhat&mobiles=$phone&sms=$sentence";
        $status = file_get_contents($url);
        return $status;
    }

    public function checkOTP($phone, $otp)
    {

        try {
            $stmt = $this->dbcon->prepare(
                "SELECT * FROM Contact_OTP WHERE phone='$phone' and OTP=$otp"
            );
            $stmt->execute();
            $stmt = $stmt->fetchAll(\PDO::FETCH_ASSOC);
            return $stmt;
        } catch (\Error $e) {
            return $e->getMessage();
        } catch (\Exception $e) {
            return $e->getMessage();
        }
    }

    public function checkUserBooking($date)
    {

        try {
            $stmt = $this->dbcon->prepare(
                "SELECT phone,COUNT(*) as COUNT FROM booking WHERE booking_date='$date' GROUP BY phone"
            );
            $stmt->execute();
            $stmt = $stmt->fetchAll(\PDO::FETCH_ASSOC);
            return $stmt;
        } catch (\Error $e) {
            return $e->getMessage();
        } catch (\Exception $e) {
            return $e->getMessage();
        }
    }

    public function insertData($value='')
    {
        # code...
    }
}


function generateRandom($n = 6) 
{ 
    $generator = "1357902468";     
    $result = ""; 
  
    for ($i = 1; $i <= $n; $i++) { 
        $result .= substr($generator, (rand()%(strlen($generator))), 1); 
    }
    return $result; 
} 
