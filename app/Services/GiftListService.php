<?php

namespace App\Services;

use App\Models\Idea;
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

    public function formatOneList($list, $dateFormat = 'd/m/Y')
    {
        $list->formatted_created_at = Carbon::parse($list->created_at)->format($dateFormat);
        $list->lastUpdatedAt = Idea::where('list_id', $list->id)->max('created_at');
        $list->formatted_updated_at = Carbon::parse($list->lastUpdatedAt)->format($dateFormat);
        $list->isEmpty = Idea::where('list_id', $list->id)->count() === 0;

        return $list;
    }

    public function formatEachLists($lists, $dateFormat = 'd/m/Y')
    {
        foreach ($lists as $list) {
            $this->formatOneList($list, $dateFormat);
        }

        return $lists;
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
