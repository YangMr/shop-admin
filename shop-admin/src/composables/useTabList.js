import {
    ref
} from "vue";
import {
    useRoute,
    onBeforeRouteUpdate,
    useRouter
} from "vue-router";
import {
    useCookies
} from "@vueuse/integrations/useCookies";

export function useTabList() {
    const cookie = useCookies();
    const router = useRouter();
    const route = useRoute();

    const activeTab = ref(route.path);
    const tabList = ref([{
        title: "后台首页",
        path: "/",
    }, ]);

    // 监听路由的更新
    onBeforeRouteUpdate((to, from) => {
        activeTab.value = to.path;
        addTab({
            title: to.meta.title,
            path: to.path,
        });
    });

    // 添加tab
    const addTab = (tab) => {
        // 判断当前要添加的数据是否在tabList里面存储，如果不存在，则进行添加
        let noTab = tabList.value.findIndex((item) => item.path === tab.path) == -1;
        if (noTab) {
            tabList.value.push(tab);
        }

        cookie.set("tabList", tabList.value);
    };

    // 删除tab
    const removeTab = (t) => {
        // t 表示当前点击的tab的name值， 你可以理解为这个name就是点击的tab跳转的路径
        // activeTab.value; 所激活的tab
        let a = activeTab.value;
        let tabs = tabList.value;

        if (a === t) {
            tabs.forEach((item, index) => {
                if (t === item.path) {
                    const nextTab = tabs[index + 1] || tabs[index - 1];
                    if (nextTab) {
                        a = nextTab.path;
                    }
                }
            });
        }

        // 激活tab
        activeTab.value = a;

        // 过滤出删除之后的数据
        tabList.value = tabList.value.filter((item) => item.path != t);

        // 将数据存储到本地
        cookie.set("tabList", tabList.value);
    };

    // 点击tab进行路由跳转
    const changeTab = (t) => {
        router.push(t);
    };

    // 页面刷新的时候读取本地存储的tab数据
    const initTabList = () => {
        let tabs = cookie.get("tabList");
        if (tabs) {
            tabList.value = tabs;
        }
    };
    initTabList();

    // 点击下拉菜单选项触发的方法
    const handleCommand = (command) => {
        console.log(command);
        if (command == "closeAll") {
            // 激活首页tab选中
            activeTab.value = "/";

            // 设置数据只有首页
            tabList.value = [{
                title: "后台首页",
                path: "/",
            }, ];
        } else {
            tabList.value = tabList.value.filter(
                (item) => item.path === "/" || item.path === activeTab.value
            );
        }

        cookie.set("tabList", tabList.value);
    };

    return {
        activeTab,
        tabList,
        removeTab,
        changeTab,
        handleCommand
    }
}