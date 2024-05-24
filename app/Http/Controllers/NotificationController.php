<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;

class NotificationController extends Controller
{
    #index all notifications
    public function index(Request $request)
    {
        $dateFormat = 'd/m/Y';
        $notifications = [];

        foreach (Auth::user()->notifications as $notification) {
            $notification->formatted_created_at = Carbon::parse($notification->created_at)->format($dateFormat);
            array_push($notifications, $notification);
        }

        return response()->json(['notifications' => $notifications]);
    }

    #unread notifications
    public function indexUnreadNotifications(Request $request)
    {
        $unread_notifications = Auth::user()->unreadNotifications()->get();
        return response($unread_notifications);
    }

    #mark notification as read
    public function markNotification(Request $request, $id)
    {
        Auth::user()->unreadNotifications->where('id', $id)->markAsRead();
        return response();
    }

    #mark all notifications as read
    public function markAllNotifications()
    {
        Auth::user()->unreadNotifications->markAsRead();
        return response();
    }

    #delete specific notification
    public function destroy(Request $request, $id)
    {
        Auth::user()->notifications()->where('id', $id)->delete();
        return response();
    }
}
