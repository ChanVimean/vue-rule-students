<script setup>
import { reactive, ref } from 'vue';

const successMessage = ref('');

const form = reactive({
  name: '',
  email: '',
  subject: '',
  message: ''
});

const handleSubmit = () => {
  successMessage.value = 'Your message has been submitted successfully.';

  form.name = '';
  form.email = '';
  form.subject = '';
  form.message = '';
};
</script>

<template>
  <section class="bg-light min-vh-100">
    <div class="container py-5">
      <div class="row g-4 align-items-center">
        <!-- Contact Info -->
        <div class="col-lg-5">
          <span class="badge text-bg-primary mb-3">
            Contact
          </span>

          <h1 class="display-5 fw-bold mb-3">
            Need help with the system?
          </h1>

          <p class="lead text-muted mb-4">
            Send a message if you have questions, feedback, or need support
            managing student records.
          </p>

          <div class="card border-0 shadow-sm">
            <div class="card-body p-4">
              <div class="d-flex gap-3 pb-3 mb-3 border-bottom">
                <div class="fs-3">📧</div>
                <div>
                  <h6 class="fw-bold mb-1">Email</h6>
                  <p class="text-muted mb-0">support@student-system.com</p>
                </div>
              </div>

              <div class="d-flex gap-3 pb-3 mb-3 border-bottom">
                <div class="fs-3">📍</div>
                <div>
                  <h6 class="fw-bold mb-1">Location</h6>
                  <p class="text-muted mb-0">Phnom Penh, Cambodia</p>
                </div>
              </div>

              <div class="d-flex gap-3">
                <div class="fs-3">⏰</div>
                <div>
                  <h6 class="fw-bold mb-1">Support Hours</h6>
                  <p class="text-muted mb-0">
                    Monday - Friday, 8:00 AM - 5:00 PM
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Contact Form -->
        <div class="col-lg-7">
          <div class="card border-0 shadow-sm">
            <div class="card-body p-4 p-lg-5">
              <h4 class="fw-bold mb-4">Send Message</h4>

              <form @submit.prevent="handleSubmit">
                <div class="row g-3">
                  <div class="col-md-6">
                    <label class="form-label fw-semibold">Full Name</label>
                    <input v-model="form.name" type="text" class="form-control form-control-lg"
                      placeholder="Enter your name" required />
                  </div>

                  <div class="col-md-6">
                    <label class="form-label fw-semibold">Email Address</label>
                    <input v-model="form.email" type="email" class="form-control form-control-lg"
                      placeholder="Enter your email" required />
                  </div>

                  <div class="col-12">
                    <label class="form-label fw-semibold">Subject</label>
                    <input v-model="form.subject" type="text" class="form-control form-control-lg"
                      placeholder="What is this about?" required />
                  </div>

                  <div class="col-12">
                    <label class="form-label fw-semibold">Message</label>
                    <textarea v-model="form.message" class="form-control" rows="5" placeholder="Write your message..."
                      required></textarea>
                  </div>

                  <div class="col-12">
                    <button type="submit" class="btn btn-primary btn-lg px-5">
                      Send Message
                    </button>
                  </div>
                </div>
              </form>

              <div v-if="successMessage" class="alert alert-success mt-4 mb-0">
                {{ successMessage }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>