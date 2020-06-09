import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
    Card,
    Typography,
    makeStyles,
    Divider
} from '@material-ui/core/';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import SubTotal from './SubTotal';
import PickupSavings from './PickupSavings';
import TaxesFees from './TaxesFees';
import EstimatedTotal from './EstimatedTotal';
import ItemDetails from './ItemDetails';
import PromoCode from './PromoCode';

const useStyle = makeStyles(() => ({
    root: {
        maxWidth: 345,
        margin: '0 auto'
    },
    title: {
        padding: '20px 0'
    }
}));

function ShoppingCart({ promoCode }) {
    const classes = useStyle();
    const initialState = {
        total: 200,
        pickupSaving: -3.75,
        taxes: 0,
        estimatedTotal: 0,
        disabledBtn: false,
        successMsgLabel: false
    }
    const [state, setstate] = useState(initialState);
    const { total, pickupSaving, taxes, estimatedTotal, disabledBtn, successMsgLabel } = state;

    useEffect(() => {
        setstate({
            ...state,
            taxes: (total + pickupSaving) * 0.0875,
            estimatedTotal: total + pickupSaving + taxes
        })
    }, [taxes]);

    const giveDiscount = () => {
        if (promoCode === 'DISCOUNT') {
            setstate({
                ...state,
                estimatedTotal: estimatedTotal * 0.9,
                disabledBtn: true,
                successMsgLabel: true
            })
        } else {
            toast("Wrong promo code !")
        }
    }

    return (
        <div>
            <Typography variant="h6" className={classes.title}>
                Shopping Cart Checkout - Apply Promo code
            </Typography>
            <Card className={classes.root}>
                <SubTotal total={total.toFixed(2)}></SubTotal>
                <PickupSavings pickupSaving={pickupSaving}></PickupSavings>
                <TaxesFees taxes={taxes.toFixed(2)} />
                <Divider light />
                <EstimatedTotal estimatedTotal={estimatedTotal.toFixed(2)} />
                <ItemDetails estimatedTotal={estimatedTotal.toFixed(2)} />
                <Divider light />
                <PromoCode disabledBtn={disabledBtn} giveDiscount={giveDiscount} successMsgLabel={successMsgLabel} />
            </Card>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnVisibilityChange
                draggable
                pauseOnHover />
        </div>
    )
}

const mapStateToProps = state => {
    return {
        promoCode: state.shippingOrder.value
    }
}

export default connect(mapStateToProps, undefined)(ShoppingCart)
