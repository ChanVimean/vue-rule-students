<template>
  <section class="home-page">
    <div class="container py-5">
      <div class="row align-items-center min-vh-75">
        <div class="col-lg-7">
          <span class="badge text-bg-primary mb-3 px-3 py-2">
            Student Management System
          </span>

          <h1 class="display-5 fw-bold mb-3">
            Manage students faster and easier.
          </h1>

          <p class="lead text-muted mb-4">
            A simple dashboard for viewing, editing, and organizing student
            records in one place.
          </p>

          <div class="d-flex flex-wrap gap-2">
            <router-link to="/student-list" class="btn btn-primary btn-lg">
              View Students
            </router-link>

            <router-link to="/auth/register" class="btn btn-outline-secondary btn-lg">
              Get Started
            </router-link>
          </div>
        </div>

        <div class="col-lg-5 mt-5 mt-lg-0">
          <div class="card border-0 shadow-lg rounded-4">
            <div class="card-body p-4">
              <h5 class="fw-bold mb-4">Quick Actions</h5>

              <div class="action-item">
                <div>
                  <h6 class="mb-1">Student Records</h6>
                  <p class="text-muted mb-0">View and manage all students.</p>
                </div>
                <router-link to="/student-list" class="btn btn-sm btn-primary">
                  Open
                </router-link>
              </div>

              <div class="action-item">
                <div>
                  <h6 class="mb-1">About System</h6>
                  <p class="text-muted mb-0">Learn more about this app.</p>
                </div>
                <router-link to="/about" class="btn btn-sm btn-outline-primary">
                  View
                </router-link>
              </div>

              <div class="action-item border-bottom-0 pb-0">
                <div>
                  <h6 class="mb-1">Contact</h6>
                  <p class="text-muted mb-0">Need help or support?</p>
                </div>
                <router-link to="/contact" class="btn btn-sm btn-outline-primary">
                  Contact
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.home-page {
  min-height: calc(100vh - 56px);
  background:
    radial-gradient(circle at top left, rgba(13, 110, 253, 0.12), transparent 35%),
    linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
}

.min-vh-75 {
  min-height: 75vh;
}

.action-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  padding-bottom: 1rem;
  margin-bottom: 1rem;
  border-bottom: 1px solid #e9ecef;
}
</style>