<?php
session_start();

// Reset chat
if (isset($_GET['reset'])) {
    unset($_SESSION['chats']);
    exit;
}

// Initialize chat session if not exists
if (!isset($_SESSION['chats'])) {
    $_SESSION['chats'] = [];
}

// Add message to chat session
if (isset($_POST['message']) && isset($_POST['username'])) {
    $message = $_POST['message'];
    $username = $_POST['username'];
    $date = date("Y-m-d H:i:s");
    $_SESSION['chats'][] = array("username" => $username, "message" => $message, "date" => $date);
}

// Return chats as JSON
header('Content-Type: application/json');
echo json_encode($_SESSION['chats']);
