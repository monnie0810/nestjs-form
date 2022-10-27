import Head from 'next/head'
import React, { useState, useEffect } from 'react';
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import { useForm } from "react-hook-form";
export default function Home() {
  // if ((user.name.toString().toLowerCase().indexOf(searchKey) > -1)
  const [emplyeeList, setEmployeeList] = useState([]);
  const [id, setId] = useState(-1);
  const [sexValue, setSexValue] = useState("0");
  const [show, setShow] = useState(false);
  useEffect(() => {
    let emplyees = [{
      id: 1,
      name: "Nguyễn Văn A",
      sex: 0,
      address: "Cần Thơ",
      phoneNumber: "0123456789",
      email: "nva@gmail.com",
      position: "GIám đốc",
    },
    {
      id: 2,
      name: "Nguyễn Thị B",
      sex: 1,
      address: "Hậu Giang",
      phoneNumber: "0123456789",
      email: "ntb@gail.com",
      position: "Trưởng Phòng",
    },
    {
      id: 3,
      name: "Nguyễn Văn C",
      sex: 0,
      address: "Cần Thơ",
      phoneNumber: "0123456789",
      email: "nvc@gmail.com",
      position: "Nhân Viên",
    }
    ];
    if (!localStorage.getItem('emplyeeList') || JSON.parse(localStorage.getItem('emplyeeList')) === "" || localStorage.getItem('emplyeeList') == "") {
      localStorage.setItem("emplyeeList", JSON.stringify(emplyees))
    }

    setEmployeeList(JSON.parse(localStorage.getItem('emplyeeList')));

  }, []);

  const onDelete = (id) => {
    console.log(id);
    const new_arr = emplyeeList.filter(item => item.id !== id);
    setEmployeeList(new_arr);
    localStorage.setItem("emplyeeList", JSON.stringify(new_arr))
  };
  // ----------------------------------them - sưa -----------------------
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const suathongTin = (idtt) => {
    if (idtt != 'null' || idtt != '' || idtt > -1) {
      console.log(emplyeeList)
      console.log(idtt)
      emplyeeList.map((item) => {
        if (item.id == idtt) {
          console.log(item.name)
          setValue("name", item.name);
          setValue("phone", item.phoneNumber);
          setValue("address", item.address);
          setValue("email", item.email);
          setSexValue(item.sex)
        }
      })

    } else {
      setValue("name", '');
      setValue("phone", '');
      setValue("address", '');
      setValue("email", '');
      setSexValue('')
    }
  }
  const onSubmit = async (data, e) => {
    console.log(id)

    if (id == null || id == "" || id == -1) {
      const index = 0;
      console.log(emplyeeList);
      if (emplyeeList.length > 0) {
        index = emplyeeList[emplyeeList.length - 1].id;
      }

      const emplyee = {
        id: index + 1,
        name: data.name,
        sex: data.sex,
        address: data.address,
        phoneNumber: data.phone,
        email: data.email,
        position: "nhân viên"
      };
      localStorage.removeItem('emplyeeList');
      emplyeeList.push(emplyee);
    } else {
      let positionValueEdit;
      emplyeeList.forEach((item) => {
        if (item.id == id) {
          positionValueEdit = item.position;
        }
      })
      console.log("aaaaaaaaaaaaaaa")
      emplyeeList.forEach((item, index) => {
        if (item.id == id) {
          const emplyee = {
            id: parseInt(id),
            name: data.name,
            sex: data.sex,
            address: data.address,
            phoneNumber: data.phone,
            email: data.email,
            position: positionValueEdit
          };
          localStorage.removeItem('emplyeeList');
          emplyeeList[index] = emplyee;
        }
      })
      
    }
    localStorage.setItem("emplyeeList", JSON.stringify(emplyeeList));
    console.log(JSON.parse(localStorage.getItem('emplyeeList')));
    console.log(emplyeeList);
    setShow(false)
    setId(-1)
  }
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous"></link>
        <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/popper.js@1.12.9/dist/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>

      </Head>

      <main >
        <button
          type="button"
          className="btn btn-primary"
          data-toggle="modal"
          data-target="#exampleModal"

        >
          Thêm mới cán bộ
        </button>
        <table style={{ marginTop: "20px" }}>
          <thead>
            <tr>
              <th>
                STT
              </th>
              <th>
                Họ và tên
              </th>
              <th>
                Nữ
              </th>
              <th>
                Địa chỉ
              </th>
              <th>
                Điện thoại
              </th>
              <th>
                Email
              </th>
              <th>
                Chức vụ
              </th>
              <th>
                Sửa
              </th>
              <th>
                Xóa
              </th>
              <th>
                Cập nhật chức vụ
              </th>
            </tr>
          </thead>
          <tbody>
            {emplyeeList && emplyeeList.map((emmp, index) =>
              <tr key={index}>
                <td>
                  {index + 1}
                  {/* {emmp.id} */}
                </td>
                <td>
                  {emmp.name}
                </td>
                <td>
                  {emmp.sex == 1 ? "X" : null}
                </td>
                <td>
                  {emmp.address}
                </td>
                <td>
                  {emmp.phoneNumber}
                </td>
                <td>
                  {emmp.email}
                </td>
                <td>
                  {emmp.position}
                </td>
                <td>

                  <button
                    type="button"
                    className="btn btn-primary"
                    data-toggle="modal"
                    data-target="#exampleModal"
                    onClick={() => { suathongTin(emmp.id); setId(emmp.id) }}
                  >
                    Sửa
                  </button>

                </td>
                <td>
                  {/* <button type="button"
                    onClick={() => onDelete(emmp.id)}
                    className="button-form" >Xóa</button> */}
                  <div className="popup-link button-form">
                    <a href={`#popup2-${emmp.id}`}>Xóa</a>
                  </div>
                  <div id={`popup2-${emmp.id}`} className="popup-container popup-style-2">
                    <div className="popup-content">
                      <a href="#" className="close">&times;</a>
                      <h3>Xóa nhân viên </h3>
                      <p>Bạn có chắc chắn muốn xóa không ? </p>
                      <a href="#" onClick={() => onDelete(emmp.id)} className="button-form">Xóa</a>
                    </div>
                  </div>
                </td>
                <td>Cập nhật</td>

              </tr>
            )}
          </tbody>
        </table>
        <div>


        </div>
      </main>
      <>

        {/* Modal */}
        <div
          className="modal fade"
          id="exampleModal"
          tabIndex={-1}
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                <form
                  onSubmit={handleSubmit(onSubmit)}>

                  <table className='table'>
                    <thead>
                      <tr>
                        <th colSpan={2}>Thêm mới/Cập nhật cán bộ</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Họ và tên</td>
                        <td>
                          <input
                            type="text"
                            placeholder="Họ và tên"
                            id="name"
                            name="name"
                            {...register("name", { required: true, minLength: 3, maxLength: 20 })}
                          />
                          {errors.name && errors.name.type === "required" && (
                            <p className="error-text-form">
                              value required
                            </p>
                          )}
                          {errors.name && errors.name.type === "minLength" && (
                            <p className="error-text-form">
                              Họ và tên phải lớn hơn 3 ký tự
                            </p>
                          )}
                          {errors.name && errors.name.type === "maxLength" && (
                            <p className="error-text-form">
                              Họ và tên phải nhỏ hơn 20 ký tự
                            </p>
                          )}
                        </td>
                      </tr>

                      <tr>
                        <td>Giới tính</td>
                        <td>
                          {sexValue == "0" ?
                            <label htmlFor="nam">
                              <input
                                {...register("sex")}
                                checked
                                type="radio"
                                name="sex"
                                value="0"
                                id="Nam"
                              />
                              Nam
                            </label>
                            :
                            <label htmlFor="nam">
                              <input
                                {...register("sex")}
                                type="radio"
                                name="sex"
                                value="0"
                                id="Nam"
                              />
                              Nam
                            </label>
                          } &nbsp;
                          {sexValue == "1" ?
                            <label htmlFor="nu">
                              <input
                                checked
                                {...register("sex")}
                                type="radio"
                                name="sex"
                                value="1"
                                id="Nu"
                              />
                              Nữ
                            </label>
                            :
                            <label htmlFor="nu">
                              <input

                                {...register("sex")}
                                type="radio"
                                name="sex"
                                value="1"
                                id="Nu"
                              />
                              Nữ
                            </label>
                          }
                        </td>
                      </tr>


                      <tr>
                        <td>Địa chỉ</td>
                        <td>
                          <input
                            type="text"
                            placeholder="Địa chỉ"
                            id="address"
                            name="address"
                            {...register("address", { required: true, minLength: 10, maxLength: 30 })}
                          />
                          {errors.address && errors.address.type === "required" && (
                            <p className="error-text-form">
                              value required
                            </p>
                          )}
                          {errors.address && errors.address.type === "minLength" && (
                            <p className="error-text-form">
                              Địa chỉ phải lớn hơn 10 ký tự
                            </p>
                          )}
                          {errors.address && errors.address.type === "maxLength" && (
                            <p className="error-text-form">
                              Địa chỉ phải nhỏ hơn 30 ký tự
                            </p>
                          )}
                        </td>
                      </tr>

                      <tr>
                        <td>Điện thoại</td>
                        <td>
                          <input
                            type="tel"
                            placeholder="Điện thoại"
                            id="phone"
                            name="phone"
                            {...register("phone", { required: true, minLength: 10, maxLength: 10 })}
                          />
                          {errors.phone && errors.phone.type === "required" && (
                            <p className="error-text-form">
                              value required
                            </p>
                          )}
                          {errors.phone && errors.phone.type === "minLength" && (
                            <p className="error-text-form">
                              Số điện thoại bao gồm 10 ký tự
                            </p>
                          )}
                          {errors.phone && errors.phone.type === "maxLength" && (
                            <p className="error-text-form">
                              Số điện thoại bao gồm 10 ký tự
                            </p>
                          )}

                        </td>
                      </tr>

                      <tr>
                        <td>Email</td>
                        <td>
                          <input
                            type="text"
                            placeholder="Email"
                            id="email"
                            name="email"
                            {...register("email", {
                              required: true,
                              pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            })}
                          />
                          {errors.email && errors.email.type === "required" && (
                            <p className="error-text-form">
                              Cần nhập email
                            </p>
                          )}
                          {errors.email && errors.email.type === "pattern" && (
                            <p className="error-text-form">
                              Email chưa đúng định dạng
                            </p>
                          )}
                        </td>
                      </tr>

                      <tr>
                        <td></td>
                        <td>
                          <button type="submit" className="btn btn btn-primary">Cập nhật</button> &nbsp;
                          <button
                            type="button"
                            className="btn btn-secondary"
                            data-dismiss="modal"
                          >
                            Hủy bỏ
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </form>
              </div>
            </div>
          </div>
        </div>
      </>


    </div>
  )
}

