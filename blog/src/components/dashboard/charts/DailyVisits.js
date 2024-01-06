import React from 'react';
import { Chart as ChartJS } from 'chart.js/auto'
import {Line} from 'react-chartjs-2';
import SectionHeader from '../SectionHeader';
import { faUsers } from '@fortawesome/free-solid-svg-icons';

const DailyVisits = () => {

    const chartData = {
        labels: [
            '00:00',
            '01:00',
            '02:00',
            '03:00',
            '04:00',
            '05:00',
            '06:00',
            '07:00',
            '08:00',
            '09:00',
            '10:00',
            '11:00',
            '12:00',
            '13:00',
            '14:00',
            '15:00',
            '16:00',
            '17:00',
            '18:00',
            '19:00',
            '20:00',
            '21:00',
            '22:00',
            '23:00',
        ],
        datasets: [
            {
                label: 'Number of visitors today',
                fill: {
                    target: 'origin',
                    above: 'rgba(36, 107, 219, 0.3)'
                },
                lineTension: 0,
                backgroundColor: 'rgb(36, 107, 219)',
                borderColor: 'rgb(36, 107, 219)',
                borderWidth: 2,
                data: [65, 59, 80, 81, 56, 21, 105, 75, 65, 38, 98, 12, 47, 88, 123, 89, 45, 35, 62, 89, 53, 19, 25, 56]
            }
        ],
        elements: {
            point: {
                radius: 12,
                hoverRadius: 16
            }
        }
    };

    const chartOptions = {
        plugins: {
            title: {
                display: false,
                text:'Number of visitors today',
                fontSize: 20
            },
            legend: {
                display: false
            }
        }
    };

    return (
        <div className="col-6 dashboard-col">
            <div className="card chart-container shadow">
                <SectionHeader title="Number of visitors today" icon={faUsers}/>
                <div className="card-body">
                    <Line
                        data={chartData}
                        options={chartOptions}
                    />
                </div>
            </div>
        </div>
    )
}

export default DailyVisits;