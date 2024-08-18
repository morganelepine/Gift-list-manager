<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Idea;
use App\Models\GiftList;
use App\Models\IdeaReserved;
use App\Models\IdeaPurchased;
use Illuminate\Support\Facades\Redirect;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class IdeaController extends Controller
{
    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request, $id): Response
    {
        // Get list id from url
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
            'favorite' => 'boolean',
            'promo' => 'boolean',
            'promo_details' => $string,
            'membership' => $string,
            'membership_reduction' => $string,
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
            'favorite' => 'boolean',
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
     * Remove the specified resource from storage.
     */
    public function destroy(Idea $idea): RedirectResponse
    {
        // Check if idea is already reserved or purchased and not archived
        $isReserved = IdeaReserved::where('idea_id', $idea->id)->exists();
        $isPurchased = IdeaPurchased::where('idea_id', $idea->id)
                                    ->where('gift_list_id', $idea->list_id)
                                    ->where('archived', 0)
                                    ->exists();

        // Only the auth user can delete the idea
        $this->authorize('delete', $idea);

        if ($isReserved || $isPurchased) {
            return redirect()->back()->withErrors(['error' => 'Oops, cette idée a déjà été réservée ou achetée...']);
        } else {
            $idea->delete();
            return back();
        }
    }
}
