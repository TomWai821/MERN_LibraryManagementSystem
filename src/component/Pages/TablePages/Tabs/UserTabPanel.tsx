import { FC, Fragment } from "react"

// Tabs
import CustomTabPanel from "../../../UIFragment/CustomTabPanel"

// Another Component
import AllUserTable from "../Tables/AllUserTable"
import BannedUserTable from "../Tables/BannedUserTable"
import DeleteUserTable from "../Tables/DeleteUserTable"

// Model
import { UserDataTableInterface } from "../../../../Model/UserTableModel"

const UserTabPanel:FC<UserDataTableInterface> = (userTableData) =>
{
    const {value, isAdmin, userData, paginationValue} = userTableData
    
    return(
        <Fragment>
            <CustomTabPanel index={0} value={value}>
                <AllUserTable isAdmin={isAdmin} userData={userData} value={value} paginationValue={paginationValue}/>
            </CustomTabPanel>

            <CustomTabPanel index={1} value={value}>
                <BannedUserTable isAdmin={isAdmin} userData={userData} value={value} paginationValue={paginationValue}/>
            </CustomTabPanel>

            <CustomTabPanel index={2} value={value}>
                <DeleteUserTable isAdmin={isAdmin} userData={userData} value={value} paginationValue={paginationValue}/>
            </CustomTabPanel>
        </Fragment>
    )
}

export default UserTabPanel