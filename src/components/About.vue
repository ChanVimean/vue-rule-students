<template>
  <section class="bg-light min-vh-100">
    <div class="container py-5">
      <!-- Main About Section -->
      <div class="row align-items-center g-4">
        <div class="col-lg-6">
          <span class="badge text-bg-primary mb-3">
            About This System
          </span>

          <h1 class="display-5 fw-bold mb-3">
            Simple student management, built for everyday use.
          </h1>

          <p class="lead text-muted mb-4">
            This Student Management System helps organize student records in a
            clean and easy way. You can view students, update their information,
            and manage records from one place.
          </p>

          <div class="d-flex flex-wrap gap-2">
            <router-link to="/student-list" class="btn btn-primary px-4">
              View Students
            </router-link>

            <router-link to="/contact" class="btn btn-outline-primary px-4">
              Contact Support
            </router-link>
          </div>
        </div>

        <div class="col-lg-6">
          <div class="card border-0 shadow-sm">
            <div class="card-body p-4">
              <h4 class="fw-bold mb-4">What this app can do</h4>

              <div class="d-flex gap-3 pb-3 mb-3 border-bottom">
                <div class="fs-3">👨‍🎓</div>
                <div>
                  <h6 class="fw-bold mb-1">Manage Students</h6>
                  <p class="text-muted mb-0">
                    Store and organize student names, emails, photos, and details.
                  </p>
                </div>
              </div>

              <div class="d-flex gap-3 pb-3 mb-3 border-bottom">
                <div class="fs-3">🔍</div>
                <div>
                  <h6 class="fw-bold mb-1">Search Records</h6>
                  <p class="text-muted mb-0">
                    Quickly filter students by name or email address.
                  </p>
                </div>
              </div>

              <div class="d-flex gap-3 pb-3 mb-3 border-bottom">
                <div class="fs-3">✏️</div>
                <div>
                  <h6 class="fw-bold mb-1">Update Information</h6>
                  <p class="text-muted mb-0">
                    Edit student records when information changes.
                  </p>
                </div>
              </div>

              <div class="d-flex gap-3">
                <div class="fs-3">🔐</div>
                <div>
                  <h6 class="fw-bold mb-1">Authentication Ready</h6>
                  <p class="text-muted mb-0">
                    Login and register routes are included for user access.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Info Cards -->
      <div class="row g-4 mt-4">
        <div class="col-md-4">
          <div class="card border-0 shadow-sm h-100">
            <div class="card-body p-4">
              <h2 class="fw-bold mb-2">Fast</h2>
              <p class="text-muted mb-0">
                Quickly access and manage records.
              </p>
            </div>
          </div>
        </div>

        <div class="col-md-4">
          <div class="card border-0 shadow-sm h-100">
            <div class="card-body p-4">
              <h2 class="fw-bold mb-2">Simple</h2>
              <p class="text-muted mb-0">
                Clean interface with easy navigation.
              </p>
            </div>
          </div>
        </div>

        <div class="col-md-4">
          <div class="card border-0 shadow-sm h-100">
            <div class="card-body p-4">
              <h2 class="fw-bold mb-2">Useful</h2>
              <p class="text-muted mb-0">
                Built around real student record tasks.
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Tech Section -->
      <div class="card border-0 shadow-sm mt-4">
        <div class="card-body p-4">
          <h4 class="fw-bold mb-3">Built With</h4>

          <div class="d-flex flex-wrap gap-2">
            <span class="badge text-bg-light border text-primary px-3 py-2">
              Vue.js
            </span>
            <span class="badge text-bg-light border text-primary px-3 py-2">
              Vue Router
            </span>
            <span class="badge text-bg-light border text-primary px-3 py-2">
              Bootstrap
            </span>
            <span class="badge text-bg-light border text-primary px-3 py-2">
              Axios
            </span>
            <span class="badge text-bg-light border text-primary px-3 py-2">
              Node.js API
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>