// app/p-user/layout.js
import React from "react";
import Sidebar from "@/components/templates/Dashboard/Sidebar";
import Header from "@/components/templates/Dashboard/Header";
import styles from './puser.module.css';
import { authUser } from "@/utils/auth";
import { redirect } from "next/navigation";


export const metadata = {
    title: "فروشگاه اینترنتی چامه",
    description: "فروشگاه اینترنتی مد و پوشاک چامه",
    charset: 'utf-8',
    // viewport: 'width=device-width, initial-scale=1',
  };
  
export default async function DashboardLayout({ children }) {
  const user=await authUser();

  if (!user){
    redirect('/auth/login?from=p-user');
    return null;
  }
  
  return (
    <section className={styles.dashboardContainer}>
      <Header user={JSON.parse(JSON.stringify(user))}/>
      <div className={styles.contentWrapper}>
        <Sidebar />
        <div className={styles.mainContent}>{children}</div>
      </div>
    </section>
  );
}


