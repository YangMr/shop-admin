<template>
  <div>
    <div class="f-tag-list" :style="{ left: $store.state.asideWidth }">
      <el-tabs
        v-model="activeTab"
        type="card"
        @tab-remove="removeTab"
        style="min-width: 100px"
        @tab-change="changeTab"
      >
        <el-tab-pane
          :closable="!(item.path == '/')"
          v-for="item in tabList"
          :key="item.path"
          :label="item.title"
          :name="item.path"
        >
        </el-tab-pane>
      </el-tabs>

      <span class="tag-btn">
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link">
            <el-icon><arrow-down /></el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="closeOther">关闭其他</el-dropdown-item>
              <el-dropdown-item command="closeAll">关闭全部</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </span>
    </div>
    <div style="height: 44px"></div>
  </div>
</template>

<script setup>
import { useTabList } from "~/composables/useTabList.js";

const { activeTab, tabList, removeTab, changeTab, handleCommand } =
  useTabList();
</script>

<style lang="postcss" scoped>
.f-tag-list {
  @apply bg-gray-100 flex items-center fixed px-2;

  height: 44px;
  top: 64px;
  right: 0;
}

.tag-btn {
  @apply bg-white ml-auto px-2 flex items-center justify-center;
  height: 32px;
}

:deep(.el-tabs) {
  --el-tabs-header-height: auto;
}

:deep(.el-tabs__header) {
  margin-bottom: 0;
  border: 0 !important;
}

:deep(.el-tabs__nav) {
  border: 0 !important;
}
:deep(.el-tabs__item) {
  border: 0 !important;
  height: 32px;
  line-height: 32px;
  @apply bg-white mx-1 rounded;
}

:deep(.el-tabs__nav-prev),
:deep(.el-tabs__nav-next) {
  line-height: 32px;
}

:deep(.is-disabled) {
  cursor: not-allowed;
  @apply text-gray-300;
}
</style>
