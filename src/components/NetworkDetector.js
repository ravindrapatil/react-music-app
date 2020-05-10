import React, { useState, useEffect, useContext } from 'react';
import { GlobalContext } from "./GlobalState";

function NetworkDetector() {
    const [{ isDisconnected }, dispatch] = useContext(GlobalContext);
    const [isDisconnecteds, setisDisconnected] = useState(isDisconnected);

    const onlineOffLines = data => {
        dispatch({ type: 'onlineOffLine', snippet: data });
    }

    const handleConnectionChange = () => {
        const condition = window.navigator.onLine ? 'online' : 'offline';
        if (condition === 'online') {
            const webPing = setInterval(() => {
                fetch('//google.com', {
                    mode: 'no-cors'
                }).then(() => {
                    setisDisconnected(true);
                    return clearInterval(webPing)
                }).catch(() => {
                    setisDisconnected(false);
                })
            }, 2000);
            return;
        }
        return setisDisconnected(true);
    }

    useEffect(() => {
        onlineOffLines(isDisconnecteds)
    }, [isDisconnecteds])

    useEffect(() => {
        handleConnectionChange();
        window.addEventListener('online', handleConnectionChange);
        window.addEventListener('offline', handleConnectionChange);
        return () => {
            window.removeEventListener('online', handleConnectionChange);
            window.removeEventListener('offline', handleConnectionChange);
        }
    }, []);

    return (
        <div>
            {
                !isDisconnected && (<div className="internet-error">
                    <p>Internet connection lost</p>
                </div>)
            }
        </div>
    )
}

export default NetworkDetector
