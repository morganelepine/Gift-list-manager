<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class NotifyResponseToRequestAccess extends Notification
{
    use Queueable;

    protected $response;
    protected $listOwner;
    protected $list;
    protected $listId;

    /**
     * Create a new notification instance.
     */
    public function __construct($response, $listOwner, $list, $listId)
    {
        $this->response = $response;
        $this->listOwner = $listOwner;
        $this->list = $list;
        $this->listId = $listId;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['database'];
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            'response' => $this->response,
            'listOwner' => $this->listOwner,
            'list' => $this->list,
            'listId' => $this->listId,
        ];
    }

    /**
     * Get the notification's database type.
     *
     * @return string
     */
    public function databaseType(object $notifiable): string
    {
        return 'response-to-request';
    }
}
