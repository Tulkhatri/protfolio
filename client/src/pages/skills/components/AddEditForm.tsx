import { Button, Form, Input } from "antd";
import { storeSkill } from "../../../services/ApiCallAll";
import { ToastContainer, toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import Progressing from "../../../components/Progressing";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import type { UploadProps } from "antd";
import { message, Upload } from "antd";
import { InboxOutlined } from "@ant-design/icons";
interface FormValue {
  title: string;
  description: string;
}
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
    number: "${label} is not a valid number!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};
/* eslint-enable no-template-curly-in-string */
const AddEditForm = () => {
  const [file, setFile] = useState<File>();
  // file upload
  const { Dragger } = Upload;
  const props: UploadProps = {
    name: "file",
    multiple: false,
    action: "https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188",
    onChange(info) {
      const { status } = info.file;
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
        setFile(info.file.originFileObj);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      setFile(e.dataTransfer.files[0]);
    },
  };

  // end file upload

  const { state } = useLocation();

  console.log("edit data", state);
  const { handleSubmit, control } = useForm<FormValue>({
    defaultValues: {
      title: state?.title ?? "",
      description: state?.description ?? "",
    },
  });
  console.log("state", state);
  const navigate = useNavigate();
  const [progressing, setProgressing] = useState(false);
  const onSubmit = async (formValue: FormValue) => {
    setProgressing(true);

    const formData = new FormData();
    formData.append("edit_id", state?.edit_id ?? "");
    formData.append("file", (file as File) ?? "");
    formData.append("title", formValue.title);
    formData.append("description", formValue.description ?? "");

    const { data } = await storeSkill(formData);

    // const { data } = await storeSkill({
    //   title: formData.title,
    //   description: formData.description,
    //   edit_id: state?.edit_id ?? "",
    // });
    if (data) {
      setProgressing(false);
      console.log(data);
      if (data.type === "success") {
        toast.success(data.message);
        navigate("/skills");
      } else {
        toast.error(data.message);
      }
    }
  };
  return (
    <div className="dashboard display-block loader_relative">
      <Progressing loading={progressing} />
      <Form
        {...layout}
        name="nest-messages"
        onFinish={handleSubmit(onSubmit)}
        style={{ maxWidth: 600 }}
        validateMessages={validateMessages}
      >
        <Form.Item label="Title" rules={[{ required: true }]}>
          <Controller
            name="title"
            control={control}
            render={({ field }) => <Input {...field} placeholder="Title" />}
          />
        </Form.Item>
        <Form.Item label="Description">
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <Input.TextArea {...field} placeholder="Description" />
            )}
          />
        </Form.Item>

        <Form.Item label="Image">
          <div className="mt-30 width50">
            <Dragger {...props} accept=".png, .jpg, .jpeg">
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">
                अपलोड गर्नका लागि फाइलमा क्लिक गर्नुहोस् वा तान्नुहोस्
              </p>
              <p className="ant-upload-hint">
                Image (.png, .jpg, .jpeg) is Supported
              </p>
            </Dragger>
            {/* <input
                type="file"
                name="file"
                onChange={(e) =>
                  e.target.files &&
                  e.target.files[0] &&
                  setFile(e.target.files[0])
                }
                className=""
              ></input> */}
          </div>
        </Form.Item>

        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
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

export default AddEditForm;
