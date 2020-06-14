import React from 'react';
import { useHistory } from "react-router-dom";
import MaterialTable from "material-table";
import useTableGrid from './hooks/useMaterialTableIcon';
import useAPIData from './hooks/useAPIData';
import {
    CircularProgress,
    Button
} from '@material-ui/core/';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

function RegularTable() {
    const { tableIcons } = useTableGrid();
    const { data } = useAPIData();
    const history = useHistory();

    const goBack = () => {
        history.goBack();
    }

    return (
        <div style={{ marginTop: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    startIcon={<ArrowBackIcon />}
                    onClick={goBack}>
                    Back
                </Button>
            </div>
            <div style={{ marginTop: '20px' }}>
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
                                },
                                headerStyle: {
                                    backgroundColor: '#01579b',
                                    color: '#FFF'
                                }
                            }}
                            title="Employee details"
                        />
                        :
                        <div style={{ margin: '30px auto', textAlign: 'center' }}><CircularProgress size={50} /></div>
                }
            </div>
        </div>
    )
}

export default RegularTable
