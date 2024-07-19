<?php

namespace Tests\Feature\Auth;

use App\Providers\RouteServiceProvider;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Services\RecaptchaService;
use Mockery;

class RegistrationTest extends TestCase
{
    use RefreshDatabase;

    public function test_registration_screen_can_be_rendered(): void
    {
        $response = $this->get('/register');

        $response->assertStatus(200);
    }

    public function test_new_users_can_register(): void
    {
        // Create a mock of RecaptchaService with verify returning true
        $recaptchaMock = Mockery::mock(RecaptchaService::class);
        $recaptchaMock->shouldReceive('verify')->andReturn(true);
        // Replace the RecaptchaService instance with the mock
        $this->app->instance(RecaptchaService::class, $recaptchaMock);

        $response = $this->post('/register', [
            'name' => 'Test User',
            'last_name' => 'Last Name',
            'email' => 'test@example.com',
            'password' => 'Password+1',
            'password_confirmation' => 'Password+1',
            'recaptcha' => 'recaptcha',
        ]);

        $this->assertAuthenticated();
        $response->assertRedirect(RouteServiceProvider::HOME);
    }

    // Clean mocks after testing to avoid interference with other tests
    protected function tearDown(): void
    {
        Mockery::close();
        parent::tearDown();
    }
}
