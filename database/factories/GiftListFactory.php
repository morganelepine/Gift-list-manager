<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

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

        return [
            'user_id' => $user->id,
            'user_name' => $user->name,
            'name' => fake()->randomElement(['Anniversaire', 'Mariage', 'Noël']),
            'private_code' => '1234',
            'isPrivate' => fake()->boolean(),
        ];
    }
}
