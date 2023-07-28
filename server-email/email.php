<?php
require_once('cors.php');
require 'vendor/autoload.php';

$methodHTTP = $_SERVER['REQUEST_METHOD'];


switch ($methodHTTP) {
    case 'POST':
        $data = json_decode(file_get_contents('php://input'), true);
        if ($data['key'] == 'UbKGYtzvENFAvFEwFmJbPNqSAUBphB') {

            $email = new \SendGrid\Mail\Mail();
            $email->setFrom("jmperezy@ufpso.edu.co", "Usuario");
            $email->setSubject("Sending with SendGrid is Fun");
            $email->addTo($data['email'], "");
            $email->addContent("text/plain", "and easy to do anywhere, even with PHP");
            $email->addContent(
                "text/html",
                "<strong>and easy to do anywhere, even with PHP</strong>"
            );
            $sendgrid = new \SendGrid('SSG.GNS265Z5QY602inhaYFm7g.Dwzy-2hlL-RzGpBRzEX5bH3MGUgkz61DpKgqmmwSYdw');
            try {
                $response = $sendgrid->send($email);
                $responseData = array(
                    'status' => 'success',
                    'message' => 'Correo enviado. Código de respuesta: ' . $response->statusCode()
                );
                echo json_encode($responseData);
            } catch (Exception $e) {
                $errorData = array(
                    'status' => 'error',
                    'message' => 'Error al enviar el correo: ' . $e->getMessage()
                );
                echo json_encode($errorData);
            }
        } else {
            echo 'Acceso no autorizado.';
        }
        break;

    default:
        exit;
        break;
}
