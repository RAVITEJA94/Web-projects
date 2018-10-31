<html>
<head><title>Message Board</title></head>
<body onload="board.php">
<?php 
session_start(); 
error_reporting(0);
if($_SESSION['Username'] == null)
{
header("refresh:0; url=Login.php" );
}

$host="localhost";
$database="board";
$userid="root";
$password="";
$db1= new PDO("mysql:host=$host;dbname=$database",$userid,$password);
$db1->setAttribute(PDO::FETCH_ASSOC,PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
?>

<div align="left">
<h1> <?=$_SESSION['Username'] ?></h1> 
</div>

<form action="board.php" method="GET">
<div align="right">
<button type="submit" value="submitted" name= "Logout"> Logout</button>
</div>
</form>
<?php
if($_GET['Logout']){
session_unset($_SESSION);
session_destroy();
header("refresh:0; url=Login.php" );
}
?>

<form action="board.php" method="GET">
<div>
<table border:0px>
<tr>
<td>
<textarea rows="10" cols="100" name="message" id="mssgId" placeholder=" Enter the message " ></textarea>
</td>
<td><input type="submit" value= " New Post"></td>
</tr></table>
</div>
</form>

<?php
if(isset($_GET['message'])){
if($_GET['message'] != null){

$messageId = uniqid();
$SenderId = $_SESSION['Username'];
$receiverId= null;
$description = $_GET['message'];
$query = " insert into posts values(:messageId,:receiverId,:SenderId,NOW(),:description)";
$finalquery=$db1->prepare($query);
$finalquery->bindParam(':messageId', $messageId);
$finalquery->bindParam(':receiverId', $receiverId);
$finalquery->bindParam(':SenderId', $SenderId );
$finalquery->bindParam(':description', $description );
$finalquery->execute();
}
}
?>

<?php
if($_GET['reply']){
$messageId = uniqid();
$SenderId = $_SESSION['Username'];
$receiverId= $_GET['postId'];
$description = $_GET['replymessage'];
$query = " insert into posts values(:messageId,:receiverId,:SenderId,NOW(),:description)";
$finalquery=$db1->prepare($query);
$finalquery->bindParam(':messageId', $messageId);
$finalquery->bindParam(':receiverId', $receiverId);
$finalquery->bindParam(':SenderId', $SenderId );
$finalquery->bindParam(':description', $description );
$finalquery->execute();
}
?>

<!—- displaying the messages—->
<?php
$query = 'SELECT id, username, fullname, datetime, replyto, message FROM POSTS, USERS WHERE postedby = username order by datetime desc';
$finalquery=$db1->prepare($query);
$finalquery->execute();
$re= $finalquery->fetch();
if($re)
{
echo '<div>';
echo '<legend>MESSAGES</legend>';
echo ' <br/>';
echo ' <br/>';
while($re)
{
echo ' <form  action = "board.php" method= "GET">';
echo ' <label> Message ID: '.$re['id'].' </label><br/>' ;
echo ' <label> Username: '.$re['username'].' </label><br/>' ;
echo ' <label> Fullname: '.$re['fullname'].' </label><br/>' ;
echo ' <label> Reply To: '.$re['replyto'].' </label><br/>' ;
echo ' <label> Date: '.$re['datetime'].' </label><br/>' ;
echo ' <label> Message : '.$re['message'].' </label><br/>' ;
echo ' <input type = "hidden" name = "postId" value = "'.$re['id'].'"> ';
echo ' <input type = "hidden" id = "latest'.$re['id'].'" name= "replymessage"> ';
?>
<div align="right">
<button type = "submit" name="reply" value = "submitted" onclick = "getDetails('<?php echo $re['id'] ?>')">reply</button>
</div>
<?php

echo '</form>';
$re = $finalquery->fetch();
}
}
?>
<script type= "text/javascript">
function getDetails(postId){
var mssg = document.getElementById("mssgId").value; 
document.getElementById("latest"+postId).value = mssg;
}
</script>
 
</body>
</html>