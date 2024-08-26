<?php

namespace App\Repositories;

use App\Models\Idea;

class IdeaRepository
{
    public function getUnavailableIdeasByStatus(int $listId, string $status)
    {
        return Idea::where('list_id', $listId)
                   ->where('status', $status)
                   ->orderByDesc('updated_at')
                   ->get();
    }

    public function getIdeasByStatus(int $listId, array $status)
    {
        return Idea::where('list_id', $listId)
                   ->whereIn('status', $status)
                   ->orderBy('brand')
                   ->orderByDesc('favorite')
                   ->orderBy('price')
                   ->orderBy('idea')
                   ->get();
    }


    public function updateIdeaStatus(int $ideaId, string $status, string $statusUser)
    {
        $idea = Idea::findOrFail($ideaId);

        $idea->status = $status;
        $idea->status_user = $statusUser;
        $idea->save();
    }
}
