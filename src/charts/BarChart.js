import React from 'react';
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Label,
  Legend,
  ResponsiveContainer,
} from 'recharts';
class BarRechartComponent extends React.Component {
  componentDidMount() {
    console.log(this.props);
  }
  render() {
    return (
      <ResponsiveContainer width={365} height={300}>
        <BarChart
          width={500}
          height={300}
          data={this.props.data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis
            dataKey='store'
            angle={45}
            dx={35}
            dy={40}
            minTickGap={-200}
            axisLine={false}
          />
          <YAxis dataKey='sales' />
          <Tooltip />
          <Legend />
          <Bar dataKey='sales' fill='#82ca9d' />
        </BarChart>
      </ResponsiveContainer>
    );
  }
}

export default BarRechartComponent;
