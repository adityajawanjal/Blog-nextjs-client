import Image from "next/image";
import { url } from "../utils/api";

const BlogCard = ({ title, description, author, date, pic }) => {
  const updateDate = () => {
    const d = new Date(date);
    return d.toString().split("GMT")[0];
  };

  return (
    <div className="border-2 rounded-3xl h-80 sm:h-48 md:h-52 xl:h-48 p-5 overflow-hidden shadow-xl hover:translate-y-1 cursor-pointer">
      <div className="flex flex-col">
        <h2 className=" font-bold text-2xl">
          {title
            ? title.length < 30
              ? title
              : `${title.slice(0, 30)}...`
            : ""}
        </h2>
        <div className="flex items-center my-2 ">
          <Image
            src={`${url}${pic}`}
            alt="Logo"
            width={100}
            height={100}
            className=" rounded-full w-8 h-8 "
          />
          <p className=" ml-5">
            {author} : {date ? updateDate() : ""}
          </p>
        </div>
        <p className=" text-justify">
          {description
            ? description.length < 150
              ? description
              : `${description.slice(0, 150)}...`
            : ""}
        </p>
      </div>
    </div>
  );
};

export default BlogCard;
