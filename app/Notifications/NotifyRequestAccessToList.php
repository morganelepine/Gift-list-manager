<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;

class NotifyRequestAccessToList extends Notification
{
    use Queueable;

    protected $requestingUser;
    protected $requestingUserId;
    protected $list;
    protected $listId;

    /**
     * Create a new notification instance.
     */
    public function __construct($requestingUser, $requestingUserId, $list, $listId)
    {
        $this->requestingUser = $requestingUser;
        $this->requestingUserId = $requestingUserId;
        $this->list = $list;
        $this->listId = $listId;
    }

    /**
     * Get the notification's delivery channels.
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['database'];
    }

    /**
     * Get the array representation of the notification.
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            'requestingUser' => $this->requestingUser,
            'requestingUserId' => $this->requestingUserId,
            'listToFollow' => $this->list,
            'listId' => $this->listId,
        ];
    }

    /**
     * Get the notification's database type.
     * @return string
     */
    public function databaseType(object $notifiable): string
    {
        return 'request-access';
    }
}
