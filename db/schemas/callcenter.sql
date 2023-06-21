CREATE SCHEMA callcenter COLLATE = utf8_general_ci;

Create table CustomerTracking
(
CustID varchar(10),
PRIMARY KEY(CustId), 
FName varchar(20) not null, 
LName varchar(20) not null, 
Address varchar(30) not null,
Phone varchar(15) not null, 
email varchar(50) not null);
                   
Create table Employees(
EmpID varchar(10),
PRIMARY KEY(EmpId),
EFirstName varchar(20),
ELastName varchar(20),
Address varchar(30),
Age int,
D_Join datetime,
Dept varchar(20),
Salary double);

Create table Product(
ProdID varchar(7),
PRIMARY KEY(ProdID),
ProdName varchar(30) not null,
Base_Cost double);

CREATE TABLE CustOrder(
	Inv varchar(7) NOT NULL,
	PRIMARY KEY(Inv),
	Date varchar(10) NULL ,
	CustID varchar (10),
	FOREIGN KEY (CustID) REFERENCES CustomerTracking(CustID),
	ProdID varchar (7),
	FOREIGN KEY (ProdID) REFERENCES Product(ProdID),
	Cost double NULL ,
	Advance double NULL 
) ;


CREATE TABLE QueryHandling (
	QID varchar (10),
	PRIMARY KEY(QID),
	Sub_Date datetime NOT NULL ,
	Cust_ID varchar (10),
	FOREIGN KEY (Cust_ID) REFERENCES CustomerTracking(CustID),
	EmpID varchar (10) NOT NULL references Employees(EmpID) ,
	FOREIGN KEY (EmpID) REFERENCES Employees(EmpID),
	Res_Date datetime NULL ,
	Status varchar (10) NULL ,
	Feedback int NULL ,
	Query_Text varchar (250) NULL ,
	Query_Response varchar (150) NULL 
) ;

insert into CustomerTracking (CustID,FName,LName,Address,Phone,email)
values('C001','Leo','Waugh','P-23','234-34-445','Leo@Yahoo.com'),
('C002','Cammy','Bidestone','65-A','122-89-009','Camm@usa.net'),
('C003','Katherine','Carol','A-65/1','101-00-221','Kath@Yahoo.com'),
('C004','Sandy','Smith','59/A','400-55-211','sansm@usa.net'),
('C005','Steve','Donald','K-19','301-11-500','SDonald@usa.net');

insert into Employees(EmpID,EFirstName,ELastName,Address,Age,D_Join,Dept,Salary)
values('E001','John','Pollock','59/B',45,'1997-07-13','Sales',45000),
('E002','Shawn','Layman','A-98',33,'1997-08-18','Marketing',23000),
('E003','Lawrence','Gibbs','79/C',31,'1998-04-23','Sales',35000),
('E004','Oman','Karim','81-B',32,'1998-11-14','Marketing',43000),
('E005','Jackie','Buckner','69-South Block',27,'1999-01-16','Sales',25000);


insert into Product (ProdId,ProdName,Base_Cost) values('P001','Mobile Model 1125',2500),
('P002','Mobile Model 1129',2700),
('P003','Mobile Model 1142',2600),
('P004','Mobile Model 2330',3000),
('P005','Cash Card(Easy)',2000),
('P006','Cash Card(Green)',500),
('P007','Sim Card(Easy)',1000),
('P008','Sim Card(Green)',2500),
('P009','Mobile Model 3431',3200),
('P010','Mobile Model 3501',3000),
('P011','Mobile Model 6101',3500),
('P012','Cash Card',4000),
('P013','Sim Card',2500),
('P014','Mobile Model 6610',4000),
('P015','Mobile Model 7771',3000),
('P016','Mobile Model 8110',2500),
('P017','Mobile Model 8890',3500);

insert into CustOrder values('I006','2001-05-27','C002','P015', 3000,2000),
('I007','2001-05-30','C001','P011',3500,3100),
('I008','2001-06-13','C003','P017', 3500,3000),
('I009','2001-06-25','C003','P011', 3500,3100);

insert into QueryHandling (QID,Sub_Date,Cust_ID,EmpId,Res_Date,Status,Feedback,Query_Text,Query_Response)
values('Q001','2001-07-09','C002','E005','2001-07-15','Done', 4,'I am unable to send SMS from my mobile though I am able to receive SMS','Please enter the Message Center No. as - 981010001, before sending any SMS'),
('Q002','2001-07-11','C002','E005','2001-07-23','Done', 2,'Presently, I am using a Cash Card. Past 2 days whenever I try to make a call before giving the conncetion - It asks me to recharge my card. How to recharge a Cash Card?','You can buy Cash Card from any Diaz Telecommunication dealer. The steps to recharge are given with the cash card.'),
('Q003','2001-08-15','C001','E005','2001-07-20', 'Pending', 2, 'What is the amount I have to pay, if I want to enable Roaming Facility in my mobile?', NULL),
('Q004','2001-08-21','C003','E001','2001-08-25', 'Pending',2, 'My card has got locked because I tried entering wrong PIN number thrice. PLease help.', NULL),
('Q005','2001-09-09','C002','E005','2001-09-10','Done',4,'What is the STD code that my friends and collegues can use to dial, if I am out of station (Nagaland). I have Roaming Facility enable in my phone.','You need to just dial 0 (zero) before the exisiting mobile number.');
