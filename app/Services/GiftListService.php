<?php

namespace App\Services;

use App\Models\Idea;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use App\Repositories\GiftListRepository;

class GiftListService
{
    protected $giftListRepository;

    public function __construct(GiftListRepository $giftListRepository)
    {
        $this->giftListRepository = $giftListRepository;
    }

    public function formatOneList(&$list, $dateFormat = 'd/m/Y')
    {
        $list['formatted_created_at'] = Carbon::parse($list['created_at'])->format($dateFormat);
        $list['lastUpdatedAt'] = Idea::where('list_id', $list['id'])->max('created_at');
        $list['formatted_updated_at'] = Carbon::parse($list['lastUpdatedAt'])->format($dateFormat);

        $list['isEmpty'] = Idea::where('list_id', $list['id'])->count() === 0;

        $user = User::find($list['user_id']);
        $list['user_lastname'] = $user ? $user->last_name : null;

        return $list;
    }

    public function formatEachLists($lists, $dateFormat = 'd/m/Y')
    {
        $listsArray = $lists->toArray();

        foreach ($listsArray as &$list) {
            $this->formatOneList($list, $dateFormat);
        }

        usort($listsArray, function ($a, $b) {
            return $a['lastUpdatedAt'] < $b['lastUpdatedAt'] ? 1 : -1;
        });

        return collect($listsArray);
    }

    public function getFormattedUserLists(bool $isPrivate)
    {
        $userLists = $this->giftListRepository->getUserLists($isPrivate);
        $userLists = $this->formatEachLists($userLists);

        return $userLists;
    }

    public function getFollowedLists()
    {
        $followedLists = Auth::user()->followedLists()->get();
        $followedLists = $this->formatEachLists($followedLists);

        return $followedLists;
    }
}
