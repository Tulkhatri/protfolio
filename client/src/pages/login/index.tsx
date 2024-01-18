import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input } from "antd";
import { Controller, useForm } from "react-hook-form";
import { loginUser } from "../../services/Auth";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Progressing from "../../components/Progressing";
import { useState } from "react";

interface FormValues {
  email: string;
  password: string;
}

const Login = () => {
  const [progressing, setProgressing] = useState(false);
  const navigate = useNavigate();
  const { handleSubmit, control } = useForm<FormValues>({});
  const onSubmit = async (formData: FormValues) => {
    setProgressing(true);
    const { data } = await loginUser({
      email: formData.email,
      password: formData.password,
    });
    if (data) {
      setProgressing(false);
      if (data?.response?.token) {
        toast.success(data.message);
        window.localStorage.setItem("token", data.response.token);
        navigate("/");
      } else {
        toast.error(data.message);
      }
    }
  };

  return (
    <div className="login-wrapper loader_relative">
      <Progressing loading={progressing} />
      <Form
        onFinish={handleSubmit(onSubmit)}
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
      >
        <Form.Item
          rules={[
            {
              required: true,
              message: "Please input your email!",
            },
          ]}
        >
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="email"
              />
            )}
          />
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
              message: "Please input your Password!",
            },
          ]}
        >
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            )}
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <a className="login-form-forgot" href="">
            Forgot password
          </a>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Log in
          </Button>
          Or <a href="">register now!</a>
        </Form.Item>
      </Form>
      <ToastContainer
        className="f-14-light"
        position="top-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default Login;
