import React, { useEffect, useState } from 'react';
import MaterialTable from "material-table";
import useTableGrid from './hooks/useMaterialTableIcon';
import services from './hooks/services';
import {
    CircularProgress
} from '@material-ui/core/';

function TableGrid() {
    const { tableIcons } = useTableGrid();
    const { footballPlayersStatics } = services();

    const [state, setstate] = useState({
        data: []
    });
    const { data } = state;

    useEffect(() => {
        getFootballPlayerInfo();
    }, [])

    const getFootballPlayerInfo = async () => {
        try {
            const apiData = await footballPlayersStatics({});
            if (apiData) {
                setstate({
                    ...state,
                    data: apiData.data
                })
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div style={{ maxWidth: "100%", paddingTop: '40px' }}>
            {
                data && data.length ?
                    <MaterialTable
                        icons={tableIcons}
                        columns={[
                            { title: "First name", field: "first_name", width: 150 },
                            { title: "Last name", field: "last_name", width: 150 },
                            { title: "Email", field: "email", width: 250 },
                            { title: "Gender", field: "gender", width: 150 },
                            { title: "Department Id", field: "department_id", width: 150 },
                            { title: "Hire Date", field: "hire_date", width: 150 },
                            { title: "Phone", field: "phone_number", width: 150 },
                            { title: "Country", field: "country", width: 150 },
                            { title: "Job Title", field: "job_title", width: 150 }
                        ]}
                        data={data}
                        options={{
                            fixedColumns: {
                                left: 2,
                                right: 0
                            }
                        }}
                        title="Employee details"
                    />
                    :
                    <div style={{ margin: '30px auto', textAlign: 'center' }}><CircularProgress size={50} /></div>
            }
        </div>
    )
}

export default TableGrid
