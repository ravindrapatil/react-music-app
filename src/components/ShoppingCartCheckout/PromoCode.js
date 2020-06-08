import React, { useState } from 'react';
import {
    CardActions,
    Collapse,
    CardContent,
    Button,
    TextField
} from '@material-ui/core/';

import { connect } from 'react-redux';
import { handleChange } from '../../appRedux';

function PromoCode({ disabledBtn, giveDiscount, handlePromoCodeChange, promoCode, successMsgLabel }) {
    const [state, setstate] = useState({
        open: false,
        expanded: false
    });
    const { open, expanded } = state;

    const handleExpandClick = () => {
        setstate({
            ...state,
            open: !open,
            expanded: !expanded
        })
    }

    const handleCodeChange = (e) => {
        handlePromoCodeChange(e)
    }

    const keyPress = (e) => {
        if (e.keyCode === 13) {
            if (e.target.value.length) {
                giveDiscount();
                e.preventDefault();
            }
        }
    }

    return (
        <div className="shippingBlock" style={{ textAlign: 'center' }}>
            <CardActions style={{ justifyContent: 'center', padding: '10px 0 8px' }}>
                <Button size="small" color="primary" variant="contained"
                    style={{ backgroundColor: '#6dbee4', boxShadow: 'none' }}
                    onClick={handleExpandClick}>
                    {open === false ? 'Apply ' : 'Hide '} promo code
            </Button>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent style={{ padding: '0 0 10px' }}>
                    <form noValidate autoComplete="off">
                        <div>
                            <TextField id="outlined-basic"
                                className="promoCodeInput"
                                placeholder="Enter promo code"
                                value={promoCode}
                                onChange={handleCodeChange}
                                onKeyDown={keyPress}
                            />
                        </div>
                        <div style={{ fontSize: '11px', padding: '5px 0 0', color: '#949494' }}>(Try with: DISCOUNT)</div>
                        <div style={{ padding: '20px 0 0' }}>
                            <Button variant="contained"
                                size="small"
                                className="greenBtn"
                                color="primary"
                                disabled={disabledBtn}
                                onClick={giveDiscount}>
                                Apply
                            </Button>
                        </div>
                        {
                            successMsgLabel &&
                            <div style={{ fontSize: '11px', padding: '5px 0 0', color: '#3bb33b', fontWeight: 'bold' }}>Promo code successfully applied</div>
                        }
                    </form>
                </CardContent>
            </Collapse>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        promoCode: state.shippingOrder.value
    }
}

const mapDispatchToProps = dispatch => {
    return {
        handlePromoCodeChange: (e) => dispatch(handleChange(e))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PromoCode)
