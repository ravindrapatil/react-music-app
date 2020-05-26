import React from 'react'

function TabPanel(props) {
    const { value, index, children } = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}>
            {
                value === index && (
                    <div>{children}</div>
                )
            }
        </div>
    )
}

export default TabPanel

// const TabPanel = (props) => {
//     const { value, index, children } = props;
//     return (
//         <div
//             role="tabpanel"
//             hidden={value !== index}>
//             {
//                 value === index && (
//                     <div>{children}</div>
//                 )
//             }
//         </div>
//     )
// }
