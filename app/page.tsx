import Image from "next/image";
import FetacData from "./com/practices/FetacData";
import SuspenseWrapper from "./com/SuspenseWrapper";
import CreateProduct from "./com/UploadProduct";

export default function Home() {
  return (
    <div>
      <main>

        <CreateProduct />
{/* 
        <SuspenseWrapper>
          <FetacData />
        </SuspenseWrapper> */}

      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">

      </footer>
    </div>
  );
}
