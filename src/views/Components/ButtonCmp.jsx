import { Button } from '@mui/joy'
import React, { memo } from 'react'

const ButtonCmp = ({ name, style, onClick }) => {
    return (
        <Button
            color="neutral"
            onClick={onClick}
            size="sm"
            sx={{
                ...style,
                backgroundColor: '#ebebeb',
                color: 'black',
                borderRadius: '3px',
                border: '1px solid #ebebeb',
                width: '49%',
                boxShadow: '0px 1px 3px rgba(000,000,000,0.5), inset 0px 0px 1px rgba(255,255,255,1)',
                ':hover': {
                    backgroundColor: '#ebebeb',
                    // boxShadow: '0px 1px 3px orange, inset 0px 0px 1px orange'
                    border: '1px solid orange',
                }
            }}
        >{name}</Button>
    )
}

export default memo(ButtonCmp)