import React from 'react'

function DrawSeatGrid(props) {
    const { seat, seatAvailable, seatReserved, seatSelected, onClickSeat, checktrue } = props;

    return (
        <div>
            <table className="grid">
                <tbody>
                    <tr>
                        {
                            seat.map(row =>
                                <td
                                    key={row}
                                    className={seatSelected.indexOf(row) > -1 ? 'reserved' : (seatReserved.indexOf(row) > -1 ? 'selected' : 'available')}
                                    onClick={checktrue(row) ? (e) => onClickSeat(row) : null}
                                >
                                    {row}
                                </td>
                            )
                        }
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default DrawSeatGrid
