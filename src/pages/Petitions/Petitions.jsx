import { Link } from 'react-router-dom';
import { FaSistrix, FaEllipsis, FaDeleteLeft, FaPenToSquare } from 'react-icons/fa6';
import { Card, Spinner } from 'flowbite-react';
import { useState } from 'react';
import { IoIosAddCircle } from 'react-icons/io';
import { formatDate } from '../../utils/Utils';
import { usePetition, usePetitionDispatch } from '../../hooks/useContext';

const Petitions = () => {
  const { petitions, loading, deletePetition } = usePetition();
  console.log('🚀 ~ file: Petitions.jsx:11 ~ Petitions ~ petitions:', petitions);

  const dispatch = usePetitionDispatch();

  const [isDropdownOpen, setIsDropdownOpen] = useState(new Array(petitions.length).fill(false));

  const toggleDropdown = (index) => {
    setIsDropdownOpen((prev) => {
      const newState = [...prev];
      newState[index] = !newState[index];
      return newState;
    });
  };

  return (
    <div className="p-4 sm:ml-64">
      <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
        <div className="items-stretch self-stretch flex flex-col">
          <div className="items-stretch flex w-full justify-between gap-5 mt-2 px-5 max-md:max-w-full max-md:flex-wrap">
            <div className="flex items-center gap-3">
              <div className="text-black text-3xl font-medium leading-10 grow shrink basis-auto">Petitions</div>
              <Link to="/petitions/add-petition">
                <IoIosAddCircle size={30} />
              </Link>
            </div>
          </div>

          <div className="items-stretch border border-[color:var(--neutral-700,#D1D9E2)] shadow-sm bg-slate-50 flex w-full flex-col mt-8 pb-3 rounded-xl border-solid max-md:max-w-full">
            <div className="items-stretch border-b-[color:var(--neutral-700,#D1D9E2)] bg-slate-50 flex w-full flex-col px-5 py-4 border-b border-solid max-md:max-w-full">
              <div className="items-center flex w-full justify-between gap-5 max-md:max-w-full max-md:flex-wrap">
                <h1 className="text-black text-base font-medium leading-5 tracking-normal my-auto">Petitions</h1>

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
            {/* card */}
            <div className="flex flex-wrap-reverse justify-start gap-4 p-5">
              {loading ? (
                <Spinner />
              ) : (
                petitions.map((item, index) => (
                  <Card
                    className="max-w-[350px] object-cover"
                    renderImage={() => (
                      <img src={`${item.image ? item.image : 'https://ik.imagekit.io/alzirahmana/Asset%20-%20mobile%20responsive%20web/photo%20Fill.png?updatedAt=1701236602366'}`} alt="image 1" className="h-52 w-96 object-cover " />
                    )}
                    key={item.id}
                  >
                    <div className="relative">
                      <div className="flex justify-between text-sm font-bold text-gray-900 dark:text-white">
                        <span>{formatDate(item.updatedAt)}</span>
                        <button type="button" label="edit" className="text-sm rounded-full dark:focus:ring-gray-600" aria-expanded={isDropdownOpen[index]} onClick={() => toggleDropdown(index)}>
                          <FaEllipsis />
                        </button>
                        {isDropdownOpen[index] && (
                          <div className="absolute right-0 mt-5 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600">
                            <ul className="py-1" role="none">
                              <Link
                                to={`/petitions/edit-petition/${item.id}`}
                                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                                role="menuitem"
                              >
                                <FaPenToSquare />
                                <span>Edit</span>
                              </Link>
                              <button
                                className="flex items-center gap-2 px-4 py-2 text-sm text-red-800 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                                role="menuitem"
                                onClick={() => {
                                  deletePetition(item.id);
                                  dispatch({ type: 'DELETE_PETITION', id: item.id });
                                }}
                              >
                                <FaDeleteLeft />
                                <span>Hapus</span>
                              </button>
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                    <p className="font-semibold text-gray-700 dark:text-gray-400">{item.title}</p>
                  </Card>
                ))
              )}
            </div>

            {/* pagination */}
            <nav className="mx-auto mt-9">
              <ul className="flex text-sm md:text-base">
                <Link>
                  <span className="flex items-center justify-center px-3 md:px-4 h-8 md:h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-lg hover:bg-gray-200 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                    Previous
                  </span>
                </Link>
                <Link>
                  <span className="flex items-center justify-center px-3 md:px-4 h-8 md:h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-200 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                    1
                  </span>
                </Link>
                <Link>
                  <span className="flex items-center justify-center px-3 md:px-4 h-8 md:h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-200 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                    2
                  </span>
                </Link>
                <Link>
                  <span
                    aria-current="page"
                    className="flex items-center justify-center px-3 md:px-4 h-8 md:h-10 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                  >
                    3
                  </span>
                </Link>
                <Link>
                  <span className="flex items-center justify-center px-3 md:px-4 h-8 md:h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-200 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                    4
                  </span>
                </Link>
                <Link>
                  <span className="flex items-center justify-center px-3 md:px-4 h-8 md:h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-200 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                    Next
                  </span>
                </Link>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Petitions;
