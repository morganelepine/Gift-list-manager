<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class RecaptchaService
{
    protected $secretKey;
    protected $verifyPath;
    protected $cacertPath;

    public function __construct()
    {
        $this->secretKey = env('RECAPTCHA_SECRET_KEY');
        $this->verifyPath = 'https://www.google.com/recaptcha/api/siteverify';
        $this->cacertPath = env('CURL_CA_BUNDLE');
    }

    public function verify($recaptchaResponse)
    {
        try {
            $response = Http::withOptions([
                'verify' => $this->cacertPath,
            ])->asForm()->post($this->verifyPath, [
                'secret' => $this->secretKey,
                'response' => $recaptchaResponse,
            ]);

            $recaptchaData = $response->json();

            return $recaptchaData['success'];

        } catch (Exception $e) {
            Log::error('Recaptcha verification failed: ' . $e->getMessage());
            return false;
        }
    }
}
