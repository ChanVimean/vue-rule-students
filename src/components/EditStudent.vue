<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const props = defineProps({
  id: {
    type: String,
    required: true
  }
})

const router = useRouter()
const isLoading = ref(false)
const message = ref({ text: '', type: '' })

const form = ref({
  email: '',
  password: '',
  firstName: '',
  lastName: '',
  gender: '',
  studentStatus: '',
  active: true,
  score: 0,
  DateOfBirth: '',
  photo: '',
  y3s2: []
})

const defaultPhoto = 'data:image/svg+xml,' + encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 150 150"><rect width="150" height="150" fill="#e9ecef"/><circle cx="75" cy="58" r="30" fill="#adb5bd"/><circle cx="75" cy="150" r="55" fill="#adb5bd"/></svg>'
)

const newSubject = () => ({
  subject: '',
  score: 0,
  assigment: 0,
  midterm: 0,
  final: 0,
  attendance: 0
})

const fetchStudent = async () => {
  isLoading.value = true

  try {
    const response = await axios.get(
      `https://nodejsapi-wrcy.onrender.com/api/students/${props.id}`
    )

    form.value = {
      ...response.data,
      password: '',
      y3s2: response.data.y3s2 || []
    }

    if (form.value.DateOfBirth) {
      form.value.DateOfBirth = form.value.DateOfBirth.split('T')[0]
    }
  } catch (error) {
    console.error('Fetch error:', error)
    message.value = { text: 'Could not load student data.', type: 'alert-danger' }
  } finally {
    isLoading.value = false
  }
}

const addSubject = () => {
  form.value.y3s2.push(newSubject())
}

const removeSubject = (index) => {
  form.value.y3s2.splice(index, 1)
}

const handleUpdate = async () => {
  isLoading.value = true
  message.value = { text: '', type: '' }

  try {
    const payload = {
      ...form.value,
      score: Number(form.value.score),
      active: Boolean(form.value.active),
      y3s2: form.value.y3s2.map((item) => ({
        subject: item.subject,
        score: Number(item.score),
        assigment: Number(item.assigment),
        midterm: Number(item.midterm),
        final: Number(item.final),
        attendance: Number(item.attendance)
      }))
    }

    if (!payload.password) {
      delete payload.password
    }

    await axios.put(
      `https://nodejsapi-wrcy.onrender.com/api/students/${props.id}`,
      payload
    )

    message.value = { text: 'Student updated successfully!', type: 'alert-success' }

    setTimeout(() => router.push('/student-list'), 1500)
  } catch (error) {
    const errorMsg = error.response?.data?.message || 'Update failed.'
    message.value = { text: `Error: ${errorMsg}`, type: 'alert-danger' }
  } finally {
    isLoading.value = false
  }
}

onMounted(fetchStudent)
</script>

