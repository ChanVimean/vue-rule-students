<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const props = defineProps({
  id: {
    type: String,
    required: true
  }
});

const router = useRouter();
const isLoading = ref(false);
const message = ref({ text: '', type: '' });

const form = ref({
  email: '',
  password: '',
  firstName: '',
  lastName: '',
  gender: '',
  studentStatus: '',
  active: true,
  score: 0,
  DateOfBirth: ''
});

const fetchStudent = async () => {
  isLoading.value = true;
  try {
    const response = await axios.get(`https://nodejsapi-wrcy.onrender.com/api/students/${props.id}`);

    form.value = { ...response.data };

    if (form.value.DateOfBirth) {
      form.value.DateOfBirth = form.value.DateOfBirth.split('T')[0];
    }
  } catch (error) {
    console.error("Fetch error:", error);
    message.value = { text: 'Could not load student data.', type: 'alert-danger' };
  } finally {
    isLoading.value = false;
  }
};

onMounted(fetchStudent);

const handleUpdate = async () => {
  isLoading.value = true;
  message.value = { text: '', type: '' };

  try {
    const payload = {
      ...form.value,
      score: Number(form.value.score),
      active: Boolean(form.value.active)
    };

    await axios.put(`https://nodejsapi-wrcy.onrender.com/api/students/${props.id}`, payload);

    message.value = { text: 'Student updated successfully!', type: 'alert-success' };

    setTimeout(() => router.push('/student-list'), 1500);
  } catch (error) {
    const errorMsg = error.response?.data?.message || 'Update failed.';
    message.value = { text: `Error: ${errorMsg}`, type: 'alert-danger' };
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div class="container mt-5">
    <div class="card shadow border-0">
      <div class="card-header bg-warning text-dark fw-bold">
        Edit Student: {{ form.firstName }} {{ form.lastName }}
      </div>
      <div class="card-body p-4">

        <div v-if="message.text" :class="['alert', message.type]" role="alert">
          {{ message.text }}
        </div>

        <form @submit.prevent="handleUpdate">
          <div class="row mb-3">
            <div class="col-md-6">
              <label class="form-label fw-semibold">First Name</label>
              <input v-model="form.firstName" type="text" class="form-control" required>
            </div>
            <div class="col-md-6">
              <label class="form-label fw-semibold">Last Name</label>
              <input v-model="form.lastName" type="text" class="form-control" required>
            </div>
          </div>

          <div class="row mb-3">
            <div class="col-md-6">
              <label class="form-label fw-semibold">Email</label>
              <input v-model="form.email" type="email" class="form-control" disabled>
              <small class="text-muted">Email cannot be changed.</small>
            </div>
            <div class="col-md-6">
              <label class="form-label fw-semibold">Password</label>
              <input v-model="form.password" type="password" class="form-control"
                placeholder="Leave blank to keep current">
            </div>
          </div>

          <div class="row mb-3">
            <div class="col-md-4">
              <label class="form-label fw-semibold">Gender</label>
              <select v-model="form.gender" class="form-select">
                <option value="Male">Male</option>
                <option value="Female">Female</option>
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
              <input v-model="form.DateOfBirth" type="date" class="form-control">
            </div>
          </div>

          <div class="row mb-4 align-items-center">
            <div class="col-md-6">
              <label class="form-label fw-semibold">Score</label>
              <input v-model="form.score" type="number" class="form-control">
            </div>
            <div class="col-md-6">
              <div class="form-check form-switch mt-4">
                <input v-model="form.active" class="form-check-input" type="checkbox" id="active">
                <label class="form-check-label" for="active">Active Status</label>
              </div>
            </div>
          </div>

          <div class="d-flex gap-2">
            <button type="submit" class="btn btn-warning px-5" :disabled="isLoading">
              <span v-if="isLoading" class="spinner-border spinner-border-sm me-1"></span>
              Save Changes
            </button>
            <button type="button" @click="router.push('/')" class="btn btn-outline-secondary">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped></style>