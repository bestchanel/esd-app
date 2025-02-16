<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div class="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg max-w-md w-full">
      <h2 class="text-lg font-bold text-gray-900 dark:text-white mb-4">Profile</h2>

      <div class="space-y-4 text-sm text-gray-700 dark:text-gray-300">
        <div>
          <label class="block font-semibold">Username:</label>
          <input v-if="isEditing" v-model="editableUsername" class="input-field" />
          <p v-else>{{ username }}</p>
        </div>

        <div>
          <label class="block font-semibold">Password:</label>
          <input v-if="isEditing" type="password" v-model="editablePassword" class="input-field" placeholder="••••••" />
          <p v-else>********</p>
        </div>

        <div>
          <label class="block font-semibold">Name:</label>
          <input v-if="isEditing" v-model="editableFullname" class="input-field" />
          <p v-else>{{ fullname }}</p>
        </div>

        <div>
          <label class="block font-semibold">Email:</label>
          <input v-if="isEditing" v-model="editableEmail" class="input-field" />
          <p v-else>{{ email }}</p>
        </div>

        <div>
          <label class="block font-semibold">Branch:</label>
          <select v-if="isEditing" v-model="editableBranchId" class="input-field">
            <option v-for="branch in branches" :key="branch.id" :value="branch.id">
              {{ branch.attributes.Branchname }}
            </option>
          </select>
          <p v-else>{{ location }}</p>
        </div>

        <div>
          <label class="block font-semibold">Job Title:</label>
          <input v-if="isEditing" v-model="editableJobTitle" class="input-field" />
          <p v-else>{{ jobTitle }}</p>
        </div>
      </div>

      <div class="mt-4 flex justify-end space-x-2">
        <button v-if="isEditing" @click="saveChanges" class="btn-primary">Save</button>
        <button v-if="isEditing" @click="confirmCancelEdit" class="btn-secondary">Cancel</button>
        <button v-else @click="startEditing" class="btn-primary">Edit</button>
        <button @click="$emit('close')" class="btn-secondary">Close</button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import Swal from "sweetalert2"; // ✅ Import SweetAlert2

export default {
  setup() {
    const fullname = ref(localStorage.getItem("fullname") || "Unknown User");
    const email = ref(localStorage.getItem("email") || "example@example.com");
    const username = ref("");
    const jobTitle = ref("");
    const location = ref("");
    const userId = ref(null);
    const branches = ref([]);
    const isEditing = ref(false);
    const token = localStorage.getItem("token");

    // State สำหรับแก้ไข
    const editableUsername = ref("");
    const editableFullname = ref("");
    const editableEmail = ref("");
    const editablePassword = ref("");
    const editableBranchId = ref(null);
    const editableJobTitle = ref("");

    const fetchUserData = async () => {
      try {
        const response = await fetch("https://esd-app-strapi.up.railway.app/api/users?populate=branches");
        const data = await response.json();
        const matchedUser = data.find(user => user.Name === fullname.value);
        if (matchedUser) {
          userId.value = matchedUser.id;
          username.value = matchedUser.username;
          jobTitle.value = matchedUser.Position || "Unknown Position";
          location.value = matchedUser.branches ? matchedUser.branches.Branchname : "Unknown Branch";
          editableBranchId.value = matchedUser.branches ? matchedUser.branches.id : null;

          editableUsername.value = matchedUser.username;
          editableFullname.value = matchedUser.Name;
          editableEmail.value = matchedUser.email;
          editableJobTitle.value = matchedUser.Position;
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    const fetchBranches = async () => {
      try {
        const response = await fetch("https://esd-app-strapi.up.railway.app/api/branches");
        const data = await response.json();
        branches.value = data.data;
      } catch (error) {
        console.error("Error fetching branches:", error);
      }
    };

    const startEditing = () => {
      isEditing.value = true;
    };

    const confirmCancelEdit = () => {
      Swal.fire({
        title: "Cancel Editing?",
        text: "Your changes will not be saved.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, cancel",
        cancelButtonText: "No, keep editing",
      }).then((result) => {
        if (result.isConfirmed) {
          isEditing.value = false;
        }
      });
    };

    const saveChanges = async () => {
  if (!userId.value) return;

  try {
    const updatedData = {
      username: editableUsername.value,
      Name: editableFullname.value,
      email: editableEmail.value,
      Position: editableJobTitle.value,
      branches: editableBranchId.value ? { id: editableBranchId.value } : null,
    };

    if (editablePassword.value) {
      updatedData.password = editablePassword.value;
    }

    const response = await fetch(`https://esd-app-strapi.up.railway.app/api/users/${userId.value}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedData),
    });

    if (response.ok) {
      username.value = editableUsername.value;
      fullname.value = editableFullname.value;
      email.value = editableEmail.value;
      jobTitle.value = editableJobTitle.value;
      location.value = branches.value.find(b => b.id === editableBranchId.value)?.attributes.Branchname || "Unknown Branch";

      localStorage.setItem("fullname", fullname.value);
      localStorage.setItem("email", email.value);
      localStorage.setItem("jobTitle", jobTitle.value);

      isEditing.value = false;

      // ✅ ใช้ SweetAlert2 แจ้งเตือน และหายไปเองใน 2 วินาที
      Swal.fire({
        title: "แก้ไขข้อมูลสำเร็จ!",
        text: "ข้อมูลของคุณถูกแก้ไขแล้ว.",
        icon: "success",
        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: false, // ❌ ไม่ต้องกด OK
      });
    } else {
      Swal.fire({
        title: "เกิดข้อผิดพลาด",
        text: "ไม่สามารถแก้ไขได้.",
        icon: "error",
        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: false,
      });
    }
  } catch (error) {
    console.error("Error updating user:", error);
    Swal.fire({
      title: "Error!",
      text: "An error occurred while updating.",
      icon: "error",
      timer: 2000,
      timerProgressBar: true,
      showConfirmButton: false,
    });
  }
};


    onMounted(async () => {
      await fetchUserData();
      await fetchBranches();
    });

    return {
      username,
      fullname,
      email,
      location,
      jobTitle,
      isEditing,
      editableUsername,
      editableFullname,
      editableEmail,
      editablePassword,
      editableBranchId,
      editableJobTitle,
      saveChanges,
      startEditing,
      confirmCancelEdit,
      branches,
    };
  },
};
</script>



<style scoped>
.input-field {
  width: 100%;
  padding: 8px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  background-color: white;
  color: black;
}
.dark .input-field {
  background-color: #1e293b;
  color: white;
  border-color: #334155;
}
.btn-primary {
  background-color: #2563eb;
  color: white;
  padding: 8px 12px;
  border-radius: 6px;
}
.btn-primary:hover {
  background-color: #1e40af;
}
.btn-secondary {
  background-color: #6b7280;
  color: white;
  padding: 8px 12px;
  border-radius: 6px;
}
.btn-secondary:hover {
  background-color: #4b5563;
}
</style>
