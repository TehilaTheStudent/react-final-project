import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import SmallCart from '../../orderScreens/smallCart'
import { useSelector } from 'react-redux';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "60vw",
  bgcolor: 'background.paper',
  //   border: '2px solid #000',
  boxShadow: 24,
  maxHeight: "50vh",
  p: 4,
  borderRadius: '20px',
};
export default function BasicModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const cartSum = useSelector(store => store.orders.cartSum)

  return (
    <div>
      <Typography paddingTop={2} textAlign={'right'}>
        <Button onClick={handleOpen} size='large' variant='outlined' >צפייה בעגלה</Button>
      </Typography>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2" textAlign={'right'}>

            {cartSum}  :סכום עגלה   <ShoppingCartIcon fontSize='large'></ShoppingCartIcon>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }} >
            <SmallCart></SmallCart>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
