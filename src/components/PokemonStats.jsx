import { useEffect, useRef } from "react";
import { Chart, BarController, CategoryScale, LinearScale, BarElement } from "chart.js";

const PokemonStats = ({stats}) => {
  const chartRef = useRef(null);

  const formatStatName = (name) => {
    if (name === 'hp') return 'HP';

    return name
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  useEffect(() => {
    let statsChart;

    Chart.register(BarController, CategoryScale, LinearScale, BarElement)

    if (chartRef.current && stats) {
      const ctx = chartRef.current.getContext("2d");

      statsChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: stats.map(stat => formatStatName(stat.stat.name)),
          datasets: [
            {
              label: 'Base Stat',
              data: stats.map(stat => stat.base_stat),
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      })
    }

    return () => {
      if (statsChart) {
        statsChart.destroy()
      }
    }
  }, [stats])

  return (
    <canvas ref={chartRef}></canvas>
  );
}

export default PokemonStats;