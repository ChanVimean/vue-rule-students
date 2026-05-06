<script setup>
import { ref } from 'vue';
import axios from 'axios';

// {
//     "firstName":"fName",
//     "lastName":"lName",
//     "email":"test6@test.com",
//     "password":"Rule#12345",
//     "gender":"Male",
//     "studentStatus":"Single",
//     "active": true,
//     "score": 90,
//     "DateOfBirth":"2020-12-01"
//     "photo": ""
// }

const form = ref({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  gender: '',
  studentStatus: '',
  active: true,
  score: 0,
  DateOfBirth: '',
  photo: ''
});

const isLoading = ref(false);
const message = ref({ text: '', type: '' });

const handleRegister = async () => {
  isLoading.value = true;
  message.value = { text: '', type: '' };

  const payload = {
    firstName: form.value.firstName,
    lastName: form.value.lastName,
    email: form.value.email,
    password: form.value.password,
    gender: form.value.gender,
    studentStatus: form.value.studentStatus,
    active: Boolean(form.value.active),
    score: Number(form.value.score),
    DateOfBirth: form.value.DateOfBirth,
    photo: form.value.photo,
  };

  try {
    const response = await axios.post('https://nodejsapi-wrcy.onrender.com/api/auth/register', payload);

    console.log("Success:", response.data);
    message.value = { text: 'Student added successfully!', type: 'alert-success' };

    form.value = { firstName: '', lastName: '', email: '', password: '', gender: '', studentStatus: '', active: true, score: 0, DateOfBirth: '' };

  } catch (error) {
    console.error("Server Response Data:", error.response?.data);

    const errorMsg = error.response?.data?.message || "Server Error (500). The backend might be crashing due to a duplicate email or missing field.";
    message.value = { text: `Error: ${errorMsg}`, type: 'alert-danger' };
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card shadow">
          <div class="card-header bg-primary text-white">
            <h4 class="mb-0">Student Registration</h4>
          </div>
          <div class="card-body p-4">

            <div v-if="message.text" :class="['alert', message.type]" role="alert">
              {{ message.text }}
            </div>

            <form @submit.prevent="handleRegister">
              <div class="row mb-3">
                <div class="col-md-6">
                  <label class="form-label">First Name</label>
                  <input v-model="form.firstName" type="text" class="form-control" required>
                </div>
                <div class="col-md-6">
                  <label class="form-label">Last Name</label>
                  <input v-model="form.lastName" type="text" class="form-control" required>
                </div>
              </div>

              <div class="row mb-3">
                <div class="col-md-6">
                  <label class="form-label">Email</label>
                  <input v-model="form.email" type="email" class="form-control" required>
                </div>
                <div class="col-md-6">
                  <label class="form-label">Password</label>
                  <input v-model="form.password" type="password" class="form-control" required>
                </div>
              </div>

              <hr />
              <h5 class="text-muted mb-3">Additional Details</h5>

              <div class="row mb-3">
                <div class="col-md-4">
                  <label class="form-label">Gender</label>
                  <select v-model="form.gender" class="form-select" required>
                    <option value="" disabled>Select...</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
                <div class="col-md-4">
                  <label class="form-label">Status</label>
                  <select v-model="form.studentStatus" class="form-select" required>
                    <option value="" disabled>Select...</option>
                    <option value="Single">Single</option>
                    <option value="Married">Married</option>
                  </select>
                </div>
                <div class="col-md-4">
                  <label class="form-label">Date of Birth</label>
                  <input v-model="form.DateOfBirth" type="date" class="form-control" required>
                </div>
              </div>

              <div class="row mb-4 align-items-end">
                <div class="col-md-3">
                  <label class="form-label">Score</label>
                  <input v-model="form.score" type="number" class="form-control" min="0" max="100">
                </div>
                <div class="col-md-6">
                  <label class="form-label">Photo</label>
                  <input type="text" class="form-control" accept="image/*" @change="handleFileUpload">
                </div>
                <div class="col-md-3 pt-2">
                  <div class="form-check form-switch">
                    <input v-model="form.active" class="form-check-input" type="checkbox" id="activeStatus">
                    <label class="form-check-label" for="activeStatus">Active Account</label>
                  </div>
                </div>
              </div>

              <button type="submit" class="btn btn-primary btn-lg w-100" :disabled="isLoading">
                <span v-if="isLoading" class="spinner-border spinner-border-sm me-2"></span>
                {{ isLoading ? 'Processing...' : 'Register Student' }}
              </button>
            </form>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>