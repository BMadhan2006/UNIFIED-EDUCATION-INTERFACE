package com.unifiededucation.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.unifiededucation.backend.model.Notification;

public interface NotificationRepository extends JpaRepository<Notification, Long> {

}