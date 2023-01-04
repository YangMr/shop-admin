<template>
  <el-row class="login-container">
    <el-col :lg="16" :md="12" class="left">
      <div>
        <div>欢迎光临</div>
        <div>《vue3 + vite》实战项目演示网站</div>
      </div>
    </el-col>
    <el-col :lg="8" :md="12" class="right">
      <h2 class="title">欢迎回来</h2>
      <div>
        <span class="line"></span>
        <span>账号密码登录</span>
        <span class="line"></span>
      </div>
      <el-form ref="formRef" :rules="rules" :model="form" class="w-[250px]">
        <el-form-item prop="username">
          <el-input v-model.trim="form.username" placeholder="请输入用户名">
            <template #prefix>
              <el-icon><User /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model.trim="form.password" placeholder="请输入密码">
            <template #prefix>
              <el-icon><Lock /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            round
            color="#626aef"
            class="w-[250px]"
            @click="onSubmit"
            >登 录</el-button
          >
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script setup>
import { reactive, ref } from "vue";

import { login } from "~/api/manager.js";

import { ElNotification } from "element-plus";

import { useRouter } from "vue-router";

// 初始化路由对象
const router = useRouter();

// 表单所绑定的字段
const form = reactive({
  username: "",
  password: "",
});

// 表单校验规则
const rules = reactive({
  username: [{ required: true, message: "用户名不能为空", trigger: "blur" }],
  password: [{ required: true, message: "密码不能为空", trigger: "blur" }],
});

const formRef = ref(null);

// 登录方法
const onSubmit = () => {
  formRef.value.validate((valid) => {
    if (!valid) return false;

    login(form)
      .then((response) => {
        console.log("response=>", response.data.data);

        // 提示登录成功
        ElNotification({
          message: "登录成功",
          type: "success",
          duration: 3000,
        });

        // 存储token与用户信息

        // 跳转到后台首页
        router.push("/");
      })
      .catch((error) => {
        console.log("error=>", error.response.data.msg);
        ElNotification({
          message: error.response.data.msg,
          type: "error",
          duration: 3000,
        });
      });
  });
};
</script>

<style lang="postcss" scoped>
.login-container {
  @apply bg-indigo-500 min-h-screen;
}
.login-container .left,
.login-container .right {
  @apply flex items-center justify-center;
}

.login-container .right {
  @apply bg-light-50  flex-col;
}

.left > div > div:first-child {
  @apply text-light-50 font-bold text-3xl mb-4;
}
.left > div > div:last-child {
  @apply text-gray-200 text-sm;
}

.right .title {
  @apply font-bold text-3xl text-gray-800;
}
.right > div {
  @apply my-5 text-gray-300 flex items-center justify-center space-x-2;
}
.right .line {
  @apply h-[1px] w-16 bg-gray-200;
}
</style>
