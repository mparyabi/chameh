import '@/styles/Loading.module.css'
export default function Loading() {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <img  style={{width:'120px'}} src='/images/logo.jpg'/>
        <br/>
        <p>در حال بارگذاری...</p>
      </div>
    );
  }
  