<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Idea;
use App\Models\GiftList;
use Illuminate\Support\Facades\Redirect;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Repositories\IdeaRepository;

class IdeaController extends Controller
{
    protected $ideaRepository;

    public function __construct(IdeaRepository $ideaRepository)
    {
        $this->ideaRepository = $ideaRepository;
    }

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
            'idea' => 'required_without:link|nullable|string|max:550',
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
            'link' => 'nullable|string|max:550',
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

        return back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Idea $idea): RedirectResponse
    {
        // Check if idea is already reserved or purchased and not archived
        $isReserved = Idea::where('id', $idea->id)->where('status', 'reserved')->exists();
        $isPurchased = Idea::where('id', $idea->id)->where('status', 'purchased')->exists();

        // Only the auth user can delete the idea
        $this->authorize('delete', $idea);

        if ($isReserved || $isPurchased) {
            return redirect()->back()->withErrors(['error' => 'Oops, cette idée a déjà été réservée ou achetée...']);
        } else {
            $idea->delete();
            return back();
        }
    }

    /**
     * Reserve an idea.
     */
    public function reserveIdea(Request $request, $ideaId): RedirectResponse
    {
        $this->ideaRepository->updateIdeaStatus($ideaId, 'reserved', Auth::user()->name);
        return back();
    }

    /**
     * Purchase an idea.
     */
    public function purchaseIdea(Request $request, $ideaId): RedirectResponse
    {
        $this->ideaRepository->updateIdeaStatus($ideaId, 'purchased', Auth::user()->name);
        return back();
    }

    /**
     * Cancel reservation or purchase of an idea.
     */
    public function cancelReservationOrPurchase(Request $request, $ideaId): RedirectResponse
    {
        $this->ideaRepository->updateIdeaStatus($ideaId, 'available', '');
        return back();
    }
}
