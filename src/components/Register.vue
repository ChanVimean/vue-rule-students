<script setup>
import axios from 'axios'
import { reactive } from 'vue'

const API_URL = 'https://nodejsapi-wrcy.onrender.com/api/auth/register'

const form = reactive({
  email: '',
  password: '',
  firstName: '',
  lastName: '',
  gender: '',
  studentStatus: '',
  score: '',
  DateOfBirth: '',
  active: true,
  photo: '',
  loading: false
})

const message = reactive({
  text: '',
  type: 'success'
})

const handlePhoto = (event) => {
  const file = event.target.files[0]

  if (!file) {
    form.photo = ''
    return
  }

  const reader = new FileReader()

  reader.onload = () => {
    form.photo = reader.result
  }

  reader.readAsDataURL(file)
}

const resetForm = () => {
  form.email = ''
  form.password = ''
  form.firstName = ''
  form.lastName = ''
  form.gender = ''
  form.studentStatus = ''
  form.score = ''
  form.DateOfBirth = ''
  form.active = true
  form.photo = ''
  form.loading = false

  message.text = ''
  message.type = 'success'
}

const registerStudent = async () => {
  form.loading = true
  message.text = ''

  const payload = {
    email: form.email,
    password: form.password,
    firstName: form.firstName,
    lastName: form.lastName,
    gender: form.gender,
    studentStatus: form.studentStatus,
    score: form.score,
    DateOfBirth: form.DateOfBirth,
    active: form.active,
    photo: form.photo,
    y3s2: []
  }
  try {
    const { data } = await axios.post(API_URL, payload)

    message.text = data?.message || 'Student registered successfully!'
    message.type = 'success'
    resetForm()
  } catch (error) {
    console.error('Register error:', error.response?.data || error)
    message.text = error.response?.data?.message || 'Could not register student.'
    message.type = 'danger'
  } finally {
    form.loading = false
  }
}
</script>

<template>
  <div class="bg-light min-vh-100">
    <div class="container py-5">
      <div class="row justify-content-center">
        <div class="col-lg-8">
          <div class="card border-0 shadow-sm">
            <div class="card-header bg-primary text-white">
              <h4 class="mb-0">Register Student</h4>
            </div>

            <div class="card-body p-4">
              <form @submit.prevent="registerStudent">
                <div class="row g-3">
                  <div class="col-md-6">
                    <label class="form-label fw-semibold">First Name</label>
                    <input v-model.trim="form.firstName" type="text" class="form-control" required />
                  </div>

                  <div class="col-md-6">
                    <label class="form-label fw-semibold">Last Name</label>
                    <input v-model.trim="form.lastName" type="text" class="form-control" required />
                  </div>

                  <div class="col-md-6">
                    <label class="form-label fw-semibold">Email</label>
                    <input v-model.trim="form.email" type="email" class="form-control" required />
                  </div>

                  <div class="col-md-6">
                    <label class="form-label fw-semibold">Password</label>
                    <input v-model="form.password" type="password" class="form-control" required />
                  </div>

                  <div class="col-md-4">
                    <label class="form-label fw-semibold">Gender</label>
                    <select v-model="form.gender" class="form-select" required>
                      <option value="" disabled>Select gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div class="col-md-4">
                    <label class="form-label fw-semibold">Student Status</label>
                    <select v-model="form.studentStatus" class="form-select" required>
                      <option value="" disabled>Select status</option>
                      <option value="Single">Single</option>
                      <option value="Married">Married</option>
                    </select>
                  </div>

                  <div class="col-md-4">
                    <label class="form-label fw-semibold">Date of Birth</label>
                    <input v-model="form.DateOfBirth" type="date" class="form-control" required />
                  </div>

                  <div class="col-md-6">
                    <label class="form-label fw-semibold">Score</label>
                    <input v-model.number="form.score" type="number" class="form-control" min="0" max="100" />
                  </div>

                  <div class="col-md-6">
                    <label class="form-label fw-semibold">Photo URL</label>
                    <input v-model.trim="form.photo" type="text" class="form-control" placeholder="Paste image URL" />
                  </div>

                  <div v-if="form.photo" class="col-12 text-center">
                    <img :src="form.photo" alt="Preview" class="rounded-circle border object-fit-cover" width="120"
                      height="120" />
                  </div>

                  <div class="col-12">
                    <div class="form-check form-switch">
                      <input v-model="form.active" class="form-check-input" type="checkbox" id="activeSwitch" />
                      <label class="form-check-label" for="activeSwitch">
                        Active
                      </label>
                    </div>
                  </div>
                </div>

                <div class="alert alert-info mt-4 mb-0">
                  Y3S2 subjects will be empty now. You can add them later from the edit page.
                </div>

                <div v-if="message.text" :class="`alert alert-${message.type} mt-4 mb-0`">
                  {{ message.text }}
                </div>

                <div class="d-flex gap-2 mt-4">
                  <button type="submit" class="btn btn-primary" :disabled="form.loading">
                    <span v-if="form.loading" class="spinner-border spinner-border-sm me-2"></span>
                    {{ form.loading ? 'Registering...' : 'Register' }}
                  </button>

                  <button type="button" class="btn btn-secondary" @click="resetForm">
                    Reset
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>