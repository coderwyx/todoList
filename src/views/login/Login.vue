<template>
    <div class="login">
        <h3 class="title">Welcome to</h3>
        <a-form
            :model="formState"
            name="normal_login"
            class="login-form"
            @finish="onFinish"
            @finishFailed="onFinishFailed"
        >
            <a-form-item
                label="Username"
                name="username"
                :labelCol="{ span: 8 }"
                labelAlign="left"
                :rules="[{ required: true, message: 'Please input your username!' }]"
            >
                <a-input v-model:value="formState.username">
                    <template #prefix>
                        <UserOutlined class="site-form-item-icon" />
                    </template>
                </a-input>
            </a-form-item>

            <a-form-item
                label="Password"
                name="password"
                labelAlign="left"
                :labelCol="{ span: 8 }"
                :rules="[{ required: true, message: 'Please input your password!' }]"
            >
                <a-input-password v-model:value="formState.password">
                    <template #prefix>
                        <LockOutlined class="site-form-item-icon" />
                    </template>
                </a-input-password>
            </a-form-item>

            <div class="login-form-wrap">
                <a-form-item name="remember" no-style>
                    <a-checkbox v-model:checked="formState.remember">Remember me</a-checkbox>
                </a-form-item>
            </div>

            <a-form-item>
                <a-button
                    :disabled="disabled"
                    type="primary"
                    html-type="submit"
                    class="login-form-button"
                >Log in</a-button>
            </a-form-item>
        </a-form>
    </div>
</template>
<script lang="ts">
import { defineComponent, reactive, computed } from 'vue';
import { useRouter } from 'vue-router';
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue';
interface FormState {
    username: string;
    password: string;
    remember: boolean;
}
export default defineComponent({
    name: 'Login',
    components: {
        UserOutlined,
        LockOutlined,
    },
    setup() {
        const formState = reactive<FormState>({
            username: '',
            password: '',
            remember: true,
        });
        const router = useRouter()
        const onFinish = (values: any) => {
            console.log('Success:', values);
            window.localStorage.setItem('token', 'admin');
            router.push('/')
        };

        const onFinishFailed = (errorInfo: any) => {
            console.log('Failed:', errorInfo);
        };
        const disabled = computed(() => {
            return !(formState.username && formState.password);
        });
        return {
            formState,
            onFinish,
            onFinishFailed,
            disabled,
        };
    },
});
</script>
<style>
.login {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    box-shadow: 0 0 25px #909399;
    padding: 30px 60px;
}
.title {
    text-align: center;
    padding: 15px;
}
.login-form {
    max-width: 300px;
}
.login-form-wrap {
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.login-form-forgot {
    margin-bottom: 24px;
}
.login-form-button {
    width: 100%;
}
</style>