import { useForm } from "react-hook-form";
export default function positions() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data, e) => {
    let emplyeeList = JSON.parse(localStorage.getItem('emplyeeList'));
    const emplyee = {
      id: emplyeeList.length + 1,
      name: data.name,
      sex: data.sex,
      address: data.address,
      phoneNumber: data.phone,
      email: data.email,
  };
  // console.log(emplyee);
  localStorage.removeItem('emplyeeList');
  emplyeeList.push(emplyee);
  localStorage.setItem("emplyeeList", JSON.stringify(emplyeeList));
  console.log(JSON.parse(localStorage.getItem('emplyeeList')));
  }

  return (
    <div className="create-edit-page">
      <form
        onSubmit={handleSubmit(onSubmit)}>

        <table className='table'>
          <thead>
            <tr>
              <th colSpan={2}>Thêm chức vụ</th>
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
                  {...register("name", { required: true,minLength: 3,maxLength: 20 })}
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
                <label htmlFor="nam">
                  <input
                    {...register("sex")}
                    checked
                    type="radio"
                    name="sex"
                    value="0"
                    id="nam"
                  />
                  Nam
                </label>
                <label htmlFor="nu">
                  <input
                    {...register("sex")}
                    type="radio"
                    name="sex"
                    value="1"
                    id="nu"
                  />
                  Nữ
                </label>
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
                  {...register("address", { required: true,minLength: 10,maxLength: 30 })}
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
                  {...register("phone", { required: true,minLength: 10,maxLength: 10 })}
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
                            Value required
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
                <button type="submit" className="button-form">Cập nhật</button>
              </td>
            </tr>

          </tbody>
        </table>

      </form>

    </div>







  )
}