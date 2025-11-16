<?php

namespace App\Http\Controllers;

use App\Models\Idea;
use App\Models\MultipleIdea;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Repositories\IdeaRepository;

class MultipleIdeaController extends Controller
{
    protected $ideaRepository;

    public function __construct(IdeaRepository $ideaRepository)
    {
        $this->ideaRepository = $ideaRepository;
    }

    /**
     * Reserve a multiple idea.
     */
    public function reserveMultipleIdea(Request $request, $ideaId): RedirectResponse
    {
        $idea = Idea::find($ideaId);
        MultipleIdea::create([
            'idea_id' => $idea->id,
            'status_user' => Auth::user()->name,
            'status' => "reserved",
            'choice' => $request->get('choice'),
        ]);
        return back();
    }

    /**
     * Purchase a multiple idea.
     */
    public function purchaseMultipleIdea(Request $request, $ideaId): RedirectResponse
    {
        $multipleIdea = MultipleIdea::find($ideaId);
        $choice = $request->get('choice');

        if ($multipleIdea) {
            $this->ideaRepository->updateIdeaStatus($ideaId, 'purchased', Auth::user()->name, $choice);
            return back();
        } else {
            $idea = Idea::find($ideaId);
            MultipleIdea::create([
                'idea_id' => $idea->id,
                'status_user' => Auth::user()->name,
                'status' => "purchased",
                'choice' => $choice,
            ]);
            return back();
        }
    }

    /**
     * Cancel reservation or purchase of a multiple idea.
     */
    public function cancelMultipleIdea(Request $request, $ideaId): RedirectResponse
    {
        MultipleIdea::where('id', $ideaId)->where('status_user', Auth::user()->name)->delete();
        return back();
    }
}
