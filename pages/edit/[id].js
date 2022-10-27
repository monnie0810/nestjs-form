import { useRouter } from 'next/router'
import { useForm } from "react-hook-form";
export default function editEmployee() {

    const router = useRouter();
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm();
    let emplyeeList = [];
    if (typeof window !== 'undefined') {
        emplyeeList = JSON.parse(localStorage.getItem('emplyeeList'));
    };
    console.log(emplyeeList);
    let sexValue;
    if(router.query && router.query.id !='null'){
        emplyeeList.map((item)=> {
            if(item.id == parseInt(router.query.id)){
                setValue("name", item.name);
                setValue("phone", item.phoneNumber);
                setValue("address", item.address);
                setValue("email", item.email);
                sexValue = item.sex;
            }
        })

    }
    const onSubmit = async (data, e) => {

        if (!router.query || router.query.id == "null" || router.query.id == "") {
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
                if (item.id == router.query.id) {
                    positionValueEdit = item.position;
                }
            })
            const emplyee = {
                id: parseInt(router.query.id),
                name: data.name,
                sex: data.sex,
                address: data.address,
                phoneNumber: data.phone,
                email: data.email,
                position: positionValueEdit,
            };
            localStorage.removeItem('emplyeeList');
            emplyeeList.forEach((item, index) => {
                if (item.id == router.query.id) {
                    emplyeeList[index] = emplyee;
                }
            })
        }
        localStorage.setItem("emplyeeList", JSON.stringify(emplyeeList));
        console.log(JSON.parse(localStorage.getItem('emplyeeList')));
        router.push("/");

    }


    return (
        <div className="create-edit-page">
            <form
                onSubmit={handleSubmit(onSubmit)}>

                <table className='table'>
                    <thead>
                        <tr>
                            <th colSpan={2}>Thêm mới cán bộ</th>
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
                                }
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