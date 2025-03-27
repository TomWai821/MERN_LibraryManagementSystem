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

// Table Cell Header for User tables
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

// Table Cell Header for Book tables
const AllBookTableHeader = 
[
    {label:"No.", isLoggedIn: false},
    {label:"Image", isLoggedIn: false},
    {label:"BookName", isLoggedIn: false},
    {label:"Genre", isLoggedIn: false},
    {label:"Language", isLoggedIn: false},
    {label:"Author", isLoggedIn: false},
    {label:"Publisher", isLoggedIn: false},
    {label:"Status", isLoggedIn: true},
    {label:"Actions", isLoggedIn: true}
]

const LoanBookTableHeader = 
[
    {label:"No."},
    {label:"Image"},
    {label:"BookName"},
    {label:"Username"},
    {label:"Loan Date"},
    {label:"Due Date"},
    {label:"Status"},
    {label:"Actions"}
]

const SelfLoanBookTableHeader = 
[
    {label:"No."},
    {label:"Image"},
    {label:"BookName"},
    {label:"Loan Date"},
    {label:"Due Date"},
    {label:"Status"},
    {label:"Actions"}
]

const BookTabLabel = 
[
    {label: "All Book"},
    {label: "OnLoan Book"}
]

const UserTabLabel = 
[
    {label: 'All User'},
    {label: 'Suspend List User'},
    {label: 'Deleted List User'}
]

const LoanBookTabLabel = 
[
    {label: 'Loan Book'},
    {label: 'Favourite Book'}
]

const UserDataTableName = ["AllUser", "BannedUser", "DeleteUser"];

const PaginationOption = [10, 20, 50, 100];

const EmptyOption = ["All"];

const RoleOption = ["User", "Admin"];

const StatusOption = ["Normal", "Banned", "Delete"];

const GenderOption = ["Male", "Female"];

const RoleFilterOption = [...RoleOption, ...EmptyOption];

const StatusFilterOption = [...StatusOption, ...EmptyOption];

const GenderFilterOption = [...GenderOption, ...EmptyOption];

export {BookRecordTableHeader, AllUserTableHeader, BannedUserTableHeader, DeleteUserTableHeader, AllBookTableHeader, LoanBookTableHeader, SelfLoanBookTableHeader, BookTabLabel, UserTabLabel, LoanBookTabLabel, UserDataTableName, PaginationOption, EmptyOption, RoleOption, StatusOption, GenderOption, RoleFilterOption, StatusFilterOption, GenderFilterOption}