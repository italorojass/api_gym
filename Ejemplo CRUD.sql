-- Crear la base de datos del gimnasio
CREATE DATABASE GymDB;
GO

-- Usar la base de datos
USE GymDB;
GO

-- Crear tabla de Roles
CREATE TABLE Roles (
    RoleID INT PRIMARY KEY IDENTITY(1,1),
    RoleName NVARCHAR(50) NOT NULL
);
GO

-- Crear tabla de Usuarios
CREATE TABLE Users (
    UserID INT PRIMARY KEY IDENTITY(1,1),
    Username NVARCHAR(50) NOT NULL UNIQUE,
    PasswordHash NVARCHAR(255) NOT NULL,
    Email NVARCHAR(100) NOT NULL,
    RoleID INT,
    CONSTRAINT FK_RoleID FOREIGN KEY (RoleID) REFERENCES Roles(RoleID)
);
GO

-- Crear tabla de Instructores
CREATE TABLE Instructors (
    InstructorID INT PRIMARY KEY IDENTITY(1,1),
    UserID INT,
    Name NVARCHAR(100) NOT NULL,
    Email NVARCHAR(100) NOT NULL,
    CONSTRAINT FK_InstructorUserID FOREIGN KEY (UserID) REFERENCES Users(UserID)
);
GO

-- Crear tabla de Alumnos
CREATE TABLE Students (
    StudentID INT PRIMARY KEY IDENTITY(1,1),
    UserID INT,
    Name NVARCHAR(100) NOT NULL,
    Email NVARCHAR(100) NOT NULL,
    EnrollmentDate DATE NOT NULL,
    PlanID INT,
    CONSTRAINT FK_StudentUserID FOREIGN KEY (UserID) REFERENCES Users(UserID)
);
GO

-- Crear tabla de Planes
CREATE TABLE Plans (
    PlanID INT PRIMARY KEY IDENTITY(1,1),
    PlanName NVARCHAR(100) NOT NULL,
    Description NVARCHAR(255) NULL,
    Price DECIMAL(10, 2) NOT NULL
);
GO

-- Crear tabla de Disciplinas
CREATE TABLE Disciplines (
    DisciplineID INT PRIMARY KEY IDENTITY(1,1),
    DisciplineName NVARCHAR(100) NOT NULL,
    Description NVARCHAR(255) NULL
);
GO

-- Crear tabla de Horarios
CREATE TABLE Schedules (
    ScheduleID INT PRIMARY KEY IDENTITY(1,1),
    DisciplineID INT,
    InstructorID INT,
    DayOfWeek NVARCHAR(10) NOT NULL,
    StartTime TIME NOT NULL,
    EndTime TIME NOT NULL,
    CONSTRAINT FK_DisciplineID FOREIGN KEY (DisciplineID) REFERENCES Disciplines(DisciplineID),
    CONSTRAINT FK_ScheduleInstructorID FOREIGN KEY (InstructorID) REFERENCES Instructors(InstructorID)
);
GO

-- Crear tabla para asociar Alumnos a Disciplinas
CREATE TABLE StudentDisciplines (
    StudentDisciplineID INT PRIMARY KEY IDENTITY(1,1),
    StudentID INT,
    DisciplineID INT,
    CONSTRAINT FK_StudentDisciplineStudentID FOREIGN KEY (StudentID) REFERENCES Students(StudentID),
    CONSTRAINT FK_StudentDisciplineDisciplineID FOREIGN KEY (DisciplineID) REFERENCES Disciplines(DisciplineID)
);
GO

-- Crear tabla de Campañas de Email Marketing
CREATE TABLE EmailCampaigns (
    CampaignID INT PRIMARY KEY IDENTITY(1,1),
    CampaignName NVARCHAR(100) NOT NULL,
    Subject NVARCHAR(255) NOT NULL,
    Body NVARCHAR(MAX) NOT NULL,
    SentDate DATE NULL
);
GO

-- Crear tabla de Recordatorios de Pago
CREATE TABLE PaymentReminders (
    ReminderID INT PRIMARY KEY IDENTITY(1,1),
    StudentID INT,
    DueDate DATE NOT NULL,
    ReminderDate DATE NOT NULL,
    SentDate DATE NULL,
    CONSTRAINT FK_PaymentReminderStudentID FOREIGN KEY (StudentID) REFERENCES Students(StudentID)
);
GO

-- Insertar datos iniciales en la tabla de Roles
INSERT INTO Roles (RoleName) VALUES ('Admin'), ('Instructor'), ('Student');
GO

-- Ejemplo de cómo agregar datos iniciales (opcional)
-- Agregar un usuario administrador
INSERT INTO Users (Username, PasswordHash, Email, RoleID)
VALUES ('admin', HASHBYTES('SHA2_256', 'adminpassword'), 'admin@gym.com', (SELECT RoleID FROM Roles WHERE RoleName = 'Admin'));
GO

-- Agregar un plan de ejemplo
INSERT INTO Plans (PlanName, Description, Price)
VALUES ('Plan Básico', 'Acceso a todas las disciplinas', 30.00);
GO

-- Agregar una disciplina de ejemplo
INSERT INTO Disciplines (DisciplineName, Description)
VALUES ('Yoga', 'Clase de Yoga para todos los niveles');
GO

-- Agregar un instructor de ejemplo
INSERT INTO Users (Username, PasswordHash, Email, RoleID)
VALUES ('instructor1', HASHBYTES('SHA2_256', 'instructorpassword'), 'instructor1@gym.com', (SELECT RoleID FROM Roles WHERE RoleName = 'Instructor'));
GO

-- Obtener el UserID del instructor recién creado
DECLARE @InstructorUserID INT;
SET @InstructorUserID = (SELECT UserID FROM Users WHERE Username = 'instructor1');

-- Agregar el instructor a la tabla de Instructores
INSERT INTO Instructors (UserID, Name, Email)
VALUES (@InstructorUserID, 'Instructor Uno', 'instructor1@gym.com');
GO

-- Agregar un alumno de ejemplo
INSERT INTO Users (Username, PasswordHash, Email, RoleID)
VALUES ('student1', HASHBYTES('SHA2_256', 'studentpassword'), 'student1@gym.com', (SELECT RoleID FROM Roles WHERE RoleName = 'Student'));
GO

-- Obtener el UserID del alumno recién creado
DECLARE @StudentUserID INT;
SET @StudentUserID = (SELECT UserID FROM Users WHERE Username = 'student1');

-- Agregar el alumno a la tabla de Alumnos
INSERT INTO Students (UserID, Name, Email, EnrollmentDate, PlanID)
VALUES (@StudentUserID, 'Alumno Uno', 'student1@gym.com', GETDATE(), (SELECT PlanID FROM Plans WHERE PlanName = 'Plan Básico'));
GO
