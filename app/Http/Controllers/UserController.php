<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Idea;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class UserController extends Controller
{
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
        ]);
    }
}
