package com.unifiededucation.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.unifiededucation.backend.dto.DashboardResponse;
import com.unifiededucation.backend.repository.AttendanceRepository;
import com.unifiededucation.backend.repository.CourseRepository;
import com.unifiededucation.backend.repository.EnrollmentRepository;
import com.unifiededucation.backend.repository.MarksRepository;
import com.unifiededucation.backend.repository.NotificationRepository;
import com.unifiededucation.backend.repository.StudentRepository;
import com.unifiededucation.backend.repository.TeacherRepository;

@RestController
@RequestMapping("/api/dashboard")
@CrossOrigin(origins = "*")
public class DashboardController {

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private TeacherRepository teacherRepository;

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private EnrollmentRepository enrollmentRepository;

    @Autowired
    private AttendanceRepository attendanceRepository;

    @Autowired
    private MarksRepository marksRepository;

    @Autowired
    private NotificationRepository notificationRepository;

    @GetMapping("/stats")
    public DashboardResponse dashboard() {

        System.out.println("Dashboard API HIT");

        try {

            System.out.println("Students: " + studentRepository.count());
            System.out.println("Teachers: " + teacherRepository.count());
            System.out.println("Courses: " + courseRepository.count());
            System.out.println("Enrollments: " + enrollmentRepository.count());
            System.out.println("Attendance: " + attendanceRepository.count());
            System.out.println("Marks: " + marksRepository.count());
            System.out.println("Notifications: " + notificationRepository.count());

            return new DashboardResponse(
                    studentRepository.count(),
                    teacherRepository.count(),
                    courseRepository.count(),
                    enrollmentRepository.count(),
                    attendanceRepository.count(),
                    marksRepository.count(),
                    notificationRepository.count()
            );

        } catch (Exception e) {
            e.printStackTrace();
            throw e;
        }
    }
}