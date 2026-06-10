<script setup>
import axios from 'axios'
import { reactive, ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const API_URL = 'https://nodejsapi-wrcy.onrender.com/api/students'

const loading = ref(false)
const error = ref('')

const defaultPhoto = 'https://via.placeholder.com/150?text=No+Photo'

const student = reactive({
  _id: '',
  email: '',
  firstName: '',
  lastName: '',
  gender: '',
  studentStatus: '',
  active: false,
  score: '',
  DateOfBirth: '',
  photo: '',
  y3s2: []
})

const getStudentDetail = async () => {
  loading.value = true
  error.value = ''

  try {
    const id = route.params.id

    const response = await axios.get(`${API_URL}/${id}`)

    Object.assign(student, response.data)
  } catch (err) {
    console.error('Error loading student detail:', err)
    error.value = err.response?.data?.message || 'Failed to load student detail.'
  } finally {
    loading.value = false
  }
}

const formatDate = (date) => {
  if (!date) return 'N/A'

  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const goBack = () => {
  router.back()
}

onMounted(getStudentDetail)
</script>

<template>
  <div class="container py-5">
    <div class="row justify-content-center">
      <div class="col-lg-10">
        <!-- Loading -->
        <div v-if="loading" class="text-center py-5">
          <div class="spinner-border text-primary"></div>
          <p class="mt-3 mb-0">Loading student detail...</p>
        </div>

        <!-- Error -->
        <div v-else-if="error" class="alert alert-danger">
          {{ error }}
        </div>

        <!-- Detail -->
        <div v-else class="card shadow-sm border-0">
          <div class="card-header bg-primary text-white d-flex justify-content-between align-items-center">
            <h4 class="mb-0">Student Detail</h4>

            <span class="badge" :class="student.active ? 'bg-success' : 'bg-secondary'">
              {{ student.active ? 'Active' : 'Inactive' }}
            </span>
          </div>

          <div class="card-body p-4">
            <section class="row g-4 align-items-center">
              <div class="col-md-3 text-center">
                <img :src="student.photo || defaultPhoto" alt="Student photo" class="img-fluid rounded-circle border"
                  style="width: 150px; height: 150px; object-fit: cover;" />
              </div>

              <div class="col-md-9">
                <h3 class="mb-1">
                  {{ student.firstName }} {{ student.lastName }}
                </h3>

                <p class="text-muted mb-3">
                  {{ student.email }}
                </p>

                <div class="row g-3">
                  <div class="col-md-6">
                    <div class="border rounded p-3 bg-light">
                      <small class="text-muted">Gender</small>
                      <h6 class="mb-0">{{ student.gender }}</h6>
                    </div>
                  </div>

                  <div class="col-md-6">
                    <div class="border rounded p-3 bg-light">
                      <small class="text-muted">Student Status</small>
                      <h6 class="mb-0">{{ student.studentStatus }}</h6>
                    </div>
                  </div>

                  <div class="col-md-6">
                    <div class="border rounded p-3 bg-light">
                      <small class="text-muted">Total Score</small>
                      <h6 class="mb-0">{{ student.score }}</h6>
                    </div>
                  </div>

                  <div class="col-md-6">
                    <div class="border rounded p-3 bg-light">
                      <small class="text-muted">Grade</small>
                      <h6 class="mb-0" v-if="student.score >= 90">A</h6>
                      <h6 class="mb-0" v-else-if="student.score >= 80">B</h6>
                      <h6 class="mb-0" v-else-if="student.score >= 70">C</h6>
                      <h6 class="mb-0" v-else-if="student.score >= 60">D</h6>
                      <h6 class="mb-0" v-else-if="student.score >= 50">E</h6>
                      <h6 class="mb-0" v-else>F</h6>
                    </div>
                  </div>

                  <div class="col-md-6">
                    <div class="border rounded p-3 bg-light">
                      <small class="text-muted">Date of Birth</small>
                      <h6 class="mb-0">{{ formatDate(student.DateOfBirth) }}</h6>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <hr class="my-4" />

            <section class="d-flex justify-content-between align-items-center mb-3">
              <h5 class="mb-0">Year 3 Semester 2 Scores</h5>

              <div class="d-flex">
                <router-link :to="`/edit-student/${student._id}`" class="btn btn-sm btn-primary me-2">
                  Edit
                </router-link>
                <button class="btn btn-outline-secondary btn-sm" @click="goBack">
                  Back
                </button>
              </div>
            </section>

            <section v-show="student.y3s2 && student.y3s2.length > 0" class="table-responsive">
              <table class="table table-bordered table-hover align-middle">
                <thead class="table-primary">
                  <tr>
                    <th>#</th>
                    <th>Subject</th>
                    <th>Score</th>
                    <th>Assignment</th>
                    <th>Midterm</th>
                    <th>Final</th>
                    <th>Attendance</th>
                  </tr>
                </thead>

                <tbody>
                  <tr v-for="(item, index) in student.y3s2" :key="item._id || index">
                    <td>{{ index + 1 }}</td>
                    <td>{{ item.subject }}</td>
                    <td>{{ item.score }}</td>
                    <td>{{ item.assigment }}</td>
                    <td>{{ item.midterm }}</td>
                    <td>{{ item.final }}</td>
                    <td>{{ item.attendance }}</td>
                  </tr>

                  <tr v-if="!student.y3s2 || student.y3s2.length === 0">
                    <td colspan="7" class="text-center text-muted">
                      No Y3S2 data found.
                    </td>
                  </tr>
                </tbody>
              </table>
            </section>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>