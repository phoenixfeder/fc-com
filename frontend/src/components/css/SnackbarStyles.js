import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import ErrorIcon from '@material-ui/icons/Error'
import green from "@material-ui/core/es/colors/green";
import red from "@material-ui/core/es/colors/red";

const success = {
    backgroundColor: green[600],
    iconName: 'checkcircle',
}

const error = {
    backgroundColor: red[500],
    iconName: 'error',
}

const defaultStyle = {
    backgroundColor: red[500],
    iconName: 'error',
}

export const getStyle = (name) => {
    switch (name) {
        case 'success': return success;
        case 'error' : return error;
        default: return defaultStyle;
    }
}
