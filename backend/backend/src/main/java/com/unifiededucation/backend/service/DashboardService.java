package com.unifiededucation.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.unifiededucation.backend.dto.DashboardDTO;
import com.unifiededucation.backend.repository.AssignmentRepository;
import com.unifiededucation.backend.repository.AttendanceRepository;
import com.unifiededucation.backend.repository.CourseRepository;
import com.unifiededucation.backend.repository.EnrollmentRepository;
import com.unifiededucation.backend.repository.ExaminationRepository;
import com.unifiededucation.backend.repository.FeeRepository;
import com.unifiededucation.backend.repository.LibraryRepository;
import com.unifiededucation.backend.repository.MarksRepository;
import com.unifiededucation.backend.repository.NotificationRepository;
import com.unifiededucation.backend.repository.StudentRepository;
import com.unifiededucation.backend.repository.TeacherRepository;

@Service
public class DashboardService {

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
    private ExaminationRepository examinationRepository;

    @Autowired
    private AssignmentRepository assignmentRepository;

    @Autowired
    private FeeRepository feeRepository;

    @Autowired
    private LibraryRepository libraryRepository;

    @Autowired
    private NotificationRepository notificationRepository;

    public DashboardDTO getDashboardStats() {

        DashboardDTO dto = new DashboardDTO();

        dto.setStudents(studentRepository.count());
        dto.setTeachers(teacherRepository.count());
        dto.setCourses(courseRepository.count());
        dto.setEnrollments(enrollmentRepository.count());
        dto.setAttendance(attendanceRepository.count());
        dto.setMarks(marksRepository.count());
        dto.setExaminations(examinationRepository.count());
        dto.setAssignments(assignmentRepository.count());
        dto.setFees(feeRepository.count());
        dto.setLibrary(libraryRepository.count());
        dto.setNotifications(notificationRepository.count());

        return dto;
    }
}