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
        // return Inertia::render('Ideas/Show', [
        //     'idea' => $idea,
        // ]);
    }

    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        $authUserId = Auth::id();

        // Get all ideas of connected user
        $ideas = Idea::with('user:id,name')->where('user_id', $authUserId)->latest()->get();

        return Inertia::render('Ideas/Index', [
            'ideas' => $ideas,
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
            'idea' => 'required_without:link|nullable|string|max:255',
            'brand' => $string,
            'link' => 'required_without:idea|nullable|string|max:255',
            'details' => $string,
            'price' => 'nullable|integer',
            'membership' => $string,
            'membership_reduction' => $string,
            'promo' => 'boolean',
            'promo_details' => $string,
            'status' => $string,
            'status_user' => $string,
        ]);

        $request->user()->ideas()->create($validated);

        return redirect()->route('lists.show', ['list' => $validated['list_id']]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Idea $idea): RedirectResponse
    {
        $string = 'nullable|string|max:255';

        $validated = $request->validate([
            'idea' => $string,
            'brand' => $string,
            'link' => $string,
            'details' => $string,
            'price' => 'nullable|integer',
            'promo' => 'boolean',
            'promo_details' => $string,
            'membership' => $string,
            'membership_reduction' => $string,
            'status' => $string,
            'status_user' => $string,
        ]);

        $idea->update($validated);

        // return redirect(route('ideas.index'));
        return back();
    }

    /**
     * Update the specified resource in storage.
     */
    public function modify(Request $request, $listId, Idea $idea): RedirectResponse
    {
        $string = 'nullable|string|max:255';

        $validated = $request->validate([
            'status' => $string,
            'status_user' => $string,
        ]);

        $idea->update($validated);

        return redirect(route('lists.show', $listId));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Idea $idea): RedirectResponse
    {
        //Only the auth user can delete the idea
        $this->authorize('delete', $idea);

        $idea->delete();

        // return redirect(route('ideas.index'));
        return back();
    }
}
