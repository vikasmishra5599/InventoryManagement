import {makeStyles} from '@mui/styles';

export const useStyles = makeStyles({
  title: {
    flexGrow: 1,
    fontWeight: 'bold'
  },

  footer: {
    bottom: 0,
    textAlign: 'center',
    position: 'fixed',
    left: 'auto',
    right: 0,
    width: '100%',
    boxShadow: '0 3px 10px rgb(0 0 0 / 0.2)'
  },

  messageError: {
    borderLeft: '6px solid #e32d23',
    borderRadius: '2px',
    fill: '#eb6761',
    backgroundColor: '#fdeeed',
    padding: '1rem',
  },

  messageWarn: {
    borderLeft: '3px solid #fdbb2d',
    borderRadius: '2px',
    fill: '#fdc64e',
    backgroundColor: '#fff7d7',
    padding: '1rem',
  },

  messageSuccess: {
    backgroundColor: '#f1f7e9',
    borderRadius: '2px',
    fill: '7bc144',
    padding: '1rem',
  },

});
