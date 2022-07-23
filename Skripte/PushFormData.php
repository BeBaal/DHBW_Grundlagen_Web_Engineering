<?php

//Block 1
$user = "user"; //Enter the user name
$password = "password"; //Enter the password
$host = "host"; //Enter the host
$dbase = "database"; //Enter the database
$table = "table"; //Enter the table name

//Block 2
$firstname= $_POST['firstname_entered'];
$lastname= $_POST['lastname_entered'];
$mail= $_POST['email_entered'];
$tel= $_POST['tel_entered'];
$b_date= $_POST['b_date_entered'];
$message= $_POST['message_entered'];
$confirmation= $_POST['confirmation_entered'];

//Block 3
$connection= mysql_connect ($host, $user, $password);
if (!$connection)
{
die ('Could not connect:' . mysql_error());
}
mysql_select_db($database, $connection);


//Block 4
$username_table= mysql_query( "SELECT username FROM $table WHERE username= '$username'" ) 
or die("SELECT Error: ".mysql_error()); 


//Block 5
mysql_query("INSERT INTO $table (column1, column2, column3)
VALUES (value1, value2, value 3)");

//Block 6
echo 'You have been added.';

//Block 7
mysql_close($connection);

?>
