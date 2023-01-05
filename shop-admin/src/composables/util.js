import {
    ElNotification,
    ElMessageBox
} from "element-plus";

import NProgress from "nprogress"

// 通知提示
export const toast = (message, type = "success", dangerouslyUseHTMLString = false) => {
    ElNotification({
        message,
        type,
        duration: 3000,
        dangerouslyUseHTMLString
    });
}

// 消息弹出框
export const showModal = (content = "提示内容", type = "warning", title = "", ) => {
    return ElMessageBox.confirm(
        content,
        title, {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type
        }
    )
}

// 开启全屏loading
export const showFullLoading = () => {
    NProgress.start();
}

// 关闭全屏loading
export const hideFullLoading = () => {
    NProgress.done();;
}