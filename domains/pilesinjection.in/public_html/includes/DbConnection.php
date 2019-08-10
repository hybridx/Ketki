<?php

namespace App\includes;

class DbConnection
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
}
