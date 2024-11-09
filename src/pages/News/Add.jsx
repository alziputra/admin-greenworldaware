import { useContext, useState } from 'react';
import { NewsContext } from '../../context/NewsContext';
import CloudinaryUploadWidget from '../../components/CloudinaryUploadWidget';
import { Spinner } from 'flowbite-react';

const Add = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState(1);
  console.log('🚀 ~ file: add.jsx:10 ~ Add ~ categoryId:', categoryId);

  const { handleAddNews, categories, loading } = useContext(NewsContext);

  const handleSubmitNews = (e) => {
    e.preventDefault();
    handleAddNews(title, description, fileUrl, categoryId);
  };

  const [fileUrl, setFileUrl] = useState('');

  const [publicId, setPublicId] = useState();
  // Replace with your own cloud name
  const [cloudName] = useState(import.meta.env.VITE_CLOUDINARY_NAME);
  // Replace with your own upload preset
  const [uploadPreset] = useState(import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);

  // Upload Widget Configuration
  // Remove the comments from the code below to add
  // additional functionality.
  // Note that these are only a few examples, to see
  // the full list of possible parameters that you
  // can add see:
  //   https://cloudinary.com/documentation/upload_widget_reference

  const [uwConfig] = useState({
    cloudName,
    uploadPreset,
    maxImageFileSize: 2000000, //restrict file size to less than 2MB
    // cropping: true, //add a cropping step
    // showAdvancedOptions: true,  //add advanced options (public_id and tag)
    // sources: [ "local", "url"], // restrict the upload sources to URL and local files
    // multiple: false,  //restrict upload to a single file
    // folder: "user_images", //upload files to the specified folder
    // tags: ["users", "profile"], //add the given tags to the uploaded files
    // context: {alt: "user_uploaded"}, //add the given context data to the uploaded files
    // clientAllowedFormats: ["images"], //restrict uploading to image files only
    // maxImageWidth: 2000, //Scales the image down to a width of 2000 pixels before uploading
    // theme: "purple", //change to a purple theme
  });

  return (
    <div className="p-4 sm:ml-64">
      <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
        <form onSubmit={handleSubmitNews}>
          <div className="items-stretch self-stretch flex flex-col">
            <div className="flex gap-5 mt-2 px-5 max-md:max-w-full max-md:flex-wrap">
              <div className="text-black text-3xl font-medium  shrink basis-auto">News</div>
              <button className="bg-green-500 rounded-lg text-white active:ring ring-offset-1 p-2" color="success" disabled={loading}>
                {loading ? <Spinner /> : 'Simpan'}
              </button>
            </div>
          </div>
          <div className="items-stretch border border-gray-300 shadow-sm bg-slate-50 flex w-full flex-col mt-8 p-4 rounded-xl border-solid max-md:max-w-full">
            <div className="mt-10">
              <label className="block mb-2 text-md font-semibold text-gray-900 dark:text-white">Title</label>
              <input
                type="text"
                id="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500"
                placeholder="Title"
                required
              ></input>
            </div>

            <div className="mt-5">
              <label className="block mb-2 text-md font-semibold text-gray-900 dark:text-white">Content</label>
              <textarea
                id="message"
                rows="4"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-gray-500 focus:border-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500"
                placeholder="Write your content here..."
              ></textarea>
            </div>

            <select className="rounded-lg w-full mt-5" value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
              {categories.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.category}
                </option>
              ))}
            </select>

            {/* upload foto */}
            <div className="flex flex-col w-4/5 mt-5">
              <span className="relative mb-2 text-md font-semibold text-gray-900 dark:text-white">Header Image</span>

              <CloudinaryUploadWidget uwConfig={uwConfig} setPublicId={setPublicId} setFileUrl={setFileUrl} fileUrl={fileUrl} />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Add;
