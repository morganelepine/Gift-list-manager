<?php

namespace Tests\Feature;

// use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ExampleTest extends TestCase
{
    /**
     * A basic test example.
     */
    public function test_the_application_returns_a_successful_response(): void
    {
        $response = $this->get('/');

        $response->assertStatus(200);
    }

    public function test_encryption_key_is_set_correctly(): void
    {
        $expectedKey = env('APP_KEY');
        $this->assertNotEmpty($expectedKey, 'APP_KEY is not set in the environment');
    }
}
