import { Checkbox, Table } from "flowbite-react";
import { Link } from "react-router-dom";
import { FaSistrix, FaRegTrashCan } from "react-icons/fa6";
import { useEffect, useState } from "react";

const RecentPost = () => {
  const [postData, setPostData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 4;

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;

  // Sort posts based on creation date in descending order
  const sortedPosts = postData.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/posts`);
        if (response.ok) {
          const responseData = await response.json();
          setPostData(responseData.data);
        } else {
          console.error("Failed to fetch post data");
        }
      } catch (error) {
        console.error("Error fetching post data:", error.message);
      }
    };

    fetchPostData();
  }, []);

  return (
    <div className="items-stretch border border-[color:var(--neutral-700,#D1D9E2)] shadow-sm bg-slate-50 flex w-full flex-col mt-8 pb-3 rounded-xl border-solid max-md:max-w-full">
      <div className="items-stretch border-b-[color:var(--neutral-700,#D1D9E2)] bg-slate-50 flex w-full flex-col px-5 py-4 border-b border-solid max-md:max-w-full">
        <div className="items-center flex w-full justify-between gap-5 max-md:max-w-full max-md:flex-wrap">
          <div className="text-black text-base font-medium leading-5 tracking-normal my-auto">Reported Post by Users</div>
          <div className="items-center bg-white self-stretch flex justify-between gap-5 pl-3">
            <div className="relative w-full">
              <input
                type="text"
                id="search-dropdown"
                className="block p-2.5 w-full z-20 text-sm text-green-900 bg-green-50 rounded-lg border-2 border-green-300 focus:ring-2 dark:bg-green-700 dark:border-green-600 dark:placeholder-green-400 dark:text-white  focus:ring-green-500 focus:border-green-500 dark:focus:ring-green-500 dark:focus:border-green-500"
                placeholder="Search"
                required
              />
              <button
                type="submit"
                className="absolute top-0 right-0 p-2.5 text-sm font-medium h-full text-white bg-green-700 rounded-lg border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              >
                <FaSistrix />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* table */}
      <div className="overflow-x-auto">
        <Table hoverable>
          <Table.Head>
            <Table.HeadCell className="p-4">
              <Checkbox />
            </Table.HeadCell>
            <Table.HeadCell>Email</Table.HeadCell>
            <Table.HeadCell>Post</Table.HeadCell>
            <Table.HeadCell>Poin</Table.HeadCell>
            <Table.HeadCell>Date</Table.HeadCell>
            <Table.HeadCell>
              <span className="sr-only">Edit</span>
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {sortedPosts.slice(indexOfFirstPost, indexOfLastPost).map((post) => (
              <Table.Row key={post.id} className="bg-white dark:border-green-700 dark:bg-green-800">
                <Table.Cell className="p-4">
                  <Checkbox />
                </Table.Cell>
                <Table.Cell>{post.User.email}</Table.Cell>
                <Table.Cell>{post.post}</Table.Cell>
                <Table.Cell>{post.User.points}</Table.Cell>
                <Table.Cell>{new Date(post.createdAt).toLocaleString()}</Table.Cell>
                <Table.Cell>
                  <div className="flex items-center gap-2">
                    <FaRegTrashCan className="text-lg hover:scale-125 text-red-700 transition-transform duration-300 ease-in-out transform" />
                  </div>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>

      {/* pagination */}
      <nav className="mx-auto mt-9">
        <ul className="flex text-sm md:text-base">
          <li>
            <span
              onClick={() => paginate(currentPage - 1)}
              className={`flex items-center justify-center px-3 md:px-4 h-8 md:h-10 ms-0 leading-tight ${
                currentPage === 1 ? "text-gray-400" : "text-green-500 hover:bg-green-100 hover:text-green-700 dark:bg-green-800 dark:border-green-700 dark:text-green-400 dark:hover:bg-green-700 dark:hover:text-white"
              } border border-e-0 border-green-300 rounded-lg cursor-pointer`}
            >
              Previous
            </span>
          </li>
          {Array.from({ length: Math.ceil(sortedPosts.length / postsPerPage) }, (_, i) => (
            <li key={i}>
              <Link to={`?page=${i + 1}`}>
                <span
                  className={`flex items-center justify-center px-3 md:px-4 h-8 md:h-10 leading-tight ${
                    currentPage === i + 1
                      ? "text-blue-600 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-green-700 dark:bg-green-700 dark:text-white"
                      : "text-green-500 bg-white border border-green-300 hover:bg-green-100 hover:text-green-700 dark:bg-green-800 dark:border-green-700 dark:text-green-400 dark:hover:bg-green-700 dark:hover:text-white"
                  }`}
                >
                  {i + 1}
                </span>
              </Link>
            </li>
          ))}
          <li>
            <span
              onClick={() => paginate(currentPage + 1)}
              className={`flex items-center justify-center px-3 md:px-4 h-8 md:h-10 leading-tight text-green-500 bg-white border border-green-300 rounded-lg hover:bg-green-100 hover:text-green-700 dark:bg-green-800 dark:border-green-700 dark:text-green-400 dark:hover:bg-green-700 dark:hover:text-white cursor-pointer`}
            >
              Next
            </span>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default RecentPost;
