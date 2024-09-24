<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class NotifyRequestAccessToList extends Notification
{
    use Queueable;

    protected $listOwner;
    protected $requestingUser;
    protected $requestingUserId;
    protected $list;
    protected $listId;

    /**
     * Create a new notification instance.
     */
    public function __construct($listOwner, $requestingUser, $requestingUserId, $list, $listId)
    {
        $this->listOwner = $listOwner;
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
        return ['mail', 'database'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->subject($this->requestingUser . ' souhaite accéder à ta liste "' . $this->list . '"')
            ->greeting('Bonjour ' . $this->listOwner->name . ',')
            ->line($this->requestingUser . ' souhaite accéder à ta liste "' . $this->list . '". Clique sur le bouton ci-dessous pour accepter ou refuser sa demande :')
            ->action('Gérer la demande', url(route('profile.notifications')))
            ->salutation('À bientôt sur MerryMate !');
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
