package com.unifiededucation.backend.dto;

public class NotificationDTO {

    private String notificationId;
    private String title;
    private String message;
    private String sender;
    private String receiver;
    private String date;

    public NotificationDTO() {
    }

    public NotificationDTO(String notificationId, String title,
                           String message, String sender,
                           String receiver, String date) {
        this.notificationId = notificationId;
        this.title = title;
        this.message = message;
        this.sender = sender;
        this.receiver = receiver;
        this.date = date;
    }

    public String getNotificationId() {
        return notificationId;
    }

    public void setNotificationId(String notificationId) {
        this.notificationId = notificationId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getSender() {
        return sender;
    }

    public void setSender(String sender) {
        this.sender = sender;
    }

    public String getReceiver() {
        return receiver;
    }

    public void setReceiver(String receiver) {
        this.receiver = receiver;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }
}