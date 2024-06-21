<?php

namespace App\Services;

use GuzzleHttp\Client;
use GuzzleHttp\Exception\RequestException;
use Illuminate\Support\Facades\Log;

class RecaptchaService
{
    protected $client;
    protected $secretKey;
    protected $verifyPath;

    public function __construct()
    {
        $this->client = new Client([
            'verify' => config('services.guzzle.verify'),
        ]);
        $this->secretKey = env('RECAPTCHA_SECRET_KEY');
        $this->verifyPath = 'https://www.google.com/recaptcha/api/siteverify';
    }

    public function verify($recaptchaResponse, $remoteIp)
    {
        try {
            $response = $this->client->post($this->verifyPath, [
                'form_params' => [
                    'secret' => $this->secretKey,
                    'response' => $recaptchaResponse,
                    'remoteip' => $remoteIp,
                ],
            ]);

            $recaptchaData = json_decode($response->getBody(), true);

            return $recaptchaData['success'];

        } catch (RequestException $e) {
            Log::error('Recaptcha verification failed: ' . $e->getMessage());
            return false;
        }
    }
}
