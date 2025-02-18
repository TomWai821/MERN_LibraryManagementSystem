import { Fragment } from "react/jsx-runtime"
import { FC } from "react"
import CustomTabPanel from "../../../UIFragment/TabPanel/CustomTabPanel"
import { UserDataTableInterface } from "../../../../Model/TablePageModel"
import UserDataTable from "../Tables/UserDataTable"

const UserTabPanel:FC<UserDataTableInterface> = ({value, isAdmin, userData}) =>
{
    return(
        <Fragment>
            <CustomTabPanel index={0} value={value}>
                <UserDataTable isAdmin={isAdmin} userData={userData} value={value}/>
            </CustomTabPanel>
        </Fragment>
    )
}

export default UserTabPanel