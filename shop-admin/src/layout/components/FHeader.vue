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

  <el-drawer
    v-model="showDrawer"
    title="修改密码"
    :close-on-click-modal="false"
    size="45%"
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
      <el-form-item>
        <el-button type="primary" @click="onSubmit" :loading="loading"
          >提交</el-button
        >
      </el-form-item>
    </el-form>
  </el-drawer>
</template>

<script setup>
import { showModal, toast } from "~/composables/util";
import { logout, updatepassword } from "~/api/manager.js";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { useFullscreen } from "@vueuse/core";
import { ref, reactive } from "vue";

const store = useStore();
const router = useRouter();
// isFullscreen是否是全屏 enter 进入全屏 exit退出全屏 toggle 切换全屏
const { isFullscreen, toggle } = useFullscreen();
// 控制抽屉显示或隐藏的状态
const showDrawer = ref(false);

// 表单所绑定的字段
const form = reactive({
  oldpassword: "",
  password: "",
  repassword: "",
});

// 表单校验规则
const rules = reactive({
  oldpassword: [{ required: true, message: "旧密码不能为空", trigger: "blur" }],
  password: [{ required: true, message: "密码不能为空", trigger: "blur" }],
  repassword: [{ required: true, message: "密码新不能为空", trigger: "blur" }],
});

// 初始化loading状态
const loading = ref(false);

const formRef = ref(null);

// 登录方法
const onSubmit = () => {
  formRef.value.validate((valid) => {
    if (!valid) return false;

    // 开启登录按钮loading加载
    loading.value = true;

    // 调用修改密码接口
    updatepassword(form).then((response) => {
      // 关闭登录按钮loading加载
      loading.value = false;

      toast("修改密码成功,请重新登录");

      // 清空vuex的user 以及cookie里面的token
      store.dispatch("logout");

      // 跳转回登录页
      router.push("/login");
    });
  });
};

// 刷新
const handleRefresh = () => {
  location.reload();
};

// 全屏

// 下拉菜单方法
const handleCommand = (command) => {
  switch (command) {
    case "logout":
      handleLogout();
      break;
    case "rePassword":
      showDrawer.value = true;
      break;
  }
};

// 退出登录
const handleLogout = () => {
  showModal("是否要退出登录？")
    .then((response) => {
      logout()
        .then()
        .finally(() => {
          // 在vuex中清除cookie里面的token 以及vuex的user
          store.dispatch("logout");

          // 跳转回登录页
          router.push("/login");
          // 提示退出登录
          toast("退出登录成功");
        });
    })
    .catch((error) => {
      console.log("error", error);
    });
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
