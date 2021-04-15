# D-system-backend

api paths
API PATH : http://localhost:5000/api/

# STUDENTS

1.  create student
    METHOD: POST
    PATH : '/students/create'
    BODY: {
    name : String
    surname: String
    email: String
    address: String
    gender: String
    telephone: String,
    classID: String,
    courses: Array [{ courseID: String}]
    nextofKinID: String
    profileUrl: String
    }
    RESPONSE: [
    //404
    {
    success: false
    error: string
    }
    //201
    {
    success: true
    student: Object
    }
    ]

2.  signin
    METHOD: POST
    PATH: '/students/signin'
    BODY: {
    password: String
    studentID: String
    }
    RESPONSE: [
    //404
    {
    success: false
    error: string
    }
    //201
    {
    success: true
    student: Object
    }
    ]

3.  delete
    METHOD: DELETE
    PATH: '/students/delete/:id'
    PARAMS: id -> studentID
    RESPONSE: [
    //404
    {
    success: false
    error: string
    }
    //201
    {
    success: true
    message: String
    }
    ]

4.  change password
    METHOD: PUT
    PATH: '/students/changePassword/:id'
    PARAMS: id -> studentID
    RESPONSE: [
    //404
    {
    success: false
    error: string
    }
    //201
    {
    success: true
    message: String
    }
    ]

5.  edit
    METHOD: PUT
    PATH: '/students/update/:id'
    PARAMS: id -> studentID
    BODY: {
    name : String
    surname: String
    email: String
    address: String
    gender: String
    telephone: String,
    classID: String,
    courses: Array [{ courseID: String}]
    nextofKinID: String
    profileUrl: String
    //any of the above
    }
    RESPONSE: [
    //404
    {
    success: false
    error: string
    }
    //201
    {
    success: true
    student: Object // new value
    }
    ]

6.  get all students
    METHOD: GET
    PATH: '/students'
    RESPONSE: [
    //404
    {
    success: false
    error: string
    }
    //201
    {
    data: Array
    }
    ]

7.  get student by id
    METHOD: GET
    PATH: '/students/student/id'
    PARAMS: id -> studentID
    RESPONSE: [
    //404
    {
    success: false
    error: string
    }
    //201
    {
    success: true
    student: object
    }
    ]

8.  get students in a class
    METHOD: GET
    PATH: '/students/class/id'
    PARAMS: id -> studentID
    RESPONSE: [
    //404
    {
    success: false
    error: string
    }
    //201
    {
    success: true
    students: object
    }
    ]

# TEACHERS

1.  create teacher
    METHOD: POST
    PATH : '/teachers/create'
    BODY: {
    name : String
    surname: String
    email: String
    address: String
    gender: String
    telephone: String,
    positions: Array [{postion: String , department: String}],
    courses: Array [{ courseID: String, classID: String}]
    classes: Array [{}]
    nextofKinID: String
    profileUrl: String
    }

    RESPONSE: [s
    //404
    {
    success: false
    error: string
    }
    //201
    {
    success: true
    student: Object
    }
    ]

2.  signin
    METHOD: POST
    PATH: '/teachers/signin'
    BODY: {
    password: String
    teacherID: String
    }
    RESPONSE: [
    //404
    {
    success: false
    error: string
    }
    //201
    {
    success: true
    teacher: Object
    }
    ]

