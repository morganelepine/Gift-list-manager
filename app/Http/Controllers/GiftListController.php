<?php

namespace App\Http\Controllers;

use App\Models\GiftList;
use App\Models\Idea;
use App\Models\User;
use App\Models\FollowedList;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;
use Carbon\Carbon;

class GiftListController extends Controller
{

    /**
     * Display the specified resource.
     */
    public function show(Request $request, $id): Response
    {
        $authUserId = Auth::id();

        // get list id from url
        $list = GiftList::find($id);

        // idées dans la liste dont l'id est dans l'url
        $ideas = Idea::where('list_id', $id)->get();

        // idées disponibles
        $ideas_available = Idea::where('list_id', $id)->where('status', "available")->get();

        // idées réservées
        $ideas_reserved = Idea::where('list_id', $id)->where('status', "reserved")->get();

        // idées réservées
        $ideas_purchased = Idea::where('list_id', $id)->where('status', "purchased")->get();

        // get lists followed by connected user
        $followedLists = FollowedList::where('user_id', $authUserId)->get();

        return Inertia::render('GiftList/Show', [
            'list' => $list,
            'ideas' => $ideas,
            'ideas_available' => $ideas_available,
            'ideas_reserved' => $ideas_reserved,
            'ideas_purchased' => $ideas_purchased,
            'followedLists' => $followedLists,
        ]);
    }

    /**
     * Display a listing of the gift lists.
     */
    public function index(): Response
    {
        $authUser = Auth::user();
        $authUserId = Auth::id();

        // Get the lists of the auth user
        $mylists = GiftList::where('user_id', $authUserId)->orderBy('created_at', 'desc')->get();
        // Formatage de la date
        foreach ($mylists as $mylist) {
            $mylist->formatted_created_at = Carbon::parse($mylist->created_at)->format('d/m/Y');
            $mylist->formatted_updated_at = Carbon::parse($mylist->updated_at)->format('d/m/Y');
        }

        // Get the lists followed by the auth user
        $followedLists = $authUser->followedLists()->get();
        // Formatage de la date pour les listes suivies
        foreach ($followedLists as $followedList) {
            $followedList->formatted_created_at = Carbon::parse($followedList->created_at)->format('d/m/Y');
            $followedList->formatted_updated_at = Carbon::parse($followedList->updated_at)->format('d/m/Y');
        }

        // Get the lists to follow
        $followedListIds = $authUser->followedLists()->pluck('gift_lists.id')->all();
        $listsToFollow = GiftList::whereNot('user_id', $authUserId)
        ->whereNotIn('id', $followedListIds)
        ->orderBy('created_at', 'desc')
        ->get();
        // Formatage de la date pour les listes à suivre
        foreach ($listsToFollow as $listToFollow) {
            $listToFollow->formatted_created_at = Carbon::parse($listToFollow->created_at)->format('d/m/Y');
            $listToFollow->formatted_updated_at = Carbon::parse($listToFollow->updated_at)->format('d/m/Y');
        }

        return Inertia::render('Users/Index', [
            'mylists' => $mylists,
            'followedLists' => $followedLists,
            'listsToFollow' => $listsToFollow,
        ]);
    }

    /**
     * Display a listing of the gift lists to follow.
     */
    public function listsToFollow(): Response
    {
        // Get all users except the authenticated user
        $authUserId = Auth::id();
        $users = User::where('id', '!=', $authUserId)->get();

        // Get the lists to follow
        $authUser = Auth::user();
        $followedListIds = $authUser->followedLists()->pluck('gift_lists.id')->all();
        $listsToFollow = GiftList::whereNot('user_id', $authUserId)
        ->whereNotIn('id', $followedListIds)
        ->orderBy('created_at', 'desc')
        ->get();

        // Formatage de la date
        foreach ($listsToFollow as $listToFollow) {
            $listToFollow->formatted_created_at = Carbon::parse($listToFollow->created_at)->format('d/m/Y');
            $listToFollow->formatted_updated_at = Carbon::parse($listToFollow->updated_at)->format('d/m/Y');
        }

        return Inertia::render('Users/ListsToFollow', [
            'users' => $users,
            'listsToFollow' => $listsToFollow,
        ]);
    }

    /**
     * Display a listing of the followed gift lists.
     */
    public function followedLists(): Response
    {
        // Get the lists followed by the authenticated user
        $authUser = Auth::user();
        $followedLists = $authUser->followedLists()->get();

        // Formatage de la date
        foreach ($followedLists as $followedList) {
            $followedList->formatted_created_at = Carbon::parse($followedList->created_at)->format('d/m/Y');
            $followedList->formatted_updated_at = Carbon::parse($followedList->updated_at)->format('d/m/Y');
        }

        return Inertia::render('Users/FollowedLists', [
            'followedLists' => $followedLists,
        ]);
    }

    /**
     * Display a listing of the auth user's gift lists.
     */
    public function authLists(): Response
    {
        $authUserId = Auth::id();

        // Get all lists of connected user
        $lists = GiftList::with('user:id,name')->where('user_id', $authUserId)->latest()->get();
        // dd($lists);

        // Get all ideas in each lists of connected user
        $userLists = GiftList::where('user_id', $authUserId)->get();
        $listsOfIdeas = Idea::join('gift_lists', 'ideas.list_id', '=', 'gift_lists.id')
        ->select('ideas.*', 'gift_lists.*')
        ->whereIn('list_id', $userLists->pluck('id'))
        // ->orderby('created_at', 'desc')
        ->get();

        return count($lists) == 1
            ? Inertia::render('GiftList/FirstAuthList', [
                'list' => $lists,
                'ideas' => $listsOfIdeas,
            ])
            : Inertia::render('GiftList/AuthLists', [
                'lists' => $lists,
            ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('GiftList/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): RedirectResponse
    {
        $string = 'required|string|max:255';

        $validated = $request->validate([
            'user_name' => $string,
            'name' => $string,
            'private_code' => $string,
        ]);

        $request->user()->gift_lists()->create($validated);

        return redirect(route('lists.authLists'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, GiftList $list): RedirectResponse
    {
        // $this->authorize('update', $list);

        $string = 'nullable|string|max:255';

        $validated = $request->validate([
            'user_name' => $string,
            'name' => $string,
            'private_code' => $string,
        ]);

        $list->update($validated);

        return redirect(route('lists.authLists'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(GiftList $list): RedirectResponse
    {
        //Only the auth user can delete the list
        $this->authorize('delete', $list);

        $list->delete();

        return redirect(route('lists.authLists'));
    }

    /**
     * Follow a list
     */
    public function followList(Request $request): RedirectResponse
    {
        $listId = $request->input('gift_list_id');
        $privateCode = $request->input('private_code');
        $correctPrivateCode = GiftList::where('id', $listId)->value('private_code');
        // dd($request->all());

        // $encodingPrivateCode = mb_detect_encoding($privateCode);
        // $encodingCorrectPrivateCode = mb_detect_encoding($correctPrivateCode);

        // Comparaison insensible à la casse (strcasecmp) et aux espaces (trim)
        if (strcasecmp(trim($privateCode), trim($correctPrivateCode)) === 0) {
            $validated = $request->validate([
                'user_id' => 'required|integer',
                'gift_list_id' => 'required|integer',
                'private_code' => 'required|string',
            ]);
            $request->user()->followed_lists()->create($validated);
            return redirect()->back()->with('success', 'Vous suivez maintenant cette liste !');
        } else {
            return redirect()->back()->withErrors(['private_code' => 'Ce code est incorrect pour la liste demandée.']);
        }
    }
}
