import UsersTable from "./UsersTable";
import {connect} from "react-redux";
import {Delete, Edit} from "@mui/icons-material";
import {deActivateUser, editUser} from "../../../../redux/action";


const mapStateToProps=(store)=>({
    data:store.Users.users,

})

const mapDisPatchToProps={
    deActivateUser,
    editUser,
}

const mergeProps=(mapStateToProps)=>{

    return({
        ...mapStateToProps,
        ...mapDisPatchToProps,
        defaultSort:"firstName",
        columns:[],
        title:"Users",
        rowActions:[
            {
                icon:<Delete/>,
                onClick: (rowData)=>deActivateUser(rowData),
            },
            {
                icon: <Edit/>,
                onClick: (rowData)=>editUser(rowData),
            }

        ]
    });
}

export default connect(mapStateToProps,mapDisPatchToProps,mergeProps)(UsersTable);
