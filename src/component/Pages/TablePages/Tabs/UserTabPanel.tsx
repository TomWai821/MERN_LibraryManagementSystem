import { Fragment } from "react/jsx-runtime"
import { FC } from "react"
import CustomTabPanel from "../../../UIFragment/TabPanel/CustomTabPanel"
import { UserDataTableInterface } from "../../../../Model/TablePageModel"
import AllUserDataTable from "../Tables/AllUserDataTable"
import BannedUserDataTable from "../Tables/BannedUserDataTable"
import DeleteUserDataTable from "../Tables/DeleteUserDataTable"

const UserTabPanel:FC<UserDataTableInterface> = (userTableData) =>
{
    const {value, isAdmin, userData, paginationValue} = userTableData
    return(
        <Fragment>
            <CustomTabPanel index={0} value={value}>
                <AllUserDataTable isAdmin={isAdmin} userData={userData} value={value} paginationValue={paginationValue}/>
            </CustomTabPanel>

            <CustomTabPanel index={1} value={value}>
                <BannedUserDataTable isAdmin={isAdmin} userData={userData} value={value} paginationValue={paginationValue}/>
            </CustomTabPanel>

            <CustomTabPanel index={2} value={value}>
                <DeleteUserDataTable isAdmin={isAdmin} userData={userData} value={value} paginationValue={paginationValue}/>
            </CustomTabPanel>
        </Fragment>
    )
}

export default UserTabPanel