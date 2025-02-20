"use client";
import React, { useState } from "react";
import styles from "./register.module.css";
import { valiadteEmail, valiadtePassword, valiadtePhone } from "@/utils/auth";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

function Register() {

  const router = useRouter();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeat, setRepeat] = useState("");

  const HandleRegister = async (e) => {
    e.preventDefault();
    const isvalidEmail = valiadteEmail(email);
	const isvalidPhone = valiadtePhone(phone);
	const strongPassword = valiadtePassword(password);

    if (!isvalidPhone) {
		setPhone("");
		Swal.fire({
		  title: "خطا",
		  text: "لطفا شماره تلفن همراه معتبر وارد کنید",
		  icon: "error",
		  confirmButtonText: "باشه",
		});
		return null;
	  }

    if (!isvalidEmail) {
      setEmail("");
      Swal.fire({
        title: "خطا",
        text: "لطفا ایمیل  خود را به درستی وارد کنید",
        icon: "error",
        confirmButtonText: "باشه",
      });
      return null;
    }

    if (password != repeat) {
      setPassword("");
      setRepeat("");
      Swal.fire({
        title: "خطا",
        text: "رمز عبور و تکرار آن یکی نیست!",
        icon: "error",
        confirmButtonText: "باشه",
      });
      return null;
    }

	if (!strongPassword) {
		setPassword("");
		setRepeat("");
		Swal.fire({
		  title: "خطا",
		  text: "رمز عبور شما شامل حروف بزرگ و کوچک ، عدد و بیش از 8 کاراکتر باشد",
		  icon: "error",
		  confirmButtonText: "باشه",
		});
		return null;
	  }



	try {
		const data = { email, password, name, phone };
		const res = await fetch("/api/auth/signup", {
		  method: "POST",
		  headers: {
			"Content-Type": "application/json",
		  },
		  body: JSON.stringify(data),
		});
		if (res.status == 201) {
		  Swal.fire({
			title: "موفقیت",
			text: "شما با موفقیت ثبت نام شدید",
			icon: "success",
			confirmButtonText: "باشه",
		  }).then(() => {
			  router.push("/");
		  });
		} 

		if(res.status == 422){
			setEmail("");
			setName("");
			setPassword("");
			setRepeat("");
			setPhone("");

			Swal.fire({
				title: "خطا",
				text: "این ایمیل قبلا در سایت ثبت نام شده",
				icon: "error",
				confirmButtonText: "باشه",
			  })
			  return null;
		}

	  } catch (e) {
		console.log("ERROR ECCURED", e);
	  }

  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.inner}>
        <div className={styles.imageHolder}>
          <img src="/images/auth/registration-form-1.jpg" alt="" />
        </div>
        <form onSubmit={HandleRegister}>
          <h3 className={styles.title}>فرم ثبت نام در چامه</h3>
          <div className={styles.formWrapper}>
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="نام و نام خانوادگی"
              className={styles.formControl}
            />
			</div>
			<div className={styles.formWrapper}>
            <input
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              type="tel"
              placeholder="شماره تلفن همراه"
              className={styles.formControl}
            />
          </div>
          <div className={styles.formWrapper}>
            <input
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              placeholder="آدرس ایمیل"
              className={styles.formControl}
            />
          </div>

          <div className={styles.formWrapper}>
            <input
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="رمز عبور"
              className={styles.formControl}
            />
          </div>
          <div className={styles.formWrapper}>
            <input
              required
              value={repeat}
              onChange={(e) => setRepeat(e.target.value)}
              type="password"
              placeholder="تایید رمز عبور"
              className={styles.formControl}
            />
          </div>
          <button type="submit" className={styles.myButton}>
            ثبت نام
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
