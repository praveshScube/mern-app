import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';

interface Props {
  defaultChecked?: boolean
  handleCheck: any
  ischecked?: boolean //   Label?: string;
  name: string
  disabled?:any
}

const label = { inputProps: { 'aria-label': 'Switch demo' } };

const GreenSwitch = styled(Switch)(() => ({

  '& .MuiSwitch-switchBase.Mui-disabled': {
    color: '#C5C9D6',
  },
  '& .MuiSwitch-switchBase.Mui-disabled + .MuiSwitch-track': {
    backgroundColor: '#FFFFFF',
  },
  '& .MuiSwitch-switchBase.Mui-checked': {
    background: 'linear-gradient(0deg, #3A5A40 6.25%, #74BFB6 80%)',
    color: 'transparent',
    width: '20px',
    height: '20px',
    marginTop: '9px',
    marginLeft: '9px',
    '&:hover': {
      backgroundColor: 'rgba(20, 28, 76,0.1)',
    },
  },
  ' & .MuiSwitch-switchBase': {
    color: '#888888',
    '&:hover': {
      backgroundColor: 'rgba(0, 133, 255, 0.1)',
    },
  },
  '.MuiSwitch-track': {
    backgroundColor: '#888888',
  },
  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
    backgroundColor: '#888888',
  },
}));

const Toggle: React.FC<Props> = ({
  ischecked,
  handleCheck,
  defaultChecked,
  disabled,

  name,
}) => (
  <div>
    <GreenSwitch name={name} disabled = {disabled} checked={ischecked} onChange={handleCheck} {...label} />
  </div>
);

export default Toggle;
