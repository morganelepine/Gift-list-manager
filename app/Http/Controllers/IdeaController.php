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

class IdeaController extends Controller
{

    /**
     * Display the specified resource.
     */
    public function show(Idea $idea): Response
    {
        return Inertia::render('Ideas/Show', [
            'idea' => $idea,
        ]);
    }

    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        $authUserId = Auth::id();

        // Get all ideas of connected user
        $ideas = Idea::with('user:id,name')->where('user_id', $authUserId)->latest()->get();

        // // Create an array $ideasByBrand storing each ideas with their corresponding brand
        // $brands = Idea::distinct('brand')->pluck('brand');
        // $ideasByBrand = [];
        // foreach ($brands as $brand) {
        //     $idea = Idea::where('brand', $brand)->get();
        //     $ideasByBrand[$brand] = $idea;
        // }

        // Get all ideas in each lists of connected user
        $userLists = GiftList::where('user_id', $authUserId)->get();
        $ideasInList = Idea::join('gift_lists', 'ideas.list_id', '=', 'gift_lists.id')
        ->select('ideas.*', 'gift_lists.*')
        ->whereIn('list_id', $userLists->pluck('id'))
        // ->orderby('created_at', 'desc')
        ->get();

        return Inertia::render('Ideas/Index', [
            'ideas' => $ideas,
            // 'ideasByBrand' => $ideasByBrand,
            'ideasInList' => $ideasInList,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Ideas/Create');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create_idea(Request $request, $id): Response
    {
        // get list id from url
        $list = GiftList::find($id);

        return Inertia::render('Ideas/Create', [
            'list' => $list,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): RedirectResponse
    {
        $string = 'nullable|string|max:255';

        $validated = $request->validate([
            'list_id' => 'required|integer',
            'user_name' => 'required|string|max:255',
            'idea' => $string,
            'brand' => $string,
            'link' => $string,
            'details' => $string,
            'membership' => $string,
            'membership_reduction' => $string,
            'promo' => 'boolean',
            'promo_details' => $string,
            'status' => $string,
            'status_user' => 'integer',
        ]);

        $request->user()->ideas()->create($validated);

        return redirect()->route('lists.show', ['list' => $validated['list_id']]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Idea $idea): RedirectResponse
    {
        // $this->authorize('update', $idea);

        // // get list id from url
        // $list = GiftList::find($id);
        // $listId = $list->id;

        $string = 'nullable|string|max:255';

        $validated = $request->validate([
            'idea' => $string,
            'brand' => $string,
            'link' => $string,
            'details' => $string,
            'promo' => 'boolean',
            'promo_details' => $string,
            'membership' => $string,
            'membership_reduction' => $string,
            'status' => $string,
            'status_user' => 'integer',
        ]);

        $idea->update($validated);

        return redirect(route('ideas.index'));
        // return redirect(route('lists.show', $listId));
    }

    public function updateStatus(Request $request, Idea $idea, $id): RedirectResponse
    {
        $purchasedIdea = Idea::find($id);

        if (!$purchasedIdea) {
            return response()->json(['message' => 'Idée-cadeau non trouvée'], 404);
        }

        $purchasedIdea->status = "purchased"; // Marquer le cadeau comme acheté
        $purchasedIdea->save();

        return response()->json(['message' => 'Cadeau marqué comme acheté']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Idea $idea): RedirectResponse
    {
        //Only the auth user can delete the idea
        $this->authorize('delete', $idea);

        $idea->delete();

        return redirect(route('ideas.index'));
    }
}
