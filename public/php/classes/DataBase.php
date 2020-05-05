<?php
class DataBase
{
    public $connection = null;

    private $host = "localhost";
    private $port = 3306;
    private $user = "root";
    private $pass = "root";
    private $name = "immersion";

    function __construct()
    {
        try{
            $this->connection = new PDO("mysql:host=".$this->host.";dbname=".$this->name,
                                        $this->user,
                                        $this->pass,
                                        array(PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8'));
        }catch (Exception $e){
            die("Connection to database cannot be etablished, error : ". $e->getMessage());
        }
    }
}



