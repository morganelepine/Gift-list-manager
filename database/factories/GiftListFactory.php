<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Crypt;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\GiftList>
 */
class GiftListFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $user = User::inRandomOrder()->first();
        $isPrivate = fake()->boolean();
        $private_code = $isPrivate ? Crypt::encrypt('_private') : Crypt::encrypt('1234');

        return [
            'user_id' => $user->id,
            'user_name' => $user->name,
            'name' => fake()->randomElement(['Anniversaire', 'Mariage', 'Noël']),
            'private_code' => '1234',
            'isPrivate' => fake()->boolean(),
            'isPrivate' => $isPrivate,
            'private_code' => $private_code,
        ];
    }
}