3.  delete
    METHOD: DELETE
    PATH: '/teachers/delete/:id'
    PARAMS: id -> teacherID
    RESPONSE: [
    //404
    {
    success: false
    error: string
    }
    //201
    {
    success: true
    message: String
    }

4.  change password
    METHOD: PUT
    PATH: '/teachers/changePassword/:id'
    PARAMS: id -> teacherID
    RESPONSE: [
    //404
    {
    success: false
    error: string
    }
    //201
    {
    success: true
    message: String
    }
    ]

5.  edit
    METHOD: PUT
    PATH: '/teachers/update/:id'
    PARAMS: id -> teacherID
    BODY: {
    name : String
    surname: String
    email: String
    address: String
    gender: String
    telephone: String,
    classID: String,
    courses: Array [{ courseID: String}]
    nextofKinID: String
    profileUrl: String
    //any of the above
    }
    RESPONSE: [
    //404
    {
    success: false
    error: string
    }
    //201
    {
    success: true
    teacher: Object // new value
    }
    ]

6.  get all teachers
    METHOD: GET
    PATH: '/teachers'
    RESPONSE: [
    //404
    {
    success: false
    error: string
    }
    //201
    {
    data: Array
    }
    ]

7.  get teacher by id
    METHOD: GET
    PATH: '/teachers/id'
    PARAMS: id -> teacherID
    RESPONSE: [
    //404
    {
    success: false
    error: string
    }
    //201
    {
    success: true
    student: object
    }
    ]

# NONTEACHERS

1.  create nonTeacher
    METHOD: POST
    PATH : '/nonteachers/create'
    BODY: {
    name : String
    surname: String
    email: String
    address: String
    gender: String
    telephone: String,
    position: String
    nextofKinID: String
    profileUrl: String
    }
    RESPONSE: [s
    //404
    {
    success: false
    error: string
    }
    //201
    {
    success: true
    user: Object
    }
    ]

2.  signin
    METHOD: POST
    PATH: '/nonteachers/signin'
    BODY: {
    password: String
    nonteacherID: String
    }
    RESPONSE: [
    //404
    {
    success: false
    error: string
    }
    //201
    {
    success: true
    user: Object
    }
    ]

3.  delete
    METHOD: DELETE
    PATH: '/nonteachers/delete/:id'
    PARAMS: id -> teacherID
    RESPONSE: [
    //404
    {
    success: false
    error: string
    }
    //201
    {
    success: true
    message: String
    }

4.  change password
    METHOD: PUT
    PATH: '/nonteachers/changePassword/:id'
    PARAMS: id -> teacherID
    RESPONSE: [
    //404
    {
    success: false
    error: string
    }
    //201
    {
    success: true
    message: String
    }
    ]

5.  edit
    METHOD: PUT
    PATH: '/nonteachers/update/:id'
    PARAMS: id -> teacherID
    BODY: {
    name : String
    surname: String
    email: String
    address: String
    gender: String
    telephone: String,
    classID: String,
    courses: Array [{ courseID: String}]
    nextofKinID: String
    profileUrl: String
    //any of the above
    }
    RESPONSE: [
    //404
    {
    success: false
    error: string
    }
    //201
    {
    success: true
    teacher: Object // new value
    }
    ]

6.  get all nonteachers
    METHOD: GET
    PATH: '/nonteachers'
    RESPONSE: [
    //404
    {
    success: false
    error: string
    }
    //201
    {
    data: Array
    }
    ]

7.  get nonteacher by id
    METHOD: GET
    PATH: '/teachers/id'
    PARAMS: id -> nonteacherID
    RESPONSE: [
    //404
    {
    success: false
    error: string
    }
    //201
    {
    success: true
    student: object
    }
    ]

# COURSES

1. create
   METHOD: POST
   PATH : '/courses/create'
   BODY: {
   name : String
   teachers: Array [{teacherID: String}]
   }
   RESPONSE: [
   //404
   {
   success: false
   error: string
   }
   //201
   {
   success: true
   doc: Object
   }
   ]

2. edit
   METHOD: PUT
   PATH: '/courses/update/:id'
   PARAMS: ID => courseid
   BODY: {
   name : String
   teachers: Array [{teacherID: String}]
   //any of the above
   }
   RESPONSE: [
   {
   success: false,
   error: String
   }
   {
   success: true,
   doc: Object
   }
   ]

3. delete
   METHOD: DELETE
   PATH: '/courses/delete/:id'
   PARAMS : id => courseID,
   RESPONSE: [
   {
   success: false,
   error: String
   }
   {
   success: true,
   doc: Object
   }
   ]

4. get all course
   METHOD: GET
   PATH: '/courses'
   RESPONSE: [
   {
   success: false,
   error: String
   }
   {
   success: true,
   doc: Object
   }
   ]

5. get course by id
   METHOD: GET
   PATH: '/courses/id'
   PARAMS : id => courseID,
   RESPONSE: [
   {
   success: false,
   error: String
   }
   {
   success: true,
   doc: Object
   }
   ]

# CLASSES

# DEPARTMENTS

# ATTENDENCE

# CHAT

# FILES

# NEXTOFKIN

# NOTIFICATION

# RESULTS

# TASK

# TIMETABLE
