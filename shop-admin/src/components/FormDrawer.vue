<template>
  <el-drawer
    v-model="showDrawer"
    :title="title"
    :close-on-click-modal="false"
    :size="size"
    :destroy-on-close="destroyedOnClose"
  >
    <div class="formDrawer">
      <div class="body">
        <slot></slot>
      </div>
      <div class="actions">
        <el-button type="primary" :loading="loading" @click="submit">{{
          confirmText
        }}</el-button>
        <el-button type="default" @click="close">取消</el-button>
      </div>
    </div>
  </el-drawer>
</template>

<script setup>
import { ref } from "vue";

// 接收父组件所传递的参数
const props = defineProps({
  title: String,
  size: {
    type: String,
    default: "45%",
  },
  destroyedOnClose: {
    type: Boolean,
    default: false,
  },
  confirmText: {
    type: String,
    default: "提交",
  },
});

// 设置弹窗抽屉默认隐藏
const showDrawer = ref(false);

// 定义弹窗打开方法
const open = () => {
  showDrawer.value = true;
};

// 定义弹窗关闭方法
const close = () => {
  showDrawer.value = false;
};

// 定义loading加载的状态， false为不加载 true加载
const loading = ref(false);

// 显示loading
const showLoading = () => {
  loading.value = true;
};

// 隐藏loading
const hideLoading = () => {
  loading.value = false;
};

// 提交按钮方法
const emit = defineEmits(["submit"]);
const submit = () => {
  emit("submit");
};

// 向父组件暴露以下方法
defineExpose({
  open,
  close,
  showLoading,
  hideLoading,
});
</script>

<style lang="postcss" scoped>
.formDrawer {
  width: 100%;
  height: 100%;
  position: relative;
  @apply flex flex-col;
}

.formDrawer .body {
  flex: 1;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 50px;
  overflow-y: auto;
}

.formDrawer .actions {
  height: 50px;
  @apply mt-auto flex items-center;
}
</style>
