<?php

namespace App\Http\Controllers;

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
        $ideas = Idea::with('user:id,name')->latest()->get();

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
     * Store a newly created resource in storage.
     */
    public function store(Request $request): RedirectResponse
    {
        $string = 'nullable|string|max:255';

        $validated = $request->validate([
            'user_name' => 'required|string|max:255',
            'idea' => $string,
            'brand' => $string,
            'link' => $string,
            'details' => $string,
            'membership' => $string,
            'membership_reduction' => $string,
            'promo' => 'nullable|boolean',
            'promo_details' => $string,
        ]);

        $request->user()->ideas()->create($validated);

        return redirect(route('ideas.index'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Idea $idea): RedirectResponse
    {
        $this->authorize('update', $idea);

        $string = 'nullable|string|max:255';

        $validated = $request->validate([
            'idea' => $string,
            'brand' => $string,
            'link' => $string,
            'details' => $string,
            'membership' => $string,
            'membership_reduction' => $string,
            'promo' => 'nullable|boolean',
            'promo_details' => $string,
        ]);

        $idea->update($validated);

        return redirect(route('ideas.index'));
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
