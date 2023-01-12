<template>
  <div class="f-header">
    <!-- logo -->
    <span class="logo">
      <el-icon class="mr-1"><ElemeFilled /></el-icon>
      九月云编程
    </span>
    <!-- 菜单展开与收起图标 -->
    <el-tooltip effect="dark" content="菜单" placement="bottom">
      <el-icon class="icon-btn"><Fold /></el-icon>
    </el-tooltip>

    <!-- 刷新图标 -->
    <el-tooltip effect="dark" content="刷新" placement="bottom">
      <el-icon class="icon-btn" @click="handleRefresh"><Refresh /></el-icon>
    </el-tooltip>

    <div class="ml-auto flex items-center">
      <!-- 全屏图标 -->
      <el-tooltip effect="dark" content="全屏" placement="bottom">
        <el-icon class="icon-btn" @click="toggle">
          <FullScreen v-if="!isFullscreen" />
          <Aim v-else />
        </el-icon>
      </el-tooltip>

      <!-- 下拉菜单 -->
      <el-dropdown class="dropdown" @command="handleCommand">
        <span class="el-dropdown-link">
          <el-avatar class="mr-2" :size="25" :src="$store.state.user.avatar" />
          {{ $store.state.user.username }}
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="rePassword">修改密码</el-dropdown-item>
            <el-dropdown-item command="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>

  <form-drawer
    ref="formDrawerRef"
    title="修改密码"
    destroyedOnClose
    @submit="onSubmit"
  >
    <el-form
      ref="formRef"
      :rules="rules"
      :model="form"
      label-width="80px"
      label-position="right"
      size="small"
    >
      <el-form-item prop="oldpassword" label="旧密码">
        <el-input v-model.trim="form.oldpassword" placeholder="请输入旧密码">
        </el-input>
      </el-form-item>
      <el-form-item prop="password" label="新密码">
        <el-input v-model.trim="form.password" placeholder="请输入密码">
        </el-input>
      </el-form-item>
      <el-form-item prop="repassword" label="确认密码">
        <el-input v-model.trim="form.repassword" placeholder="请输入确认密码">
        </el-input>
      </el-form-item>
    </el-form>
  </form-drawer>
</template>

<script setup>
import { useFullscreen } from "@vueuse/core";
import FormDrawer from "~/components/FormDrawer.vue";

import { usePassword, useLogout } from "~/composables/useManager.js";

const { form, rules, formRef, onSubmit, openRePasswordForm, formDrawerRef } =
  usePassword();

const { handleLogout } = useLogout();
// isFullscreen是否是全屏 enter 进入全屏 exit退出全屏 toggle 切换全屏
const { isFullscreen, toggle } = useFullscreen();

// 刷新
const handleRefresh = () => {
  location.reload();
};

// 下拉菜单方法
const handleCommand = (command) => {
  switch (command) {
    case "logout":
      handleLogout();
      break;
    case "rePassword":
      // 调用打开修改密码弹窗方法
      openRePasswordForm();
      break;
  }
};
</script>

<style scoped>
.f-header {
  height: 64px;
  @apply flex items-center text-light-50 bg-indigo-700 fixed left-0 right-0 top-0;
}
.logo {
  width: 250px;
  @apply flex items-center justify-center text-xl font-thin;
}
.icon-btn {
  @apply flex items-center justify-center;
  width: 42px;
  height: 64px;
  cursor: pointer;
}
.icon-btn:hover {
  @apply bg-indigo-600;
}
.dropdown,
.el-dropdown-link {
  @apply flex items-center justify-center mx-3 text-light-50;
  height: 64px;
  cursor: pointer;
}
</style>
