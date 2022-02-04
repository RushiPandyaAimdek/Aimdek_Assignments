CREATE TABLE Lecture
(
	LectureID int Primary key,
	Name varchar(50)
)
CREATE TABLE Teacher
(
	TeacherID int Primary key,
	Name varchar(50),
	age int,
	LectureID int FOREIGN KEY REFERENCES Lecture(LectureID)
)
CREATE TABLE Student
(
	StudentID int Primary key,
	Name varchar(50),
	age int,
	email varchar(50),
	LectureID int FOREIGN KEY REFERENCES Lecture(LectureID)
)

INSERT INTO Lecture
VALUES
(1,'DBMS'),
(2,'JAVASCRPIT'),
(3,'AJAX'),
(4,'JQUERY'),
(5,'JAVA')

INSERT INTO STUDENT
VALUES
(1,'Rushi',21,'rushi@aimdek.com',5),
(2,'Pranjal',20,'p@aimdek.com',4),
(3,'Dipam',15,'dipam@gmail.com',3),
(4,'Dev',20,'dev@aimdek.com',1)

INSERT INTO Teacher
VALUES
(1,'Pandya',21,5),
(2,'Pansuriya',20,4),
(3,'Donga',15,3),
(4,'Gohel',20,1)

SELECT Teacher.name, lecture.Name as Lecture FROM teacher
inner join lecture
on
lecture.LectureID = Teacher.LectureID

insert into lecture 
values
(6,null)

insert into Student 
values
(5,'prince',21,null,1),
(6,'rishit',20,null,4)

insert into Teacher 
values
(5,'koringa',null,null)

SELECT Student.name as Studentname, lecture.Name as Lecture FROM Lecture
left outer join Student
on
Student.LectureID = Lecture.LectureID

SELECT Teacher.name, lecture.Name as Lecture FROM Lecture
right outer join Teacher
on
lecture.LectureID = Teacher.LectureID

SELECT Teacher.name as Teachername, Student.Name as Studentname, Student.Email as Studentemail FROM teacher
full outer join Student
on
Student.LectureID = Teacher.LectureID

CREATE VIEW [StudentCopy]
AS
SELECT Name, age, email
FROM Student
WHERE age > 15;

SELECT * FROM StudentCopy

CREATE PROCEDURE SP_Student_SelectByPK 
	@StudentID int
AS
Select name,age
FROM Student
WHERE Student.StudentID = @StudentID

EXEC SP_Student_SelectByPK 3


CREATE PROCEDURE SP_Student_Select
	@Age Int,
	@Count Int Output
AS
Select * from Student
Where Student.age = @Age
Select @count = @@Rowcount

Declare @Count Int
Exec SP_Student_Select 20, @Count = @Count Output

Select @Count as 'Total Student'


BEGIN TRY
  SELECT * from student
  WHERE NAME = 12
END TRY
BEGIN CATCH
  SELECT
    ERROR_MESSAGE() AS ErrorMessage;
END CATCH;
