import { FaUserGroup, FaNewspaper, FaFileSignature, FaSignsPost } from "react-icons/fa6";

import { useEffect, useState } from "react";

import RecentPost from "./ReportedPost";

const Dashboard = () => {
  const [usersData, setUsersData] = useState([]);
  const [newsData, setNewsData] = useState([]);
  const [petisiData, setPetisiData] = useState([]);
  const [postData, setPostData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // fetch user data
        const userResponse = await fetch(`${import.meta.env.VITE_BASE_URL}/users`);

        if (userResponse.ok) {
          const responseData = await userResponse.json();
          setUsersData(responseData.data);
        }

        // fetch news data
        const newsResponse = await fetch(`${import.meta.env.VITE_BASE_URL}/news`);
        if (newsResponse.ok) {
          const responseData = await newsResponse.json();
          setNewsData(responseData.data);
        }

        // fetch petisi data
        const petisiResponse = await fetch(`${import.meta.env.VITE_BASE_URL}/petitions`);
        if (petisiResponse.ok) {
          const responseData = await petisiResponse.json();
          setPetisiData(responseData.data);
        }

        // fetch post data
        const postResponse = await fetch(`${import.meta.env.VITE_BASE_URL}/posts`);
        if (postResponse.ok) {
          const responseData = await postResponse.json();
          setPostData(responseData.data);
        }
      } catch (error) {
        console.error("Error fetching user data:", error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-4 sm:ml-64">
      <div className="p-4 border-2 border-green-200 border-dashed rounded-lg dark:border-green-700 mt-14">
        <div className="items-stretch self-stretch flex flex-col">
          <div className="items-stretch flex w-full justify-between gap-5 mt-2 px-5 max-md:max-w-full max-md:flex-wrap">
            <div className="text-black text-3xl font-medium leading-10 grow shrink basis-auto">Dashboard Admin</div>
          </div>

          {/* card */}
          <div className="items-stretch flex w-full gap-5 mt-10 px-5 max-md:max-w-full max-md:flex-wrap max-md:justify-center">
            <div className="justify-end border border-[color:var(--neutral-700,#D1D9E2)] shadow-sm bg-slate-50 flex grow basis-[0%] flex-col px-5 py-4 rounded-xl border-solid items-end">
              <div className="items-stretch flex w-[213px] max-w-full justify-between gap-5">
                <div className="justify-center items-center bg-green-200 flex aspect-[1.0408163265306123] flex-col px-2.5 py-2.5 rounded-[50px]">
                  <FaUserGroup className="aspect-square object-contain object-center w-8 overflow-hidden text-green-500" />
                </div>
                <div className="justify-center items-stretch flex grow basis-[0%] flex-col">
                  <div className="text-black text-opacity-50 text-sm font-medium leading-5 tracking-normal">Users</div>
                  <div className="text-black text-2xl font-medium leading-5 tracking-normal mt-2">{usersData.length}</div>
                </div>
              </div>
            </div>
            <div className="justify-end border border-[color:var(--neutral-700,#D1D9E2)] shadow-sm bg-slate-50 flex grow basis-[0%] flex-col px-5 py-4 rounded-xl border-solid items-end">
              <div className="items-stretch flex w-[213px] max-w-full justify-between gap-5">
                <div className="justify-center items-center bg-green-200 flex aspect-[1.0408163265306123] flex-col px-2.5 py-2.5 rounded-[50px]">
                  <FaNewspaper className="aspect-square object-contain object-center w-8 overflow-hidden text-green-500" />
                </div>
                <div className="justify-center items-stretch flex grow basis-[0%] flex-col">
                  <div className="text-black text-opacity-50 text-sm font-medium leading-5 tracking-normal">News</div>
                  <div className="text-black text-2xl font-medium leading-5 tracking-normal mt-2">{newsData.length}</div>
                </div>
              </div>
            </div>
            <div className="justify-end border border-[color:var(--neutral-700,#D1D9E2)] shadow-sm bg-slate-50 flex grow basis-[0%] flex-col px-5 py-4 rounded-xl border-solid items-end">
              <div className="items-stretch flex w-[213px] max-w-full justify-between gap-5">
                <div className="justify-center items-center bg-green-200 flex aspect-[1.0408163265306123] flex-col px-2.5 py-2.5 rounded-[50px]">
                  <FaFileSignature loading="lazy" className="aspect-square object-contain object-center w-8 overflow-hidden text-green-500" />
                </div>
                <div className="justify-center items-stretch flex grow basis-[0%] flex-col">
                  <div className="text-black text-opacity-50 text-sm font-medium leading-5 tracking-normal">Petisi</div>
                  <div className="text-black text-2xl font-medium leading-5 tracking-normal mt-2">{petisiData.length}</div>
                </div>
              </div>
            </div>
            <div className="justify-end border border-[color:var(--neutral-700,#D1D9E2)] shadow-sm bg-slate-50 flex grow basis-[0%] flex-col px-5 py-4 rounded-xl border-solid items-end">
              <div className="items-stretch flex w-[213px] max-w-full justify-between gap-5">
                <div className="justify-center items-center bg-green-200 flex aspect-[1.0408163265306123] flex-col px-2.5 py-2.5 rounded-[50px]">
                  <FaSignsPost loading="lazy" className="aspect-square object-contain object-center w-8 overflow-hidden text-green-500" />
                </div>
                <div className="justify-center items-stretch flex grow basis-[0%] flex-col">
                  <div className="text-black text-opacity-50 text-sm font-medium leading-5 tracking-normal">Post</div>
                  <div className="text-black text-2xl font-medium leading-5 tracking-normal mt-2">{postData.length}</div>
                </div>
              </div>
            </div>
          </div>
          <RecentPost />
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
