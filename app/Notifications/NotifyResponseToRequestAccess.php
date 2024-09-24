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
    protected $requestingUser;
    protected $listOwner;
    protected $list;
    protected $listId;

    /**
     * Create a new notification instance.
     */
    public function __construct($response, $requestingUser, $listOwner, $list, $listId)
    {
        $this->response = $response;
        $this->requestingUser = $requestingUser;
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
        return ['mail', 'database'];
    }


    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->subject($this->listOwner . ' a ' . $this->response . ' ta demande')
            ->greeting('Bonjour ' . $this->requestingUser->name . ',')
            ->line($this->listOwner . ' a ' . $this->response . ' ta demande de suivre sa liste "' . $this->list . '".')
            ->action('Voir la liste', url(route('lists.show', $this->listId)))
            ->salutation('À bientôt sur MerryMate !');
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
