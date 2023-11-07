
import "./NavBar.css";

export default function NavBar() {


  return (
    <div className="bg-main shadow-md top-0">
      <div className="container mx-auto py-6 px-2 lg:grid gap-10 grid-cols-7 justify-between items-center">
        <div className="col-span-1 scale-125 hover:scale-150">
          <a href="/"><img src="/assets/tip-logo.png" alt="logo" className="w-full h-12 object-contain" /></a>
        </div>
        <div className="col-span-4 font-bold text-lg text-white">
          <h3 className="hover:text-main cursor-pointer">TIP Virtual Tour</h3>
        </div>
        <div className="col-span-2 font-medium text-sm hidden xl:gap-14 2xl:gap-20 justify-between lg:flex xl:justify-end items-center">
          <a className="hover:text-main transitions text-white" href="/">Home</a>
          <a className="hover:text-main transitions text-white" href="/about">About</a>
        </div>
      </div>
    </div>
  );
}