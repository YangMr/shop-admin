<template>
  <div>
    后台首页

    {{ $store.state.user.username }}

    <el-button @click="handleLogout">退出登录</el-button>
  </div>
</template>
<script setup>
import { showModal, toast } from "~/composables/util";
import { logout } from "~/api/manager.js";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();
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
