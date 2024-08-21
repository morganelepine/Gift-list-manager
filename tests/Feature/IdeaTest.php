<?php

namespace Tests\Feature;

use App\Models\User;
use App\Models\Idea;
use App\Models\GiftList;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class IdeaTest extends TestCase
{
    use RefreshDatabase;

    public function test_idea_can_be_deleted(): void
    {
        $user = User::factory()->create();
        $giftList = GiftList::factory()->create([
            'user_id' => $user->id,
            'user_name' => $user->name,
        ]);
        $idea = Idea::factory()->create([
            'list_id' => $giftList->id,
            'user_id' => $user->id,
            'user_name' => $user->name,
        ]);

        $response = $this
            ->actingAs($user)
            ->delete("/ideas/{$idea->id}");

        $response
            ->assertSessionHasNoErrors()
            ->assertRedirect();

        $this->assertNull($idea->fresh());
    }
}
