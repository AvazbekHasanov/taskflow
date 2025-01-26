<template>
  <div class="bg-gray-900 text-white min-h-screen p-5">
    <div class="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Line Chart Section -->
      <div class="bg-gray-800 p-5 rounded-lg shadow-lg">
        <h2 class="text-xl font-semibold mb-4">Progress Over Months</h2>
        <canvas id="lineChart"></canvas>
      </div>

      <!-- Bar Chart Section -->
      <div class="bg-gray-800 p-5 rounded-lg shadow-lg">
        <h2 class="text-xl font-semibold mb-4">Product Comparison</h2>
        <canvas id="barChart"></canvas>
      </div>

      <!-- Doughnut Chart Section -->
      <div class="bg-gray-800 p-5 rounded-lg shadow-lg">
        <h2 class="text-xl font-semibold mb-4">Task Distribution</h2>
        <canvas id="doughnutChart"></canvas>
      </div>

      <!-- Placeholder for Additional Dashboard Element -->
      <div class="bg-gray-800 p-5 rounded-lg shadow-lg">
        <h2 class="text-xl font-semibold mb-4">Placeholder Dashboard Element</h2>
        <p class="text-gray-400">Add another chart or widget here.</p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

export default {
  setup() {
    const lineChartRef = ref(null);
    const barChartRef = ref(null);
    const doughnutChartRef = ref(null);

    onMounted(() => {
      // Line Chart
      const lineCtx = document.getElementById("lineChart").getContext("2d");
      lineChartRef.value = new Chart(lineCtx, {
        type: "line",
        data: {
          labels: ["January", "February", "March", "April", "May", "June"],
          datasets: [
            {
              label: "Progress (%)",
              data: [10, 25, 40, 60, 80, 100],
              borderColor: "#3b82f6",
              backgroundColor: "rgba(59, 130, 246, 0.5)",
              fill: true,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              labels: {
                color: "#fff",
              },
            },
          },
          scales: {
            x: {
              ticks: {
                color: "#fff",
              },
              grid: {
                color: "rgba(255, 255, 255, 0.1)",
              },
            },
            y: {
              ticks: {
                color: "#fff",
              },
              grid: {
                color: "rgba(255, 255, 255, 0.1)",
              },
            },
          },
        },
      });

      // Bar Chart
      const barCtx = document.getElementById("barChart").getContext("2d");
      barChartRef.value = new Chart(barCtx, {
        type: "bar",
        data: {
          labels: ["Q1 2024", "Q2 2024", "Q3 2024", "Q4 2024"],
          datasets: [
            {
              label: "Product A",
              data: [30, 50, 70, 90],
              backgroundColor: "#9333ea",
            },
            {
              label: "Product B",
              data: [40, 60, 80, 100],
              backgroundColor: "#22c55e",
            },
            {
              label: "Product C",
              data: [20, 40, 60, 80],
              backgroundColor: "#ef4444",
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              labels: {
                color: "#fff",
              },
            },
          },
          scales: {
            x: {
              ticks: {
                color: "#fff",
              },
              grid: {
                color: "rgba(255, 255, 255, 0.1)",
              },
            },
            y: {
              ticks: {
                color: "#fff",
              },
              grid: {
                color: "rgba(255, 255, 255, 0.1)",
              },
            },
          },
        },
      });

      // Doughnut Chart
      const doughnutCtx = document.getElementById("doughnutChart").getContext("2d");
      doughnutChartRef.value = new Chart(doughnutCtx, {
        type: "doughnut",
        data: {
          labels: ["Completed", "In Progress", "Pending"],
          datasets: [
            {
              data: [50, 30, 20],
              backgroundColor: ["#22c55e", "#3b82f6", "#ef4444"],
              hoverOffset: 4,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              labels: {
                color: "#fff",
              },
            },
          },
        },
      });
    });

    return {};
  },
};
</script>

<style>
body {
  background-color: #111827;
  color: white;
}
</style>