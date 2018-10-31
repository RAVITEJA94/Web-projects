<!—-mine—->
<html>
<head>
<title>MESSAGE BOARD</title>
</head>
<body>
<?php
session_start();
error_reporting(0);
?>
<div>
<form action= "Login.php" method="GET">
<h1>Welcome To Message Board</h1><br/>
<label>Enter Your Username and Password:</label><br/>
<label>Username: </label><input type="text" name="Username"><br/>
<label>Password:</label><input type="password" name="Password"><br/>
<button type="submit" name="login">Login</button>
</form>
</div>
</body>
<!—-PHP code—->
<?php
if(isset($_GET['login'])){
$host="localhost";
$database="board";
$userid="root";
$password="";
$UserId= $_GET['Username'];
$Pwd= $_GET['Password'];
$Passwd=md5($Pwd);
$db = new PDO("mysql:host=$host;dbname=$database",$userid,$password);
$db->setAttribute(PDO::FETCH_ASSOC,PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
$query = 'select * from users WHERE username ="' . $UserId.'"';
$finalquery = $db->prepare($query);
$finalquery->execute();
$result = $finalquery->rowCount();
if($result)
{
echo "result" ;
$finalresult = $finalquery->fetch();
if($finalresult['username'] == $UserId && $finalresult['password'] == $Passwd) {
echo "result" ;
                     $_SESSION['Username'] = $UserId;
                     $_SESSION['fullName'] = $finalresult['fullname'];
		     echo $_SESSION['Username'];
		     echo $_SESSION['fullName'];
			if($_SESSION['Username'] = $UserId)
{
                     echo '<script>window.location="board.php"</script>';
}
                 } else {
                     echo " Please enter the correct username and password " ;
                 }

}
else{
echo " Please enter the correct username and password " ;
}
}
?>

</html>