import BlogCard from "../components/BlogCard";
import Tabs from "../components/Tabs";
import { fetchAllUsers, fetchArticles, fetchCategories } from "../utils/api";
import Link from "next/link";

const Home = ({ categories, articles, users }) => {
  return (
    <div className="py-5">
      <Tabs categories={categories} />
      <div className="mt-10 gap-5 px-3 grid grid-cols-1 md:grid-cols-2 ">
        {articles?.map((e) => {
          return (
            <Link key={e.id} href={`/${e.attributes.Slug}`}>
              <BlogCard
                title={e.attributes.Title}
                description={e.attributes.Description}
                author={
                  e.attributes.users_permissions_user.data.attributes
                    .FirstName +
                  " " +
                  e.attributes.users_permissions_user.data.attributes.LastName
                }
                pic={
                  users.find(
                    (i) =>
                      i.email ===
                      e.attributes.users_permissions_user.data.attributes.email
                  ).Profile.url
                }
                date={e.attributes.updatedAt}
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Home;

export const getServerSideProps = async () => {
  const res1 = await fetchCategories();
  const res2 = await fetchArticles();
  const res3 = await fetchAllUsers();

  return {
    props: {
      categories: res1.data,
      articles: res2.data,
      users: res3,
    },
  };
};
