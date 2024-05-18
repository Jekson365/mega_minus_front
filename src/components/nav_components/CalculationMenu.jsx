import React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';



function CalculationMenu() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <>
            <Button
                id="demo-positioned-button"
                aria-controls={open ? 'demo-positioned-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                <Typography
                    color={'white'}
                >
                    კალკულაცია
                </Typography>
            </Button>
            <Menu
                id="demo-positioned-menu"
                aria-labelledby="demo-positioned-button"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                <MenuItem onClick={handleClose}>
                    <Typography
                        color={'black'}
                        to={'/calculation'}
                        component={Link}>
                        კალკულაცია
                    </Typography>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <Typography
                        component={Link}
                        color={'black'}
                        to={'/mycalcs'}
                    >ჩემი კალკულაციები</Typography>
                </MenuItem>
            </Menu>
        </>
    )
}

export default CalculationMenu