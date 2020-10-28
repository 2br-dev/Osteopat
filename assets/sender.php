<?
    
    $response = new Response();
    $hasErrors = false;

    $name = check('name');
    $phone = check('phone');
    $comment = check('comment');
    $agreement = check('agreement');

    define('TOKEN', "/");
    define('GATE', 'https://api.telegram.org/bot/'.TOKEN.'/');
    define('CHAT_ID', 152867135);
    

    require_once($_SERVER['DOCUMENT_ROOT'] . '/vendor/autoload.php');


    $bot = new \TelegramBot\Api\Client(TOKEN);
    $comment = !empty($comment) ? "Его комментарий: $comment" : "";
    $message = "$name хочет, чтобы Вы с ним связались по телефону $phone. $comment";


    file_put_contents("message.txt", $message);
    try{
        $bot->sendMessage(CHAT_ID, $message);
    }catch(Exception $ex){
        $response = new Response();
        $response->code = 10;
        $response->message = $ex->getMessage();
        $response->hasErrors = true;
        die(json_encode($response, JSON_UNESCAPED_UNICODE));
    }

    $response = new Response();
    $response->code = 0;
    $response->message = "Спасибо за Ваше обращение! Мы свяжемся с Вами в ближайшее время.";

    echo json_encode($response, JSON_UNESCAPED_UNICODE);

    global $response;
   
    if($response->hasErrors)
        die(json_encode($response, JSON_UNESCAPED_UNICODE));

    
    function check($name){

        global $response, $hasErrors;

        $result = addSlashes(htmlspecialchars($_POST[$name]));
        if(!empty($result)){
            $response->code = 1;
            $response->message = 'Empty field';
            $response->selectors[] = $name;
            $response->hasErrors = true;
        }

        return $result;
    }

    class Response{

        public $code;
        public $message;
        public $selectors;
        public $hasErrors;
        public $details;
    }
?>