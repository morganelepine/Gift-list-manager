<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Validation\Rules\Password;

class PasswordRuleServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Password::defaults(function () {
            $rule = Password::min(8)
                            ->letters()
                            ->numbers()
                            ->symbols();

            return $this->app->isProduction()
                        ? $rule->mixedCase() // the password requires at least one uppercase and one lowercase letter
                               ->uncompromised() // the password should has not been compromised in data leaks
                        : $rule;
        });
    }
}
