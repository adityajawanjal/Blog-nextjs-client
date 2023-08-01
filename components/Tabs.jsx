import Link from "next/link";

const Tabs = ({ categories }) => {
  return (
    <div>
      <ul className=" flex border-l-8 border-green-700 justify-start flex-wrap px-2 font-serif italic text-2xl cursor-pointer">
        {categories.map((e, i) => {
          return (
            <Link key={i} href={`category/${e.attributes.Slug}`}>
              <li className="m-2">{e.attributes.Title}</li>
            </Link>
          );
        })}
      </ul>
    </div>
  );
};

export default Tabs;
