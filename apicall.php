<?php    
$apimethod=$_GET['apimethod'];
//echo $apimethod;
$apiurl=str_replace("***","&",$_GET['apiurl']);//workaround per passare & come stringa e non come ulteriore variabile
//echo $apiurl;
callAPI($apimethod,$apiurl,false);

    function callAPI($method, $url, $data){
       $curl = curl_init();
       switch ($method){
          case "POST":
             curl_setopt($curl, CURLOPT_POST, 1);
             if ($data)
                curl_setopt($curl, CURLOPT_POSTFIELDS, $data);
             break;
          case "PUT":
             curl_setopt($curl, CURLOPT_CUSTOMREQUEST, "PUT");
             if ($data)
                curl_setopt($curl, CURLOPT_POSTFIELDS, $data);                         
             break;
          default:
             if ($data)
                $url = sprintf("%s?%s", $url, http_build_query($data));
       }
       // OPTIONS:
       curl_setopt($curl, CURLOPT_URL, $url);
       curl_setopt($curl, CURLOPT_HTTPHEADER, array(
          'APIKEY: 111111111111111111111',
          'Content-Type: application/json',
       ));
       curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
       curl_setopt($curl, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
                //additional options
        curl_setopt($curl, CURLOPT_CONNECTTIMEOUT, 20);
        curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
       // EXECUTE:
       $result = curl_exec($curl);
       if(!$result){die("Connection Failure");}
       curl_close($curl);
               echo $result;
       return $result;

    }
?>