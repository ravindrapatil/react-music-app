import React from 'react';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';

const styles = {
    height: '80vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
}

function LoginPage({ continueToHome }) {
    return (
        <Container style={styles}>
            <Button variant="contained" color="primary" onClick={continueToHome}>
                Continue
            </Button>
        </Container>
    )
}

export default LoginPage
