<template>
  <div class="f-menu" :style="{ width: $store.state.asideWidth }">
    <el-menu
      :default-active="defaultActive"
      :collapse="isCollapse"
      class="border-0"
      @select="handleSelect"
      :collapse-transition="false"
      unique-opened
    >
      <template v-for="(item, index) in asideMenus">
        <el-sub-menu
          :key="index"
          v-if="item.child && item.child.length > 0"
          :index="item.name"
        >
          <template #title>
            <el-icon>
              <component :is="item.icon"></component>
            </el-icon>
            <span>{{ item.name }}</span>
          </template>
          <el-menu-item
            v-for="(item2, index2) in item.child"
            :key="index2"
            :index="item2.frontpath"
          >
            <el-icon>
              <component :is="item2.icon"></component>
            </el-icon>
            <span>{{ item2.name }}</span>
          </el-menu-item>
        </el-sub-menu>
        <el-menu-item v-else :index="item.frontpath" :key="item.frontpath">
          <el-icon>
            <component :is="item.icon"></component>
          </el-icon>
          <span>{{ item.name }}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { useRouter, useRoute, onBeforeRouteUpdate } from "vue-router";
import { useStore } from "vuex";
const router = useRouter();
const store = useStore();
const route = useRoute();

// 模拟的菜单数据
const asideMenus = computed(() => store.state.menus);

// 设置菜单的默认选中项
const defaultActive = ref(route.path);

// 路由发生变化的钩子函数
onBeforeRouteUpdate((to, from) => {
  defaultActive.value = to.path;
});

// 控制菜单展开或者收起 false 展开 true收起
const isCollapse = computed(() => !(store.state.asideWidth == "250px"));

// 点击菜单触发方法
const handleSelect = (e) => {
  router.push(e);
};
</script>

<style scoped lang="postcss">
.f-menu {
  transition: all 0.2s;
  top: 64px;
  bottom: 0;
  left: 0;
  overflow-y: auto;
  overflow-x: hidden;
  @apply shadow-md fixed bg-light-50;
}
.f-menu::-webkit-scrollbar {
  width: 0;
}
</style>
