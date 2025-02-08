const RegisterFields = 
[
    {name:"email", type:"email", label:"Email:"},
    {name:"username", type:"text", label:"Username:"},
    {name:"password", type:"password", label:"Password:"},
    {name:"birthDay", type:"date", label:"Date Of Birth:"}
]

const LoginFields = 
[
    { name: "email", type: "email", label: "Email" },
    { name: "password", type: "password", label: "Password" }
];

const ViewProfileFields = 
[
    {name: "email", label: "Email:", type: "email", disable: true}, 
    {name: "gender", label: "Gender:", type: "string", disable: true},
    {name: "username", label: "Username:", type: "string", disable: true}, 
    {name: "newName", label: "New Name:", type: "string"},
    {name: "role", label: "Role:",  type: "string", disable: true}, 
    {name: "newPassword", label: "New Password:", type: "password"}
]

const BookSearchFields = 
[
    {name: "genre", label: "Genre", type: "text", select: true},
    {name: "publisher", label: "Publisher Name", type: "text"},
    {name: "author", label: "Author Name", type: "text"},
    {name: "pages", label: "Pages", type: "number", slotProps: {htmlInput:{min: 0, max: 500}}}
]

const UserSearchFields = 
[
    {name: "email", label: "Email", type: "email"},
    {name: "role", label: "Role", type: "text"},
    {name: "status", label: "Status", type: "text"},
    {name: "gender", label: "Gender", type: "text"}
]

export {RegisterFields, LoginFields, ViewProfileFields, BookSearchFields, UserSearchFields}