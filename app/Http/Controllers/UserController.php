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
        $authUserId = Auth::id();
        $users = User::where('id', '!=', $authUserId)->get();
        // $users = User::all()->except($authUserId);

        // dd($users);

        return Inertia::render('Users/Index', [
            'users' => $users,
            'authUserId' => $authUserId,
        ]);
    }
}
