<template>
  <div>
    <el-row gutter:="20">
      <h1>Please login to see the secret content</h1>
      <p v-if="form.error" class="error">{{ form.error }}</p>
      <el-form action="/auth/local" method="post" status-icon="" label-width="60px">
        <el-form-item label="Email" prop="email">
          <el-input name="email" type="email" v-model="form.email" auto-complete="off"/>
        </el-form-item>
        <el-form-item label="Password" prop="password">
          <el-input name="password" type="password" v-model="form.password" auto-complete="off"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" native-type="submit">Login</el-button>
        </el-form-item>
      </el-form>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: { error: '', email: 'user@domain.com', password: 'SuperAdmin' },
    }
  },
}
</script>
