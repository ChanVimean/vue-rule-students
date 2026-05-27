<script setup>
import axios from 'axios';
import { ref, computed, onMounted } from 'vue';

const API_URL = 'https://nodejsapi-wrcy.onrender.com/api/students';

const students = ref([]);
const searchQuery = ref('');
const isLoading = ref(false);
const errorMessage = ref('');

const fetchStudents = async () => {
  isLoading.value = true;
  errorMessage.value = '';

  try {
    const response = await axios.get(API_URL);
    students.value = response.data;
  } catch (error) {
    console.error('Error fetching students:', error);
    errorMessage.value = 'Could not load students. Please try again.';
  } finally {
    isLoading.value = false;
  }
};

const filteredStudents = computed(() => {
  const query = searchQuery.value.trim().toLowerCase();

  if (!query) return students.value;

  return students.value.filter((student) => {
    const firstName = student.firstName?.toLowerCase() || '';
    const lastName = student.lastName?.toLowerCase() || '';
    const email = student.email?.toLowerCase() || '';

    return (
      firstName.includes(query) ||
      lastName.includes(query) ||
      email.includes(query)
    );
  });
});

const getStudentName = (student) => {
  return `${student.firstName || ''} ${student.lastName || ''}`.trim() || 'Student photo';
};

onMounted(fetchStudents);
</script>

<template>
  <div class="bg-light min-vh-100">
    <div class="container py-5">
      <!-- Header -->
      <div class="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
        <div>
          <span class="badge text-bg-primary mb-2">Students</span>
          <h1 class="fw-bold mb-1">Student List</h1>
          <p class="text-muted mb-0">
            View, search, and manage student records.
          </p>
        </div>

        <button class="btn btn-primary" @click="fetchStudents">
          Refresh
        </button>
      </div>

      <!-- Search -->
      <div class="card border-0 shadow-sm mb-4">
        <div class="card-body">
          <div class="row g-3 align-items-end">
            <div class="col-md-8">
              <label class="form-label fw-semibold">Search Students</label>
              <div class="input-group">
                <span class="input-group-text bg-white">🔍</span>
                <input v-model="searchQuery" type="text" class="form-control"
                  placeholder="Search by first name, last name, or email..." />
              </div>
            </div>

            <div class="col-md-4">
              <div class="border rounded bg-light p-3">
                <h5 class="mb-0 text-primary fw-bold">
                  {{ filteredStudents.length }}
                </h5>
                <small class="text-muted">
                  Showing {{ filteredStudents.length }} of {{ students.length }} students
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Loading -->
      <div v-if="isLoading" class="text-center py-5">
        <div class="spinner-border text-primary mb-3" role="status"></div>
        <p class="text-muted mb-0">Loading students...</p>
      </div>

      <!-- Error -->
      <div v-else-if="errorMessage" class="alert alert-danger">
        {{ errorMessage }}
      </div>

      <!-- Table -->
      <div v-else class="card border-0 shadow-sm">
        <div class="table-responsive">
          <table class="table table-hover align-middle mb-0">
            <thead class="table-dark">
              <tr>
                <th class="ps-4">Student</th>
                <th>Email</th>
                <th class="text-end pe-4">Actions</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="student in filteredStudents" :key="student._id">
                <td class="ps-4">
                  <div class="d-flex align-items-center gap-3">
                    <img :src="student.photo || 'https://via.placeholder.com/80?text=Student'"
                      :alt="getStudentName(student)" class="rounded-circle object-fit-cover border" width="56"
                      height="56" />

                    <div>
                      <h6 class="mb-1 fw-semibold">
                        {{ student.firstName }} {{ student.lastName }}
                      </h6>
                      <small class="text-muted">
                        ID: {{ student._id }}
                      </small>
                    </div>
                  </div>
                </td>

                <td>
                  <a :href="`mailto:${student.email}`" class="text-decoration-none">
                    {{ student.email }}
                  </a>
                </td>

                <td class="text-end pe-4">
                  <router-link :to="`/detail/${student._id}`" class="btn btn-sm btn-outline-info me-2">
                    Detail
                  </router-link>

                  <router-link :to="`/edit-student/${student._id}`" class="btn btn-sm btn-outline-primary me-2">
                    Edit
                  </router-link>

                  <button class="btn btn-sm btn-outline-danger">
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Empty -->
        <div v-if="filteredStudents.length === 0" class="text-center bg-light p-5 border-top">
          <div class="display-6 mb-3">📚</div>
          <h5 class="fw-bold">No students found</h5>
          <p class="text-muted mb-0">
            No results match "{{ searchQuery }}".
          </p>
        </div>
      </div>
    </div>
  </div>
</template>