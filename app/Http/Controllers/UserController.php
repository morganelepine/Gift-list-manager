<?php

namespace App\Http\Controllers;

use App\Models\GiftList;
use App\Models\Idea;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class UserController extends Controller
{
    /**
     * Display the specified resource.
     */
    public function show(Request $request, $id): Response
    {
        // get user id from url
        $user = User::find($id);

        // ideas du user dont l'id est dans l'url
        $ideas = Idea::where('user_id', $id)->get();

        return Inertia::render('Users/Show', [
            'user' => $user,
            'ideas' => $ideas,
        ]);
    }

    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        // Get all users except the authenticated user
        $authUserId = Auth::id();
        $users = User::where('id', '!=', $authUserId)->get();

        // Get the lists followed by the authenticated user and the existing lists to follow
        $authUser = Auth::user();
        $followedLists = $authUser->followedLists()->get();
        $followedListIds = $authUser->followedLists()->pluck('gift_lists.id')->all();
        $listsToFollow = GiftList::whereNot('user_id', $authUserId)->whereNotIn('id', $followedListIds)->get();

        return Inertia::render('Users/Index', [
            'users' => $users,
            'followedLists' => $followedLists,
            'listsToFollow' => $listsToFollow
        ]);
    }
}
