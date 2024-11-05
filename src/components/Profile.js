import { Tooltip } from 'bootstrap/dist/js/bootstrap.bundle.min';
import React from 'react';
import { LineChart, Line, CartesianGrid, YAxis, XAxis, Legend } from 'recharts';

const Profile = () => {
    const data = [
        { name: 'Page A', uv: 400, pv: 2400, amt: 2400 },
        { name: 'Page A', uv: 500, pv: 200, amt: 2400 },
        { name: 'Page A', uv: 600, pv: 2200, amt: 2400 },
        { name: 'Page A', uv: 300, pv: 1800, amt: 2400 },
    ];

    return (
        <div className="container mt-5">
                <LineChart
                    width={730}
                    height={250}
                    data={data}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    padding={{ top: 10 }}
                    className="mx-auto"
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="pv" stroke="#8884d8" />
                    <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                </LineChart>
        </div>
    );
};

export default Profile;