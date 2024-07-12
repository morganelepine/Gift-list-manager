<?php

namespace Database\Factories;

use App\Models\User;
use App\Models\GiftList;
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
        $user = User::inRandomOrder()->first();
        $giftList = GiftList::where('user_id', $user->id)->inRandomOrder()->first();
        $statusUser = User::where('id', '!=', $user->id)->inRandomOrder()->first();
        $status = fake()->randomElement(['available', 'reserved', 'purchased']);
        $statusUserName = $status === 'available' ? '' : $statusUser->user_name;

        return [
            'list_id' => $giftList->id,
            'user_id' => $user->id,
            'user_name' => $user->name,
            'idea' => fake()->words(3, true),
            'brand' => fake()->word(),
            'link' => fake()->url(),
            'details' => fake()->word(),
            'price' => fake()->randomNumber(3),
            'favorite' => fake()->boolean(),
            'promo' => fake()->boolean(),
            'promo_details' => fake()->randomElement(['', 'Actuellement à 6,50€ (soldes)']),
            'membership' => fake()->url(),
            'membership_reduction' => fake()->randomElement(['réduction de 15%', 'un acheté, un offert']),
            'status' => $status,
            'status_user' => $statusUserName,
        ];
    }
}
