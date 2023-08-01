import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className=" h-16 sm:h-24 md:h-24 xl:h-28 border-2 rounded-3xl border-gray-950 m-5 shadow-slate-700 shadow-lg flex items-center justify-between px-3 md:px-5 ">
      <div className=" flex items-center">
        <Image
          src={"/favicon.ico"}
          alt="Logo"
          width={100}
          height={100}
          className=" rounded-full w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16"
        />
        <h2 className="ml-5 text-xl md:text-4xl">Blogopedia</h2>
      </div>

      <div className="flex items-center ">
        <div className=" hidden lg:flex">
          <ul className="flex">
            {[
              ["Home", "/"],
              ["Add Post", "/post"],
            ].map(([title, url]) => {
              return (
                <Link href={url} key={title} className="ml-5 text-2xl italic">
                  <button className="border-2 rounded-xl py-3 px-6 bg-blue-300 hover:bg-gray-300 ">
                    {title}
                  </button>
                </Link>
              );
            })}
          </ul>
        </div>
        <Image
          src={"/favicon.ico"}
          alt="Logo"
          width={100}
          height={100}
          className=" rounded-full w-8 h-8 sm:w-10 sm:h-10 md:w-14 md:h-14 ml-5"
        />
      </div>
    </div>
  );
};

export default Navbar;
