<?php
    $servername = "localhost";
    $username = "root";
    $password = ""; 
    $databasename = "Bilkuei";
    $port = "3306"; 

    $conn = new mysqli($servername, $username, $password, $databasename , $port);

    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    if(isset($_POST["save"])){
        $name = $_POST['name'];
        $email = $_POST['email'];
        $subject = $_POST['subject'];
        $message = $_POST['message'];
    
    $sql = "INSERT INTO my_visitors (name, email, subject, message) VALUES ('$name', '$email', '$subject', '$message')";

    if (mysqli_query($conn, $sql)) {
        echo "New record created successfully";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }

    $conn->close();

    // Redirect back to the portfolio page with a status message
    header("Location: portfolio.html?status=success#contact");
    exit();
}
?>