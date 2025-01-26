<template>
  <div>
    <div class="table-container">
      <table class="custom-table">
        <thead>
          <tr>
            <th v-for="(column, index) in columns" :key="index" @click="sortTable(column)">
              {{ column.label }}
              <span v-if="sortColumn === column.field">
                <span v-if="sortOrder === 'asc'">↑</span>
                <span v-if="sortOrder === 'desc'">↓</span>
              </span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(row, index) in paginatedData"
            :key="index"
            :class="{
              'table-row-do': row.status === 'PENDING',
              'table-row-done': row.status === 'COMPLETED',
              'table-row-ns': row.status === 'BACKLOG',
              'table-row-in': row.status === 'IN_PROGRESS',
              'table-row-ot': row.status === 'CANCELLED'
            }"
          >
            <td v-for="(column, index) in columns" :key="index">
              <span v-if="column.field === 'assignedTo' && !row[column.field]"> <el-button @click="assignToWorker(row)"> Assign to worker </el-button> </span>
             <span v-else> {{ row[column.field] }} </span>

            </td>
          </tr>
        </tbody>
      </table>
      <div class="pagination">
        <button @click="prevPage" :disabled="currentPage === 1">Prev</button>
        <span>Page {{ currentPage }} of {{ totalPages }}</span>
        <button @click="nextPage" :disabled="currentPage === totalPages">Next</button>
      </div>

      <div class="legend-container" v-if="type==='task'">
      <h4>Task Status Legend:</h4>
      <ul class="status-legend flex flex-row gap-4">
        <li><span class="legend-box do"></span> DO: Tasks to be done</li>
        <li><span class="legend-box done"></span> DONE: Completed tasks</li>
        <li><span class="legend-box ns"></span> NS: Not started</li>
        <li><span class="legend-box in"></span> IN: In progress</li>
        <li><span class="legend-box ot"></span> OT: Overdue tasks</li>
      </ul>
    </div>

    </div>
  </div>
</template>


<script>
export default {
  name: "TableComponent",

  props: {
    columns: {
      type: Array,
      required: true,
    },
    type: {
    type: String,
      default: null
  },
    data: {
      type: Array,
      required: true,
    },
    rowsPerPage: {
      type: Number,
      default: 5,
    },
  },
  data() {
    return {
      currentPage: 1,
      sortColumn: "",
      sortOrder: "asc",
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.data.length / this.rowsPerPage);
    },
    paginatedData() {
      const startIndex = (this.currentPage - 1) * this.rowsPerPage;
      const endIndex = startIndex + this.rowsPerPage;
      const sortedData = this.sortedData;
      return sortedData.slice(startIndex, endIndex);
    },
    sortedData() {
      let sorted = [...this.data];
      if (this.sortColumn) {
        sorted.sort((a, b) => {
          const aValue = a[this.sortColumn];
          const bValue = b[this.sortColumn];
          if (aValue < bValue) return this.sortOrder === "asc" ? -1 : 1;
          if (aValue > bValue) return this.sortOrder === "asc" ? 1 : -1;
          return 0;
        });
      }
      return sorted;
    },
  },
  methods: {
    assignToWorker(data) {
      this.$emit('worker-assigned', data); // Emit an event called 'worker-assigned' with the payload 'data'
    },
    sortTable(column) {
      if (this.sortColumn === column.field) {
        this.sortOrder = this.sortOrder === "asc" ? "desc" : "asc";
      } else {
        this.sortColumn = column.field;
        this.sortOrder = "asc";
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
  },
};
</script>

<style scoped>
.table-container {
  padding: 1rem;
  margin: 0 auto;
}

.custom-table {
  width: 100%;
  border-collapse: collapse;
}

.custom-table th, .custom-table td {
  padding: 0.75rem;
  border: 1px solid #ddd;
  text-align: left;
}

.custom-table th {
  background-color: rgb(17 24 39);
  cursor: pointer;
}

.pagination {
  margin-top: 1rem;
  text-align: center;
}

.pagination button {
  padding: 0.5rem 1rem;
  margin: 0 0.25rem;
  cursor: pointer;
}

.pagination button:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}
table-row-do {
  background-color: #f0f8ff; /* Light Blue */
}

.table-row-done {
  background-color: #d4edda; /* Light Green */
}

.table-row-ns {
  background-color: #f8d7da; /* Light Red */
  color: red;
}

.table-row-in {
  background-color: #fff3cd; /* Light Yellow */
  color: black;
}

.table-row-ot {
  background-color: #d1ecf1; /* Light Cyan */
  color: black;
}

/* Legend styles */
.legend-container {
  margin-top: 20px;
}

.status-legend {
  list-style-type: none;
  padding: 0;
}

.status-legend li {
  margin-bottom: 8px;
  font-size: 14px;
}

.legend-box {
  display: inline-block;
  width: 16px;
  height: 16px;
  margin-right: 8px;
  border: 1px solid #ddd;
}

.legend-box.do {
  background-color: #fffbcc;
}

.legend-box.done {
  background-color: #ccffcc;
}

.legend-box.ns {
  background-color: #f0f0f0;
}

.legend-box.in {
  background-color: #cce5ff;
}

.legend-box.ot {
  background-color: #ffc6c6;
}
</style>
