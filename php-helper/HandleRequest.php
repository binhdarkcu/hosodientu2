<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

class HandleRequest
{
    const SERVER_API_USER = 'https://115.79.197.84:446';
    const SERVER_API_REPORT = 'https://115.79.197.84:444';
    private $method = "";
    private $contentType = "";
    private $authToken = "";
    private $requestUri = "";

    function __construct($request, $server)
    {
        echo '<pre>';
        var_dump($request);
        echo '</pre>';
        echo '<pre>';
        var_dump($server);
        $this->method = $server['REQUEST_METHOD'] || "GET";
        $this->contentType = $server['CONTENT_TYPE'] || "application/x-www-form-urlencoded";
        $this->requestUri = $server['REQUEST_URI'];
        $this->params = $request;
        echo '</pre>';
    }

    private function getParams(){
      return '';//!!$this->params ? '?' . http_build_query($this->params) : '';
    }

    private function getHeaders(){
      return $this->contentType;
    }

    private function getUrl(){
      return self::SERVER_API_USER . $this->requestUri;
    }

    private function getMethod(){
      return $this->method;
    }

    private function getContentType(){
      return $this->contentType;
    }

    private function getAuthToken(){
      return $this->authToken;
    }

    // Send GET request
    private function sendGETRequest($url, $params){
        try {
            $ch = curl_init();

            // Check if initialization had gone wrong*
            if ($ch === false) {
                throw new Exception('failed to initialize');
            }

            curl_setopt($ch, CURLOPT_URL, 'https://https://115.79.197.84:446/api/Users');
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
            curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);

            $content = curl_exec($ch);
            var_dump($content);
            // Check the return value of curl_exec(), too
            if ($content === false) {
                throw new Exception(curl_error($ch), curl_errno($ch));
            }

            /* Process $content here */

            // Close curl handle
            curl_close($ch);
        } catch(Exception $e) {
            var_dump($e->getMessage());

        }
    }

    // Send POST request
    private function sendPOSTRequest($url, $headers, $body){

    }

    // Send PUT request
    private function sendPUTRequest($url, $headers, $body){

    }

    // Send DELETE request
    private function sendDELETERequest($url, $headers){

    }

    // Forward request and wait for response
    function forward()
    {
      $method = $this->getMethod();
      switch ($method) {
        case 'GET':
          return $this->sendGETRequest($this->getUrl(), $this->getParams());
          break;

        default:
          return json_endcode(array('error' => 'NOT FOUND'));
          break;
      }
    }

    public function getResponse ($url, $headers, $body)
    {
       $params = '?' . http_build_query($headers);

       $redirect_url = $url . $params;

       $ch = curl_init($redirect_url);

       curl_setopt($ch, CURLOPT_POST, 1);
       curl_setopt($ch, CURLOPT_POSTFIELDS, $body);
       curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
       curl_setopt($ch, CURLOPT_HEADER, 0);
       curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
       $response = curl_exec($ch);

       if (!isset($response))
           return null;
       return $response;
     }
}
