import React from 'react';
import { formatDate } from '../../utils/dateFormatter';
import { useNavigate } from 'react-router-dom';

const TableBody = ({data, columns, entity}) => {

    const navigate = useNavigate();

    const rowKey = (item, column) => {
        return item._id + column.value + item[column.value];
    }

    const getItemValue = (item, column) => {
        switch(column.type){
            case 'boolean':
                return item[column.value] ? 'Yes' : 'No';
            case 'object':
                return item[column.value].map(elem => elem[column.objectKey]).join(', ');
            case 'date':
                return formatDate(item[column.value]);
            default:
                return item[column.value];
        }
    }

    const createRow = (item) => {
        return columns.map(column => {
            return <td 
                        key={rowKey(item, column)} 
                        className="text-center tbody-col"
                    >
                        {getItemValue(item, column)}
                    </td>
        });
    }

    const goToEntity = (id) => {
        navigate(`/${entity}/edit/${id}`)
    }

    return (
        <tbody>
            {
                data.map(
                    (item) => 
                        <tr 
                            className="tbody-row" 
                            key={[item._id]}
                            onClick={() => goToEntity(item._id)}
                        >
                            {createRow(item)}
                        </tr>
                )
            }
        </tbody>
    )
}

export default TableBody;