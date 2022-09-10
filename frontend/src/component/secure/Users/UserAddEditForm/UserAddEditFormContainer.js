import {UserAddEditForm} from "./UserAddEditForm";
import {connect} from "react-redux";
import {saveEditUser, saveRegisterUser, setAddEditUserDialogOpen} from "../../../../redux/action";


const mapStateToProps = (store) => ({
    isOpen: store.AddEditUserDialog.isOpen, user: store.AddEditUserDialog.user, isEdit: store.AddEditUserDialog.isEdit
})

const mapDispatchToProps = {
    setAddEditUserDialogOpen, saveEditUser, saveRegisterUser
}

const mergeProps = (stateProps, dispatchProps, ownProps) => {
    console.log( ' state props ', stateProps);
    console.log( ' dispatchProps ', dispatchProps);
    console.log( ' ownProps ', ownProps);

    return ({
        ...ownProps, ...stateProps, ...dispatchProps,
        testValue: 'this is test',
        handleCancel: () => {
            dispatchProps.setAddEditUserDialogOpen(false, false, undefined)
        },
        handleSaveUpdate: (values) => {
            console.log (values , ' is edit ', stateProps)
            if (stateProps.isEdit) {
                dispatchProps.saveEditUser(values);
            }else{
                dispatchProps.saveRegisterUser(values)}
        },
    })
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(UserAddEditForm);
