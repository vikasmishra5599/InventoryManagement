import {connect} from "react-redux";
import { Edit} from "@mui/icons-material";
import {deActivateUser, setAddEditUserDialogOpen} from "../../../../redux/action";
import CustomMUITable from "../../../../common/Table/CustomMUITable";

const mapStateToProps=(store)=>({
    data:store.Users.users,
    profile: store.UserProfile.profile,
})

const mapDisPatchToProps={
    deActivateUser,
    setAddEditUserDialogOpen,
}

const mergeProps=(stateProps, dispatchProps, ownProps)=>{

    return({
        ...stateProps,
        ...dispatchProps,
        ...ownProps,
        defaultSort:"id",
        columns:[
            {
                id: 'firstName',
                numeric: false,
                disablePadding: false,
                label: 'First Name',
            },
            {
                id: 'lastName',
                numeric: false,
                disablePadding: false,
                label: 'Last Name',
            },
            {
                id: 'email',
                numeric: false,
                disablePadding: true,
                label: 'Email',
            },
            {
                id: 'isActive',
                numeric: false,
                disablePadding: true,
                label: 'Active',
                render:(rowData)=> rowData.isActive ? 'Y' : 'N',
            },
            {
                id: 'Roles',
                numeric: false,
                disablePadding: true,
                label: 'Roles',
                render:(rowData)=> rowData.roles?.map(role => role.replace('ROLE_','')).toString(),
            },
        ],
        title:"Users",
        customRowsPerPage : [7,10],
        rowSelectCheckBox : true,
        useDensePadding : true,
        tableWidth:1200,
        rowActions:[
            {
                disabled: (rowData) =>(rowData.id === stateProps.profile.id),
                icon: <Edit sx={{color:"#ec1c27"}}/>,
                onClickAction: (rowData)=> {
                    dispatchProps.setAddEditUserDialogOpen(true, true, rowData);
                },
            }
        ]
    });
}

export default connect(mapStateToProps,mapDisPatchToProps,mergeProps)(CustomMUITable);
