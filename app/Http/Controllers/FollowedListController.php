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

class FollowedListController extends Controller
{
    public function followList1(Request $request, $listId)
    {
        $user = Auth::user();
        $privateCode = $request->input('code_secret');

        // Check si le private_code est correct pour la liste demandée
        if ($user->followedLists()->where('list_id', $listId)->wherePivot('private_code', $privateCode)->exists()) {
            // Ajoute la relation dans la table de pivot
            $user->followedLists()->attach($listId, ['private_code' => $privateCode]);
            return redirect()->back()->with('success', 'Vous suivez maintenant cette liste !');
        } else {
            return redirect()->back()->with('error', 'Code secret incorrect.');
        }
    }

    /**
     * Follow a list
     */
    public function followList(Request $request): RedirectResponse
    {
        $listId = $request->input('gift_list_id');
        $privateCode = $request->input('private_code');
        $correctPrivateCode = GiftList::where('id', $listId)->value('private_code');
        // dd($listId, $privateCode, $correctPrivateCode);

        // dd($request->all());

        // $errorMessage = [
        //     'private_code.exists' => 'Ce code est incorrect pour la liste demandée.',
        // ];

        // Comparaison insensible à la casse (strcasecmp) et aux espaces (trim)
        if (strcasecmp(trim($privateCode), trim($correctPrivateCode)) === 0) {
            $validated = $request->validate([
                'user_id' => 'required|integer',
                'gift_list_id' => 'required|integer',
                'private_code' => 'required|string',
                // 'private_code' => 'required|exists:gift_lists,private_code,id,' . $list,
                // 'private_code' => [
                //     'required',
                //     Rule::exists('gift_lists', 'private_code')->where(function ($query) use ($listId) {
                //         return $query->where('id', $listId);
                //     }),
                // ],
            ]);

            $request->user()->followed_lists()->create($validated);

            // return redirect(route('users.index'));
            // return redirect()->back()->with('success', 'Vous suivez maintenant cette liste !');
            return Inertia::render('GiftList/FollowList')->with('success', 'Vous suivez maintenant cette liste !');

        } else {
            return redirect()->back()->withErrors(['private_code' => 'Ce code est incorrect pour la liste demandée.']);
        }

    }
}
