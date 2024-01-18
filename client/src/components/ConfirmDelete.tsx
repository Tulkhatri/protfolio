import { useState } from "react";
import { Popconfirm } from "antd";

interface PropsType {
  open: boolean;
  setOpen: (data: number) => void;
  title: string;
  deleteMySkill: (data: number) => void;
  id: number;
}

function ConfirmDelete({ open, setOpen, title, deleteMySkill, id }: PropsType) {
  const [confirmLoading, setConfirmLoading] = useState(false);

  const handleOk = () => {
    deleteMySkill(id);
    setConfirmLoading(true);

    setTimeout(() => {
      setOpen(0);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(0);
  };

  return (
    <div className="confirm_delete">
      <Popconfirm
        title={title}
        description="Are you sure to delete"
        open={open}
        onConfirm={handleOk}
        okButtonProps={{ loading: confirmLoading }}
        onCancel={handleCancel}
      >
        {/* <Button type="primary">
        Open Popconfirm
      </Button> */}
      </Popconfirm>
    </div>
  );
}

export default ConfirmDelete;
