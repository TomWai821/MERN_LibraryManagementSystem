import { Box, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material"
import { useEffect } from "react"

const UserManagement = () =>
{
    useEffect(() => {})
    
    return(
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 5}}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    <TableRow>
                        <TableCell></TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </Box>
    )
}

export default UserManagement