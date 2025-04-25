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

const SuspendUserTableHeader = 
[
    {label:"No.", isAdmin: false},
    {label:"Username", isAdmin: false},
    {label:"Role", isAdmin: false},
    {label:"Description", isAdmin: false},
    {label:"StartDate", isAdmin: false},
    {label:"DueDate", isAdmin: false},
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
    {label:"Return Date"},
    {label:"Fines Paid"},
    {label:"Fines Amount"},
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
    {label:"Return Date"},
    {label:"Fines Paid"},
    {label:"Fine Amount"}
]

const PublisherTableHeader = 
[
    {label:"No."},
    {label:"Publisher"},
    {label:"Email"},
    {label:"Phone No."},
    {label:"Action"}
]

const AuthorTableHeader = 
[
    {label:"No."},
    {label:"Author"},
    {label:"Email"},
    {label:"Phone No."},
    {label:"Action"}
]

// For Tabs
const UserTabLabel = 
[
    {label: 'All User'},
    {label: 'Suspend List User'},
    {label: 'Deleted List User'}
]

const BookTabLabel = 
[
    {label: "Book Data"},
    {label: "Loan Record"}
]

const BookDataTabLabel =
[
    {label: "Book Data"},
    {label: "Book Data (Google Books)"}
]

const LoanBookModalTabLabel = 
[
    {label: "Self Loaned"},
    {label: "User Loaned"}
]

const BookRecordTabLabel = 
[
    {label: 'Loan Book Record'},
    {label: 'Favourite Book Record'}
]

const ContactTabLabel = 
[
    {label:"Author List"},
    {label:"publisher List"},
]

const UserDataTableName = ["AllUser", "SuspendUser", "DeleteUser"];

const PaginationOption = [10, 20, 50, 100];

const EmptyOption = ["All"];

const RoleOption = ["User", "Admin"];

const StatusOption = ["Normal", "Suspend", "Delete"];

const GenderOption = ["Male", "Female"];

const RoleFilterOption = [...RoleOption, ...EmptyOption];

const StatusFilterOption = [...StatusOption, ...EmptyOption];

const GenderFilterOption = [...GenderOption, ...EmptyOption];

const LoanBookStatusOption = ["Loaned", "Returned", "Returned(Late)", "All"];

const FinesPaidStatusOption = ["Not Fine Needed", "Paid", "Not Paid", "All"]

const AllBookStatusOption = ["OnShelf", "Loaned", "All"];

export {BookRecordTableHeader, AllUserTableHeader, SuspendUserTableHeader, DeleteUserTableHeader, AllBookTableHeader, LoanBookTableHeader, SelfLoanBookTableHeader, PublisherTableHeader, AuthorTableHeader, BookTabLabel, BookDataTabLabel, UserTabLabel, LoanBookModalTabLabel, BookRecordTabLabel, ContactTabLabel, UserDataTableName, PaginationOption, EmptyOption, RoleOption, StatusOption, GenderOption, RoleFilterOption, StatusFilterOption, GenderFilterOption, LoanBookStatusOption, FinesPaidStatusOption, AllBookStatusOption}