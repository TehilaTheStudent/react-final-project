
import {
    CardMeta,
    CardHeader,
    CardDescription,
    CardContent,
    Card,
    Icon,
    Image,
    Segment,
    SegmentGroup,
    Divider,
    Label,
    ButtonContent, Button, Grid, GridColumn, Header
} from "semantic-ui-react";

import Snackbar from '@mui/material/Snackbar';
import { useState } from "react";
import Slide from '@mui/material/Slide';
import Fade from '@mui/material/Fade';

export default function ProductCard({ pressDisplayProduct, product, press, manager }) {

    const [open, setOpen] = useState({
        open: false,
        Transition: Fade,
    });
    function SlideTransition(props) {
        return <Slide {...props} direction="up" />;
      }

    const handleClick = (Transition) =>  {
         press(manager ? product.id : product)
        setOpen({
            open: true,
            Transition,
        });
    };

    const handleClose = () => {
        setOpen({
            ...open,
            open: false,
        });
    };

    return (<>
        <div className="hover">
            <Card className="product-card">
                <div className="image-container " onClick={() => { pressDisplayProduct(product.id) }} >
                    {/* <Image  src={product.imgUrl} wrapped ui={false} label={{

                        color: 'black',
                        content: product.company,
                        ribbon: 'right'
                    }} /> */}
                    <div className="container">
                        <img src={product.imgUrl} alt="Avatar" className="image" />
                            <div className="middle">
                                <div className="text">פרטים נוספים</div>
                            </div>
                    </div>
                </div>
                <CardContent  >
                    <CardHeader textAlign="right">{product.name}</CardHeader>
                    <CardMeta textAlign="right">
                        <span >{product.content} </span>
                    </CardMeta>
                    <Grid>
                            <GridColumn floated='left' width={5}>
                                <Button onClick={()=>{handleClick(SlideTransition)}}>
                                    <ButtonContent >
                                        <Icon name={manager ? 'edit' : 'plus cart'} size="large" />
                                    </ButtonContent>
                                </Button>
                            </GridColumn>
                        <GridColumn floated='right' width={5} verticalAlign="middle" textAlign="right">
                          <Header color="blue"  as="h3" textAlign="right"> {` ${product.price} $`}</Header>

                        </GridColumn>
                    </Grid>
                </CardContent>
            </Card>
            <Snackbar
                open={open.open}
                autoHideDuration={5000}
                onClose={handleClose}
                message={`מוצר ${product.name} ${1} נוסף לעגלה`}
                TransitionComponent={open.Transition}
                key={open.Transition.name}
            />
        </div>
    </>)

}