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
          <tr v-for="(row, index) in paginatedData" :key="index">
            <td v-for="(column, index) in columns" :key="index">{{ row[column.field] }}</td>
          </tr>
        </tbody>
      </table>
      <div class="pagination">
        <button @click="prevPage" :disabled="currentPage === 1">Prev</button>
        <span>Page {{ currentPage }} of {{ totalPages }}</span>
        <button @click="nextPage" :disabled="currentPage === totalPages">Next</button>
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
</style>