<template>
  <div class="container mt-5 mb-5">
    <div class="card shadow border-0">
      <div class="card-header bg-warning text-dark fw-bold">
        Edit Student: {{ form.firstName }} {{ form.lastName }}
      </div>

      <div class="card-body p-4">
        <div v-if="message.text" :class="['alert', message.type]" role="alert">
          {{ message.text }}
        </div>

        <div v-if="isLoading" class="text-center py-4">
          <div class="spinner-border text-warning"></div>
          <p class="text-muted mt-2 mb-0">Loading...</p>
        </div>

        <form v-else @submit.prevent="handleUpdate">
          <div class="row mb-3">
            <div class="col-md-6">
              <label class="form-label fw-semibold">First Name</label>
              <input v-model="form.firstName" type="text" class="form-control" required />
            </div>

            <div class="col-md-6">
              <label class="form-label fw-semibold">Last Name</label>
              <input v-model="form.lastName" type="text" class="form-control" required />
            </div>
          </div>

          <div class="row mb-3">
            <div class="col-md-6">
              <label class="form-label fw-semibold">Email</label>
              <input v-model="form.email" type="email" class="form-control" disabled />
              <small class="text-muted">Email cannot be changed.</small>
            </div>

            <div class="col-md-6">
              <label class="form-label fw-semibold">Password</label>
              <input v-model="form.password" type="password" class="form-control"
                placeholder="Leave blank to keep current" />
            </div>
          </div>

          <div class="row mb-3">
            <div class="col-md-4">
              <label class="form-label fw-semibold">Gender</label>
              <select v-model="form.gender" class="form-select">
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div class="col-md-4">
              <label class="form-label fw-semibold">Status</label>
              <select v-model="form.studentStatus" class="form-select">
                <option value="Single">Single</option>
                <option value="Married">Married</option>
              </select>
            </div>

            <div class="col-md-4">
              <label class="form-label fw-semibold">Birthday</label>
              <input v-model="form.DateOfBirth" type="date" class="form-control" />
            </div>
          </div>

          <div class="row mb-4 align-items-center ">
            <div class="col-md-2">
              <label class="form-label fw-semibold">Score</label>
              <input v-model="form.score" type="number" class="form-control" />
            </div>

            <div class="col-md-6">
              <label class="form-label fw-semibold">Photo URL</label>
              <input v-model="form.photo" type="text" class="form-control" />
            </div>

            <div class="col-md-4 text-center">
              <img :src="form.photo || defaultPhoto" alt="Student photo" class="img-fluid rounded-circle border"
                style="width: 160px; height: 160px; object-fit: cover;" />
              <label class="form-label fw-semibold d-block">Preview</label>
            </div>
          </div>

          <div class="row mb-4">
            <div class="col-md-6">
              <div class="form-check form-switch">
                <input v-model="form.active" class="form-check-input" type="checkbox" id="active" />
                <label class="form-check-label" for="active">Active Status</label>
              </div>
            </div>
          </div>

          <hr />

          <div class="d-flex justify-content-between align-items-center mb-3">
            <h5 class="mb-0">Y3S2 Subjects</h5>
            <button type="button" class="btn btn-outline-warning btn-sm" @click="addSubject">
              + Add Subject
            </button>
          </div>

          <div v-if="form.y3s2.length === 0" class="alert alert-info">
            No Y3S2 subjects yet. Click <strong>Add Subject</strong> to create one.
          </div>

          <div v-for="(item, index) in form.y3s2" :key="item._id || index" class="border rounded bg-light p-3 mb-3">
            <div class="d-flex justify-content-between align-items-center mb-3">
              <strong>Subject {{ index + 1 }}</strong>
              <button type="button" class="btn btn-sm btn-outline-danger" @click="removeSubject(index)">
                Remove
              </button>
            </div>

            <div class="row g-3">
              <div class="col-md-4">
                <label class="form-label">Subject</label>
                <input v-model="item.subject" type="text" class="form-control" required />
              </div>

              <div class="col-md-2">
                <label class="form-label">Score</label>
                <input v-model="item.score" type="number" class="form-control" />
              </div>

              <div class="col-md-2">
                <label class="form-label">Assignment</label>
                <input v-model="item.assigment" type="number" class="form-control" />
              </div>

              <div class="col-md-2">
                <label class="form-label">Midterm</label>
                <input v-model="item.midterm" type="number" class="form-control" />
              </div>

              <div class="col-md-2">
                <label class="form-label">Final</label>
                <input v-model="item.final" type="number" class="form-control" />
              </div>

              <div class="col-md-2">
                <label class="form-label">Attendance</label>
                <input v-model="item.attendance" type="number" class="form-control" />
              </div>
            </div>
          </div>

          <div class="d-flex gap-2 mt-4">
            <button type="submit" class="btn btn-warning px-5" :disabled="isLoading">
              <span v-if="isLoading" class="spinner-border spinner-border-sm me-1"></span>
              Save Changes
            </button>

            <button type="button" @click="router.push('/student-list')" class="btn btn-outline-secondary">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped></style>