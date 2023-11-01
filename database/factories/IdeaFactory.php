<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
// use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Idea>
 */
class IdeaFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => fake()->numberBetween(1, 3),
            'user_name' => fake()->firstName(),
            'idea' => fake()->words(3, true),
            'brand' => fake()->word(),
            'link' => fake()->url(),
            'details' => fake()->sentence(5),
            'promo' => fake()->boolean(),
            'promo_details' => fake()->sentence(5),
        ];
    }
}
