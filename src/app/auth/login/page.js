"use client";
import React, { useState } from "react";
import styles from "./login.module.css";
import Link from "next/link";
import Swal from "sweetalert2";
import { valiadteEmail } from "@/utils/auth";
import { useRouter } from "next/navigation";

function Login({searchParams}) {
  const router = useRouter();
  const from = searchParams.from;

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const HandleLogin = async (e) => {
    e.preventDefault();
    const isvalidEmail = valiadteEmail(username);

    if (!isvalidEmail) {
      setUsername("");
      setPassword("");
      Swal.fire({
        title: "خطا",
        text: "لطفا ایمیل  خود را به درستی وارد کنید",
        icon: "error",
        confirmButtonText: "باشه",
      });
      return null;
    }
    try {
      const data = { email: username, password };
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (res.status == 200) {
        const Response = await res.json();
        Swal.fire({
          title: "موفقیت",
          text: "شما با موفقیت وارد شدید",
          icon: "success",
          confirmButtonText: "باشه",
        }).then(() => {
          if (Response.data.role === "USER") {
            switch(from) {
              case "/": router.push("/p-user")
              break;
              case "checkout": router.push("/checkout")
              break;
              case "p-user": router.push("/p-user")
              break;
            }
             
          } else if (Response.data.role === "ADMIN") {
            router.push("/p-admin");
          }
        });
      } else {
        setUsername("");
        setPassword("");
        Swal.fire({
          title: "خطا",
          text: "اطلاعات ورود نادرست است",
          icon: "error",
          confirmButtonText: "باشه",
        });
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
        <form onSubmit={HandleLogin}>
          <h3 className={styles.title}>ورود به حساب کاربری</h3>
          <div className={styles.formWrapper}>
            <input
              type="text"
              placeholder="آدرس ایمیل"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              className={styles.formControl}
            />
          </div>

          <div className={styles.formWrapper}>
            <input
              type="password"
              placeholder="رمز عبور"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className={styles.formControl}
            />
          </div>

          <Link href={"/auth/register"}>
            {" "}
            حساب کاربری ندارید؟ ثبت نام کنید{" "}
          </Link>

          <button type="submit" className={styles.myButton}>
            ورود
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
