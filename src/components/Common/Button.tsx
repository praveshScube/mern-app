import Button from '@mui/material/Button'
import React from 'react'

interface Props {
  disabled?: boolean
  children?: React.ReactNode | null
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
  variant?: any
  width?: any
  size?: any
  icon?: any
  borderRadius?: any
  type?: any
  isdeletebtn?: boolean
}

const CustomButton: React.FC<Props> = ({
  disabled,
  children,
  onClick,
  variant = 'outlined',
  width,
  size,
  icon,
  borderRadius,
  type = 'button',
  isdeletebtn,
}) => {
  const styles: any = {
    border: '1px solid #141C4C',
    color: '#141C4C',
    '&:hover': {
      border: '1px solid #141C4C',
      backgroundColor: 'rgba(20, 28, 76, 0.1);',
    },
    '&:active': {
      background: 'rgba(20, 28, 76, 0.1);',
    },
  }

  const styles1: any = {
    border: 'none',
    color: 'white',
    fontWeight: '700',
    background: isdeletebtn ? '#EF4949' : 'linear-gradient(180deg, #74BFB6 0%, #3A5A40 100%)',
    backgroundColor: isdeletebtn ? '#EF4949' : 'linear-gradient(180deg, #74BFB6 0%, #3A5A40 100%)',
    '&:hover': {
      border: 'none',
      background: isdeletebtn ? '#EF4949' : 'linear-gradient(0deg, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)), linear-gradient(180deg, #74BFB6 0%, #3A5A40 100%)',
      backgroundColor: isdeletebtn ? '#EF4949' : 'linear-gradient(0deg, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)), linear-gradient(180deg, #74BFB6 0%, #3A5A40 100%)',
      opacity: isdeletebtn ? '0.8' : '',
    },
    '&:active': {
      background: isdeletebtn ? '#EF4949' : 'linear-gradient(0deg, rgba(249, 249, 249, 0.2), rgba(249, 249, 249, 0.2)), linear-gradient(180deg, #74BFB6 0%, #3A5A40 100%)',
    },
  }

  const disabledStyles: any = {
    '&:disabled': {
      fontWeight: '700',
      border: 'none ',
      color: '#797979',
      backgroundColor: '#D9D9D9',
    },
  }
  const secondaryStyles: any = {
    border: '1px solid #2F2F2F',
    color: '#2F2F2F',
    '&:hover': {
      // border: '1px solid #141C4C',
      backgroundColor: 'rgba(20, 28, 76, 0.1);',
    },
    '&:active': {
      background: 'rgba(12, 142, 199, 0.1)',
    },
  }

  return (
    <div className={width}>
      <Button
        style={{ borderRadius, textTransform: 'none' }}
        fullWidth
        size={size}
        disabled={disabled}
        onClick={onClick}
        variant={variant}
        startIcon={icon}
        className='font-nunitoRegular'
        type={type}
        sx={
          variant === 'secondary' && !disabled
            ? secondaryStyles
            : variant === 'outlined' && !disabled
            ? styles
            : variant === 'contained' && !disabled
            ? styles1
            : disabled && variant === 'contained'
            ? {
                '&:disabled': {
                  fontWeight: '700',
                  border: 'none',
                  color: '#6A6A78 !important',
                },
              }
            : disabled
            ? disabledStyles
            : ''
        }
      >
        <p className='w-full font-redHatDisplayBold text-sm'>{children}</p>
      </Button>
    </div>
  )
}
CustomButton.defaultProps = {
  disabled: false,
  children: null,
  variant: '',
  width: '',
  size: '',
  icon: '',
  borderRadius: '',
  onClick: function test() {},
}
export default CustomButton
