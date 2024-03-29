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
namespace App\controllers;


use App\models\UserModel;
use PHPMailer\PHPMailer\PHPMailer;

/**
 * PHP version 7.2
 *
 * @category Header
 * @package  App
 * @author   hybridX <hybridx18@gmail.com>
 * @license  https://hybridX.cybzilla.com hybridx
 * @link     http://php.dv
 */
class UserController
{
    public $redirectUri;
    public $user;

    /**
     * PHP version 7.2
     *
     * @param string $redirectUri This is the Server redirect string
     */
    public function __construct($redirectUri)
    {
        $this->user = new UserModel;
        $this->redirectUri = $redirectUri;
        $this->mailer = new PHPMailer(true);
        
        session_start();
        if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Methods: POST, GET, DELETE, PUT, PATCH, OPTIONS');
        header('Access-Control-Allow-Headers: token, Content-Type');
        header('Access-Control-Max-Age: 1728000');
        header('Content-Length: 0');
        die();
    }
    
    header('Access-Control-Allow-Origin: *');
    header("Content-Type: text/html");
    }

    /**
     * Router function
     *
     * @param string $redirectUri redirect string
     *
     * @return void
     */
    public function route($redirectUri)
    {
        $arr = explode('/', $redirectUri);

        if (count($arr) >= 2 && $arr[1] != '') {
            try {
                self::{$arr[1]}();
            } catch (\Error $e) {
                // include_once "views/404.php";
                include_once "views/index.html";
                $status = array('status' => 404);
                echo json_encode($status);
            }
        } else {
            include_once "views/index.html";
        }
    }
    
    public function availableSlots()
    {
        $data = $_POST;
        // var_dump($data);
        $response  = array('bookedSlots' => array(20,21,22,23,1,2,3,4,5,6,7,8,9,0,10), 'can_book' => True );
        $result = $this->user->checkSlotsForDate($data["date"]);
        foreach ($result as $row) {
            if ($row['COUNT'] > 1) {
                array_push($response['bookedSlots'], (int)$row['booking_time']);
            }
        }

        $result = $this->user->checkUserBooking($data["date"]);
        foreach ($result as $row) {
            if (($row['COUNT'] > 1)  && ($row['phone'] === $data["phone"])){
                $response['can_book'] = False;
                $response['bookedSlots'] = array(1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,0);
            }
        }

        echo json_encode($response);
    }

    public function OTP()
    {
        $data = $_POST;
        $result = $this->user->generateOTP($data["phone"]);
        $response = array('status' => 'ERROR');
        if ($result > 0) {
            $response['status'] = 'OK';
        }
        echo json_encode($response);

    }


    public function book()
    {
        $data = $_POST;
        // if (true) {
        $checkOtpStatus = 0;
        $response = array('status' => 'ERROR', 'errorType' => 'ERR_500');
        $checkOtpStaus = $this->user->checkOTP($data["phone"], $data["otp"]);
        if (count($checkOtpStaus) > 0) {
            $result = $this->user->bookAppointment(
                                        $data["name"],
                                        $data["gender"],
                                        $data["age"],
                                        $data["phone"],
                                        $data["date"],
                                        $data["time"]
                                    );
            $response['extra'] = self::sendEmail($data["name"], $data["date"], $data["time"]);
            if ($result === True) {
                $response['status'] = 'OK';
                $response['errorType'] = '';
            }
        }
        echo json_encode($response);
    }
    
    
    public function contactUs()
    {
        $data = $_POST;
        // var_dump($data);
        $response["status"] = 'ERROR';
        $status = $this->user->insertData(
                                            $data["name"],
                                            $data["email"],
                                            $data["message"]
                                        );
        if ($status) {
            $response["status"] = "OK";
        }
        echo json_encode($response);
    }
    
    public function getTomorrowsBooking()
    {
        $data = $this->user->tomorrowsBooking();
        echo json_encode($data);
    }
    
    public function sendEmail($name, $date, $time)
    {
        try {
        if (true) {
                    $this->mailer->IsSMTP();
                    $this->mailer->SMTPDebug = 0;
                    $this->mailer->SMTPAuth = true;
                    $this->mailer->SMTPSecure = 'ssl';
                    $this->mailer->Host = "mail.pilesinjection.in";
                    $this->mailer->Port = 465;
                    $this->mailer->IsHTML(true);
                    $this->mailer->Username = "admin@pilesinjection.in";
                    $this->mailer->Password = "CS#20192019";
                    $this->mailer->SetFrom("admin@pilesinjection.in");
                    $this->mailer->Subject = "Booking - $name - $date - $time";
                    $this->mailer->Body = "Hi,<br> <br> Here are the booking details. <br> Name - $name <br> Date - $date <br> Time - $time. <br> <br>Regards,<br>Ketki Admin (Cybzilla)";
                    #$this->mailer->AddAddress("shivbabiradar@gmail.com");
                    $this->mailer->AddAddress("admin@pilesinjection.in");
                    #$this->mailer->AddAddress("hybridx18@gmail.com");

                    if ($this->mailer->Send()) {
                        return true;
                    } else {
                        echo "Mailer Error: " . $this->mailer->ErrorInfo;
                        return false;
                    }
                }
            
           return false; 
        } catch (\Error $e) {
            return "THIS ERROR " . $e->getMessage();
        } catch (\Exception $e) {
            return "THIS EXCEPTION" . $e->getMessage();
        }
    }
}