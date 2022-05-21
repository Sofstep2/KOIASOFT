import React from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis, ResponsiveContainer,
} from "recharts";


export default function Chart({data}:any) {
    return (
        <ResponsiveContainer width='80%' aspect={6 / 2}>
            <BarChart
                data={data}
                margin={{
                    top: 50,
                    right: 30,
                    left: 20,
                    bottom: 5
                }}
            >
                <XAxis dataKey="name"/>
                <YAxis/>
                <Bar
                    // type="monotone"
                    dataKey="pv"
                    stroke="#8884d8"
                />
            </BarChart>

        </ResponsiveContainer>

    );
}