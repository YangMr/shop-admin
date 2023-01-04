<template>
  <div>
    后台首页
    {{ count }}

    <el-button @click="addCount">{{ count }}</el-button>

    <el-button @click="addCount2">{{ count }}</el-button>

    <hello-world></hello-world>
  </div>
</template>
<script setup>
import { ref, reactive } from "vue";

import HelloWorld from "~/components/HelloWorld.vue";

// 在setup语法糖中定义的变量可以直接在模板中展示
let count = ref(1);
let form = reactive({
  count: 2,
});

// 在setup语法糖中定义的方法可以直接在模板中调用
const addCount = () => {
  console.log("addCount");

  count++;

  console.log("count=>", count);
};

const addCount2 = () => {
  count.value++;

  console.log(count.value);

  form.count++;

  console.log("form.count=>", form.count);
};
</script>
