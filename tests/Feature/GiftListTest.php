<?php

namespace Tests\Feature;

use App\Models\User;
use App\Models\GiftList;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;

class GiftListTest extends TestCase
{
    use RefreshDatabase;

    public function test_giftlist_creation_page_is_displayed(): void
    {
        $user = User::factory()->create();

        $response = $this
            ->actingAs($user)
            ->get('/lists/create');

        $response->assertOk();
    }

    public function test_private_giftlist_can_be_created(): void
    {
        $user = User::factory()->create();

        $listData = [
            'user_name' => $user->name,
            'name' => 'Anniversaire',
            'private_code' => '_private',
            'isPrivate' => true,
        ];

        $this->actingAs($user);

        $response = $this->post('/lists', $listData);
        $response->assertStatus(302);

        $this->assertDatabaseHas('gift_lists', [
            'user_id' => $user->id,
            'user_name' => $user->name,
            'name' => 'Anniversaire',
            'private_code' => '_private',
            'isPrivate' => true,
        ]);
    }


    public function test_public_giftlist_can_be_created(): void
    {
        $user = User::factory()->create();

        $listData = [
            'user_name' => $user->name,
            'name' => 'Anniversaire',
            'private_code' => '1234',
            'isPrivate' => false,
        ];

        $this->actingAs($user);

        $response = $this->post('/lists', $listData);
        $response->assertStatus(302);

        $this->assertDatabaseHas('gift_lists', [
            'user_id' => $user->id,
            'user_name' => $user->name,
            'name' => 'Anniversaire',
            'private_code' => '1234',
            'isPrivate' => false,
        ]);
    }

    public function test_giftlist_name_can_be_updated(): void
    {
        $user = User::factory()->create();
        $giftList = GiftList::factory()->create([
            'user_id' => $user->id,
            'user_name' => $user->name,
            'name' => 'Mariage',
            'private_code' => '1234',
            'isPrivate' => false,
        ]);

        $response = $this
            ->actingAs($user)
            ->patch("/lists/{$giftList->id}", [
                'name' => 'Wedding',
            ]);

        $response
            ->assertSessionHasNoErrors()
            ->assertRedirect('/my-lists');

        $giftList->refresh();

        $this->assertSame('Wedding', $giftList->name);
    }

    public function test_giftlist_can_be_deleted(): void
    {
        $user = User::factory()->create();
        $giftList = GiftList::factory()->create([
            'user_id' => $user->id,
            'user_name' => $user->name,
            'name' => 'Mariage',
            'private_code' => '1234',
            'isPrivate' => false,
        ]);

        $response = $this
            ->actingAs($user)
            ->delete("/lists/{$giftList->id}");

        $response
            ->assertSessionHasNoErrors()
            ->assertRedirect('/my-lists');

        $this->assertNull($giftList->fresh());
    }

    public function test_correct_private_code_must_be_provided_to_follow_giftlist(): void
    {
        $user = User::factory()->create();
        $giftList = GiftList::factory()->create([
            'user_id' => $user->id,
            'user_name' => $user->name,
            'name' => 'Mariage',
            'private_code' => '1234',
            'isPrivate' => false,
        ]);
        $follower = User::factory()->create();

        $response = $this
            ->actingAs($follower)
            ->post("/lists/{$giftList->id}/follow", [
                'private_code' => 'wrong-code',
            ]);

        $response
            ->assertSessionHasErrors('private_code')
            ->assertRedirect();

        $this->assertDatabaseMissing('followed_lists', [
            'user_id' => $follower->id,
            'gift_list_id' => $giftList->id,
        ]);
    }

    public function test_request_can_be_sent_to_follow_giftlist(): void
    {
        $user = User::factory()->create();
        $giftList = GiftList::factory()->create([
            'user_id' => $user->id,
            'user_name' => $user->name,
            'name' => 'Mariage',
            'private_code' => '1234',
            'isPrivate' => false,
        ]);
        $follower = User::factory()->create();

        $response = $this
            ->actingAs($follower)
            ->post("/notifications/request-access/{$user->id}/{$giftList->id}");

        $response
            ->assertSessionHasNoErrors()
            ->assertStatus(200)
            ->assertExactJson(['message' => 'Demande envoyée avec succès.']);

        $this->assertDatabaseHas('notifications', [
            'type' => 'request-access',
            'notifiable_type' => 'App\Models\User',
            'notifiable_id' => $user->id,
            'data' => json_encode([
                'requestingUser' => $follower->name,
                'requestingUserId' => $follower->id,
                'listToFollow' => $giftList->name,
                'listId' => $giftList->id
            ]),
        ]);
    }
}
