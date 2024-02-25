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

class IdeaReservedController extends Controller
{
    /**
     * Reserve an idea.
     */
    public function reserveIdea(Request $request, $ideaId): RedirectResponse
    {
        // Update status in table IDEAS
        $idea = Idea::findOrFail($ideaId);
        $idea->status = 'reserved';
        $idea->status_user = Auth::user()->name;
        $idea->save();

        // Copy idea in table RESERVED
        $reservedIdea = new IdeaReserved();
            $reservedIdea->user_id = Auth::id();
            $reservedIdea->idea_id = $idea->id;
            $reservedIdea->gift_list_id = $idea->list_id;
        $reservedIdea->save();

        return back();
    }

    /**
     * Cancel reservation of an idea.
     */
    public function cancelReservation(IdeaReserved $idea): RedirectResponse
    {
        // Update status in table IDEAS if idea still is in db
        $ideaToEdit = Idea::find($idea->idea_id);
        if ($ideaToEdit) {
            $ideaToEdit->status = 'available';
            $ideaToEdit->status_user = '';
            $ideaToEdit->save();
        }

        // Remove idea from table RESERVED
        $idea->delete();

        return back();
    }
}
