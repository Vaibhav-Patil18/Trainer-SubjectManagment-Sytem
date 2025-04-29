Trainer-Subject Management System Documentation
Overview
This is a Trainer-Subject Management System where trainers can be added, deleted, and associated with subjects. You can also retrieve trainers by subject and get subjects along with assigned trainers.

![image](https://github.com/user-attachments/assets/6856e811-87e2-4af4-88dc-83cf47c2c353)





API Endpoints


POST /trainer
Add a new trainer.

Request Body:

{
    "name": "John Doe",
    "email": "john.doe@example.com",
    "subject_id": 1
}

Response:

{
    "message": "Trainer added successfully!"
}

DELETE /trainer
Delete a trainer by empId.

Request Body:

{
    "empId": 1
}

Response:

{
    "message": "Trainer deleted successfully!"
}

GET /trainer/:subject/topic
Get trainers associated with a subject ID.

Response:

[
    {
        "emp_id": 1,
        "name": "John Doe",
        "email": "john.doe@example.com"
    }
]

GET /subject/:id
Get subject details along with all associated trainers.

Response:

{
    "subject_name": "Mathematics",
    "trainers": [
        {
            "emp_id": 1,
            "name": "John Doe",
            "email": "john.doe@example.com"
        }
    ]
}

Database Schema


Trainer Table

CREATE TABLE trainer (
    emp_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE
);

Subject Table

CREATE TABLE subject (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

Trainer_Subject Table

CREATE TABLE trainer_subject (
    trainer_id INT,
    subject_id INT,
    PRIMARY KEY (trainer_id, subject_id),
    FOREIGN KEY (trainer_id) REFERENCES trainer(emp_id),
    FOREIGN KEY (subject_id) REFERENCES subject(id)
);

wireframes



Add Trainer
 Page: Add Trainer
    Elements:
    - Heading: "Add New Trainer"
    - Input: Trainer Name (text)
    - Input: Trainer Email (email)
    - Input: Subject ID (number)
    - Button: "Add Trainer"
    - Response Message Area
    Functionality:
    - Sends POST request to /trainer with trainer details.
View All Trainers
 Page: View All Trainers
    Elements:
    - Heading: "All Trainers"
    - Button: "Fetch All Trainers"
    - Table/List to display trainer name, email, empId, etc.
    Functionality:
    - Sends GET request to /trainer to fetch and display all trainers.
Delete Trainer
 Page: Delete Trainer
    Elements:
    - Heading: "Delete Trainer"
    - Input: Trainer empId (number)
    - Button: "Delete Trainer"
    - Response Message Area
    Functionality:
    - Sends DELETE request to /trainer with empId in body.
Get Trainer by ID
 Page: Get Trainer by ID
    Elements:
    - Heading: "Get Trainer by ID"
    - Input: Trainer empId (number)
    - Button: "Fetch Trainer"
    - Display area for result
    Functionality:
    - Sends GET request to /trainer/{id}
Get Trainers by Subject
 Page: Get Trainers by Subject
    Elements:
    - Heading: "Get Trainers by Subject ID"
    - Input: Subject ID (number)
    - Button: "Fetch Trainers"
    - Display area for results
    Functionality:
    - Sends GET request to /trainer/{subject}/topic
Add Subject
 Page: Add Subject
    Elements:
    - Heading: "Add New Subject"
    - Input: Subject Name (text)
    - Button: "Add Subject"
    - Response Message Area
    Functionality:
    - Sends POST request to /subject with subject name.
View All Subjects
 Page: View All Subjects
    Elements:
    - Heading: "All Subjects"
    - Button: "Fetch Subjects"
    - Display area for subject list
    Functionality:
    - Sends GET request to /subject
Get Subject with Trainers
 Page: Get Subject with Trainers
    Elements:
    - Heading: "Get Subject with Trainers"
    - Input: Subject ID (number)
    - Button: "Fetch Details"
    - Display area for subject name and trainer list
    Functionality:
    - Sends GET request to /subject/{id}

