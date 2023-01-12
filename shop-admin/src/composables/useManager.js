import {
    ref,
    reactive
} from "vue";
import {
    logout,
    updatepassword
} from "~/api/manager.js";
import {
    useStore
} from "vuex";
import {
    useRouter
} from "vue-router";
import {
    showModal,
    toast
} from "~/composables/util";


// 修改密码业务代码
export function usePassword() {
    const router = useRouter()
    const store = useStore()

    // 表单所绑定的字段
    const form = reactive({
        oldpassword: "",
        password: "",
        repassword: "",
    });

    // 表单校验规则
    const rules = reactive({
        oldpassword: [{
            required: true,
            message: "旧密码不能为空",
            trigger: "blur"
        }, ],
        password: [{
            required: true,
            message: "密码不能为空",
            trigger: "blur"
        }],
        repassword: [{
            required: true,
            message: "密码新不能为空",
            trigger: "blur"
        }, ],
    });

    const formRef = ref(null);
    // 修改密码
    const formDrawerRef = ref(null);

    // 修改密码方法
    const onSubmit = () => {
        formRef.value.validate((valid) => {
            if (!valid) return false;

            // 开启提交按钮loading加载
            // loading.value = true;
            formDrawerRef.value.showLoading();

            // 调用修改密码接口
            updatepassword(form)
                .then((response) => {
                    toast("修改密码成功,请重新登录");

                    // 清空vuex的user 以及cookie里面的token
                    store.dispatch("logout");

                    // 跳转回登录页
                    router.push("/login");
                })
                .finally(() => {
                    // 关闭登录按钮loading加载
                    formDrawerRef.value.hideLoading();
                });
        });
    };

    // 打开修改密码弹窗方法
    const openRePasswordForm = () => {
        formDrawerRef.value.open();
    };

    return {
        form,
        rules,
        formRef,
        onSubmit,
        openRePasswordForm,
        formDrawerRef
    };
}

// 退出登录业务代码
export function useLogout() {
    const router = useRouter()
    const store = useStore()

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

    return {
        handleLogout
    }
}