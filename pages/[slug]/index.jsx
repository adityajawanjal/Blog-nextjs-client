import Image from "next/image";
import { fetchSingleArticle, myInfo, url, verifyUser } from "../../utils/api";
import { useRouter } from "next/navigation";

const SinglePage = ({ article, user }) => {
  const router = useRouter();

  const updateDate = () => {
    const d = new Date(article.attributes.updatedAt);
    return d.toString().split("GMT")[0];
  };

  if (!user || !article) {
    setTimeout(() => {
      router.push("/signup");
    }, 2000);
    return (
      <>
        <h2 className=" text-center text-5xl my-10 text-clip">
          No Page Found Please Login !
        </h2>
      </>
    );
  }
  if (article && user) {
    return (
      <div className="my-10 container mx-auto px-5">
        <p className=" font-bold font-serif text-xl">
          {article.attributes.Title}
        </p>
        <div className="flex items-center my-5 ">
          <Image
            src={`${url}${user.Profile.url}`}
            alt="Logo"
            width={100}
            height={100}
            className=" rounded-full w-16 h-16 "
          />
          <p className=" ml-5">
            {user.FirstName + " " + user.LastName} : {updateDate()}
          </p>
        </div>
        <Image
          src={
            url + article.attributes.Image.data.attributes.formats.thumbnail.url
          }
          alt="Logo"
          width={700}
          height={500}
        />
        <p className="my-5 text-justify">{article.attributes.Description}</p>
      </div>
    );
  }
};

export const getServerSideProps = async ({ req, res, query }) => {
  if (!req.cookies.token) {
    return {
      props: {},
    };
  }
  const res1 = await verifyUser(req.cookies.token);
  if (!res1.email) {
    return {
      props: {},
    };
  }
  const res2 = await fetchSingleArticle(query.slug);
  const res3 = await myInfo(req.cookies.token);

  return {
    props: {
      token: req.cookies.token || "",
      user: res3,
      article: res2.data[0],
    },
  };
};

export default SinglePage;
