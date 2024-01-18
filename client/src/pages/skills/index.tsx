// import myImage from "../../assets/images/tul.jpg";
// const Skills = () => {
//   return (
//     <div className="dashboard">
//       <div className="left-portion">
//         <p className="f-20-700">static Image</p>
//         <p className="f-18-700">Title</p>
//         <p className="f-16-400">Description</p>
//       </div>
//       <div className="right-portion">
//         <div className="image-wrapper">
//           <img src={myImage} alt="Tul Khatri" />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Skills;
import { Button, Table, Tooltip } from "antd";
import type { ColumnsType } from "antd/es/table";
import { MdDeleteOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { deleteSkill, editSkill, getSkill } from "../../services/ApiCallAll";
import { useEffect, useState } from "react";
import ConfirmDelete from "../../components/ConfirmDelete";
import { ToastContainer, toast } from "react-toastify";
import Progressing from "../../components/Progressing";
interface DataType {
  key: number;
  title: string;
  sn: number;
  description: string;
}
interface SkillType {
  id: number;
  sn: number;
  title: string;
  description: string;
}

const Skills = () => {
  const [progressing, setProgressing] = useState(false);
  // Delete  confirm
  const [open, setOpen] = useState<number>();

  const confirmDelete = (id: number) => {
    setOpen(id);
  };
  // End delete confirm

  const [skill, setSkill] = useState<SkillType[]>([]);
  const navigate = useNavigate();
  const getAllSkills = async () => {
    const { data } = await getSkill();
    if (data) {
      setSkill(data.response);
    }
  };

  const deleteMySkill = async (id: number) => {
    const { data } = await deleteSkill({ id: id });
    if (data) {
      if (data.type === "success") {
        toast.success(data.message);
        getAllSkills();
      } else {
        toast.error(data.message);
      }
    }
  };

  const editMySkill = async (id: number) => {
    setProgressing(true);
    const { data } = await editSkill({ id: id });
    if (data) {
      setProgressing(false);
      if (data.type === "success") {
        navigate(`/skills/edit`, { state: data.response });
      } else {
        toast.error(data.message);
      }
    }
  };

  const columns: ColumnsType<DataType> = [
    {
      title: "S. No.",
      dataIndex: "sn",
      align: "center",
      width: 80,
    },
    {
      title: "Title",
      dataIndex: "title",
    },
    {
      title: "Description",
      dataIndex: "description",
    },
    {
      key: "action",
      title: "Action",
      align: "center",
      width: 60,
      render: (_, record) => {
        return (
          <div className="d-flex justify-content-center gap-10">
            <Tooltip title="View">
              <FaEdit
                className="edit"
                onClick={() => editMySkill(record.key)}
              />
            </Tooltip>

            <Tooltip title="Delete">
              <MdDeleteOutline
                className="delete m-0"
                onClick={() => confirmDelete(record.key)}
              />
            </Tooltip>
            {open === Number(record.key) && (
              <div className="delete">
                <ConfirmDelete
                  open
                  setOpen={setOpen}
                  title={record.title}
                  deleteMySkill={deleteMySkill}
                  id={record.key}
                />
              </div>
            )}
          </div>
        );
      },
    },
  ];

  const data = skill?.map((item) => ({
    key: item.id,
    sn: item.sn,
    title: item.title,
    description: item.description,
  }));

  useEffect(() => {
    getAllSkills();
  }, []);
  return (
    <div className="dashboard display-block loader_relative">
      <Progressing loading={progressing} />
      <div className="d-flex m-30 justify-content-space">
        <p className="f-16-400">Skills</p>
        <Button
          className="align-item-end"
          onClick={() => {
            navigate("/skills/add");
          }}
        >
          Add Skill
        </Button>
      </div>
      <Table columns={columns} dataSource={data} bordered />

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

export default Skills;
