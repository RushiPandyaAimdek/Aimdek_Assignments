CREATE DATABASE Aimdek

CREATE TABLE Student
(
	StudentID int PRIMARY KEY,
	Name varchar(50),
	Age int DEFAULT 18,
	Email varchar(50)
)

INSERT INTO STUDENT
VALUES
(1,'Rushi',21,'rushi@aimdek.com'),
(2,'Pranjal',21,'pansuriya@gmail.com'),
(3,'Dipam',25,'dipo@aimdek.com'),
(4,'Devrsi',10,'dev@aimdek.com')

SELECT * FROM STUDENT
WHERE AGE > 19

SELECT * FROM STUDENT
WHERE NAME LIKE 'D%'

SELECT COUNT(StudentID) AS Student_Count FROM STUDENT

SELECT * FROM STUDENT
WHERE EMAIL NOT LIKE '%@aimdek.com'

ALTER TABLE STUDENT 
ADD DOB date

INSERT INTO STUDENT
VALUES
(8,'XYZ',DEFAULT,'XYZ@gmail.com','2000-10-28')

INSERT INTO STUDENT (StudentID,Name,email)
VALUES
(5,'Prince','prince@gmail.com')

DELETE FROM STUDENT
WHERE StudentID = 4

SELECT age FROM STUDENT
GROUP BY AGE

SELECT * FROM STUDENT
ORDER BY AGE DESC

SELECT * FROM STUDENT
ORDER BY AGE

SELECT MAX(AGE) AS Max_age FROM STUDENT











