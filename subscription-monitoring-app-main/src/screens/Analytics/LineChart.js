import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Card, Container } from "react-bootstrap";

const options = {
  scales: {
    y: {
      beginAtZero: true,
    },
  },
  plugins: {
    legend: {
      display: true,
      labels: {
        fontColor: "black",
      },
    },
  },
};

const LineChart = ({ chartLabel, labels, dataset, borderColor }) => {
  const [lineChartData, setLineChartData] = useState(null);

  useEffect(() => {
    const data = {
      labels: labels,
      datasets: [
        {
          label: chartLabel,
          data: dataset,
          fill: false,
          borderColor: borderColor,
          tension: 0.1,
        },
      ],
    };

    setLineChartData(data);
  }, [borderColor, chartLabel, dataset, labels]);

  return (
    <Container>
      <Card className="shadow" style={{ padding: 20}}>
        <Line data={lineChartData} options={options} />
      </Card>
    </Container>
  );
};

export default LineChart;
