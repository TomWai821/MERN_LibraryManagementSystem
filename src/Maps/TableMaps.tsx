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

const UserTableHeader = 
[
    {label:"No."},
    {label:"Username"},
    {label:"Email"},
    {label:"Role"},
    {label:"Status"},
    {label:"Gender"},
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

const PaginationOption = [10, 20, 50, 100];

export {BookRecordTableHeader, UserTableHeader, BookTabLabel, UserTabLabel, PaginationOption}