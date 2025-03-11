const BookRecordTableHeader = [
    {label:"No."}, 
    {label:"Book Name"}, 
    {label:"Language"}, 
    {label:"Genre"}, 
    {label:"Publisher"}, 
    {label:"Author"}, 
    {label:"Pages"}, 
    {label:"Amount"},
    {label:"Actions", condition:"isLoggedIn"}
];

const AllUserTableHeader = 
[
    {label:"No."},
    {label:"Username"},
    {label:"Email"},
    {label:"Role"},
    {label:"Status"},
    {label:"Gender"},
    {label:"Actions"}
]

const BannedUserTableHeader = 
[
    {label:"No.", isAdmin: false},
    {label:"Username", isAdmin: false},
    {label:"Role", isAdmin: false},
    {label:"Description", isAdmin: false},
    {label:"Status", isAdmin: false},
    {label:"Duration", isAdmin: false},
    {label:"Actions", isAdmin: true}
]

const DeleteUserTableHeader = 
[
    {label:"No."},
    {label:"Username"},
    {label:"Role"},
    {label:"Gender"},
    {label:"Start Date"},
    {label:"Due Date"},
    {label:"Status"},
    {label:"Actions"}
]

const BookTabLabel = 
[
    {label: "Book Record"},
    {label: "Book Issued"},
    {label: "Book Return"}
]

const UserTabLabel = 
[
    {label: 'All User'},
    {label: 'Banned User'},
    {label: 'Delete User'}
]

const UserDataTableName = ["AllUser", "BannedUser", "DeleteUser"];

const PaginationOption = [10, 20, 50, 100];

const EmptyOption = [""];

const RoleOption = ["User", "Admin"];

const StatusOption = ["Normal", "Banned", "Delete"];

const GenderOption = ["Male", "Female"];

const RoleFilterOption = [...RoleOption, ...EmptyOption];

const StatusFilterOption = [...StatusOption, ...EmptyOption];

const GenderFilterOption = [...GenderOption, ...EmptyOption];

export {BookRecordTableHeader, AllUserTableHeader, BannedUserTableHeader, DeleteUserTableHeader, BookTabLabel, UserTabLabel, UserDataTableName, PaginationOption, EmptyOption, RoleOption, StatusOption, GenderOption, RoleFilterOption, StatusFilterOption, GenderFilterOption}