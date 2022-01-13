select LOWER(StudentName) from student

select UPPER(StudentName) from student

select max(age) from student

select min(age) from student

select avg(age) from student

select sum(age) from student

select count(age) from student

BEGIN TRANSACTION
delete from student
where StudentID = 4
rollback

BEGIN TRANSACTION;
INSERT INTO Student(StudentName)
VALUES('RAJ')
COMMIT TRANSACTION

select * from student

CREATE LOGIN Rushi WITH PASSWORD = 'Pass123'

CREATE USER Rushi FROM LOGIN Rushi



