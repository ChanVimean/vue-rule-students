<script setup>
import axios from 'axios';
import { ref, computed, onMounted } from 'vue';

const students = ref([]);
const searchQuery = ref('');

// 1. Fetch logic
const fetchStudents = async () => {
  try {
    const response = await axios.get('https://nodejsapi-wrcy.onrender.com/api/students');
    students.value = response.data;
  } catch (error) {
    console.error('Error fetching students:', error);
  }
}

// 2. Computed property for filtering
const filteredStudents = computed(() => {
  if (!searchQuery.value) {
    return students.value;
  }

  const query = searchQuery.value.toLowerCase();

  return students.value.filter(student => {
    return (
      student.firstName.toLowerCase().includes(query) ||
      student.lastName.toLowerCase().includes(query) ||
      student.email.toLowerCase().includes(query)
    );
  });
});

onMounted(fetchStudents);
</script>

<template>
  <div class="container mt-4">
    <div class="row mb-4 align-items-end">
      <div class="col-md-8">
        <label class="form-label fw-bold">Filter Students</label>
        <div class="input-group">
          <span class="input-group-text bg-white">
            <i class="bi bi-search">🔍</i>
          </span>
          <input v-model="searchQuery" type="text" placeholder="Search by name or email..." class="form-control">
        </div>
      </div>
      <div class="col-md-4">
        <div class="text-muted small mb-1">
          Showing {{ filteredStudents.length }} of {{ students.length }}
        </div>
      </div>
    </div>

    <div class="table-responsive shadow-sm rounded">
      <table class="table table-hover table-striped mb-0">
        <thead class="table-dark">
          <tr>
            <th scope="col" class="ps-4">#</th>
            <th scope="col">First Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">Email</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(student, index) in filteredStudents" :key="student._id">
            <td class="ps-4 fw-bold">{{ index + 1 }}</td>
            <td>{{ student.firstName }}</td>
            <td>{{ student.lastName }}</td>
            <td>
              <a :href="`mailto:${student.email}`" class="text-decoration-none">
                {{ student.email }}
              </a>
            </td>
            <td>
              <router-link :to="`/edit-student/${student._id}`" class="btn btn-sm btn-outline-primary">
                Edit
              </router-link>
              <button class="btn btn-sm btn-outline-danger ms-2">
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="filteredStudents.length === 0" class="text-center p-5 border-top bg-light">
      <p class="text-muted mb-0">No results match "{{ searchQuery }}"</p>
    </div>
  </div>
</template>

<style scoped></style>