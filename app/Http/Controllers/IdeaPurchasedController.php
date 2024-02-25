<?php

namespace App\Http\Controllers;

use App\Models\Idea;
use App\Models\IdeaReserved;
use App\Models\IdeaPurchased;
use App\Models\GiftList;
use Illuminate\Http\Request;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class IdeaPurchasedController extends Controller
{
    /**
     * Purchase an idea.
     */
    public function purchaseIdea(Request $request, $ideaId): RedirectResponse
    {
        // Update status in table IDEAS
        $idea = Idea::findOrFail($ideaId);
        $idea->status = 'purchased';
        $idea->status_user = Auth::user()->name;
        $idea->save();

        // Copy idea in table PURCHASED
        $purchasedIdea = new IdeaPurchased();
            $purchasedIdea->user_id = Auth::id();
            $purchasedIdea->idea_id = $idea->id;
            $purchasedIdea->gift_list_id = $idea->list_id;
            $purchasedIdea->save();

        // If idea was in table RESERVED before being purchased, remove it
        $ideaIsReserved = IdeaReserved::where('idea_id', $ideaId)->first();
        if ($ideaIsReserved) {
            $ideaIsReserved->delete();
        }

        return back();
    }

    /**
     * Cancel purchase of an idea
     */
    public function cancelPurchase(IdeaPurchased $idea): RedirectResponse
    {
        // Update status in table IDEAS if idea still is in db
        $ideaToEdit = Idea::find($idea->idea_id);
        if ($ideaToEdit) {
            $ideaToEdit->status = 'available';
            $ideaToEdit->status_user = '';
            $ideaToEdit->save();
        }

        // Remove idea from table PURCHASED
        $idea->delete();

        return back();
    }
}
